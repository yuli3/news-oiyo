-- 2026-11-15 링크 글(GeekNews 식): 글에 원문 주소를 달 수 있다. 본문은 선택.
-- 적용: npx wrangler d1 migrations apply news-community --remote
-- ALTER TABLE ADD COLUMN 은 IF NOT EXISTS 가 없다. 이미 url 칸이 있으면 이 파일은 건너뛴다.
ALTER TABLE posts ADD COLUMN url TEXT;
ALTER TABLE posts ADD COLUMN domain TEXT;
CREATE INDEX IF NOT EXISTS posts_url ON posts(url, created_at DESC);
