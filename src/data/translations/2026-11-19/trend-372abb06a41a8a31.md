---
id: trend-372abb06a41a8a31
title: "Octopus, Gecko and Tortoise: the 3 scanners hunting your AI keys"
sourceUrl: https://tin.computer/blog/fake-ai-crawler-secrets-scanners
summary: "Ege Demir이 자신이 운영하는 사이트 10곳에서 2026년 9월 말부터 11월 18일까지 관찰한 결과, AI 크롤러 이름을 위장한 Octopus, 잘린 크롬 UA로 코딩 에이전트 키 파일을 찾는 Gecko, 느린 Tortoise 스캐너 셋을 정리했어요. 운영자는 특정하지 못했어요."
translationStatus: full
translatedBy: Grok Bot
translatedAt: 2026-11-19
---

tin.computer 블로그의 Ege Demir 글(2026년 11월 18일)을 끝까지 읽었어요. 저자가 운영하는 사이트 10곳에서 2026년 9월 말부터 11월 18일까지 본 트래픽을 정리한 글이에요. 운영자가 누구인지는 증명하지 못했고, Octopus와 Gecko는 서로 다른 운영자로 보인다고 해요. 글 중간중간 Tin Analytics 상담을 권하는 문구가 있어, 그건 저자 제품 안내로만 짧게 밝혀 둘게요.

### 한눈에

GPTBot이나 ClaudeBot이 사이트에 `/.env`를 요청하면, 그건 오픈AI나 앤트로픽이 아니라 저자들이 Octopus라고 부르는 스캐너일 수 있어요. 방문은 `/z9x8c7v6b5-debug-trigger-`와 호스트 이름으로 시작해요. 두 번째 스캐너 Gecko는 잘린 사용자 에이전트 `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`를 보내고, Claude Code, Codex, Cursor, Gemini CLI가 키를 두는 파일을 요청해요. 세 번째 Tortoise는 작고 느려요.

로그에서 찾을 수 있는 표식은 이래요.

- Octopus: `/z9x8c7v6b5-debug-trigger-<호스트명>`, 요청마다 바뀌는 AI 크롤러 이름 32개, Google Cloud 15개 리전
- Gecko: 위의 잘린 크롬 UA, `/.claude/settings.json`과 `/.cursor/mcp.json` 등, 벨기에 Google Cloud와 임대 Windows VPS
- Tortoise: `/nonexistent-debug-trigger-7x7`, Windows의 Chrome/126, 몇 초에 요청 하나, TC DATACENTER (AS218785)

### Octopus

모든 방문이 같게 시작해요. 카나리아 경로, 404가 날 임의의 경로 두 개(없는 페이지 응답을 배우려는 것으로 보인다고 해요), 그다음 약 10초 동안 비밀 파일 약 300개를 요청하며 요청마다 다른 크롤러 이름을 붙어요. 32개 이름 중 7개(DeepSeekBot, GrokBot, Qwenbot, MoonshotBot, Hunyuan, ChatGLM-Spider, Bravebot)는 해당 회사가 문서화하지 않은 이름이고, 나머지 25개는 GPTBot, ClaudeBot, PerplexityBot, Googlebot 등 실제 크롤러 이름을 거의 글자 그대로 복사해요. 32개 이름이 한 기계, 한 연결에서 수초 안에 나오며, 실제 크롤러는 그렇게 하지 않는다고 해요. TLS 핸드셰이크는 크롬과 같고, 리디렉션을 따라가며 UA를 유지하고 Referer를 붙이는 것은 Go 표준 HTTP 클라이언트와 같아서, 크롬형 TLS 라이브러리를 쓰는 Go 프로그램으로 본다고 해요. GreyNoise, Fastly, Cequence도 가짜 AI 크롤러 이름과 Google Cloud 스캐너를 보고했고, 카나리아 경로는 9월 공개 로그에도 있어요. 저자 사이트에서는 10월 3일에 시작해, 10월 16일까지는 23~24개 이름(PanguBot/1.0, YiBot/1.0, MistralAI-User 포함)을 쓰다가 32개로 늘었어요.

