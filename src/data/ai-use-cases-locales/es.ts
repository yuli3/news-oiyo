// Spanish (Spain) AI use-case guides and keyword map, checked 2026-10-20, country: Spain
import type { Guide, KeywordCategory } from "../ai-use-cases";

export const keywordMap: KeywordCategory[] = [
  {
    category: "Trabajo profesional",
    cases: [
      { name: "Derecho y revisión de contratos", slug: "legal", keywords: ["IA para abogados", "revisar contrato con IA", "buscar jurisprudencia con IA", "Maite IA", "vLex Vincent"] },
      { name: "Laboral y RR. HH.", slug: "labor", keywords: ["IA derecho laboral", "calcular finiquito IA", "consulta laboral gratis IA", "convenio colectivo IA", "registro de jornada"] },
      { name: "Fiscal y contabilidad", slug: "tax-accounting", keywords: ["IA declaración de la renta", "ChatGPT renta", "IA contabilidad autónomos", "Verifactu", "asistente virtual IVA"] },
      { name: "Trámites con la Administración", keywords: ["IA trámites administración", "rellenar formulario sede electrónica", "certificado digital trámites", "cita previa IA"] },
      { name: "Alquiler y vivienda", keywords: ["contrato de alquiler IA", "fianza alquiler devolución", "revisar contrato alquiler", "nota simple registro"] },
      { name: "Extranjería y NIE", keywords: ["NIE trámite", "arraigo requisitos", "IA extranjería", "renovar TIE"] },
      { name: "Marcas y patentes", keywords: ["registrar marca OEPM", "buscar marca registrada", "IA patentes"] },
    ],
  },
  {
    category: "Documentos y presentaciones",
    cases: [
      { name: "Presentaciones (PowerPoint)", slug: "presentation", keywords: ["IA para hacer presentaciones", "crear PowerPoint con IA", "Gamma IA", "presentaciones Canva IA", "Genspark presentaciones"] },
      { name: "Informes y planes de negocio", keywords: ["plan de negocio con IA", "hacer informe con IA", "memoria subvención IA"] },
      { name: "Actas y transcripción de reuniones", keywords: ["transcribir audio IA", "resumen reunión IA", "acta de reunión IA"] },
      { name: "Excel y datos", keywords: ["fórmulas Excel IA", "IA para Excel", "analizar datos con IA"] },
      { name: "Traducción", keywords: ["traductor IA documentos", "traducir PDF IA", "DeepL vs ChatGPT"] },
      { name: "TFG e investigación", keywords: ["IA para TFG", "resumir artículos científicos IA", "buscar bibliografía IA"] },
    ],
  },
  {
    category: "Diseño e impresión",
    cases: [
      { name: "Carteles", slug: "poster", keywords: ["hacer cartel con IA", "cartel fiestas IA", "cartel evento IA", "póster IA gratis"] },
      { name: "Folletos, flyers y cartas", slug: "pamphlet", keywords: ["hacer folleto con IA", "flyer IA", "díptico tríptico IA", "carta restaurante IA"] },
      { name: "Logos y tarjetas de visita", keywords: ["crear logo con IA", "tarjetas de visita IA", "logo gratis IA"] },
      { name: "Miniaturas y carruseles", keywords: ["miniatura YouTube IA", "carrusel Instagram IA", "portada reels IA"] },
    ],
  },
  {
    category: "Marketing y publicidad",
    cases: [
      { name: "Imágenes para anuncios", slug: "ad-image", keywords: ["fotos de producto con IA", "banner con IA", "imágenes para anuncios IA", "Photoroom"] },
      { name: "Vídeos publicitarios", slug: "ad-video", keywords: ["vídeo publicitario IA", "Veo 3.1", "Kling IA", "Runway", "vídeo producto IA"] },
      { name: "Textos y eslóganes", keywords: ["copywriting IA", "eslogan con IA", "textos para anuncios IA"] },
      { name: "Redes sociales", keywords: ["IA para Instagram", "IA TikTok", "programar publicaciones IA"] },
      { name: "Blog y SEO", keywords: ["escribir blog con IA", "SEO con IA", "posicionamiento IA"] },
      { name: "Voz, doblaje y música", keywords: ["voz en off IA", "doblaje IA español", "música para anuncios IA"] },
    ],
  },
  {
    category: "Operaciones y desarrollo",
    cases: [
      { name: "Atención al cliente", keywords: ["chatbot WhatsApp IA", "atención al cliente IA", "chatbot web IA"] },
      { name: "Programación y webs", keywords: ["programar con IA", "crear web con IA", "vibe coding"] },
      { name: "Automatización y agentes", keywords: ["automatizar tareas IA", "agentes IA empresa", "MCP"] },
      { name: "Selección de personal", keywords: ["IA para RR. HH.", "filtrar currículums IA", "oferta de empleo IA"] },
      { name: "Formación y docencia", keywords: ["IA para profesores", "crear exámenes con IA", "material didáctico IA"] },
    ],
  },
];

