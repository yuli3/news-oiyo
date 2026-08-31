// Editorial summaries stay separate from the generated feed so sync preserves them.
type NewsTranslation = {
  title: string;
  reviewedAt: string;
  intro: string;
  sections: { heading: string; bullets: string[] }[];
  sources: { label: string; url: string }[];
};

export const newsTranslations: Record<string, NewsTranslation> = {
  "https://github.com/SenteLabsAI/OpenExecutive": {
    title: "Open Executive — 8개 AI 에이전트가 함께 답하는 오픈소스 경영진",
    reviewedAt: "2026-08-30",
    intro: "SenteLabs의 Open Executive는 회사 자료를 참고해 경영 의사결정을 돕는 오픈소스 프로젝트다. 전략부터 재무·인사까지 여러 전문 에이전트의 분석을 하나의 답변으로 합치고, 이전 결정과 후속 업무를 기억한다.",
    sections: [
      {
        heading: "AI CEO를 만들게 된 배경",
        bullets: [
          "Hacker News에서 자신을 제작팀이라고 밝힌 작성자는 AI 도입 과정에서 팀이 해고된 뒤 스타트업을 시작했다고 설명했다. 해고 경위는 작성자 진술이며 별도로 확인된 사실은 아니다.",
          "제작팀은 개발 도구가 개발자의 일을 바꾸듯 경영 업무도 바꿀 수 있다고 보고 프로젝트를 공개했다. 유용성을 인정받으면 구축·지원 서비스를 제공하는 사업을 기대한다고 밝혔다.",
        ],
      },
      {
        heading: "전문가 8개, 대화 창구는 하나",
        bullets: [
          "전략, 재무, 인사, 법무, 운영, 마케팅, 제품, 이사회 커뮤니케이션을 담당하는 8개 에이전트로 구성된다.",
          "Executive Orchestrator가 질문을 받아 필요한 전문가를 병렬로 호출한 뒤 결과를 종합한다. 사용자가 각 에이전트에 따로 지시하는 대신 일관된 경영진 답변을 받는 구조다.",
          "공식 README의 기본 오케스트레이터 모델은 `claude-sonnet-4-6`이다. Executive Orchestrator는 그 모델이 맡는 배분·종합 역할의 이름이지 모델 이름이 아니다.",
        ],
      },
      {
        heading: "회사 문서와 지난 결정을 함께 참고",
        bullets: [
          "온보딩에서 업종·사업 모델·팀 규모·전략 우선순위 등을 입력하고 피치덱, 재무 모델, 전략 문서를 올릴 수 있다. 전문 에이전트는 내장 경영 지식과 회사 문서를 ChromaDB에서 검색해 답변에 반영한다.",
          "응답 뒤에는 주요 결정·추진 과제·조언을 추출해 SQLite에 저장하고 다음 대화에서 불러온다. 스케줄러는 후속 조치와 시한이 있는 업무를 다시 알려준다.",
        ],
      },
      {
        heading: "모델과 이용 환경",
        bullets: [
          "Claude API 외에 OpenRouter와 OpenAI 호환 로컬 서버를 지원한다. 전문가별 모델을 고를 수 있어 클라우드와 로컬 모델을 섞는 구성도 가능하다.",
          "웹·CLI뿐 아니라 Slack, 이메일, Telegram, Google Chat, Discord 연동을 제공한다. Python·FastAPI와 Next.js를 사용하며 Apache-2.0 라이선스로 공개됐다.",
        ],
      },
      {
        heading: "도입 전에 확인할 한계",
        bullets: [
          "공식 문서는 스케줄러의 중복 실행 위험 때문에 API를 단일 인스턴스로 운영하도록 경고한다. 여러 인스턴스로 확장하려면 스케줄러 제어를 먼저 보완해야 한다.",
          "회사 자료를 로컬에 저장하더라도 외부 모델을 쓰면 관련 내용이 프롬프트에 포함돼 전송될 수 있다. 로컬 모델에서는 Anthropic 전용 검색·캐시·확장 추론 기능을 그대로 쓸 수 없고, 도구 호출 능력이 낮으면 전문가 배분 품질도 떨어질 수 있다.",
          "프로젝트는 29개 시나리오와 모델 기반 평가를 소개하지만, 이를 실제 CEO 대체 능력의 입증으로 볼 수는 없다. OIYO는 현재 공개 설명을 경영 조언·업무 추적 도구로 해석하며, 직접 설치하거나 성능을 검증하지 않았다.",
        ],
      },
    ],
    sources: [
      { label: "공식 저장소·README", url: "https://github.com/SenteLabsAI/OpenExecutive" },
      { label: "Hacker News 논의·제작팀 설명", url: "https://news.ycombinator.com/item?id=49458418" },
      { label: "발견 경로: GeekNews", url: "https://news.hada.io/topic?id=32939" },
    ],
  },
};
