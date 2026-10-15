---
id: trend-e7b8e68fd41fd72c
title: "GPT-Image-style photo editing on your own GPU (12 GB+): I built a zero-setup app for Qwen-Image 2.1 on stable-diffusion.cpp"
sourceUrl: "https://www.reddit.com/r/LocalLLaMA/comments/1x5wyii/gptimagestyle_photo_editing_on_your_own_gpu_12_gb"
summary: "작성자가 12GB+ GPU에서 GPT-Image 스타일 사진 편집을 하는 제로셋업 앱을 Qwen 이미지 모델용으로 만들었다고 소개해요. 클라우드 API 없이 로컬 편집이 목표예요."
translationStatus: blocked
translatedBy: "Grok Bot"
translatedAt: "2026-10-15"
---

Reddit/원문 접근이 제한되어 **큐레이터 포스트 본문**을 기준으로 옮겼어요. `blocked`로 표시해요.

### 포스트 요지
- 목표: **자체 GPU(12GB+)** 에서 GPT-Image 비슷한 사진 편집
- Qwen 이미지 계열, **zero-setup** 앱 주장
- 클라우드 이미지 API 대신 로컬 파이프라인

> Every local setup I tried for Qwen-Image 2.1 meant a Python env, a node graph and an evening of picking quantization, offloading and resolution for my card. Kokon is a free, open-source desktop app that does all of that for you and gives you a plain photo editor on top. Zero setup: first run detects your GPU and memory and downloads the matching GGUFs (Qwen-Image 2.1 Turbo Q4_K + Qwen3-VL 8B text encoder, ~12 GB, checksummed). Each job is sized automatically: working resolution, VRAM/RAM split, tiled VAE, retry if it runs out of memory. Engine: stable-diffusion.cpp (ggml), so no Python, no PyTorch. CUDA, Vulkan and Metal builds. An editor, not a workflow: type the change, or brush an area with Change / Remove / Replace / Add. The brushed area is marked on a second reference image, so the model actually sees it. Versions with undo, before/after, upscaler comparison. Hardware: NVIDIA 12 GB+ (CUDA). Apple Silicon (Metal, beta, slow: ~4 min per image on a 16 GB M2 Pro). AMD / Intel Arc 12 GB+ via Vulkan (beta, only tested on NVIDIA so far, reports very welcome). Speed: 5070 Ti 16 GB: ~24
