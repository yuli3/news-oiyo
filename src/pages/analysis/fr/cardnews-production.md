---
layout: ../../../layouts/AnalysisLayout.astro
lang: fr
slug: cardnews-production
title: "Créer des cartes avec l’IA : du brouillon à la vérification"
description: "Un exemple de trois cartes distingue rédaction, rendu, contrôle et publication, avec erreurs et texte accessible."
date: "2026-10-29"
---

Validez les phrases avant de les décorer. Confier simultanément la mise en page et la vérification à un modèle peut masquer une erreur derrière une belle image. Nous utilisons ici le moteur SVG déterministe d’OIYO. Ce guide ne compare ni les performances ni les prix ou droits commerciaux des services d’image et de vidéo.

<figure class="cost-chart"><figcaption>Source → 3 idées → 3 cartes → contrôle → publication</figcaption><ol><li>1. Une affirmation et une source par carte</li><li>2. Commencez par une petite entrée</li><li>3. Contrôlez l’image et le texte lisible</li></ol></figure>

## 1. Une affirmation et une source par carte

La première carte pose la question, la deuxième présente les preuves et conditions, la troisième propose une action. Faites rédiger le modèle dans ce cadre, puis ouvrez vous-même l’original pour contrôler chiffres, dates et exceptions. N’ajoutez pas de causalité ou de prévision absente de la source. Un sujet juridique ou financier exige aussi une juridiction et une date d’application.

## 2. Commencez par une petite entrée

Le fichier téléchargeable contient trois cartes en anglais sur l’accessibilité. Il est public ; la commande s’adresse aux personnes disposant du dépôt OIYO News. Sans cet environnement, utilisez la structure comme fiche éditoriale, ou enregistrez l’exemple SVG dans un fichier distinct pour l’ouvrir dans un navigateur.

[Télécharger l’exemple](/examples/cardnews-deck.json)

<figure class="cost-chart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" role="img" aria-labelledby="example-name"><title id="example-name">Source, draft, review</title><rect width="600" height="300" rx="12" fill="#14283a"/><text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text></svg><figcaption>Exemple SVG à ouvrir dans un navigateur</figcaption></figure>

```sh
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example --dry-run
npm run cards:render -- --input public/examples/cardnews-deck.json --out /tmp/oiyo-cardnews-example
```

<details><summary>Exemple SVG à ouvrir dans un navigateur</summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" role="img" aria-labelledby="name">
  <title id="name">Source, draft, review</title>
  <rect width="600" height="300" fill="#14283a"/>
  <text x="30" y="150" fill="#ffffff" font-size="32">Source → Draft → Review</text>
</svg>
```

</details>

## 3. Contrôlez l’image et le texte lisible

Le résultat comprend les cartes SVG, un aperçu HTML reprenant le même texte et un manifeste de brouillon. Un rendu réussi ne prouve ni l’exactitude ni la publication. Vérifiez les retours à la ligne sur un écran étroit. Les informations essentielles doivent rester disponibles sans voir l’image. Le title SVG ne remplace pas la description longue d’un graphique.

## Que faire en cas d’échec ?

<div class="table-scroll" tabindex="0" role="region" aria-label="Que faire en cas d’échec ?"><table><caption>Que faire en cas d’échec ?</caption><thead><tr><th scope="col">Échec</th><th scope="col">Réponse</th></tr></thead><tbody><tr><th scope="row">Seulement 2 cartes, ou 9 cartes</th><td>Restez entre 3 et 8 cartes, ou scindez le sujet.</td></tr><tr><th scope="row">Texte de plus de 220 caractères</th><td>Séparez l’affirmation au lieu de supprimer ses réserves essentielles.</td></tr><tr><th scope="row">Dossier de sortie déjà présent</th><td>Choisissez un nouveau dossier pour préserver la version contrôlée.</td></tr><tr><th scope="row">Source absente ou insuffisante</th><td>Suspendez la publication et consultez l’original, même si le rendu fonctionne.</td></tr></tbody></table></div>

## Avant publication

Contrôlez original, dates, chiffres et périmètre. Vérifiez séparément les droits des images, polices et musiques. Ouvrez les SVG et le HTML enregistrés. Transmettez uniquement les fichiers approuvés au circuit existant. Le moteur ne se connecte à aucun compte, ne téléverse rien et n’envoie aucun courriel.

## Sources et périmètre vérifié

Cet article décrit le contrat d’entrée et de sortie de notre moteur. Vitesse de production, revenus et portée ne sont pas mesurés.

- [MDN: SVG title](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title)
- [W3C WAI: Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