주소를 Google Cloud 공개 대역과 맞춰 보니 전부 Compute Engine이고, 사이트마다 새 기계를, 거의 매번 다른 리전을 써요. 연속 82대 중 바로 앞과 같은 리전은 3대뿐이었어요. 10월 3일부터 11월 18일까지 기계 97대 중 95대는 사이트 하나에만, 81대는 하루에만 보였고, 65대는 한 시간 안에 사라졌어요. 대만·오리건·싱가포르 등이 많고, 10월 24일에는 다섯 리전의 다섯 대가 같은 사이트를 25분 안에 훑었어요. 주소 하나는 막아도 다음 방문은 새 주소에서 와요. 아직 살아 있는 기계에 접속해 보니 재고 Ubuntu 24.04에 SSH만 열려 있었고, 둘은 접속 후 몇 분 안에 사라졌어요. 주소 공간 전체를 훑지는 않고 호스트명 목록으로 움직이며, 자체 인증서가 없는 호스트명 셋에도 도달해서 목록이 인증서 로그만은 아니라고 해요. GreyNoise에 알려지지 않은 기계가 많았어요.

카나리아 약 1.5초 전에 같은 기계가 일반 브라우저처럼 홈을 열어요. 크롬 또는 에지 UA(버전 152–157)와 완전한 브라우저 헤더를 쓰고, `/robots.txt`와 `/sitemap.xml`을 읽고 링크를 따라가며 방문당 중앙값 68개를 요청해요. `/.next/build-manifest.json`, `/ngsw.json`, `/.vite/manifest.json` 같은 빌드 매니페스트와, 대괄호가 남은 Next.js 라우트 템플릿(`/plays/[playId]`), `/admin`, `/settings/api-keys`, `/graphql`, `/swagger`도 시도해요. Cequence 요약은 이 스캐너가 일반 웹페이지를 무시했다고 하지만, 저자 사이트에서는 그렇지 않았고, 페이지 요청은 브라우저 UA라 AI 크롤러 이름 필터로는 안 걸린다고 해요.

10월 말 이후에는 읽은 내용으로 경로 목록을 고른다고 해요. 정적 HTML은 약 385개(PHP·Python·Laravel·Terraform·Docker·cgi-bin과 알려진 코드 실행 버그를 노리는 POST), Next.js는 약 265개(PHP·Python·POST 없이 Next.js 빌드 파일과 쿠버네티스 설정), Vite 사이트는 약 285개(노출된 Vite 개발 서버용 추가 경로 22개, 예: `/@fs/var/task/.env`). 그 전에는 모든 사이트에 약 275개 같은 목록을 썼어요. 전체 목록은 경로 457개로, `.env` 변형, 클라우드 키, LiteLLM·Flowise·Langflow 같은 AI 게이트웨이, 허깅페이스 토큰, 빌드·CI·자바 디버그 엔드포인트 등이 있어요. 10월 20일 Langflow·Flowise 코드 실행 요청을 권고가 나온 지 2주 만에 넣었다가 하루 만에 뺐고, 11월 12일 LiteLLM 경로를 넣었으며, 10월 24일에는 홈 폴더·SSH 파일을 뺐어요. 목록의 약 절반은 공개 워드리스트에 있고, 나머지 절반은 Vite 클라우드 경로, 제품별 AI 엔드포인트, `llm`·`agent`·`chatbot` 폴더의 `.env`처럼 설계된 것으로 보인다고 해요.

### Gecko와 Tortoise

