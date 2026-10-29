---
layout: ../../../layouts/AnalysisLayout.astro
lang: es
slug: cardnews-production
title: "Crear tarjetas con IA: del borrador a comprobar las fuentes"
description: "Un ejemplo de tres tarjetas separa redacción, renderizado, revisión y publicación, con errores y texto accesible."
date: "2026-10-29"
---

Aprueba las frases antes de decorarlas. Pedir a un modelo que diseñe y verifique a la vez puede ocultar errores tras una imagen atractiva. Aquí usamos el renderizador SVG determinista de OIYO. No comparamos prestaciones, precios ni derechos comerciales de servicios de imagen o vídeo.

<figure class="cost-chart"><figcaption>Fuente → 3 ideas → 3 tarjetas → revisión → publicación</figcaption><ol><li>1. Una afirmación y una fuente por tarjeta</li><li>2. Empieza con una entrada pequeña</li><li>3. Revisa la imagen y el texto legible</li></ol></figure>

## 1. Una afirmación y una fuente por tarjeta

La primera tarjeta plantea la pregunta, la segunda aporta pruebas y condiciones y la tercera propone un siguiente paso. Pide un borrador al modelo dentro de esas funciones; después abre el original y revisa cifras, fechas y excepciones. No añadas causalidad ni predicciones que la fuente no respalde. Los temas jurídicos y financieros también necesitan jurisdicción y fecha de aplicación.

## 2. Empieza con una entrada pequeña

La descarga contiene tres tarjetas en inglés sobre accesibilidad. El archivo es público; el comando está destinado a quienes tienen el repositorio OIYO News. Sin ese entorno puedes usar la estructura como ficha editorial o guardar el ejemplo SVG en otro archivo y abrirlo en un navegador.

[Descargar el ejemplo](/examples/cardnews-deck.json)

<figure class="cost-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" role="img" aria-labelledby="example-name"><title id="example-name">Source, draft, review</title><rect width="600" height="300" rx="12" fill="#14283a"/><text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text></svg><figcaption>Ejemplo SVG para abrir en el navegador</figcaption></figure>

```sh
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example --dry-run
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example
```

<details><summary>Ejemplo SVG para abrir en el navegador</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="name">
  <title id="name">Source, draft, review</title>
  <rect width="600" height="300" fill="#14283a"/>
  <text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text>
</svg>
```

</details>

## 3. Revisa la imagen y el texto legible

La salida incluye tarjetas SVG, una vista HTML con el mismo texto y un manifiesto de borrador. Generar archivos no acredita exactitud ni publicación. Comprueba los saltos de línea en un móvil y que la información esencial pueda leerse sin ver la imagen. El title de SVG no sustituye una descripción larga de un gráfico.

## ¿Cómo resolver los fallos?

<div class="table-scroll" tabindex="0" role="region" aria-label="¿Cómo resolver los fallos?"><table><caption>¿Cómo resolver los fallos?</caption><thead><tr><th scope="col">Fallo</th><th scope="col">Respuesta</th></tr></thead><tbody><tr><th scope="row">Solo 2 tarjetas, o 9 tarjetas</th><td>Mantén entre 3 y 8 tarjetas o divide el tema.</td></tr><tr><th scope="row">Texto superior a 220 caracteres</th><td>Divide la afirmación sin eliminar sus condiciones esenciales.</td></tr><tr><th scope="row">La carpeta de salida ya existe</th><td>Usa otra carpeta para conservar la versión revisada.</td></tr><tr><th scope="row">Falta una fuente o no respalda la afirmación</th><td>Detén la publicación y revisa el original aunque el renderizado funcione.</td></tr></tbody></table></div>

## Antes de publicar

Comprueba original, fechas, cifras y alcance. Revisa por separado los derechos de imágenes, tipografías y música. Abre los SVG y HTML guardados. Envía solo archivos aprobados al proceso existente. El renderizador no inicia sesión, sube archivos ni envía correos.

## Fuentes y alcance de la verificación

Este artículo documenta la entrada y salida de nuestro renderizador. No se han medido velocidad de producción, ingresos ni alcance.

- [MDN: SVG title](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
