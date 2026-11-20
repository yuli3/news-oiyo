---
id: trend-54c7791b716c8bed
title: "ruby/ruby"
sourceUrl: https://github.com/ruby/ruby
summary: "Ruby 언어의 공식 소스 저장소예요. README는 웹 개발과 텍스트·파일 처리, 시스템 작업에 두루 쓰이는 인터프리터 객체지향 언어 Ruby의 특징과 소스 받는 법, 기여 방법을 안내해요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-11-21
---

ruby/ruby 깃허브 저장소의 README 전체를 읽고 옮겼어요. 읽은 시점 기준 별 약 2.39만 개, 포크 약 5,700개예요.

### Ruby란

Ruby는 웹 개발에 자주 쓰이는 인터프리터 방식의 객체지향 언어예요. 일반 텍스트와 직렬화된 파일을 처리하거나 시스템 작업을 관리하는 스크립팅 기능도 많아요. 단순하고, 직관적이며, 확장 가능하다고 소개해요. 1995년 마츠모토 유키히로(Matz)가 처음 설계하고 개발했어요.

### 특징

- 단순한 문법
- 클래스, 메서드 호출 같은 기본 객체지향 기능
- 믹스인, 싱글턴 메서드 같은 고급 객체지향 기능
- 연산자 오버로딩, 예외 처리
- 이터레이터와 클로저
- 가비지 컬렉션
- 일부 아키텍처에서 오브젝트 파일 동적 로딩
- Unix 계열·POSIX 호환 플랫폼은 물론 Windows, macOS 등에서도 도는 높은 이식성

### 받는 법과 빌드

- rvm 같은 서드파티 도구를 포함한 설치 방법은 ruby-lang.org 다운로드 페이지에 있어요. 릴리스 패키지와 저장소 스냅숏도 받을 수 있어요.
- `git clone https://github.com/ruby/ruby.git`으로 소스 미러를 받을 수 있고, `git ls-remote`로 개발 중인 다른 브랜치를 볼 수 있어요. 커미터라면 실제 master인 git.ruby-lang.org를 써도 돼요.
- 빌드 방법은 'Building Ruby' 문서를 보라고 해요.

### 커뮤니티

- 언어 질문은 Ruby-Talk 메일링 리스트(제목에 join을 적어 ruby-talk-request@ml.ruby-lang.org로 보내 가입)나 Stack Overflow 같은 곳에서 할 수 있어요.
- 버그는 bugs.ruby-lang.org에 신고하고, 기여는 'Contributing to Ruby' 문서를 따르면 돼요. 저장소 주제 태그에는 jit, rust 등도 붙어 있어요.