Gecko의 UA는 자체 크롬 128 문자열을 60자에서 잘라 `(KHTML, like Gecko)` 이하를 없앤 것으로, 잘린 부분 때문에 이름에 "Gecko"가 안 남아요. 스캔 전에는 전체 문자열로 홈을 한 번 열고, 스캔은 앞 60자만 써요. 크롬 128은 2024년 것이라 프로그램 안의 오래된 상수로 봐요. 홈 요청 0.65초 뒤 목록 전체를 항상 같은 순서로, 중앙값 206개 요청을 0.86초에 보내요. Referer는 없고, TLS 암호 목록은 리눅스에서 .NET 기본값과 바이트 단위로 같아서 .NET 프로그램으로 봐요. 홈 요청과 스캔이 하나의 TLS 세션을 공유해요.

주소 54개는 벨기에 europe-west1의 Google Cloud에 있고, TC DATACENTER와 DMZHOST의 소형 호스팅도 썼어요. DMZHOST 기계는 Windows Server 2022에 원격 데스크톱만 열려 있고, 호스트명은 D06S15, D10S18이며, 해외 호스터의 월 5–45유로 Windows KVM VPS로, 접속 당시 16일과 37일 동안 살아 있었어요. Google Cloud 쪽은 지금은 재고 Ubuntu 26.04 LTS이고, 11월 초에는 공개키만 받는 최소 OpenSSH 10.0을 썼으며, 수집한 SSH 호스트 키 24개는 모두 달랐어요. 10월에는 주소를 몇 주 쓰다가, 11월 10일 이후는 거의 하루만 써요. 여러 사이트를 한 주소가 훑을 때는 둘째 사이트가 약 5분 뒤, 셋째가 그로부터 약 17분 뒤에 오는 고정 순서를 봤다고 해요.

Gecko는 9월 30일 07:33 UTC에 사이트 넷을 37초 만에 훑으며 이미 Claude Code 설정 파일을 요청했어요. 이후 경로가 늘었어요. 9월 30일 Claude Code 설정과 제공자 키, 10월 22–23일 MCP 서버 설정, 11월 12–13일 코딩 에이전트 로그인 파일(`/.claude/.credentials.json`, `/.codex/auth.json`, `/.gemini/settings.json` 등), 11월 17일 LLM CLI 키와 게이트웨이. 스윕당 경로는 10월 16일 104개 중 AI 도구 4개에서, 11월 18일 244개 중 26개로 늘었고, AI 도구 파일 비중은 10월 약 4%에서 11월 16일 주 10%가 됐어요. 11월 12일 12:19 UTC에 약 100개 경로를 새 목록으로 바꿨다가 다음 날 아침 옛 목록으로 돌아가며, 토큰 파일 셋을 포함한 새 경로 13개를 남기고 Windsurf 경로도 실제 위치로 고쳤다고 해요. 비슷한 대상을 노리는 다른 스캐너는 10월 30일부터 있었고 SANS와 HoneyLabs도 보고했지만, 이 UA와 이 목록의 공개 보고는 찾지 못했다고 해요.

Tortoise는 11월 13일과 17일 두 번, 사이트 둘에서 봤어요. 첫 요청은 `/nonexistent-debug-trigger-7x7`, 없는 페이지 시험은 `/pscan-<8 hex>-nonexistent.txt`, UA는 Windows Chrome/126, 1–7초에 요청 하나, HTTP/1.1, 리디렉션은 따르지 않아요. 네트워크는 TC DATACENTER의 45.138.12.180과 45.138.12.35예요. 표준 Go TLS의 Go 프로그램으로 보고, Spring·PHP·Rails 디버그 페이지와 홈, 홈에서 찾은 스크립트를 요청해요. 대역은 Gecko가 10월 초에 쓴 같은 /24지만 그 외에 둘을 잇는 증거는 없고, 그 네트워크는 세입자가 많은 저가 VPS라고 해요.

### 두 운영자, 그리고 방어

