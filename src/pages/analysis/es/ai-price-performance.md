---
layout: ../../../layouts/AnalysisLayout.astro
lang: es
slug: ai-price-performance
title: "Precio y rendimiento de la IA: qué revisar antes de elegir ChatGPT, Claude o Gemini"
description: "La suscripción, el precio de los tokens API y los rankings miden cosas distintas. Compara el coste por tarea válida, el tiempo de revisión y las necesidades de tu trabajo."
date: "2026-10-15"
---

Poner una tarifa junto a un ranking de rendimiento parece suficiente para elegir una IA. Pero la cuota mensual describe el acceso a una aplicación, el precio API describe la facturación por uso y el benchmark refleja un examen concreto. Mezclarlos en una sola clasificación puede llevarte a elegir un modelo barato y terminar trabajando más tiempo.

Esta guía se basa en documentación oficial y métodos de evaluación. No es un ranking general de los últimos modelos ni un experimento práctico con los productos. La comparación A/B es hipotética; la [tabla de precios oficiales de API](#official-prices-title) indica por separado su fecha de comprobación y sus condiciones.

## 1. Separa la suscripción, el modelo y la API

Una aplicación de chat, un agente de programación y una API directa pueden usar el mismo nombre de modelo y funcionar de formas distintas. La búsqueda o edición de archivos integrada puede influir en el resultado tanto como la capacidad de respuesta del modelo. Empieza anotando **plan, versión del modelo, herramientas permitidas y fecha de comprobación** junto a cada candidato.

<div class="table-scroll" tabindex="0" role="region" aria-label="Tipos de productos de IA que se comparan">
<table><caption>Primero identifica qué compras o comparas</caption><thead><tr><th scope="col">Objeto</th><th scope="col">Condiciones que revisar</th><th scope="col">Lo que no puedes deducir solo de ellas</th></tr></thead><tbody><tr><th scope="row">Suscripción a una aplicación</th><td>Herramientas, límites, reinicios de cuota y gestión de equipos</td><td>Si incluye todas las llamadas API</td></tr><tr><th scope="row">API</th><td>Modelo, proveedor, entradas, salidas, caché y herramientas</td><td>La comodidad global de una aplicación que use ese modelo</td></tr><tr><th scope="row">Agente</th><td>Modelo, entorno, permisos y presupuesto de reintentos</td><td>Si la puntuación corresponde solo al modelo</td></tr></tbody></table>
</div>

Tampoco es exacto memorizar que «suscripción y API siempre van por separado». Revisa las cuotas de la aplicación, los cargos por llamadas API directas y los créditos API o las integraciones autorizadas que el plan incluya expresamente. Por ejemplo, la [tarifa oficial de Claude](https://claude.com/pricing) presenta créditos API en algunos planes. Las condiciones de acceso determinan el beneficio real.

La [documentación de Sign in with ChatGPT](https://developers.openai.com/siwc/quickstart) de OpenAI también distingue los permisos de inicio de sesión del acceso API que utiliza un plan ChatGPT. Un botón de acceso no significa que cualquier servicio pueda aprovechar una suscripción sin límites. Comprueba los requisitos de la aplicación, el alcance autorizado por el usuario y las condiciones aplicables.

## 2. Una tarifa API no tiene un único precio

La [documentación de precios de OpenAI](https://developers.openai.com/api/docs/pricing) separa entrada, caché, salida y herramientas. Los [precios de la API de Claude](https://platform.claude.com/docs/en/about-claude/pricing) distinguen escritura y lectura de caché, llamadas normales y procesamiento por lotes. Los [precios de Gemini](https://ai.google.dev/gemini-api/docs/pricing) detallan la disponibilidad gratuita o de pago por modelo, las salidas que incluyen tokens de razonamiento y las condiciones de caché y búsqueda.

Comparar solo «cuánto cuesta un millón de tokens de entrada» deja conceptos fuera. Iguala modelo, longitud de contexto, método de procesamiento, región y periodo promocional antes de calcular lo facturable. Aplica las condiciones de caché únicamente a la parte que corresponda. Si se cobra la escritura o el almacenamiento, usar solo la tarifa reducida de lectura subestima el coste.

Para cada intento, suma **entrada sin caché + costes de caché + salida facturable + herramientas y almacenamiento**, y después suma todos los intentos. No vuelvas a añadir reintentos ya incluidos: agrega solo los costes que falten. Tampoco cuentes dos veces los tokens de razonamiento si ya forman parte de la salida facturada. Es preferible consultar el consumo real a convertir los caracteres coreanos en tokens mediante una proporción fija.

## 3. Una llamada barata no equivale a una tarea terminada a bajo coste

Proponemos comparar **coste total dividido entre resultados que cumplen criterios definidos de antemano**. El ejemplo muestra cómo la revisión cambia la elección. A y B no son productos reales: cada uno hace 100 intentos, sin reintentos. Para simplificar, solo se revisan los resultados aceptados y los fallidos se descartan.

<div class="table-scroll" tabindex="0" role="region" aria-label="Comparación hipotética del coste de tareas">
<table><caption>Ejemplo hipotético · importes en USD · revisión valorada en $0.30 por minuto</caption><thead><tr><th scope="col">Concepto</th><th scope="col">A</th><th scope="col">B</th></tr></thead><tbody><tr><th scope="row">Coste de 100 llamadas</th><td>$2.00</td><td>$5.00</td></tr><tr><th scope="row">Resultados aceptados</th><td>60</td><td>95</td></tr><tr><th scope="row">Revisión por resultado aceptado</th><td>3 minutos</td><td>0,5 minutos</td></tr><tr><th scope="row">Coste de revisión</th><td>$54.00</td><td>$14.25</td></tr><tr><th scope="row">Coste total</th><td>$56.00</td><td>$19.25</td></tr><tr><th scope="row">Coste total por resultado aceptado</th><td>Aprox. $0.93</td><td>Aprox. $0.20</td></tr></tbody></table>
</div>

<figure class="cost-chart"><p><strong>A · $56.00</strong><meter min="0" max="56" value="56" aria-label="Coste total de A: 56 dólares">56 / 56</meter></p><p><strong>B · $19.25</strong><meter min="0" max="56" value="19.25" aria-label="Coste total de B: 19,25 dólares">19.25 / 56</meter></p><figcaption>Costes totales hipotéticos. Ambas barras tienen un máximo de $56 e incluyen la revisión de la tabla, no solo las llamadas. No es un gráfico de rendimiento medido.</figcaption></figure>

A tiene llamadas más baratas, pero con estas hipótesis B ofrece resultados aceptados con menor coste total. La conclusión cambiaría si apenas hiciera falta revisar o si B no cumpliera tus criterios. El ejemplo no demuestra que un modelo caro sea siempre mejor.

En la práctica, incluye cuando corresponda el tiempo para detectar fallos, reintentar, corregir, esperar y desarrollar integraciones. Explica cómo repartes la cuota mensual fija entre tareas. Los modelos locales también consumen electricidad, hardware y tiempo de operación: no tener factura por tokens no significa coste total cero.

## 4. Los benchmarks son un mapa, no una garantía

La [metodología de inteligencia de Artificial Analysis](https://artificialanalysis.ai/methodology/intelligence-benchmarking/) combina varios exámenes para comparar modelos. Una puntuación alta no demuestra que el modelo sea también el mejor con documentos administrativos coreanos, música o revisión de contratos. Comprueba primero qué capacidades e idiomas se miden.

[SWE-bench Verified](https://www.swebench.com/verified.html) utiliza 500 casos revisados por personas. Para interpretar resultados de programación, mira la configuración del agente, las herramientas, el número de intentos y el entorno de evaluación, además del nombre del modelo. No leas puntuaciones de sistemas o versiones de examen distintos como una diferencia pura de capacidad entre modelos.

Lo mismo ocurre con la velocidad. Producir tokens rápidamente no termina antes la tarea si la respuesta tarda en empezar o exige varias correcciones. La [metodología de rendimiento de Artificial Analysis](https://artificialanalysis.ai/methodology/performance-benchmarking) distingue la latencia del primer token, la velocidad de salida y otras medidas. En tu comparación, mide también **el tiempo desde la entrada hasta terminar la revisión**.

## 5. Si cambia el trabajo, cambian los criterios

<div class="table-scroll" tabindex="0" role="region" aria-label="Preguntas de evaluación de IA por tarea">
<table><caption>Preguntas para pequeñas pruebas comparativas, no recomendaciones de productos</caption><thead><tr><th scope="col">Tarea</th><th scope="col">Qué comprobar primero</th></tr></thead><tbody><tr><th scope="row">Búsqueda jurídica y administrativa</th><td>Existencia de normas, sentencias y anuncios; jurisdicción, vigencia, excepciones y ubicación original</td></tr><tr><th scope="row">Lectura de información y estados financieros</th><td>Unidades, periodos, cuentas consolidadas o individuales, notas y cálculos verificables</td></tr><tr><th scope="row">Educación y redacción</th><td>Conceptos erróneos, omisiones, nivel del lector, esfuerzo de corrección, pruebas y explicaciones</td></tr><tr><th scope="row">Música y contenido social</th><td>Adecuación al propósito, posibilidades de edición, derechos de uso y autorización para publicar fuera</td></tr></tbody></table>
</div>

La tabla no elige ganadores por sector: plantea preguntas para diseñar pequeñas pruebas con material público o propio. No la utilices como consejo que sustituya decisiones jurídicas o financieras individuales. Antes de enviar contratos sensibles, datos de cuentas o información personal a un servicio externo, comprueba los usos permitidos y las condiciones de datos. Una modalidad gratuita no autoriza a tratar información sensible. Lee también las condiciones relacionadas con los precios, como los [términos de Gemini](https://ai.google.dev/gemini-api/terms).

## 6. Antes de pagar, céntrate en una tarea repetida

Escribe en una frase una tarea habitual y sus criterios: «Extraer la tabla de este PDF con unidades y totales correctos, permitiendo que una persona encuentre el original». Después entrega el mismo material a varios candidatos accesibles y registra errores, tiempo de corrección y coste. Si publicas la comparación, incluye versiones, herramientas, fechas, número de intentos y fallos.

«La herramienta gratuita que ya tengo basta» o «es mejor hacerlo directamente a mano» son conclusiones válidas. El criterio no es un ranking más alto ni una suscripción mayor, sino **obtener resultados que cumplan tus estándares con un coste y un tiempo asumibles**.

### Alcance de la comprobación y fuentes

Consultamos los documentos oficiales y las metodologías enlazadas el 15 de octubre de 2026. No es una tarifa exhaustiva que verifique todos los planes y modelos. Revisa las condiciones más recientes del producto antes de pagar. Los cálculos hipotéticos y las preguntas por tarea son ejemplos editoriales de OIYO, no sustitutos de pruebas prácticas ni de una evaluación profesional de idoneidad.
