// Guías de IA para España, lote 2 (revisado 2026-10-25): actas, Excel, traducción, TFG, plan de negocio,
// programación, atención al cliente, blog/SEO. Los precios vienen de la página citada, con su fecha.
import type { Guide } from "../ai-use-cases";

const JAVADEX_ACTAS = { label: "Javadex · herramientas de IA para actas de reuniones (2026-06-20, ranking de un proveedor)", url: "https://www.javadex.es/blog/mejores-herramientas-ia-actas-reuniones-empresa-ranking-2026" };
const AUGUSTA_REUNIONES = { label: "Augusta Abogados · IA para transcribir reuniones, claves legales (2026-03-25)", url: "https://augustaabogados.com/wp-content/uploads/2026/03/ALERTA_El-uso-de-herramientas-de-inteligencia-artificial-para-transcribir-reuniones.-Claves-legales-y-riesgos-a-tener-en-cuenta_TMT_Augusta-Abogados-2026.pdf" };
const LOPD_TRANSCRIBIR = { label: "Protección Datos LOPD · permiso para transcribir reuniones con IA (actualizado 2026-06-03)", url: "https://protecciondatos-lopd.com/empresas/permiso-transcribir-reuniones-ia/" };
const UPLIORA_EXCEL = { label: "Upliora · IA para Excel y Google Sheets (2026-02-25)", url: "https://www.upliora.es/blog/ia-para-excel-google-sheets-guia-herramientas-2026" };
const JAVADEX_TRAD = { label: "Javadex · comparativa de traductores IA (2026-03-23)", url: "https://www.javadex.es/blog/mejores-traductores-ia-ranking-comparativa-2026" };
const ZEMITH_RECHERCHE = { label: "Zemith · asistentes de IA para estudiantes (2026-01-29, en francés)", url: "https://www.zemith.com/fr/contents/best-ai-research-assistant-for-students-2026" };
const CEU_TFG = { label: "Universidad CEU San Pablo · directrices sobre IA en el TFG (aprobadas 2025-02-05)", url: "https://www.uspceu.com/Portals/0/docs/transparencia/normativa/normativa-interna/estudiantes/Directrices Generales sobre el Uso de Herramientas de Inteligencia Artificial en el Desarrollo del Trabajo Fin de Grado_rv-2.pdf" };
const TYP_PLAN = { label: "Trabajo y Personal · plan de negocio 2026 con plantillas (consultado 2026-10-25)", url: "https://trabajoypersonal.com/plan-de-negocio-efectivo/" };
const JAVADEX_VIBE = { label: "Javadex · ranking de herramientas de vibe coding (2026-03-25)", url: "https://www.javadex.es/blog/mejores-herramientas-vibe-coding-ranking-2026" };
const UPLIORA_ATENCION = { label: "Upliora · plataformas de IA para atención al cliente en España (2026-03-05)", url: "https://www.upliora.es/blog/mejores-plataformas-ia-atencion-cliente-espana-2026" };
const CONSUMO_LSAC = { label: "Consumo Responde · nueva Ley de Servicios de Atención a la Clientela (consultado 2026-10-25)", url: "https://www.consumoresponde.es/art%C3%ADculos/nueva_ley_de_servicios_de_atencion_la_clientela_lsac" };
const M4E_AIO = { label: "Marketing4eCommerce · AI Overviews en España, datos de Semrush (2025-05-07)", url: "https://marketing4ecommerce.net/espana-ai-overviews-trafico/" };