Octopus와 Gecko는 같은 주에 시작해 `/.env`, `/.git/config` 등 공통 경로 약 150개를 공유하지만, 언어(추정 Go vs .NET), TLS, UA, 리디렉션, 호스팅, 기계 수명, 경로 선정, 속도가 모두 달라요. 같은 주소나 /24를 쓴 적이 없고, 같은 시각에 스캔한 빈도도 우연 이상이지 않으며, SSH 호스트 키·OS 이미지·SSH 빌드·로그인 정책·노출 서비스도 공유하지 않아 운영자가 둘로 보인다고 해요. 둘 다 스캔 전에 홈을 읽고, 페이지에서만 알 수 있는 자바스크립트 소스맵의 실제 해시 이름도 요청했지만, 진짜 AI 크롤러도 같은 소스맵을 요청하므로 그것만으로는 구별이 안 된다고 해요.

코딩 에이전트는 로그인과 MCP 키를 홈과 프로젝트 파일에 두고, 빌드가 프로젝트 전체를 결과물에 복사하거나, 컨테이너가 잘못된 폴더를 서비스하거나, `.claude/settings.local.json`을 커밋하면 웹사이트에 닿아요. Gecko 목록은 도구를 따라 새 에이전트 설정 파일이 등장할 때마다 늘어난다고 해요. 공격도 빨라져, 이번 주 연구자가 AI 코딩 에이전트로 자바 원격 코드 실행 버그를 약 한 시간에 찾고 약 두 시간 뒤에 익스플로잇을 냈다는 소식, 공개 후 수시간 안에 익스플로잇된 OpenSSH 결함, 권고 후 1–3주에 새 익스플로잇 경로를 넣는 Octopus를 들어, 공개 버그와 사이트 요청 사이가 짧아지고 있다고 해요. 다만 이번 주 뉴스가 이 스캐너를 만들었다고 보지는 않아요. Gecko가 최신 AI 경로를 넣은 것은 주된 패키지 침해보다 17시간 전이고, 둘 다 `AGENTS.md`나 `.mcp.json`을 요청한 적은 없으며, 둘 다 가장 바빴던 날은 11월 17일이라고만 적어요.

많은 사이트 운영자가 UA로 허용 여부를 정하는데, Octopus는 그걸 이용해요. 이름 32개 중 29개가 많이 복사되는 ai.robots.txt 목록에 있고, Hunyuan과 MoonshotBot을 넣은 풀 리퀘스트 자체도 Google Cloud의 취약점 탐색처럼 보인다고 적었지만 이름은 목록에 들어갔어요. 오픈AI, 구글, 마이크로소프트 등이 공개한 크롤러 주소, Cloudflare의 검증된 봇 표시와 주소를 대조하고, 회사가 올리지 않은 주소에서 온 실제 크롤러 이름 요청은 그 크롤러가 아니라고 봐요.

방어로는 스캐너를 막는 것보다 파일이 없게 하는 편이 훨씬 낫다고 해요. `/.env`, `/.git/config`, 에이전트 설정 파일 등이 200을 반환하면 열어 보고, 홈 복사본은 무해하지만 실제 파일은 아니라고 해요. `public/`·`dist/` 빌드 산출물의 숨김 파일을 배포 전에 확인하고, 에이전트 파일은 Git에 넣지 말고 MCP 키는 `mcp.json`이 아닌 환경 변수에 두며, Vite 개발 서버와 LiteLLM·Flowise·Langflow 관리 API는 공인 주소에 두지 말라고 해요. 소스맵에 키가 없어야 하고, 한 번이라도 공개된 키는 스캐너가 수초 안에 쓰므로 교체하라고 해요. Cloudflare와 nginx로 점 파일(`.well-known` 제외)과 Gecko의 잘린 UA, `debug-trigger` 카나리아를 막는 규칙 예시도 적어요. 이 스캐너를 막으려고 AI 크롤러 이름을 차단하면 진짜 크롤러도 막고, 스캐너는 다른 이름을 고를 것이라고 해요.
