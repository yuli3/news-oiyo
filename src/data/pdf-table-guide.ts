import type {Guide} from "./ai-use-cases";
import type {Locale} from "./ai-i18n";
export const pdfGuides:Record<Locale,Guide> = {
  "ko": {
    "slug": "pdf-table-verification",
    "category": "문서 검산",
    "title": "AI가 읽은 PDF 표, 숫자를 믿기 전에 확인할 4가지",
    "description": "단위·괄호 음수·빈칸·이월을 원문과 대조하는 검산 안내예요.",
    "checked": "2026-10-28",
    "intro": "표를 JSON으로 바꿨다고 검산이 끝난 것은 아니에요. 먼저 단위, 부호, 빠진 값, 합계에 포함되는 행을 확인하세요. 아래는 사람이 만든 합성 예시이며 특정 AI의 실제 평가 결과가 아니에요.",
    "tools": [
      {
        "name": "표 머리글 관계도 확인해요",
        "audience": "PDF 표를 업무에 사용하는 독자",
        "what": "복잡한 표는 머리글이 중간에 바뀔 수 있어요. W3C는 데이터 셀과 해당 머리글의 관계를 명시하는 방법을 설명해요. PDF를 옮길 때도 어느 열의 값인지 원문과 대조하세요.",
        "source": {
          "label": "W3C: Tables with multi-level headers",
          "url": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
        }
      }
    ],
    "workflow": [
      {
        "step": "단위를 먼저 고정해요",
        "detail": "단위가 천 원이면 표의 120은 120,000원이에요. 숫자뿐 아니라 단위와 변환식을 함께 남기세요."
      },
      {
        "step": "괄호 음수를 확인해요",
        "detail": "회계 표의 (20)은 이 예시에서 −20이에요. 괄호를 지우고 +20으로 읽으면 합계가 달라져요."
      },
      {
        "step": "빈칸과 0을 구분해요",
        "detail": "—는 원문에 금액이 없다는 뜻으로 정했어요. 실제 0과 달라요. 빠진 값을 0으로 채워 완전한 합계라고 말하지 마세요."
      },
      {
        "step": "이월 행을 두 번 더하지 않아요",
        "detail": "앞쪽의 거래 100+50을 이월 150으로 반복했어요. 다음 쪽 거래 30을 더한 전체 합계는 180이에요. 이월 150을 다시 더하면 330이 돼요."
      }
    ],
    "combos": [
      {
        "pair": "120 × 1000",
        "why": "단위가 천 원이면 표의 120은 120,000원이에요. 숫자뿐 아니라 단위와 변환식을 함께 남기세요."
      },
      {
        "pair": "100 + 50 + 30 = 180",
        "why": "앞쪽의 거래 100+50을 이월 150으로 반복했어요. 다음 쪽 거래 30을 더한 전체 합계는 180이에요. 이월 150을 다시 더하면 330이 돼요."
      }
    ],
    "cautions": [
      "주의: 부분 합계는 전체 합계가 아니에요. 합계가 맞아도 누락·상쇄 오류가 있을 수 있으니 행별로 대조하세요.",
      "실제 개인정보나 비공개 문서를 외부 AI에 올리기 전 조직의 업로드·보관 규칙을 확인하세요. 제품별 성능·가격 비교는 이 글에서 측정하지 않았어요."
    ],
    "keywords": [
      "PDF",
      "AI",
      "JSON"
    ]
  },
  "en": {
    "slug": "pdf-table-verification",
    "category": "Document verification",
    "title": "Check an AI-extracted PDF table before trusting its numbers",
    "description": "Verify units, negative values, missing cells and carried-forward totals against the source.",
    "checked": "2026-10-28",
    "intro": "JSON output is not a verified table. Check the unit, sign, missing values and rows included in a total first. These are hand-authored synthetic examples, not measured outputs from any AI product.",
    "tools": [
      {
        "name": "Preserve header relationships",
        "audience": "Readers using PDF tables at work",
        "what": "Headers can repeat or change within a complex table. W3C explains explicit associations between data cells and their headers. When extracting a PDF, check which header each value belongs to.",
        "source": {
          "label": "W3C: Tables with multi-level headers",
          "url": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
        }
      }
    ],
    "workflow": [
      {
        "step": "Fix the unit first",
        "detail": "With a unit of KRW thousands, 120 means KRW 120,000. Preserve the unit and conversion, not only the number."
      },
      {
        "step": "Read parentheses as specified",
        "detail": "In this accounting example, (20) means −20. Removing the parentheses and treating it as +20 changes the total."
      },
      {
        "step": "Separate missing values from zero",
        "detail": "Here, — means no amount is supplied. It is different from an actual zero. Do not fill missing values with zero and call a partial sum complete."
      },
      {
        "step": "Do not count carry-forward twice",
        "detail": "Transactions of 100 and 50 are repeated as a carry-forward of 150. Add the next transaction of 30 for 180 overall. Adding the carry-forward again gives the wrong total of 330."
      }
    ],
    "combos": [
      {
        "pair": "120 × 1000",
        "why": "With a unit of KRW thousands, 120 means KRW 120,000. Preserve the unit and conversion, not only the number."
      },
      {
        "pair": "100 + 50 + 30 = 180",
        "why": "Transactions of 100 and 50 are repeated as a carry-forward of 150. Add the next transaction of 30 for 180 overall. Adding the carry-forward again gives the wrong total of 330."
      }
    ],
    "cautions": [
      "A matching total does not prove completeness: missing rows and offsetting errors can cancel out. Check each row.",
      "Check your organization’s upload and retention rules before sending personal or confidential documents to an external AI. Product performance and prices were not measured here."
    ],
    "keywords": [
      "PDF",
      "AI",
      "JSON"
    ]
  },
  "ja": {
    "slug": "pdf-table-verification",
    "category": "文書の検算",
    "title": "AIが読み取ったPDF表を検算する4つのポイント",
    "description": "単位・括弧付きの負数・欠損値・繰越を原本と照合します。",
    "checked": "2026-10-28",
    "intro": "JSONに変換できても検算が済んだわけではありません。単位、符号、欠損値、合計対象の行を確認しましょう。以下は人が作成した架空の例で、特定のAI製品の実測結果ではありません。",
    "tools": [
      {
        "name": "見出しとセルの関係を確認する",
        "audience": "PDF表を業務に使う方",
        "what": "複雑な表では途中で見出しが変わることがあります。W3Cはデータセルと見出しの関係を明示する方法を説明しています。PDFの転記でも各値が属する列を原本と照合しましょう。",
        "source": {
          "label": "W3C: Tables with multi-level headers",
          "url": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
        }
      }
    ],
    "workflow": [
      {
        "step": "最初に単位を確認する",
        "detail": "単位が千ウォンなら120は120,000ウォンです。数値だけでなく単位と換算式も残します。"
      },
      {
        "step": "括弧の意味を確認する",
        "detail": "この会計表では(20)は−20です。括弧を削って+20として読むと合計が変わります。"
      },
      {
        "step": "欠損値とゼロを分ける",
        "detail": "この例の—は金額の記載がないことを表します。実際の0とは異なります。欠損を0で埋め、部分合計を全体の合計として示さないでください。"
      },
      {
        "step": "繰越を二重に加算しない",
        "detail": "前ページの取引100+50を繰越150として再掲しています。次の取引30を足した全体合計は180です。繰越を再度足すと誤って330になります。"
      }
    ],
    "combos": [
      {
        "pair": "120 × 1000",
        "why": "単位が千ウォンなら120は120,000ウォンです。数値だけでなく単位と換算式も残します。"
      },
      {
        "pair": "100 + 50 + 30 = 180",
        "why": "前ページの取引100+50を繰越150として再掲しています。次の取引30を足した全体合計は180です。繰越を再度足すと誤って330になります。"
      }
    ],
    "cautions": [
      "合計が一致しても、行の欠落や相殺する誤りが残る場合があります。行ごとに照合してください。",
      "個人情報や非公開文書を外部AIに送る前に、組織のアップロード・保存規則を確認してください。製品の性能や価格は測定していません。"
    ],
    "keywords": [
      "PDF",
      "AI",
      "JSON"
    ]
  },
  "zh": {
    "slug": "pdf-table-verification",
    "category": "文档核对",
    "title": "相信AI提取的PDF表格前，先核对这4点",
    "description": "对照原文检查单位、括号负数、缺失值和结转。",
    "checked": "2026-10-28",
    "intro": "转换成JSON不代表已经核算。先检查单位、正负号、缺失值以及哪些行计入合计。以下为人工编写的虚构示例，并非任何AI产品的实测输出。",
    "tools": [
      {
        "name": "保留表头与单元格的关系",
        "audience": "工作中使用PDF表格的读者",
        "what": "复杂表格的表头可能在中途变化。W3C说明如何明确关联数据单元格与表头。提取PDF时，也应对照原文检查每个值所属的列。",
        "source": {
          "label": "W3C: Tables with multi-level headers",
          "url": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
        }
      }
    ],
    "workflow": [
      {
        "step": "先确定单位",
        "detail": "若单位为千韩元，120代表120,000韩元。请同时保留单位和换算公式。"
      },
      {
        "step": "核对括号含义",
        "detail": "此会计示例中的(20)代表−20。删除括号后读成+20会改变合计。"
      },
      {
        "step": "区分缺失和零",
        "detail": "本例用—表示未提供金额，与实际的0不同。不要把缺失值填成0后，将部分合计称为完整合计。"
      },
      {
        "step": "不要重复计入结转",
        "detail": "前页交易100+50以结转150重复列出。再加下一笔交易30，总额为180。重复加上结转会错误地得到330。"
      }
    ],
    "combos": [
      {
        "pair": "120 × 1000",
        "why": "若单位为千韩元，120代表120,000韩元。请同时保留单位和换算公式。"
      },
      {
        "pair": "100 + 50 + 30 = 180",
        "why": "前页交易100+50以结转150重复列出。再加下一笔交易30，总额为180。重复加上结转会错误地得到330。"
      }
    ],
    "cautions": [
      "合计相符也不代表没有遗漏：缺失行和相互抵消的错误可能被掩盖。请逐行核对。",
      "向外部AI上传个人信息或非公开文件前，请确认组织的上传和保留规则。本文未测量产品性能或价格。"
    ],
    "keywords": [
      "PDF",
      "AI",
      "JSON"
    ]
  },
  "fr": {
    "slug": "pdf-table-verification",
    "category": "Vérification documentaire",
    "title": "Vérifier un tableau PDF extrait par une IA : quatre contrôles",
    "description": "Comparez unités, nombres négatifs, valeurs manquantes et reports avec le document source.",
    "checked": "2026-10-28",
    "intro": "Un tableau converti en JSON n’est pas encore vérifié. Contrôlez l’unité, le signe, les valeurs manquantes et les lignes incluses dans le total. Ces exemples fictifs sont rédigés à la main ; ils ne sont pas des résultats mesurés d’un produit d’IA.",
    "tools": [
      {
        "name": "Préserver les relations avec les en-têtes",
        "audience": "Personnes utilisant des tableaux PDF au travail",
        "what": "Les en-têtes peuvent changer dans un tableau complexe. Le W3C explique comment associer explicitement les cellules aux en-têtes. Lors de l’extraction d’un PDF, vérifiez dans l’original à quelle colonne appartient chaque valeur.",
        "source": {
          "label": "W3C: Tables with multi-level headers",
          "url": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
        }
      }
    ],
    "workflow": [
      {
        "step": "Fixer d’abord l’unité",
        "detail": "Avec une unité en milliers de wons, 120 signifie 120 000 KRW. Conservez l’unité et la conversion avec le nombre."
      },
      {
        "step": "Vérifier les parenthèses",
        "detail": "Dans cet exemple comptable, (20) signifie −20. Supprimer les parenthèses et lire +20 change le total."
      },
      {
        "step": "Distinguer absence et zéro",
        "detail": "Ici, — indique un montant non fourni, différent d’un zéro réel. Ne remplacez pas les valeurs absentes par zéro pour présenter une somme partielle comme complète."
      },
      {
        "step": "Ne pas additionner deux fois un report",
        "detail": "Les opérations 100+50 sont reprises dans un report de 150. Avec l’opération suivante de 30, le total est 180. Ajouter encore le report donnerait à tort 330."
      }
    ],
    "combos": [
      {
        "pair": "120 × 1000",
        "why": "Avec une unité en milliers de wons, 120 signifie 120 000 KRW. Conservez l’unité et la conversion avec le nombre."
      },
      {
        "pair": "100 + 50 + 30 = 180",
        "why": "Les opérations 100+50 sont reprises dans un report de 150. Avec l’opération suivante de 30, le total est 180. Ajouter encore le report donnerait à tort 330."
      }
    ],
    "cautions": [
      "Un total concordant ne prouve pas l’exhaustivité : des lignes manquantes et des erreurs qui se compensent peuvent subsister. Vérifiez chaque ligne.",
      "Avant tout envoi de documents personnels ou confidentiels à une IA externe, vérifiez les règles de votre organisation. Aucun prix ni aucune performance de produit ne sont mesurés ici."
    ],
    "keywords": [
      "PDF",
      "AI",
      "JSON"
    ]
  },
  "es": {
    "slug": "pdf-table-verification",
    "category": "Verificación documental",
    "title": "Cuatro comprobaciones para una tabla PDF extraída por IA",
    "description": "Contrasta unidades, negativos, datos ausentes y saldos trasladados con el original.",
    "checked": "2026-10-28",
    "intro": "Convertir una tabla a JSON no equivale a verificarla. Revisa la unidad, el signo, los valores ausentes y las filas incluidas en el total. Estos ejemplos ficticios se han redactado a mano; no son resultados medidos de ningún producto de IA.",
    "tools": [
      {
        "name": "Conserva la relación con los encabezados",
        "audience": "Quienes usan tablas PDF en su trabajo",
        "what": "Los encabezados pueden cambiar dentro de una tabla compleja. El W3C explica cómo asociar las celdas con sus encabezados. Al extraer un PDF, contrasta en el original a qué columna pertenece cada valor.",
        "source": {
          "label": "W3C: Tables with multi-level headers",
          "url": "https://www.w3.org/WAI/tutorials/tables/multi-level/"
        }
      }
    ],
    "workflow": [
      {
        "step": "Fija primero la unidad",
        "detail": "Si la unidad son miles de wones, 120 significa 120.000 KRW. Conserva la unidad y la conversión junto al número."
      },
      {
        "step": "Comprueba los paréntesis",
        "detail": "En este ejemplo contable, (20) significa −20. Quitar los paréntesis y leer +20 cambia el total."
      },
      {
        "step": "Distingue ausencia y cero",
        "detail": "Aquí, — significa que no se ha indicado un importe, y no equivale a un cero real. No rellenes los valores ausentes con cero para presentar una suma parcial como completa."
      },
      {
        "step": "No sumes dos veces el saldo trasladado",
        "detail": "Las operaciones 100+50 se repiten como saldo trasladado de 150. Al añadir la siguiente operación de 30, el total es 180. Sumar de nuevo el traslado daría el resultado erróneo de 330."
      }
    ],
    "combos": [
      {
        "pair": "120 × 1000",
        "why": "Si la unidad son miles de wones, 120 significa 120.000 KRW. Conserva la unidad y la conversión junto al número."
      },
      {
        "pair": "100 + 50 + 30 = 180",
        "why": "Las operaciones 100+50 se repiten como saldo trasladado de 150. Al añadir la siguiente operación de 30, el total es 180. Sumar de nuevo el traslado daría el resultado erróneo de 330."
      }
    ],
    "cautions": [
      "Que coincida el total no demuestra que esté completo: pueden faltar filas o compensarse errores. Contrasta cada fila.",
      "Antes de enviar documentos personales o confidenciales a una IA externa, revisa las normas de tu organización. Aquí no se han medido precios ni rendimiento de productos."
    ],
    "keywords": [
      "PDF",
      "AI",
      "JSON"
    ]
  }
};
export const pdfExamples = {
  "ko": {
    "choose": "예시 선택",
    "original": "원문 표기",
    "result": "검산 결과",
    "reason": "확인 근거",
    "tabs": [
      "단위",
      "음수",
      "결측",
      "이월"
    ],
    "details": [
      "단위가 천 원이면 표의 120은 120,000원이에요. 숫자뿐 아니라 단위와 변환식을 함께 남기세요.",
      "회계 표의 (20)은 이 예시에서 −20이에요. 괄호를 지우고 +20으로 읽으면 합계가 달라져요.",
      "—는 원문에 금액이 없다는 뜻으로 정했어요. 실제 0과 달라요. 빠진 값을 0으로 채워 완전한 합계라고 말하지 마세요.",
      "앞쪽의 거래 100+50을 이월 150으로 반복했어요. 다음 쪽 거래 30을 더한 전체 합계는 180이에요. 이월 150을 다시 더하면 330이 돼요."
    ],
    "steps": [
      "단위를 먼저 고정해요",
      "괄호 음수를 확인해요",
      "빈칸과 0을 구분해요",
      "이월 행을 두 번 더하지 않아요"
    ]
  },
  "en": {
    "choose": "Choose an example",
    "original": "Source notation",
    "result": "Checked result",
    "reason": "Reason",
    "tabs": [
      "Unit",
      "Negative",
      "Missing",
      "Carry-forward"
    ],
    "details": [
      "With a unit of KRW thousands, 120 means KRW 120,000. Preserve the unit and conversion, not only the number.",
      "In this accounting example, (20) means −20. Removing the parentheses and treating it as +20 changes the total.",
      "Here, — means no amount is supplied. It is different from an actual zero. Do not fill missing values with zero and call a partial sum complete.",
      "Transactions of 100 and 50 are repeated as a carry-forward of 150. Add the next transaction of 30 for 180 overall. Adding the carry-forward again gives the wrong total of 330."
    ],
    "steps": [
      "Fix the unit first",
      "Read parentheses as specified",
      "Separate missing values from zero",
      "Do not count carry-forward twice"
    ]
  },
  "ja": {
    "choose": "例を選ぶ",
    "original": "原本の表記",
    "result": "検算結果",
    "reason": "確認の根拠",
    "tabs": [
      "単位",
      "負数",
      "欠損",
      "繰越"
    ],
    "details": [
      "単位が千ウォンなら120は120,000ウォンです。数値だけでなく単位と換算式も残します。",
      "この会計表では(20)は−20です。括弧を削って+20として読むと合計が変わります。",
      "この例の—は金額の記載がないことを表します。実際の0とは異なります。欠損を0で埋め、部分合計を全体の合計として示さないでください。",
      "前ページの取引100+50を繰越150として再掲しています。次の取引30を足した全体合計は180です。繰越を再度足すと誤って330になります。"
    ],
    "steps": [
      "最初に単位を確認する",
      "括弧の意味を確認する",
      "欠損値とゼロを分ける",
      "繰越を二重に加算しない"
    ]
  },
  "zh": {
    "choose": "选择示例",
    "original": "原文写法",
    "result": "核算结果",
    "reason": "核对依据",
    "tabs": [
      "单位",
      "负数",
      "缺失",
      "结转"
    ],
    "details": [
      "若单位为千韩元，120代表120,000韩元。请同时保留单位和换算公式。",
      "此会计示例中的(20)代表−20。删除括号后读成+20会改变合计。",
      "本例用—表示未提供金额，与实际的0不同。不要把缺失值填成0后，将部分合计称为完整合计。",
      "前页交易100+50以结转150重复列出。再加下一笔交易30，总额为180。重复加上结转会错误地得到330。"
    ],
    "steps": [
      "先确定单位",
      "核对括号含义",
      "区分缺失和零",
      "不要重复计入结转"
    ]
  },
  "fr": {
    "choose": "Choisir un exemple",
    "original": "Notation source",
    "result": "Résultat vérifié",
    "reason": "Explication",
    "tabs": [
      "Unité",
      "Négatif",
      "Absence",
      "Report"
    ],
    "details": [
      "Avec une unité en milliers de wons, 120 signifie 120 000 KRW. Conservez l’unité et la conversion avec le nombre.",
      "Dans cet exemple comptable, (20) signifie −20. Supprimer les parenthèses et lire +20 change le total.",
      "Ici, — indique un montant non fourni, différent d’un zéro réel. Ne remplacez pas les valeurs absentes par zéro pour présenter une somme partielle comme complète.",
      "Les opérations 100+50 sont reprises dans un report de 150. Avec l’opération suivante de 30, le total est 180. Ajouter encore le report donnerait à tort 330."
    ],
    "steps": [
      "Fixer d’abord l’unité",
      "Vérifier les parenthèses",
      "Distinguer absence et zéro",
      "Ne pas additionner deux fois un report"
    ]
  },
  "es": {
    "choose": "Elige un ejemplo",
    "original": "Notación original",
    "result": "Resultado comprobado",
    "reason": "Explicación",
    "tabs": [
      "Unidad",
      "Negativo",
      "Ausencia",
      "Traslado"
    ],
    "details": [
      "Si la unidad son miles de wones, 120 significa 120.000 KRW. Conserva la unidad y la conversión junto al número.",
      "En este ejemplo contable, (20) significa −20. Quitar los paréntesis y leer +20 cambia el total.",
      "Aquí, — significa que no se ha indicado un importe, y no equivale a un cero real. No rellenes los valores ausentes con cero para presentar una suma parcial como completa.",
      "Las operaciones 100+50 se repiten como saldo trasladado de 150. Al añadir la siguiente operación de 30, el total es 180. Sumar de nuevo el traslado daría el resultado erróneo de 330."
    ],
    "steps": [
      "Fija primero la unidad",
      "Comprueba los paréntesis",
      "Distingue ausencia y cero",
      "No sumes dos veces el saldo trasladado"
    ]
  }
};
