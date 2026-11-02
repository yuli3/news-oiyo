---
id: trend-68e53bcb3a99b041
title: "NixOS/nixpkgs"
sourceUrl: https://github.com/NixOS/nixpkgs
summary: "Nixpkgs는 Nix 패키지 매니저로 설치할 수 있는 14만 개 넘는 소프트웨어 패키지 모음이고, 순수 함수형 리눅스 배포판 NixOS도 구현해요. Hydra CI가 빌드·테스트해 cache.nixos.org에 올리고 Nix 채널로 배포해요."
translationStatus: full
sourceShort: true
translatedBy: Grok Bot
translatedAt: 2026-10-26
---

GitHub README를 정리했어요.

### 한 줄 요약

**Nixpkgs**는 **Nix 패키지 매니저**로 설치할 수 있는 **14만 개가 넘는** 소프트웨어 패키지 모음이에요. **순수 함수형 리눅스 배포판 NixOS**도 여기서 구현돼요.

### 문서

| 매뉴얼 | 다루는 것 |
|---|---|
| NixOS Manual | 순수 함수형 배포판 설치·설정·유지 |
| Nixpkgs Manual | Nixpkgs 기여, 언어별 Nix 표현식 |
| Nix Package Manager Manual | Nix 표현식 작성, 명령줄 도구 |

### 관련 프로젝트(NixOS 조직)

- **Nix**: 순수 함수형 패키지 매니저
- **NixOps**: NixOS 머신 원격 배포
- **nixos-hardware**: 하드웨어별 최적화 프로필
- **Nix RFCs**: 큰 변경을 위한 공식 절차
- **hydra**: CI 시스템

### 빌드와 배포 흐름

1. **Hydra**가 unstable/master와 **NixOS 26.05** 릴리스 패키지를 계속 빌드하고 테스트해요.
2. 성공한 결과물은 `https://cache.nixos.org/`에 올라가요.
3. 빌드·테스트 기준을 통과하면 **Nix 채널**로 배포돼요.

### 커뮤니티

- GitHub에서 가장 활발한 프로젝트 중 하나예요. 열린 이슈와 PR이 수천 개지만, 수만 개 소프트웨어 빌드 방법과 배포판 전체를 다루는 규모를 생각하면 자연스럽대요.
- 이슈와 PR로 기여를 환영해요.
- 인프라는 비영리 **NixOS Foundation**이 운영하고, SEPA 송금이나 Open Collective로 후원받아요.

### 라이선스

저장소 파일은 **MIT 라이선스**예요. 단, Nixpkgs가 빌드하는 **패키지들에는 MIT가 적용되지 않고** 각자의 라이선스를 따라요.