const MAITE = { label: "Javadex · \"Mejor IA para abogados 2026\" (2026-07-20)", url: "https://www.javadex.es/blog/mejor-ia-abogados-2026" };
const VLEX_NEWS = { label: "vLex · Noticias (Skills Library, 2026-07-03)", url: "https://vlex.es/news" };
const GENIAL = { label: "El Derecho · Nuevas funciones de GenIA-L (2025-10-31)", url: "https://elderecho.com/lefebvre-incorpora-nuevas-funcionalidades-de-ia-en-genia-l-que-transforman-el-trabajo-juridico" };
const ALLEGRA = { label: "Legal Today · Lanzamiento de Allegra (2026-04-30)", url: "https://www.legaltoday.com/actualidad-juridica/noticias-de-derecho/aranzadi-la-ley-celebra-por-todo-lo-alto-el-lanzamiento-de-allegra-su-apuesta-por-la-ia-juridica-basada-en-10-millones-de-documentos-legales-2026-04-30/" };
const ALEX = { label: "Legálitas · Álex supera el millón de usuarios (2026-07-07)", url: "https://www.legalitas.com/actualidad/alex-asistente-legal-millon-usuarios" };
const AI_CONSULTAS = { label: "El Referente · Ai Consultas (2026-04-27)", url: "https://elreferente.es/startup/ai-consultas/" };
const XATAKA_RENTA = { label: "Xataka · Hacienda y ChatGPT en la Renta (2026-04-09)", url: "https://www.xataka.com/empresas-y-economia/hacienda-dice-que-no-uses-chatgpt-para-hacer-renta-problema-cuales-sus-alternativas" };
const AEAT_IVA = { label: "Agencia Tributaria · Manual práctico de IVA 2026, herramientas de asistencia virtual", url: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-iva-2026/capitulo-02-introduccion/herramientas-asistencia-virtual-iva.html" };
const HOLDED_IA = { label: "Holded · Contabilidad con IA (página oficial, 2026)", url: "https://www.holded.com/es/programa-contabilidad/contabilidad-ia" };
const HOLDED_CONEY = { label: "Emprendedores · Holded cumple diez años (2026-09-25)", url: "https://emprendedores.es/gestion/holded-decimo-aniversario/" };
const FACTORIAL = { label: "Factorial · Herramientas de IA para RR. HH. (actualizado 2026-09-11)", url: "https://factorial.es/blog/?p=166924" };
const INKPPT = { label: "INK PPT · Comparativa de herramientas de presentaciones con IA (2026-07-25)", url: "https://www.inkppt.com/post/ai-presentation-tools-comparison" };
const CANVA_AI2 = { label: "WWWhat's new · Canva AI 2.0 (2026-04-17)", url: "https://wwwhatsnew.com/2026/04/17/canva-ai-2-0-asistente-agente-memoria-modelo-diseno-propio/" };
const CANVA_NEWS = { label: "Canva Newsroom · Lanzamientos de Canva Create 2026", url: "https://www.canva.com/es_mx/medios/noticias/creative-operating-system/" };
const GPT_IMAGE2 = { label: "Neurohive · ChatGPT Images 2.0 (2026-04-22)", url: "https://neurohive.io/en/news/chatgpt-images-2-0-openai-launches-image-generation-model-with-reasoning-2k-resolution-and-multilingual-text/" };
const FIREFLY = { label: "NexFlow · Adobe Firefly 2026 y modelos personalizados (2026-05-10)", url: "https://nexflow.es/blog/adobe-firefly-2026-modelos-personalizados" };
const PHOTOROOM = { label: "Photoroom · Novedades del primer semestre de 2026 (2026-07-01)", url: "https://www.photoroom.com/inside-photoroom/new-in-photoroom-h1-2026-product-recap" };
const META_ADS = { label: "Mercado&Consumo · Meta amplía Ads Creative Studio (2026-10-07)", url: "https://mercadoeconsumo.com.br/07/10/2026/tecnologia/meta-amplia-acesso-ao-ads-creative-studio-e-lanca-recursos-de-ia-para-anuncios/" };
const VEO = { label: "Dataconomy · Veo 3.1 con vídeo vertical nativo (2026-01-14)", url: "https://dataconomy.com/2026/01/14/google-upgrades-veo-3-1-with-native-vertical-video-generation/" };
const KLING = { label: "Deeka · Análisis de Kling 3.0 (2026-04-26)", url: "https://deeka.ai/es/blog/kling-3-0-review-2026" };
const RUNWAY = { label: "eWeek · Runway lanza Gen-4.5 (2025-12-02)", url: "https://www.eweek.com/news/runway-ai-video-model/" };

export const guides: Guide[] = [
  {
    slug: "legal",
    category: "Trabajo profesional",
    title: "IA para abogados y revisión de contratos en España (octubre 2026)",
    description: "Maite.ai, vLex Vincent, GenIA-L, Allegra y Álex de Legálitas: qué hace cada IA jurídica española, precios y un flujo de trabajo para usarlas con seguridad.",
    checked: "2026-10-20",
    intro: "En España la IA jurídica ya no es solo un buscador: las grandes editoriales (vLex, Lefebvre, Aranzadi LA LEY) y startups como Maite.ai ofrecen chats que citan BOE, jurisprudencia y doctrina, revisan documentos y redactan escritos. Están pensadas para profesionales; para el ciudadano existen asistentes gratuitos que orientan, pero no sustituyen a un abogado.",
    tools: [
      { name: "Maite.ai", audience: "Abogados autónomos, despachos pequeños y medianos, asesorías y departamentos jurídicos", what: "Copiloto jurídico nativo español con el BOE y más de 2,5 millones de sentencias. Cita las fuentes con enlaces, no usa los datos del cliente para entrenar e incluye una base de conocimiento privada y expedientes inteligentes por asunto.", price: "Maite Pro desde 99 €/usuario al mes; Maite Max 119 €/mes hasta 5 usuarios (2026-07)", source: MAITE },
      { name: "Vincent", maker: "vLex (Clio)", audience: "Abogados y despachos", what: "Asistente de IA de vLex sobre su fondo documental jurídico. Desde julio de 2026 incluye una Skills Library: le enseñas una vez cómo trabaja tu despacho (por ejemplo, cómo redacta una demanda o el tono con clientes) y lo aplica en las siguientes conversaciones. La Abogacía Española lo ha incluido en su programa de formación digital.", source: VLEX_NEWS },
      { name: "GenIA-L", maker: "Lefebvre", audience: "Abogados, asesores y asesorías jurídicas de empresa", what: "Un solo chat para buscar jurisprudencia, redactar, revisar hasta 10 documentos a la vez contra Mementos, legislación y jurisprudencia, verificar citas y plantear estrategia. Incluye flujos guiados como contestar una demanda o comparar convenios colectivos.", source: GENIAL },
      { name: "Allegra", maker: "Aranzadi LA LEY", audience: "Abogados de despacho, asesores in-house y notarios", what: "IA conversacional entrenada con más de diez millones de documentos jurídicos (jurisprudencia, legislación, formularios, contratos y doctrina) para redactar escritos, contratos e informes y buscar documentación. Se lanzó en abril de 2026.", source: ALLEGRA },
      { name: "Álex", maker: "Legálitas", audience: "Ciudadanos", what: "Asistente legal gratuito que traduce tu duda a preguntas concretas y responde en lenguaje sencillo. Se apoya en más de cinco millones de consultas reales de Legálitas y deriva a abogados cuando el caso lo necesita. La propia empresa lo define como herramienta de información, no de asesoramiento.", price: "Gratis (2026-07)", source: ALEX },
    ],
    workflow: [
      { step: "Ordenar los hechos", detail: "Escribe los hechos en orden cronológico y separa cada pregunta jurídica en una frase. Puedes usar un chat general para ordenar el material, pero quita antes nombres, DNI y datos de clientes." },
      { step: "Buscar normas y sentencias", detail: "Haz la búsqueda en una IA jurídica con fuentes españolas (Maite.ai, Vincent, GenIA-L o Allegra). Abre siempre la sentencia en el CENDOJ o la norma en el BOE antes de citarla." },
      { step: "Borrador de escrito o informe", detail: "Pide el borrador apoyado en esas fuentes y que marque dónde va cada cita. Revisa que la normativa esté vigente y que el tribunal y la fecha coincidan." },
      { step: "Revisión de contratos", detail: "Sube el contrato y pide que señale cláusulas desfavorables, ausentes o abusivas. Las alternativas de redacción las eliges tú según tu posición negociadora." },
      { step: "Estandarizar el despacho", detail: "Guarda tus modelos y criterios (skills en Vincent, base de conocimiento privada en Maite.ai) para que los siguientes borradores salgan con el estilo de la casa." },
    ],
    combos: [
      { pair: "IA jurídica española + chat general para pulir", why: "La IA jurídica aporta las fuentes verificables; el chat general (ChatGPT, Claude, Gemini) ayuda con la claridad del texto. Las citas se comprueban siempre en la herramienta jurídica." },
      { pair: "Álex o asistente gratuito + cita con abogado", why: "El ciudadano llega a la consulta con los hechos ordenados y las preguntas claras, y la hora con el abogado rinde más." },
      { pair: "Revisión de contratos con IA + comparador de versiones", why: "Comparar el original con la versión propuesta por la IA evita que se cuele un cambio que nadie ha revisado." },
    ],
    cautions: [
      "Ninguna de estas herramientas sustituye a un abogado colegiado. Para decisiones con consecuencias (demandar, firmar, despedir) consulta con un profesional.",
      "Los chats generales pueden inventar sentencias y artículos. No cites nada que no hayas abierto en el CENDOJ, el BOE o la base de datos de la editorial.",
      "Los datos de clientes son datos personales sujetos al RGPD. Comprueba dónde se alojan y si el proveedor se compromete a no entrenar con ellos antes de subir expedientes.",
      "Los precios citados salen de una comparativa publicada en julio de 2026 por un blog que promociona Maite.ai. Confírmalos con cada proveedor.",
    ],
    keywords: ["IA para abogados España", "revisar contrato con IA", "Maite.ai precio", "vLex Vincent", "GenIA-L Lefebvre", "IA jurídica gratis"],
  },
  {
    slug: "labor",
    category: "Trabajo profesional",
    title: "IA para derecho laboral y RR. HH. en España (octubre 2026)",
    description: "Qué IA usar para dudas laborales en España, como trabajador o empresa: Álex de Legálitas, Ai Consultas, GenIA-L, Factorial y el estado del registro de jornada.",
    checked: "2026-10-20",
    intro: "Las dudas laborales son las más frecuentes en los asistentes legales españoles: el 40 % de las consultas a Álex de Legálitas son de trabajo. El trabajador busca orientación rápida y gratuita; la empresa y el graduado social necesitan herramientas que lean el convenio colectivo y la normativa vigente. La decisión final y cualquier reclamación siguen pasando por un profesional.",
    tools: [
      { name: "Álex", maker: "Legálitas", audience: "Trabajadores y particulares", what: "Asistente legal gratuito que responde en lenguaje sencillo; el 40 % de sus consultas son laborales (despidos, contratos, vacaciones). Cuando el caso lo requiere, deriva a un abogado.", price: "Gratis (2026-07)", source: ALEX },
      { name: "Ai Consultas", audience: "Graduados sociales, asesores y despachos", what: "IA generativa española para el sector jurídico y tributario que responde con fuentes oficiales (legislación, jurisprudencia y doctrina) mediante agentes especializados y automatiza búsquedas normativas.", source: AI_CONSULTAS },
      { name: "GenIA-L", maker: "Lefebvre", audience: "Abogados laboralistas y asesores", what: "Incluye flujos guiados para comparar convenios colectivos y detectar cambios recientes de legislación y jurisprudencia, además de analizar hasta 10 documentos a la vez.", source: GENIAL },
      { name: "Factorial", audience: "Empresas y departamentos de RR. HH.", what: "Software de RR. HH. con IA para filtrar currículums, crear planes de onboarding por puesto, detectar patrones de absentismo y rotación y analizar encuestas de clima. Algunas funciones avanzadas solo están en planes premium.", source: FACTORIAL },
    ],
    workflow: [
      { step: "Poner números a la situación", detail: "Anota fecha de alta, tipo de contrato, jornada real (entradas, salidas y pausas), salario bruto y conceptos de la nómina. Sin estos datos, cualquier respuesta sobre horas extra o finiquito es vaga." },
      { step: "Localizar el convenio", detail: "Busca tu convenio colectivo (BOE o boletín provincial). Muchas respuestas dependen de él: vacaciones, pluses, jornada. Pásale el texto a la IA y pídele que cite el artículo." },
      { step: "Primera orientación", detail: "Trabajador: pregunta a un asistente gratuito como Álex. Empresa o asesoría: usa una herramienta profesional (Ai Consultas, GenIA-L) que trabaje con normativa y jurisprudencia españolas." },
      { step: "Revisar cálculos", detail: "No copies cifras de la IA. Rehaz el cálculo de finiquito, indemnización u horas extra con la nómina delante o con tu asesor." },
      { step: "Conflictos, a un profesional", detail: "Si hay despido, impago o acoso, consulta con un abogado laboralista, un graduado social o tu sindicato. Los plazos para reclamar un despido son cortos, así que no esperes." },
    ],
    combos: [
      { pair: "Asistente gratuito + abogado laboralista", why: "La IA te ayuda a entender qué preguntar; el profesional revisa plazos y estrategia." },
      { pair: "IA jurídica profesional + convenio colectivo", why: "Con el convenio cargado, la respuesta pasa de la norma general a lo que de verdad aplica a esa plantilla." },
      { pair: "Software de RR. HH. + control horario", why: "Tener fichajes y ausencias en el mismo sistema facilita revisar horas extra y vacaciones con datos reales." },
    ],
    cautions: [
      "La IA no da asesoramiento jurídico vinculante. Ante un despido o una sanción, acude a un abogado laboralista o graduado social cuanto antes.",
      "Registro de jornada: hoy rige el artículo 34.9 del Estatuto de los Trabajadores (desde mayo de 2019). El real decreto de registro digital obligatorio seguía sin aprobarse ni publicarse en el BOE a principios de octubre de 2026. Comprueba su estado antes de cambiar de sistema.",
      "Nóminas y contratos llevan DNI, cuenta bancaria y datos de salud. Son datos protegidos por el RGPD: táchalos antes de subirlos a una IA.",
      "Pregunta siempre a qué fecha corresponde la respuesta: salario mínimo, cotizaciones y permisos cambian con frecuencia.",
    ],
    keywords: ["consulta laboral IA gratis", "IA derecho laboral", "calcular finiquito con IA", "convenio colectivo IA", "registro de jornada digital", "IA para RR. HH."],
  },
  {
    slug: "tax-accounting",
    category: "Trabajo profesional",
    title: "IA para la renta, el IVA y la contabilidad en España (octubre 2026)",
    description: "Herramientas oficiales de la AEAT, contabilidad con IA de Holded, IA fiscal para asesorías y por qué Hacienda desaconseja hacer la renta con ChatGPT.",
    checked: "2026-10-20",
    intro: "Al arrancar la campaña de la Renta 2025, la directora de la Agencia Tributaria, Soledad Fernández, dijo: \"no me arriesgaría a hacerla con ChatGPT\". La pauta razonable es usar las herramientas oficiales para presentar y calcular, la IA contable para el día a día y la IA fiscal profesional en la asesoría.",
    tools: [
      { name: "Renta WEB y asistente virtual de Renta", maker: "Agencia Tributaria", audience: "Contribuyentes", what: "Renta WEB es donde se confirma el borrador o se presenta la declaración; en 2026 mejoró el acceso a las ventanas de datos y la información sobre subvenciones. El asistente virtual resuelve dudas generales, no casos concretos. También están la app de la AEAT y el plan Le Llamamos.", price: "Gratis", source: XATAKA_RENTA },
      { name: "Asistente virtual de IVA (AVIVA) y herramientas de IVA", maker: "Agencia Tributaria", audience: "Autónomos, empresas y asesores", what: "Chat de dudas de IVA (con Cl@ve o certificado puedes descargar la consulta en PDF), localizadores de entregas de bienes y servicios, calificador inmobiliario IVA/ITP, ayudas para los modelos 303 y 390, asistente del SII y Pre303 para rellenar el 303.", price: "Gratis", source: AEAT_IVA },
      { name: "Holded (contabilidad con IA y Coney)", maker: "Holded", audience: "Pymes y autónomos", what: "Asigna cuenta contable, centro de coste y tipo de IVA a cada movimiento, lee tickets y facturas por foto (OCR) y genera el asiento, concilia el banco con puntuación de confianza, detecta duplicados y prevé tesorería. Su asistente Coney genera informes y automatiza tareas en lenguaje natural.", source: HOLDED_IA },
      { name: "Ai Consultas", audience: "Asesores fiscales, gestorías y despachos", what: "IA para el sector jurídico y tributario que responde con fuentes oficiales españolas y ayuda a interpretar notificaciones de la AEAT y a buscar normativa.", source: AI_CONSULTAS },
      { name: "GenIA-L", maker: "Lefebvre", audience: "Asesorías y despachos profesionales", what: "Chat que combina Mementos, legislación y jurisprudencia con criterios interpretativos de los principales órganos administrativos, y permite analizar hasta 10 documentos a la vez.", source: GENIAL },
    ],
    workflow: [
      { step: "Reunir documentos", detail: "Junta facturas emitidas y recibidas, extractos bancarios, nóminas y la declaración del año anterior. Nombra cada archivo con fecha y proveedor o cliente." },
      { step: "Contabilidad diaria con IA", detail: "Sube tickets y facturas a tu programa contable (por ejemplo Holded) y revisa cada semana las sugerencias de cuenta y tipo de IVA antes de aprobarlas." },
      { step: "Dudas concretas, con fuente", detail: "Para el IVA, usa primero AVIVA y los localizadores de la AEAT. Si eres asesor, contrasta con una IA fiscal profesional y abre la consulta vinculante o la norma que cite." },
      { step: "Calcular con Hacienda", detail: "Las cifras se calculan en Renta WEB o Pre303, no en un chat. Usa la IA para entender qué casilla o deducción revisar, no para el importe final." },
      { step: "Presentar y archivar", detail: "Presenta tú o tu asesor revisando el resultado. Guarda los justificantes y, si usaste el asistente de IVA, el PDF de la consulta." },
    ],
    combos: [
      { pair: "Asistentes de la AEAT + IA profesional", why: "La herramienta oficial da el criterio de Hacienda; la IA profesional ayuda a encontrar doctrina y jurisprudencia para casos que no encajan." },
      { pair: "Contabilidad con IA + gestor", why: "La IA clasifica y concilia; el gestor revisa el cierre trimestral y los modelos antes de presentarlos." },
      { pair: "Chat general + Renta WEB", why: "El chat te explica conceptos y te ayuda a hacer la lista de comprobaciones; Renta WEB calcula y presenta." },
    ],
    cautions: [
      "La responsabilidad de lo declarado es tuya. Si tu situación es compleja (ventas de inmuebles, actividad económica, varias comunidades), consulta con un asesor fiscal.",
      "Verifactu: según el Real Decreto-ley 15/2025, es obligatorio desde el 1 de enero de 2027 para sociedades y el 1 de julio de 2027 para autónomos. En octubre de 2026 Hacienda anunció aplazarlo a octubre de 2028, pero hasta que se apruebe la norma siguen valiendo las fechas de 2027 (Emprendedores, 2026-10-06).",
      "La factura electrónica entre empresas ya tiene calendario por la Orden HAC/1028/2026: desde octubre de 2027 para empresas que facturan más de 8 millones de euros y desde octubre de 2028 para el resto (Emprendedores, 2026-10-06).",
      "Pregunta siempre a qué ejercicio se refiere la respuesta y comprueba las deducciones autonómicas de tu comunidad.",
    ],
    keywords: ["IA declaración de la renta", "ChatGPT renta Hacienda", "asistente virtual IVA", "contabilidad con IA autónomos", "Verifactu 2027", "IA para gestorías"],
  },
  {
    slug: "presentation",
    category: "Documentos y presentaciones",
    title: "Cómo hacer presentaciones con IA (octubre 2026)",
    description: "Gamma, Canva AI 2.0 y Genspark: en qué destaca cada uno, cómo combinarlos con ChatGPT, Claude o Gemini y un flujo de cinco pasos para acabar con un PowerPoint editable.",
    checked: "2026-10-20",
    intro: "Las herramientas de presentaciones con IA se reparten en tres perfiles: las que montan el borrador muy rápido, las que dan control de diseño y las que investigan el tema por ti. Funciona mejor repartir el trabajo: guion con un chat general, diapositivas con una herramienta especializada y remate en PowerPoint o Google Slides.",
    tools: [
      { name: "Gamma", audience: "Quien necesita un primer borrador rápido", what: "Convierte un tema o un guion en una presentación completa con estructura, eligiendo maquetas y número de diapositivas. Menos margen para personalizar la marca.", source: INKPPT },
      { name: "Canva AI 2.0", maker: "Canva", audience: "Quien cuida el diseño y la marca", what: "Asistente con agente que genera presentaciones con capas editables, memoria de tu estilo y conectores con Notion, Slack, Zoom, Gmail y Google Drive. Incluye presentaciones guiadas que te ayudan a fijar objetivo y estructura antes del diseño.", price: "IA incluida en el plan gratuito; Canva Pro 11,99 €/mes o 109,99 €/año en España (2026-04)", source: CANVA_AI2 },
      { name: "Genspark", audience: "Presentaciones que necesitan investigación", what: "Investiga el tema y monta la presentación con contenido con fuentes, imágenes y gráficos. Exportar a PPTX o Google Slides puede requerir plan de pago.", source: INKPPT },
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "Diagramas e imágenes para diapositivas", what: "Genera imágenes con texto legible en varios idiomas, formatos 16:9 y 9:16 y hasta 10 imágenes coherentes por petición. El modo de razonamiento está en los planes de pago.", source: GPT_IMAGE2 },
    ],
    workflow: [
      { step: "Mensaje y público", detail: "Pide a un chat general que te ayude a definir en una frase quién escucha y qué decisión quieres que tome. Esa frase ordena todas las diapositivas." },
      { step: "Guion de 10 diapositivas", detail: "Una afirmación por diapositiva como título y uno o dos datos de apoyo con su fuente. Así no aparecen cifras sin origen." },
      { step: "Generar el borrador", detail: "Pega el guion en Gamma o Genspark, o usa las presentaciones guiadas de Canva si la marca manda." },
      { step: "Revisar cifras y gráficos", detail: "Contrasta cada número con el dato original. Si no tiene fuente, quítalo o añádela." },
      { step: "Rematar en PowerPoint o Slides", detail: "Exporta, aplica la plantilla y tipografías de tu empresa y escribe las notas del orador con ayuda del chat." },
    ],
    combos: [
      { pair: "Chat general + Gamma", why: "La estructura se afina conversando; Gamma la convierte en diapositivas de una vez." },
      { pair: "Genspark + Canva", why: "Investigas y montas con Genspark y llevas el resultado a Canva para ajustarlo a la marca." },
      { pair: "Canva + ChatGPT Images 2.0", why: "Para esquemas o ilustraciones con texto en español, genera la imagen aparte y colócala en la plantilla." },
    ],
    cautions: [
      "Antes de subir documentos internos, revisa si la herramienta usa tus datos para entrenar y desactívalo si puedes.",
      "Las condiciones de uso comercial de imágenes generadas cambian según el servicio. Revísalas antes de presentar fuera de la empresa.",
      "La exportación a PPTX depende del plan. Compruébalo en la página de precios oficial antes de pagar.",
    ],
    keywords: ["hacer presentaciones con IA", "IA para PowerPoint", "Gamma IA en español", "Canva IA presentaciones", "Genspark presentaciones", "presentación con IA gratis"],
  },
  {
    slug: "poster",
    category: "Diseño e impresión",
    title: "Cómo hacer carteles con IA (octubre 2026)",
    description: "Carteles para fiestas, comercios o eventos con ChatGPT Images 2.0, Canva AI 2.0 y Adobe Firefly: texto en español, A3 y A4, imprenta y etiquetado de IA.",
    checked: "2026-10-20",
    intro: "En 2026 la IA ya escribe texto legible dentro de la imagen, lo que cambia el juego para los carteles. Aun así, lo más práctico es generar la ilustración con IA y poner los textos importantes (fecha, lugar, precio) en un editor, donde puedes corregirlos sin regenerar todo.",
    tools: [
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "Ilustración principal y pruebas de composición", what: "Mucho mejor texto dentro de la imagen y en varios idiomas, hasta unos 2000 px en el lado largo y formatos verticales (2:3, 9:16). Con el modo de razonamiento (planes de pago) planifica la composición antes de generar.", source: GPT_IMAGE2 },
      { name: "Canva AI 2.0", maker: "Canva", audience: "Maquetación y texto editable", what: "Genera diseños completos con capas editables y aplica tu kit de marca. Puedes cambiar textos, fuentes e imágenes sin tocar el resto.", price: "Canva Pro 11,99 €/mes en España (2026-04)", source: CANVA_AI2 },
      { name: "Adobe Firefly", maker: "Adobe", audience: "Marcas que quieren un estilo propio y uso comercial", what: "Con Custom Models subes imágenes de referencia de tu marca y genera contenido con esa identidad visual. Adobe lo presenta como seguro para uso comercial al entrenarse con contenido de Adobe Stock y de dominio público.", source: FIREFLY },
    ],
    workflow: [
      { step: "Datos y tamaño", detail: "Fija la información obligatoria (qué, cuándo, dónde, precio) y el tamaño final: A3 (297 × 420 mm) para escaparates y tablones, A4 para portales y mostradores, y versión 4:5 o 9:16 para redes." },
      { step: "Ilustración con IA", detail: "Pide el fondo o la ilustración principal dejando espacio libre para el texto. Genera varias versiones y elige una." },
      { step: "Texto en el editor", detail: "Lleva la imagen a Canva u otro editor y escribe ahí título, fecha y lugar. Revisa tildes, eñes y horarios: un error en la imagen generada cuesta mucho de corregir." },
      { step: "Preparar para imprenta", detail: "Exporta en PDF de alta calidad con sangrado si la imprenta lo pide. Para tiradas pequeñas sirven imprentas online como Helloprint o 360imprimir." },
      { step: "Adaptar a redes", detail: "Reaprovecha el diseño en formatos de stories y publicaciones sin volver a empezar." },
    ],
    combos: [
      { pair: "ChatGPT Images 2.0 + Canva", why: "La IA de imagen crea la escena; Canva deja el texto editable y listo para imprimir." },
      { pair: "Firefly Custom Models + Canva", why: "Para series de carteles de una misma marca o festival, mantienes el estilo y cambias solo los datos." },
      { pair: "Chat general + editor", why: "El chat propone titulares cortos en español; el editor comprueba cómo quedan a distancia." },
    ],
    cautions: [
      "Desde el 2 de agosto de 2026 se aplica el artículo 50 del Reglamento europeo de IA: los contenidos realistas generados por IA, como los deepfakes, deben etiquetarse como artificiales. Si tu cartel muestra personas o lugares que parecen reales, indícalo.",
      "No uses la cara de una persona real ni logotipos de terceros sin permiso.",
      "Revisa siempre a mano la fecha, la hora y el lugar en el archivo final.",
    ],
    keywords: ["hacer cartel con IA", "cartel de fiestas con IA", "cartel evento IA gratis", "póster A3 IA", "Canva carteles IA", "ChatGPT imágenes cartel"],
  },
  {
    slug: "pamphlet",
    category: "Diseño e impresión",
    title: "Folletos, flyers y cartas de restaurante con IA (octubre 2026)",
    description: "Cómo hacer dípticos, trípticos, flyers y cartas con Canva AI 2.0, ChatGPT Images 2.0 y Adobe Firefly, y qué imprenta online elegir en España según la tirada.",
    checked: "2026-10-20",
    intro: "En un folleto hay más texto que en un cartel, así que la IA trabaja mejor en dos frentes: redactar y resumir el contenido, y crear imágenes coherentes para todas las caras. La maqueta final, con precios y datos de contacto, conviene cerrarla en un editor con texto editable.",
    tools: [
      { name: "Canva AI 2.0", maker: "Canva", audience: "Dípticos, trípticos, flyers y cartas", what: "El agente genera diseños completos con capas editables, recuerda tu estilo y puede tirar de contenido de Google Drive o Notion mediante conectores.", price: "IA incluida en el plan gratuito; Canva Pro 11,99 €/mes en España (2026-04)", source: CANVA_AI2 },
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "Fotos e ilustraciones del folleto", what: "Hasta 10 imágenes por petición con estilo coherente, útil para que todas las caras del folleto o todos los platos de la carta compartan estética.", source: GPT_IMAGE2 },
      { name: "Adobe Firefly", maker: "Adobe", audience: "Marcas con identidad visual definida", what: "Custom Models genera imágenes nuevas a partir de las referencias de tu marca (fotos de producto, paleta, estilo de ilustración), con mejor coherencia de producto entre imágenes.", source: FIREFLY },
    ],
    workflow: [
      { step: "Formato y plegado", detail: "Decide el formato antes de escribir: flyer A5 o A6, díptico A4 plegado a A5, tríptico A4 en tres cuerpos, o carta en A4 o A3." },
      { step: "Texto con un chat", detail: "Pide al chat que convierta tu información en bloques cortos por cara (portada, servicios, precios, contacto). En cartas, que ordene platos y señale alérgenos según la información que tú le das." },
      { step: "Imágenes coherentes", detail: "Genera todas las imágenes en una sola sesión o con el mismo estilo de referencia para que el folleto no parezca un collage." },
      { step: "Maquetar y revisar", detail: "Monta todo en Canva, revisa precios, teléfonos y direcciones, y pide a otra persona que lo lea impreso." },
      { step: "Imprimir", detail: "Para flyers en tiradas cortas, Helloprint ofrece buen equilibrio entre precio y variedad; para tiradas grandes, como 5.000 folletos, destaca Onlineprinters; 360imprimir sirve para encargos sencillos y baratos (Trabajar por el Mundo, 2026-10-13)." },
    ],
    combos: [
      { pair: "Chat general + Canva", why: "El chat resume y ordena el contenido; Canva lo convierte en una maqueta editable." },
      { pair: "Firefly o ChatGPT Images + Canva", why: "Imágenes con un estilo común y textos editables encima para poder actualizar precios sin rehacer nada." },
      { pair: "Canva + imprenta online", why: "Exporta en PDF de imprenta y compara precios por tirada entre imprentas antes de encargar." },
    ],
    cautions: [
      "Los alérgenos de una carta son información obligatoria y sensible: la IA no puede saber qué lleva cada plato. Revísalos tú.",
      "Si usas imágenes realistas generadas con IA que pueden pasar por fotos reales, el artículo 50 del Reglamento europeo de IA (aplicable desde agosto de 2026) exige etiquetarlas como artificiales. Las fotos de platos que no son reales también pueden confundir al cliente.",
      "Pide una prueba impresa antes de una tirada grande: los colores en pantalla y en papel no coinciden.",
    ],
    keywords: ["hacer folleto con IA", "flyer con IA gratis", "tríptico con IA", "carta de restaurante IA", "díptico Canva IA", "imprimir flyers online"],
  },
  {
    slug: "ad-image",
    category: "Marketing y publicidad",
    title: "Fotos de producto y creatividades para anuncios con IA (octubre 2026)",
    description: "Photoroom, ChatGPT Images 2.0, Firefly, Canva y Meta: cómo crear fotos de producto, banners y anuncios para redes con IA y qué reglas aplican en España.",
    checked: "2026-10-20",
    intro: "Para una tienda online la IA ya cubre casi todo el ciclo de imagen: limpiar la foto del producto, ponerla en escena, sacar variantes para cada red y probarlas en campaña. Lo difícil no es generar, es mantener el producto fiel a como es de verdad.",
    tools: [
      { name: "Photoroom", audience: "Ecommerce y moda", what: "Edición por lotes de hasta 250 imágenes, modelos de moda con IA, sombras personalizables, AI Shot List (estudio, lifestyle, flat lay, prueba virtual) y Product Fixer para corregir con la foto original como referencia. También genera vídeos con plantillas de ecommerce.", source: PHOTOROOM },
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "Escenas y banners con texto", what: "Texto legible en la imagen, formatos de 1:1 a 9:16 y 3:1 para banners, y hasta 10 imágenes coherentes por petición.", source: GPT_IMAGE2 },
      { name: "Adobe Firefly", maker: "Adobe", audience: "Marcas que necesitan coherencia y uso comercial", what: "Custom Models aprende de tus fotos de producto y paleta y mantiene la coherencia de personajes y producto entre imágenes.", source: FIREFLY },
      { name: "Canva (Canva Ads y Brand Kit)", maker: "Canva", audience: "Pymes que publican en Meta", what: "Canva Ads analiza tu web para sacar colores, tono y mensajes, genera variantes de anuncio, las publica en Meta y da datos de rendimiento. Con el kit de marca conectado, los diseños con IA respetan tus colores y fuentes.", source: CANVA_NEWS },
      { name: "Ads Creative Studio y Advantage+ creative", maker: "Meta", audience: "Anunciantes en Facebook e Instagram", what: "Advantage+ creative genera vídeos a partir de imágenes estáticas; Ads Creative Studio crea conceptos y variaciones y se integra con el Administrador de anuncios. Meta está ampliando el acceso a más anunciantes.", source: META_ADS },
    ],
    workflow: [
      { step: "Foto base real", detail: "Haz una buena foto del producto con luz uniforme. Es la referencia que la IA debe respetar en color, forma y etiqueta." },
      { step: "Recorte y escenas", detail: "Con Photoroom o similar, quita el fondo y genera escenas (estudio, lifestyle). Revisa que logotipos, textos del envase y proporciones no cambien." },
      { step: "Variantes por formato", detail: "Saca 1:1 y 4:5 para el feed, 9:16 para stories y reels, y formatos anchos para banners web." },
      { step: "Texto del anuncio", detail: "Añade titular y oferta en un editor (Canva, Express) y comprueba tildes y precios. Si es un anuncio con influencer, incluye la palabra \"publicidad\"." },
      { step: "Probar y medir", detail: "Sube varias versiones a Meta o Google y deja que la plataforma compare. Retira las que no rinden." },
    ],
    combos: [
      { pair: "Photoroom + Canva", why: "Photoroom deja el producto limpio y en escena; Canva añade texto y marca y adapta a cada red." },
      { pair: "Firefly Custom Models + Meta Advantage+", why: "Generas variantes que respetan la marca y la plataforma prueba cuáles funcionan." },
      { pair: "ChatGPT Images 2.0 + foto real", why: "Usa la IA para el fondo y la composición, pero mantén el producto de la foto real para no engañar al comprador." },
    ],
    cautions: [
      "La imagen no puede mostrar un producto distinto al que vendes: la publicidad engañosa está prohibida aunque la haya generado una IA.",
      "Con influencers: la CNMC exige que aparezca \"publicidad\" o \"publi\" de forma visible dentro del propio vídeo; \"ad\" o la etiqueta de colaboración pagada no bastan (Cuatrecasas, 2026-06-05).",
      "Desde el 2 de agosto de 2026, el artículo 50 del Reglamento europeo de IA obliga a etiquetar como artificiales los contenidos realistas generados por IA, como los deepfakes. No muestres a personas reales sin su consentimiento.",
      "El Gobierno aprobó el 26 de mayo de 2026 el proyecto de Ley Orgánica para el buen uso y la gobernanza de la IA, con la AESIA como supervisora y un régimen de sanciones. Está en tramitación en las Cortes: revisa su estado si haces campañas con IA (La Moncloa, 2026-05-26).",
    ],
    keywords: ["fotos de producto con IA", "imágenes para anuncios IA", "banner con IA", "Photoroom en español", "anuncios Instagram IA", "Meta Advantage+ IA"],
  },
  {
    slug: "ad-video",
    category: "Marketing y publicidad",
    title: "Vídeos publicitarios y de producto con IA (octubre 2026)",
    description: "Veo 3.1, Kling 3.0, Runway Gen-4.5, Photoroom y Meta: qué IA de vídeo usar para anuncios cortos y reels, precios, formato vertical y reglas en España.",
    checked: "2026-10-20",
    intro: "Los modelos de vídeo de 2026 generan clips con audio, formato vertical nativo y personajes coherentes entre planos. Para un anuncio corto, lo habitual es generar varios planos de 5 a 15 segundos y montarlos en un editor, en vez de pedir el anuncio entero de una vez.",
    tools: [
      { name: "Veo 3.1 y Flow", maker: "Google", audience: "Reels, Shorts y anuncios verticales", what: "Vídeo vertical 9:16 nativo, mejor coherencia de personajes y objetos con imágenes de referencia y reescalado a 1080p y 4K. Disponible en la app de Gemini, YouTube Shorts, Flow, Google Vids y por API (Gemini API y Vertex AI).", source: VEO },
      { name: "Kling 3.0", maker: "Kuaishou", audience: "Clips con diálogo y varios planos", what: "Hasta 15 segundos por generación, audio nativo con sincronía labial en español entre otros idiomas, hasta 6 planos por generación y 4K solo en el plan Ultra.", price: "Gratis con marca de agua; Standard 6,99 $/mes; Pro 29,99 $/mes; Ultra 59,99 $/mes (2026-04)", source: KLING },
      { name: "Runway Gen-4.5", maker: "Runway", audience: "Planos de producto con física realista", what: "Mejora la física, el movimiento humano y de cámara, y detalles como pelo y tela. Disponible en la plataforma de Runway, por API e integraciones.", source: RUNWAY },
      { name: "Photoroom (generador de vídeo)", audience: "Tiendas online", what: "Más de 300 plantillas de ecommerce y hasta 7 imágenes de referencia por vídeo; por API, giros de 360 grados a partir de varias fotos del producto.", source: PHOTOROOM },
      { name: "Advantage+ creative y Ads Creative Studio", maker: "Meta", audience: "Anunciantes en Facebook e Instagram", what: "Convierte imágenes estáticas en vídeos y permite editar gancho, audio, duración, textos, subtítulos y escena final. Los vídeos de producto a escala desde catálogo están en beta para anunciantes elegibles.", source: META_ADS },
    ],
    workflow: [
      { step: "Guion de 15 a 30 segundos", detail: "Pide a un chat un guion con gancho en los primeros 2 segundos, beneficio, prueba y llamada a la acción, dividido en planos de 3 a 5 segundos." },
      { step: "Imágenes de referencia", detail: "Prepara fotos reales del producto (puedes limpiarlas con Photoroom). Sirven de referencia para que el modelo de vídeo no cambie el producto." },
      { step: "Generar planos", detail: "Genera cada plano en Veo 3.1, Kling o Runway en el formato final (9:16 para reels y Shorts). Repite solo los planos que fallen." },
      { step: "Montaje, subtítulos y voz", detail: "Monta en tu editor o en Canva, añade subtítulos en español (muchos ven sin sonido) y revisa la pronunciación si usas voz generada." },
      { step: "Publicar y probar", detail: "Sube dos o tres versiones con ganchos distintos y deja que la plataforma de anuncios compare." },
    ],
    combos: [
      { pair: "Chat general + Veo 3.1 o Kling", why: "El chat escribe el guion plano a plano; el modelo de vídeo genera cada plano con instrucciones cortas y concretas." },
      { pair: "Photoroom + Runway", why: "La foto limpia del producto sirve de referencia para planos con movimiento realista." },
      { pair: "Montaje propio + Meta Ads Creative Studio", why: "Haces la pieza principal y dejas que Meta pruebe variaciones de gancho, duración y texto." },
    ],
    cautions: [
      "El artículo 50 del Reglamento europeo de IA se aplica desde el 2 de agosto de 2026: los vídeos realistas generados por IA, como los deepfakes, deben indicarse como artificiales. No uses la imagen ni la voz de personas reales sin consentimiento.",
      "Si el vídeo lo publica un influencer, la CNMC pide la palabra \"publicidad\" o \"publi\" visible dentro del vídeo (Cuatrecasas, 2026-06-05).",
      "Los planes gratuitos suelen llevar marca de agua y resolución limitada (en Kling, 720p). Comprueba la licencia de uso comercial antes de pagar campañas.",
      "Los precios de Kling están en dólares y salen de un análisis de abril de 2026; confírmalos en la web oficial.",
    ],
    keywords: ["vídeo publicitario con IA", "anuncio vídeo IA", "Veo 3.1 en español", "Kling IA precio", "Runway vídeo IA", "vídeo de producto IA"],
  },
];