export const guides: Guide[] = [
  {
    slug: "meeting-notes",
    category: "Documentos y presentaciones",
    title: "Actas de reuniones con IA: herramientas y RGPD en España (octubre 2026)",
    description: "Fireflies, Otter, tl;dv, Notion AI y Copilot en Teams comparados por precio y por dónde guardan los datos, un método en cinco pasos y lo que exige el RGPD antes de grabar.",
    checked: "2026-10-25",
    intro: "Las herramientas de notas con IA graban, transcriben, separan a los intervinientes y sacan acuerdos y tareas. En España la pregunta clave es legal: la voz es un dato personal, la mayoría de estas herramientas guarda los datos en EE. UU. y, en el ámbito privado, lo habitual es pedir el consentimiento expreso de los participantes.",
    tools: [
      { name: "Fireflies.ai", audience: "Empresas con muchas reuniones conectadas al CRM", what: "Transcribe, resume y extrae decisiones y tareas; se conecta con calendario, CRM y gestores de tareas. Datos en infraestructura de EE. UU.", price: "plan gratuito limitado; de pago desde unos 10-19 $/usuario/mes (2026-06)", source: JAVADEX_ACTAS },
      { name: "Otter.ai", audience: "Notas en tiempo real", what: "Transcripción en directo, momentos clave y resúmenes automáticos. Datos en EE. UU.", price: "plan gratuito; de pago desde unos 17 $/usuario/mes (2026-06)", source: JAVADEX_ACTAS },
      { name: "tl;dv", audience: "Ventas, customer success, producto", what: "Graba y transcribe, divide la reunión por temas y permite compartir clips. Datos en EE. UU.", price: "plan gratuito; de pago desde unos 18-29 $/usuario/mes (2026-06)", source: JAVADEX_ACTAS },
      { name: "Notion AI", maker: "Notion", audience: "Empresas que ya documentan en Notion", what: "Convierte notas o transcripciones en un acta estructurada dentro de Notion.", price: "complemento de unos 8-10 $/usuario/mes sobre el plan de Notion (2026-06)", source: JAVADEX_ACTAS },
      { name: "Copilot en Teams", maker: "Microsoft", audience: "Empresas con Microsoft 365", what: "Resume reuniones de Teams y envía tareas a Outlook, Planner o To Do. Los datos quedan en el tenant de Microsoft 365, con región configurable.", price: "complemento de unos 30 $/usuario/mes según el plan (2026-06)", source: JAVADEX_ACTAS },
    ],
    workflow: [
      { step: "Informar y pedir consentimiento", detail: "Avise en la convocatoria y al empezar de que la reunión se transcribirá con IA y para qué. En el ámbito privado, recabe el consentimiento expreso de empleados y terceros presentes." },
      { step: "Firmar el encargo de tratamiento", detail: "El proveedor de IA es encargado del tratamiento: necesita un contrato (DPA) y el tratamiento debe constar en el registro de actividades." },
      { step: "Valorar el riesgo", detail: "Para reuniones con datos sensibles (salud, RR. HH., clientes), haga un análisis de riesgos y, si procede, una evaluación de impacto (EIPD)." },
      { step: "Convertir la transcripción en acuerdos", detail: "Nombre a los intervinientes y separe acuerdos, temas abiertos y tareas con responsable y fecha." },
      { step: "Guardar lo justo", detail: "Almacene las transcripciones cifradas y bórrelas cuando dejen de ser necesarias." },
    ],
    combos: [
      { pair: "Herramienta de notas + CRM", why: "Las notas de la llamada van directas a la ficha del cliente." },
      { pair: "Copilot o Gemini de la suite + plantilla de acta", why: "Usar la IA incluida en la suite de la empresa evita sacar los datos a otro proveedor y una plantilla fija hace las actas comparables." },
    ],
    cautions: [
      "La voz es un dato personal y puede ser dato biométrico si se usa para identificar a alguien. Desactive la identificación por voz si no la necesita.",
      "Fireflies, Otter, tl;dv y Notion guardan los datos en EE. UU., según el comparativo. Compruebe las garantías de transferencia internacional antes de usarlos con clientes.",
      "Grabar una conversación en la que se participa no es delito en sí, pero difundirla puede serlo (revelación de secretos). Informe siempre.",
      "El comparativo de precios lo publica un proveedor que vende su propia solución; verifique las tarifas en la web de cada herramienta.",
    ],
    keywords: ["acta de reunión IA", "transcribir reuniones IA", "grabar reunión RGPD", "Fireflies precio", "Copilot Teams resumen", "consentimiento grabar reunión"],
  },
  {
    slug: "spreadsheet",
    category: "Documentos y presentaciones",
    title: "IA para Excel y Google Sheets (octubre 2026)",
    description: "Copilot en Excel, Gemini en Sheets, GPT for Sheets, SheetAI, Rows y Numerous.ai por precio y uso, y cómo comprobar una fórmula hecha por IA antes de que llegue a un informe.",
    checked: "2026-10-25",
    intro: "Empiece por la IA de la hoja de cálculo que ya paga la empresa: Copilot con Microsoft 365, Gemini con Google Workspace. Los complementos tienen sentido para tareas masivas de texto en celdas o para conectar datos de marketing. Cualquiera puede escribir una fórmula que parece correcta y no lo es.",
    tools: [
      { name: "Copilot en Excel", maker: "Microsoft", audience: "Empresas con Microsoft 365", what: "Genera fórmulas, código Python y análisis desde lenguaje natural. Según la guía, funciona mejor con instrucciones en inglés que en español.", price: "complemento de +30 $/usuario/mes sobre Microsoft 365 (2026-02)", source: UPLIORA_EXCEL },
      { name: "Gemini en Google Sheets", maker: "Google", audience: "Equipos con Google Workspace", what: "Crea fórmulas, tablas dinámicas, formatos y gráficos desde lenguaje natural.", price: "incluido en Workspace Business Standard, 14,40 $/usuario/mes; Starter 7,20 $ con funciones limitadas (2026-02)", source: UPLIORA_EXCEL },
      { name: "GPT for Sheets", audience: "Tareas de texto en muchas filas", what: "Funciones de IA en celdas con varios modelos (GPT, Claude, Gemini).", price: "gratis 50 consultas/mes; Starter 19,99 $/mes (2026-02)", source: UPLIORA_EXCEL },
      { name: "SheetAI", audience: "Uso ligero en Sheets", what: "Funciones de IA para texto y rangos; la API de OpenAI se paga aparte.", price: "gratis 50 llamadas/mes; 8 $/mes o 72 $/año (2026-02)", source: UPLIORA_EXCEL },
      { name: "Rows", audience: "Marketing y datos conectados", what: "Hoja de cálculo con IA y conectores a GA4, Search Console y plataformas de anuncios.", price: "gratis; Plus 15 $/usuario/mes (2026-02)", source: UPLIORA_EXCEL },
    ],
    workflow: [
      { step: "Usar lo que ya paga", detail: "Pruebe Copilot o Gemini incluidos en su suscripción antes de añadir un complemento." },
      { step: "Elegir una tarea repetitiva", detail: "Un resumen semanal, quitar duplicados o una columna de categorías. Una sola tarea bien definida." },
      { step: "Probar con datos ficticios", detail: "Si usa una cuenta personal, trabaje con un archivo con las mismas columnas y valores inventados. Nada de datos de clientes o empleados." },
      { step: "Comprobar tres filas a mano", detail: "Antes de extender una fórmula, calcule tres o cuatro filas usted mismo. Los rangos desplazados una fila son el error clásico." },
      { step: "Trabajar sobre una copia", detail: "Todo lo que borra o sobrescribe se prueba primero en un duplicado." },
    ],
    combos: [
      { pair: "Asistente general para el método + Copilot/Gemini para ejecutar", why: "Se piensa en el chat y se edita el archivo real dentro del entorno de la empresa." },
      { pair: "GPT for Sheets + tabla dinámica", why: "La IA etiqueta cada fila y la tabla dinámica cuenta las etiquetas." },
    ],
    cautions: [
      "Las tarifas de la guía están en dólares y algunas figuran como actualizadas después de su fecha de publicación. Compruébelas en la web oficial.",
      "Un archivo con datos personales sigue sujeto al RGPD: no lo suba a una cuenta personal ni a un complemento sin contrato de tratamiento.",
      "Cualquier cifra que vaya a dirección, al banco o a Hacienda debe recalcularla una persona.",
    ],
    keywords: ["IA para Excel", "Copilot Excel español", "Gemini Google Sheets", "fórmulas Excel con IA", "GPT for Sheets"],
  },
  {
    slug: "translation",
    category: "Documentos y presentaciones",
    title: "Traducción con IA: DeepL, ChatGPT, Reverso o SYSTRAN (octubre 2026)",
    description: "DeepL, Google Translate, ChatGPT, Claude, Reverso y SYSTRAN comparados en precio y privacidad, un método de revisión y cuándo hace falta un traductor-intérprete jurado.",
    checked: "2026-10-25",
    intro: "Para un correo o documentación interna, la IA suele bastar. Para un contrato o un documento oficial, la IA es solo un primer borrador: en España, los documentos que se presentan ante la Administración suelen exigir traducción jurada, que solo puede firmar un traductor-intérprete jurado nombrado por el Ministerio de Asuntos Exteriores.",
    tools: [
      { name: "DeepL", maker: "DeepL (Alemania)", audience: "Documentos profesionales", what: "Traducción centrada en idiomas europeos que conserva el formato de los documentos. Según la comparativa, en Pro el texto se borra tras traducirlo.", price: "gratis; Starter 7,49 €/mes, Advanced 24,99 €/mes (2026-03)", source: JAVADEX_TRAD },
      { name: "ChatGPT", maker: "OpenAI", audience: "Adaptar tono y registro", what: "Traduce y reescribe según el público, útil para textos de marketing.", price: "Plus 20 $/mes (2026-03)", source: JAVADEX_TRAD },
      { name: "Claude", maker: "Anthropic", audience: "Textos largos y marketing", what: "Traduce documentos largos manteniendo la coherencia gracias a su ventana de contexto.", price: "Pro 20 $/mes (2026-03)", source: JAVADEX_TRAD },
      { name: "Reverso Context", maker: "Reverso", audience: "Ejemplos en contexto", what: "Traducción con ejemplos reales de uso, orientada al aprendizaje.", price: "Premium 6,99 €/mes o 59,99 €/año (2026-03)", source: JAVADEX_TRAD },
      { name: "SYSTRAN", maker: "SYSTRAN", audience: "Empresas que no quieren sacar datos", what: "Motor de traducción instalable en servidores propios; en modo local los datos no salen de su infraestructura.", price: "Lite 6,99 €/mes, Plus 19,99 €/mes (2026-03)", source: JAVADEX_TRAD },
    ],
    workflow: [
      { step: "Clasificar el documento", detail: "Interno, para clientes u oficial. Cuanto más está en juego, más necesaria es la revisión humana." },
      { step: "Preparar un glosario", detail: "Nombres de producto, términos del sector y palabras que no se traducen." },
      { step: "Traducir con una cuenta de empresa", detail: "Para documentos confidenciales, use un plan de pago con garantías de privacidad, no la versión gratuita." },
      { step: "Retraducir para revisar", detail: "Pida la traducción de vuelta al español y compare: los errores de sentido saltan a la vista." },
      { step: "Jurar lo que se presenta", detail: "Títulos, certificados o documentos para un juzgado o la Administración: traductor-intérprete jurado." },
    ],
    combos: [
      { pair: "DeepL + ChatGPT o Claude", why: "DeepL para la fidelidad, el asistente para adaptar el tono de la versión comercial." },
      { pair: "SYSTRAN local + revisión humana", why: "Para documentos que no pueden salir de la empresa." },
    ],
    cautions: [
      "Google Translate gratuito no ofrece garantías de privacidad para uso empresarial, según la comparativa. No pegue datos confidenciales.",
      "Una traducción automática no tiene valor de traducción jurada.",
      "Revise cifras, fechas y unidades una a una.",
    ],
    keywords: ["traductor IA", "DeepL o ChatGPT", "traducir PDF con IA", "DeepL Pro precio", "traducción jurada"],
  },
  {
    slug: "research",
    category: "Documentos y presentaciones",
    title: "IA para el TFG y la investigación: qué permiten las universidades (octubre 2026)",
    description: "Perplexity, NotebookLM, Consensus, SciSpace y Semantic Scholar, más lo que piden las directrices universitarias españolas: declarar el uso de IA y no generar partes completas del trabajo.",
    checked: "2026-10-25",
    intro: "La IA puede ayudar a buscar referencias, leer artículos y ordenar ideas. Las universidades españolas están fijando normas propias: la CEU San Pablo, por ejemplo, obliga a declarar el uso de IA en la metodología y considera falta muy grave generar partes completas del TFG o no citar su uso. Lea la normativa de su facultad antes de empezar.",
    tools: [
      { name: "Perplexity", audience: "Búsqueda web con fuentes", what: "Respuestas con enlaces, modo estudio y análisis de archivos.", price: "Pro 20 $/mes; gratis 12 meses para estudiantes verificados con SheerID (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "NotebookLM", maker: "Google", audience: "Trabajar con sus propios documentos", what: "Analiza los PDF y notas que usted sube, sin buscar en la web.", price: "gratis con cuenta de Google (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "Consensus", audience: "Literatura científica", what: "Sintetiza artículos revisados por pares sobre una pregunta.", price: "plan básico gratis; 20 $/mes tras la prueba (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "SciSpace", audience: "Leer artículos difíciles", what: "Explica un PDF académico por secciones.", price: "gratis limitado; desde 20 $/mes (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "Semantic Scholar", audience: "Comprobar referencias", what: "Buscador de publicaciones científicas, útil para verificar que una cita existe.", price: "gratis", source: ZEMITH_RECHERCHE },
    ],
    workflow: [
      { step: "Leer la normativa de su universidad", detail: "Busque las directrices de IA de su centro y consulte al tutor si una tarea le genera dudas." },
      { step: "Usar la IA como apoyo", detail: "Ideas, búsqueda de referencias y tareas complementarias suelen estar permitidas; redactar apartados completos, no." },
      { step: "Verificar cada referencia", detail: "Localice cada artículo en Semantic Scholar, Dialnet, Google Scholar o el catálogo de la biblioteca. Si no aparece, fuera." },
      { step: "Documentar los prompts", detail: "Guarde los prompts y respuestas relevantes: algunas universidades piden incluirlos como anexo." },
      { step: "Declarar el uso", detail: "En la metodología, indique qué herramientas y modelos usó, para qué y por qué." },
    ],
    combos: [
      { pair: "Perplexity + biblioteca universitaria", why: "Perplexity encuentra pistas; la biblioteca da acceso al texto completo verificado." },
      { pair: "NotebookLM + Zotero", why: "Pregunte a sus PDF en NotebookLM y gestione la bibliografía en Zotero para no equivocarse al citar." },
    ],
    cautions: [
      "ChatGPT puede inventar referencias que no existen. Compruébelas todas.",
      "En la CEU San Pablo, no citar el uso de IA se considera plagio y falta muy grave según su Reglamento de Estudiantes. Otras universidades tienen reglas distintas.",
      "No suba entrevistas o encuestas con datos personales a herramientas de consumo: se aplica el RGPD.",
    ],
    keywords: ["IA para TFG", "se puede usar IA en el TFG", "declarar uso de IA TFG", "Perplexity estudiantes gratis", "NotebookLM"],
  },
  {
    slug: "business-plan",
    category: "Documentos y presentaciones",
    title: "Plan de negocio con IA para emprender en España (octubre 2026)",
    description: "Plantillas de ENISA, Lean Canvas, LivePlan y asistentes de IA: cómo usarlos para un plan que pase la revisión de ENISA, un banco o una aceleradora, y qué no dejar nunca en manos de la IA.",
    checked: "2026-10-25",
    intro: "Cada organismo pide algo distinto: ENISA, para sus préstamos participativos, tiene su propia plantilla; las aceleradoras como Wayra o Lanzadera prefieren formatos breves orientados a inversores. La IA ayuda a redactar y a poner a prueba las hipótesis, pero las cifras deben salir de presupuestos y datos reales.",
    tools: [
      { name: "Plantilla y guía de ENISA", maker: "ENISA", audience: "Quien pide un préstamo participativo", what: "Formato de plan de negocio de referencia para solicitudes a ENISA.", source: TYP_PLAN },
      { name: "Lean Canvas", audience: "Validar el modelo antes de escribir", what: "Lienzo de una página para el problema, la solución, los clientes y los ingresos.", source: TYP_PLAN },
      { name: "Canvanizer", audience: "Lienzos en equipo", what: "Herramienta en línea para trabajar lienzos de modelo de negocio.", price: "gratis", source: TYP_PLAN },
      { name: "LivePlan", audience: "Plan completo con previsiones", what: "Software de plan de negocio y previsión financiera.", source: TYP_PLAN },
      { name: "ChatGPT o Claude", audience: "Redactar y revisar", what: "Reescribe la descripción del proyecto, lista riesgos y prepara las preguntas de un analista.", price: "Plus o Pro 20 $/mes (2026-03)", source: JAVADEX_TRAD },
    ],
    workflow: [
      { step: "Elegir el destinatario", detail: "ENISA, banco, aceleradora o socios: descargue su plantilla o bases y siga su orden." },
      { step: "Validar con un lienzo", detail: "Rellene un Lean Canvas antes de escribir páginas. Si el lienzo no se sostiene, el plan tampoco." },
      { step: "Poner las cifras primero", detail: "Presupuestos, alquiler, salarios y precios con fuente. Después el texto." },
      { step: "Redactar con IA por apartados", detail: "Dé al asistente sus notas y cifras, pida un borrador por sección y reescríbalo con sus palabras." },
      { step: "Hacer de abogado del diablo", detail: "Pida a la IA las diez preguntas que haría un analista de ENISA o un banco, y responda a cada una." },
    ],
    combos: [
      { pair: "Lean Canvas + asistente IA", why: "El lienzo fija el modelo; la IA ayuda a convertirlo en texto." },
      { pair: "Plan + asesoría de un centro de emprendimiento", why: "Los programas públicos (emprende.gob.es, Plataforma PYME, cámaras de comercio) pueden revisar el plan antes de presentarlo." },
    ],
    cautions: [
      "Un estudio de mercado inventado por la IA se detecta enseguida. Cite fuentes reales (INE, asociaciones sectoriales, cámaras).",
      "No presente una cifra generada por IA como un hecho: cada importe necesita una fuente o una hipótesis escrita.",
      "Los requisitos y los importes de los préstamos de ENISA cambian por convocatoria: consulte la web de ENISA antes de solicitar.",
    ],
    keywords: ["plan de negocio IA", "plan de negocio ENISA", "plantilla plan de negocio 2026", "Lean Canvas", "plan de empresa con ChatGPT"],
  },
  {
    slug: "coding-website",
    category: "Operaciones y desarrollo",
    title: "Programar y crear webs con IA (vibe coding) en 2026",
    description: "Cursor, Bolt.new, v0, Claude Code, Windsurf, Lovable, GitHub Copilot y Replit por precio y perfil, y lo que hay que revisar antes de publicar una web que recoja datos personales.",
    checked: "2026-10-25",
    intro: "Con el vibe coding se describe una aplicación y la IA la construye. Para un prototipo funciona muy bien. Para una web que recoge datos personales o cobros, el código debe revisarse: el código generado puede traer fallos de seguridad y en España la web debe cumplir el RGPD y la LSSI (aviso legal, privacidad y cookies).",
    tools: [
      { name: "Cursor", audience: "Proyectos serios con control total", what: "Editor local con IA que modifica varios archivos; no incluye hosting.", price: "gratis 50 peticiones/mes; Pro 20 $/mes, Business 40 $/mes (2026-03)", source: JAVADEX_VIBE },
      { name: "Bolt.new", maker: "StackBlitz", audience: "Prototipos y MVP", what: "Desarrollo full-stack en el navegador con despliegue en Netlify.", price: "gratis limitado; Pro 20 $/mes (2026-03)", source: JAVADEX_VIBE },
      { name: "v0", maker: "Vercel", audience: "Diseño de interfaces", what: "Genera componentes React con Tailwind y shadcn/ui desde texto o imágenes.", price: "gratis con créditos; Pro 20 $/mes (2026-03)", source: JAVADEX_VIBE },
      { name: "Claude Code", maker: "Anthropic", audience: "Proyectos grandes, refactorizaciones", what: "Herramienta de terminal que ejecuta comandos y analiza proyectos complejos.", price: "requiere Claude Pro 20 $/mes o Max 100 $/mes (2026-03)", source: JAVADEX_VIBE },
      { name: "Lovable", audience: "Quien no quiere programar", what: "Interfaz visual con integración con Supabase (base de datos, autenticación, almacenamiento).", price: "unos 25 $/mes (2026-03)", source: JAVADEX_VIBE },
      { name: "GitHub Copilot", maker: "GitHub", audience: "Autocompletado en VS Code", what: "Completa código en el editor; no genera proyectos completos.", price: "de 0 a 10 $ según el plan (2026-03)", source: JAVADEX_VIBE },
    ],
    workflow: [
      { step: "Describir el proyecto en una página", detail: "Páginas, funciones, quién inicia sesión y qué datos se recogen." },
      { step: "Prototipar sin datos reales", detail: "Use usuarios y contenidos ficticios hasta que el código esté revisado." },
      { step: "Proteger las claves", detail: "Las claves de Supabase, Stripe o Google no pueden quedar en el código del navegador. Revise las reglas de acceso a la base de datos." },
      { step: "Añadir los textos legales", detail: "Aviso legal (LSSI), política de privacidad y banner de cookies según la guía de la AEPD antes de publicar." },
      { step: "Revisar antes de abrir", detail: "Si hay datos personales o pagos, una persona cualificada revisa el código y los permisos." },
    ],
    combos: [
      { pair: "Bolt o Lovable para el prototipo + Cursor o Claude Code para seguir", why: "Se valida la idea rápido y luego se trabaja el código en un entorno de desarrollo real." },
      { pair: "v0 + desarrollador de back-end", why: "v0 se centra en la interfaz; la lógica compleja necesita otro entorno." },
    ],
    cautions: [
      "No dé a un agente acceso a su base de datos real sin copia de seguridad.",
      "Las herramientas que generan apps con base de datos pueden dejar protecciones desactivadas por defecto. Compruebe los permisos antes de publicar.",
      "La comparativa citada no trata la seguridad ni el RGPD; esas comprobaciones corren de su cuenta.",
    ],
    keywords: ["vibe coding", "crear web con IA", "Cursor precio", "Lovable", "Bolt.new", "programar con IA"],
  },
  {
    slug: "customer-chat",
    category: "Operaciones y desarrollo",
    title: "Chatbot de IA para atención al cliente: herramientas y nueva ley (octubre 2026)",
    description: "Zendesk, Intercom Fin, Freshdesk, HubSpot, Tidio, Crisp y Botpress por precio, más dos obligaciones: avisar de que es una IA (AI Act) y, en los sectores de la Ley 10/2025, ofrecer siempre una persona.",
    checked: "2026-10-25",
    intro: "Un chatbot con IA responde las preguntas frecuentes a partir de sus documentos y pasa a una persona cuando no sabe. Desde agosto de 2026, el AI Act obliga a informar al cliente de que habla con una IA. Además, la Ley 10/2025 de servicios de atención a la clientela impide, en suministros, transporte, telecomunicaciones, correos y servicios financieros, atender solo con sistemas automáticos; las empresas tienen hasta el 28 de diciembre de 2026 para adaptarse.",
    tools: [
      { name: "Freshdesk Freddy AI", maker: "Freshworks", audience: "PYMEs con presupuesto ajustado", what: "Chatbot de autoservicio, copiloto para agentes y resumen de tickets.", price: "gratis hasta 2 agentes; desde 15 €/agente/mes (2026-03)", source: UPLIORA_ATENCION },
      { name: "Tidio (Lyro)", audience: "Tiendas online", what: "Responde sobre envíos, devoluciones y stock, recomienda productos y recupera carritos.", price: "desde 29 €/mes con Lyro incluido (2026-03)", source: UPLIORA_ATENCION },
      { name: "Crisp", audience: "Empresas que priorizan el RGPD", what: "Multicanal con respuestas generadas por IA, chatbot visual y traducción.", price: "desde 25 €/mes, equipo de 4 (2026-03)", source: UPLIORA_ATENCION },
      { name: "Intercom Fin", maker: "Intercom", audience: "Muchas consultas repetitivas", what: "Agente que resuelve solo y pasa a una persona con el contexto.", price: "desde 29 $/puesto/mes + 0,99 $ por resolución (2026-03)", source: UPLIORA_ATENCION },
      { name: "HubSpot Service Hub", maker: "HubSpot", audience: "Usuarios del CRM de HubSpot", what: "Chatbot sin código, redacción de respuestas y automatizaciones.", price: "gratis (CRM + chat básico); Starter desde 45 €/mes (2026-03)", source: UPLIORA_ATENCION },
      { name: "Botpress", audience: "Equipos técnicos", what: "Plataforma de código abierto, conectable a varios modelos y alojable en servidores propios.", price: "gratis autoalojado; nube con plan gratuito (2026-03)", source: UPLIORA_ATENCION },
    ],
    workflow: [
      { step: "Reunir las 20 preguntas más frecuentes", detail: "Salen de tickets y correos reales. El bot solo debe responder lo que cubren sus documentos." },
      { step: "Limpiar la base de respuestas", detail: "Condiciones, plazos de entrega, devoluciones y precios al día. Una fuente vieja da respuestas falsas." },
      { step: "Avisar de que es una IA", detail: "Mensaje de bienvenida claro («Está hablando con un asistente de IA»): obligación de transparencia del AI Act." },
      { step: "Ofrecer una persona desde el principio", detail: "Botón visible para hablar con un agente. En los sectores de la Ley 10/2025 es obligatorio ofrecerlo desde el inicio del contacto." },
      { step: "Revisar conversaciones cada semana", detail: "Corrija respuestas erróneas y mida cuántos casos pasan a una persona." },
    ],
    combos: [
      { pair: "Chatbot + helpdesk que ya usa", why: "La IA del mismo proveedor (Zendesk, Intercom, HubSpot) conserva el historial del cliente." },
      { pair: "Alojamiento en la UE + contrato de tratamiento", why: "Con plataformas de EE. UU., verifique la ubicación de los datos y firme el DPA." },
    ],
    cautions: [
      "Ley 10/2025 (sectores de suministros, transporte, telecomunicaciones, correos y financieros): siempre debe haber una persona disponible, el 95 % de las llamadas se atiende en menos de 3 minutos y las reclamaciones se resuelven en 15 días hábiles (5 días para facturación). Compruebe el texto del BOE.",
      "Lo que promete el chatbot compromete a la empresa igual que un agente: una respuesta falsa sobre reembolsos o plazos puede reclamarse.",
      "El cobro por resolución puede dispararse. Fije un tope mensual.",
      "Las conversaciones contienen datos personales: plazo de conservación, información al cliente y encargados en el registro de actividades.",
    ],
    keywords: ["chatbot atención al cliente IA", "Ley 10/2025 atención al cliente", "derecho a ser atendido por una persona", "Intercom Fin precio", "chatbot para pymes"],
  },
  {
    slug: "blog-seo",
    category: "Marketing y publicidad",
    title: "Blog y SEO con IA en España con AI Overviews (octubre 2026)",
    description: "Cuánto aparecen los resúmenes de IA de Google en España, qué pasa con los clics, y cómo escribir con IA sin publicar contenido genérico que el resumen ya responde.",
    checked: "2026-10-25",
    intro: "Los AI Overviews de Google ya se muestran en España: un estudio de Semrush de 2025 los situaba en torno al 15 % de las búsquedas de escritorio, casi siempre en consultas informativas. Cuando aparece un resumen, se hace menos clic en los resultados. La IA ayuda a escribir más rápido, pero un artículo que no aporta más que el resumen tiene pocas visitas.",
    tools: [
      { name: "AI Overviews y AI Mode", maker: "Google", audience: "Cualquier web que dependa de Google", what: "Resúmenes de IA sobre los resultados. En España aparecían en un 14-16 % de las SERP de escritorio, y el 88,1 % de las búsquedas que los activan son informativas.", price: "gratis para el usuario", source: M4E_AIO },
    ],
    workflow: [
      { step: "Partir de experiencia propia", detail: "Pruebas, datos propios, fotos y opinión de quien lo ha hecho: lo que el resumen de Google no puede dar." },
      { step: "Planificar con IA", detail: "Pida las preguntas que se hace el lector y quédese con aquellas en las que tiene algo real que aportar." },
      { step: "Escribir y revisar", detail: "La IA hace un borrador; usted lo reescribe con sus ejemplos y comprueba cada dato y cada nombre." },
      { step: "Firmar y citar fuentes", detail: "Autor identificado, fecha de actualización y enlaces a las fuentes. También ayuda a que los buscadores con IA le citen." },
      { step: "Medir clics, no solo posiciones", detail: "Con resúmenes de IA, una buena posición puede traer menos clics. Compare en Search Console." },
    ],
    combos: [
      { pair: "Contenido original + datos estructurados", why: "Las marcas de artículo, FAQ o producto ayudan a los buscadores a entender y citar la página." },
      { pair: "Blog + newsletter", why: "Una lista de suscriptores reduce la dependencia del tráfico de Google." },
    ],
    cautions: [
      "Según Pew Research (2025, recogido por Semrush), cuando aparece un resumen de IA solo el 8 % de los usuarios hace clic en un resultado tradicional, frente al 15 % sin resumen.",
      "Los datos de España citados son de mayo de 2025; la cobertura de AI Overviews ha crecido desde entonces.",
      "Publicar en masa artículos generados sin valor añadido va contra las políticas antispam de Google.",
    ],
    keywords: ["SEO con IA", "AI Overviews España", "redactar blog con IA", "caída de tráfico SEO", "AI Mode Google español"],
  },
];
