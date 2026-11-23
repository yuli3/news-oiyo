---
id: trend-ac1585aba2acfb73
title: "Don't keep your SSH keys on disk"
sourceUrl: https://jola.dev/posts/you-cant-afford-ssh-keys-disk
summary: "SSH 개인키를 디스크에 두면 악성 코드가 빼갈 수 있다며, Bitwarden SSH agent로 키를 디스크에서 치우는 방법과 SSH 키로 Git 커밋에 서명하는 설정을 소개한 글이에요."
translationStatus: full
translatedBy: Claude
translatedAt: 2026-11-24
---

### 키를 디스크에서 치워야 하는 이유
- 저자는 비밀번호 관리자에 키 사본을 보관하면서도 ssh-add로 디스크의 키를 메모리에 올려 쓰고 있었어요.
- 디스크의 개인키는 디스크를 훑는 악성 코드에 유출될 수 있어 위험하다고 봤어요.
- macOS Secure Enclave도 생각했지만, 사용 편의성 때문에 이미 쓰던 Bitwarden을 골랐어요.

### Bitwarden에 키 옮기기
- 새 SSH 키를 만들거나, 기존 개인키를 편집 화면의 업로드 아이콘으로 가져와요.
- 키를 클립보드에 복사하는 예로 `cat ~/.ssh/id_rsa | pbcopy`를 들었어요.
- 알아보기 쉬운 이름을 붙이고 저장해요.

### SSH agent 설정
- Bitwarden 설정의 App settings(all accounts)에서 Enable SSH agent를 켜요. App Store 설치본은 경로가 다를 수 있어요.
- 키 사용 승인 주기를 고를 수 있어요. 저자는 볼트가 잠길 때 묻도록 했고, 볼트 잠금 간격은 4시간으로 뒀어요.
- `~/.ssh/config`의 `Host *` 아래에 `IdentityAgent ~/.bitwarden-ssh-agent.sock`을 넣어요.
- 셸 설정 파일(.zshrc 등)에서 `SSH_AUTH_SOCK`을 같은 소켓으로 지정해 ssh-keygen 같은 도구도 이 agent를 쓰게 해요.
- `ssh-add -L`로 키가 보이고 모두 옮겼다고 확신하면 디스크의 키를 지워요.

### Git 커밋 서명
- 커밋의 작성자 정보만으로는 누가 썼는지 증명할 수 없어서, 전용 SSH 키로 서명하는 방법을 소개해요.
- gpg.format을 ssh로, user.signingkey에 전용 키를, commit.gpgsign과 tag.gpgsign을 true로 설정해요.
- `git cat-file -p HEAD`로 서명이 들어갔는지 확인해요.
- GitHub는 SSH 키 설정에 서명 키로 따로 추가해야 해요. Tangled는 등록된 SSH 키를 자동으로 신뢰하고, Gitea와 Forgejo는 추가 절차가 필요해요.

### 2주 사용 후기
- 대부분 문제없이 동작했어요.
- 가끔 Bitwarden이 키 사용 승인을 물으면, 잠금이 풀려 있을 때는 승인 버튼을 누르고 잠겨 있으면 Touch ID로 풀면 돼요.
- 저자는 승인을 Touch ID나 Enter로 하고, 볼트 잠금 간격과 키 승인 간격을 따로 정할 수 있으면 좋겠다고 적었어요.
