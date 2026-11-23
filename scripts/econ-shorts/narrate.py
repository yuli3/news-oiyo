#!/usr/bin/env python3
"""경제 속보 쇼츠 나레이션 (2026-11-24). Supertonic 3(ONNX, CPU)로 한국어 음성을 만든다.

입력 JSON 은 render-econ-short.mjs 가 만든 장면별 문장 목록이다:
  [{"text": "읽을 문장", "start": 0.35, "max": 2.6}, ...]
문장마다 지정한 시작 시각에 놓고, 장면보다 길면 말 속도를 올려(최대 1.45배) 장면 안에 맞춘다.
그래도 넘치면 장면 끝에서 짧게 줄여 끊는다. 결과는 영상 길이와 같은 44.1kHz 모노 wav.

  python3 narrate.py <문장.json> <출력.wav> <길이초> [목소리=F1]

가중치: Hugging Face Supertone/supertonic-3 (OpenRAIL-M). 사칭·허위정보 용도 금지 조항을 지킨다.
영상 설명과 끝 장면 음성에 "AI 음성"임을 밝힌다.
"""
import json
import sys
import wave

import numpy as np
from supertonic import TTS

BASE_SPEED = 1.05
MAX_SPEED = 1.45


def main():
    src, out, length = sys.argv[1], sys.argv[2], float(sys.argv[3])
    voice = sys.argv[4] if len(sys.argv) > 4 else "F1"
    segs = json.load(open(src, encoding="utf-8"))

    tts = TTS()
    style = tts.get_voice_style(voice)
    sr = tts.sample_rate
    track = np.zeros(int(sr * length) + sr, dtype=np.float32)
    report = []

    for seg in segs:
        text, start, room = seg["text"], float(seg["start"]), float(seg["max"])
        wav, dur = tts.synthesize(text, voice_style=style, lang="ko", speed=BASE_SPEED)
        dur = float(np.asarray(dur).reshape(-1)[0])
        speed = BASE_SPEED
        if dur > room:
            speed = min(MAX_SPEED, BASE_SPEED * dur / room * 1.02)
            wav, dur = tts.synthesize(text, voice_style=style, lang="ko", speed=speed)
            dur = float(np.asarray(dur).reshape(-1)[0])
        w = np.asarray(wav, dtype=np.float32).reshape(-1)
        keep = min(len(w), int(room * sr))
        if keep < len(w):  # 그래도 넘치면 0.12초 페이드아웃으로 끊는다
            fade = min(keep, int(0.12 * sr))
            w = w[:keep].copy()
            w[-fade:] *= np.linspace(1, 0, fade, dtype=np.float32)
        a = int(start * sr)
        b = min(len(track), a + len(w))
        track[a:b] += w[: b - a]
        report.append({"start": start, "room": room, "spoken": round(len(w) / sr, 2), "speed": round(speed, 2), "cut": keep < int(dur * sr) - 1})

    track = track[: int(sr * length)]
    peak = float(np.max(np.abs(track))) or 1.0
    track = track / peak * 0.89  # -1 dBFS
    pcm = (np.clip(track, -1, 1) * 32767).astype("<i2")
    with wave.open(out, "wb") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(sr)
        f.writeframes(pcm.tobytes())
    print(json.dumps({"voice": voice, "sampleRate": sr, "segments": report}, ensure_ascii=False))


if __name__ == "__main__":
    main()
