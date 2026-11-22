#!/usr/bin/env python3
"""경제 속보 쇼츠 배경음 (2026-11-23). 전부 코드로 합성한 원곡이라 저작권·Content ID 걱정이 없다.

차분한 뉴스 데스크 톤: 92BPM, Am-F-C-G 전자피아노 화음 + 서브 베이스 + 가벼운 킥·하이햇,
장면이 바뀔 때마다 '띵' 알림음. 날짜로 시드를 바꿔 매일 조금씩 다른 멜로디가 나온다.

  python3 music.py <출력.wav> <길이초> <알림 시각,...> [시드]
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = 92
BEAT = 60 / BPM


def hz(n):
    return 440 * 2 ** ((n - 69) / 12)


def tone(f, dur, amp, decay, harmonics=((1, 1),), attack=0.006):
    t = np.arange(int(SR * dur)) / SR
    w = sum(a * np.sin(2 * np.pi * f * k * t) for k, a in harmonics)
    env = np.exp(-t * decay) * np.minimum(1, t / attack)
    return w * env * amp


def add(track, sig, at):
    i = int(at * SR)
    j = min(len(track), i + len(sig))
    if 0 <= i < len(track):
        track[i:j] += sig[: j - i]


EP = ((1, 1), (2, 0.35), (3, 0.12), (4, 0.05))  # 전자피아노 비슷한 배음


def kick(track, at):
    t = np.arange(int(SR * 0.25)) / SR
    f = 110 * np.exp(-t * 18) + 42
    add(track, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) * 0.32, at)


def hat(track, at, rng, amp=0.035):
    n = int(SR * 0.05)
    noise = np.diff(rng.uniform(-1, 1, n + 1))  # 고역만 남기는 1차 차분
    add(track, noise * np.exp(-np.arange(n) / SR * 90) * amp, at)


def ding(track, at):
    for k, n in enumerate([88, 95]):
        add(track, tone(hz(n), 1.4, 0.11, 3.2, ((1, 1), (2.76, 0.28), (5.4, 0.08))), at + k * 0.07)


def music(total, seed):
    rng = np.random.default_rng(seed)
    track = np.zeros(int(SR * (total + 2)))
    chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Am F C G
    bass = [33, 29, 36, 31]
    scale = [69, 71, 72, 74, 76, 79, 81]  # A 마이너 펜타 비슷하게
    bar = 4 * BEAT
    b = 0
    phrase = [int(x) for x in rng.integers(0, len(scale), 8)]
    while b * bar < total:
        s = b * bar
        ch = chords[b % 4]
        for beat in range(4):  # 화음은 박마다 짧게
            for n in ch:
                add(track, tone(hz(n), BEAT * 1.1, 0.045, 3.0, EP), s + beat * BEAT)
        add(track, tone(hz(bass[b % 4]), bar, 0.16, 0.9, ((1, 1), (2, 0.25))), s)
        add(track, tone(hz(bass[b % 4]), BEAT, 0.1, 2.5, ((1, 1), (2, 0.25))), s + 2.5 * BEAT)
        for beat in (0, 2):
            kick(track, s + beat * BEAT)
        for step in range(8):
            hat(track, s + step * BEAT / 2, rng, 0.03 if step % 2 else 0.018)
        if b >= 2:  # 두 마디 반주 뒤 멜로디
            for k in range(2):
                n = scale[phrase[(b * 2 + k) % 8]]
                if n not in [c + 12 for c in ch] and rng.random() < 0.3:
                    continue
                add(track, tone(hz(n), BEAT * 1.6, 0.05, 2.2, ((1, 1), (2, 0.2))), s + (k * 2 + 0.5) * BEAT)
        b += 1
    return track


def main():
    out, total = sys.argv[1], float(sys.argv[2])
    dings = [float(x) for x in sys.argv[3].split(",") if x] if len(sys.argv) > 3 else []
    seed = int(sys.argv[4]) if len(sys.argv) > 4 else 7
    track = music(total, seed)
    for d in dings:
        ding(track, d)
    track = track[: int(SR * total)]
    fade_in, fade_out = int(SR * 0.4), int(SR * 1.8)
    track[:fade_in] *= np.linspace(0, 1, fade_in)
    track[-fade_out:] *= np.linspace(1, 0, fade_out)
    track = np.tanh(track * 1.3)
    track = track / max(1e-9, np.max(np.abs(track))) * 0.6
    pcm = (track * 32767).astype(np.int16)
    with wave.open(out, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    main()
