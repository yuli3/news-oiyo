-- 2026-10-13 news 회원·댓글·추천·커뮤니티 (세운 결정: 직접 구축).
-- 적용: npx wrangler d1 migrations apply news-community --remote
-- 개인정보 최소 수집: 로그인 제공자의 고유 ID와 사용자가 정한 닉네임만 둔다.
-- 이메일·실명·프로필 사진은 받지 않는다.

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,          -- google | kakao | github
  provider_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user', -- user | admin
  banned INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  UNIQUE (provider, provider_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,     -- SHA-256(쿠키 토큰). 원본 토큰은 저장하지 않는다.
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);

-- 게시글(커뮤니티)
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  category TEXT NOT NULL DEFAULT 'free', -- free | question | share
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  report_count INTEGER NOT NULL DEFAULT 0,
  hidden INTEGER NOT NULL DEFAULT 0,  -- 신고 누적 또는 관리자 숨김
  deleted INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS posts_new ON posts(deleted, hidden, created_at DESC);
CREATE INDEX IF NOT EXISTS posts_top ON posts(deleted, hidden, score DESC, created_at DESC);

-- 댓글. thread = "day:2026-10-13" | "item:trend-abc123" | "post:<post id>"
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  thread TEXT NOT NULL,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  parent_id TEXT,
  body TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  report_count INTEGER NOT NULL DEFAULT 0,
  hidden INTEGER NOT NULL DEFAULT 0,
  deleted INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS comments_thread ON comments(thread, created_at);
CREATE INDEX IF NOT EXISTS comments_user ON comments(user_id, created_at);

-- 추천. 한 사람이 한 대상에 한 번. 다시 누르면 취소.
CREATE TABLE IF NOT EXISTS votes (
  target_type TEXT NOT NULL,       -- comment | post
  target_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (target_type, target_id, user_id)
);

CREATE TABLE IF NOT EXISTS reports (
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (target_type, target_id, user_id)
);
