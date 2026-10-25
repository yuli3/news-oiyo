// AI use-case guides for France (French, vouvoiement), checked 2026-10-20: 8 guides + keyword map.
import type { Guide, KeywordCategory } from "../ai-use-cases";

export const keywordMap: KeywordCategory[] = [
  {
    category: "Métiers spécialisés",
    cases: [
      { name: "Juridique et contrats", slug: "legal", keywords: ["IA juridique", "IA avocat", "analyse de contrat IA", "recherche jurisprudence IA", "Doctrine prix", "Ordalie avis"] },
      { name: "Droit du travail et RH", slug: "labor", keywords: ["IA droit du travail", "IA RH paie", "calcul indemnité de licenciement", "convention collective IA", "Payfit IA"] },
      { name: "Fiscalité et comptabilité", slug: "tax-accounting", keywords: ["IA comptabilité", "logiciel comptable IA", "IA expert-comptable", "facturation électronique 2026", "assistant impots.gouv"] },
      { name: "Démarches administratives", keywords: ["IA démarches administratives", "lettre administrative IA", "courrier CAF IA", "réclamation IA"] },
      { name: "Brevets et marques", keywords: ["recherche antériorité marque IA", "dépôt de marque INPI", "recherche brevet IA"] },
      { name: "Immobilier et bail", keywords: ["bail de location IA", "état des lieux IA", "annonce immobilière IA"] },
      { name: "Comptes et bilans d'entreprise", keywords: ["analyse bilan IA", "lire un bilan comptable", "comptes annuels entreprise IA"] },
    ],
  },
  {
    category: "Documents et présentations",
    cases: [
      { name: "Présentations (PowerPoint)", slug: "presentation", keywords: ["IA présentation PowerPoint", "créer un diaporama avec l'IA", "Gamma avis", "Copilot PowerPoint", "IA PowerPoint gratuit"] },
      { name: "Rapports et business plan", slug: "business-plan", keywords: ["business plan IA", "rédiger un rapport avec l'IA", "dossier de financement IA"] },
      { name: "Comptes rendus de réunion", slug: "meeting-notes", keywords: ["compte rendu réunion IA", "transcription IA français", "résumé de réunion IA"] },
      { name: "Excel et données", slug: "spreadsheet", keywords: ["IA Excel formules", "tableau croisé dynamique IA", "nettoyer des données IA"] },
      { name: "Traduction", slug: "translation", keywords: ["traduction IA document", "traduire un PDF IA", "DeepL ou ChatGPT"] },
      { name: "Mémoire et recherche", slug: "research", keywords: ["IA mémoire de fin d'études", "recherche documentaire IA", "résumer un article scientifique IA"] },
    ],
  },
  {
    category: "Design et impression",
    cases: [
      { name: "Affiches", slug: "poster", keywords: ["créer une affiche avec l'IA", "affiche événement IA", "affiche A3 à imprimer", "générateur d'affiche IA"] },
      { name: "Flyers, dépliants et menus", slug: "pamphlet", keywords: ["flyer IA", "dépliant 3 volets IA", "brochure IA", "menu restaurant IA"] },
      { name: "Logo et cartes de visite", keywords: ["logo IA gratuit", "carte de visite IA", "charte graphique IA"] },
      { name: "Fiches produit e-commerce", keywords: ["fiche produit IA", "description produit Shopify IA", "photo produit fond blanc IA"] },
      { name: "Visuels réseaux sociaux", keywords: ["carrousel Instagram IA", "miniature YouTube IA", "visuel LinkedIn IA"] },
    ],
  },
  {
    category: "Marketing et publicité",
    cases: [
      { name: "Images publicitaires", slug: "ad-image", keywords: ["image publicitaire IA", "photo produit IA", "bannière pub IA", "visuel Meta Ads IA", "Photoroom"] },
      { name: "Vidéos publicitaires", slug: "ad-video", keywords: ["vidéo publicitaire IA", "Veo 3.1", "Kling IA", "Runway", "vidéo TikTok IA"] },
      { name: "Slogans et accroches", keywords: ["slogan IA", "accroche publicitaire IA", "copywriting IA français"] },
      { name: "Gestion des réseaux sociaux", keywords: ["IA réseaux sociaux", "Reels IA", "planifier ses posts IA"] },
      { name: "Blog et SEO", slug: "blog-seo", keywords: ["rédaction SEO IA", "article de blog IA", "référencement IA"] },
      { name: "Voix off et musique", keywords: ["voix off IA français", "ElevenLabs français", "musique libre de droits IA"] },
    ],
  },
  {
    category: "Gestion et développement",
    cases: [
      { name: "Chatbot service client", slug: "customer-chat", keywords: ["chatbot service client IA", "SAV automatisé IA", "chatbot WhatsApp entreprise"] },
      { name: "Code et création de site", slug: "coding-website", keywords: ["coder avec l'IA", "vibe coding", "créer un site web avec l'IA"] },
      { name: "Automatisation et agents", keywords: ["agent IA entreprise", "automatiser des tâches IA", "MCP"] },
      { name: "Recrutement", keywords: ["fiche de poste IA", "tri de CV IA", "entretien d'embauche IA"] },
      { name: "Supports de formation", keywords: ["support de formation IA", "créer un quiz IA", "e-learning IA"] },
    ],
  },
];

const PLATEYA_LEGAL = { label: "Plateya · comparatif IA juridiques (2026-04-27)", url: "https://www.plateya.fr/blog/detail/meilleures-ia-juridiques-2026-comparatif-des-10-outils-cles" };
const LEXIS_PROTEGE = { label: "LexisNexis France · Lexis+ avec Protégé (page produit, 2026)", url: "https://www.lexisnexis.com/fr-fr/produits/lexis-plus-protege" };
const LEXIS_MISTRAL = { label: "LexisNexis · intégration de Mistral dans Lexis+ avec Protégé (2026-07-09)", url: "https://www.lexisnexis.com/community/pressroom/b/news/posts/lexisnexis-announces-the-integration-of-mistral-in-lexis-with-protege-in-france" };
const DIGITIZ_SLIDES = { label: "Digitiz · alternatives à PowerPoint (2026-08-06, mis à jour 2026-10-04)", url: "https://digitiz.fr/blog/alternatives-powerpoint/" };
const PPTAI_2026 = { label: "PPT.AI · comparatif des générateurs de présentations (2026-05-21)", url: "https://ppt.ai/fr/blog/best-ai-ppt-maker-2026" };
const FORMALIVE_CANVA = { label: "Formalive · avis Canva (2026-04-23)", url: "https://www.formalive.fr/avis-canva/" };
const CANVA_PRINT = { label: "Canva · aide commander des impressions (consulté 2026-10)", url: "https://www.canva.com/fr_be/help/order-prints/" };
const FUTURA_IMAGES2 = { label: "Futura (2026-04-23)", url: "https://futura-sciences.com/tech/actualites/intelligence-artificielle-image-20-sorti-chatgpt-fait-bond-geant-generation-images-aura-beaucoup-impact-133957/" };
const TECHINSIDER_LECHAT = { label: "Tech Insider · Le Chat vs ChatGPT (2026-03-18, mis à jour 2026-08-19)", url: "https://tech-insider.org/fr/mistral-ai-le-chat-vs-chatgpt-2026/" };
const FIREFLY_APR = { label: "Stéphane Larue · Adobe Firefly (2026-04-01)", url: "https://stephanelarue.com/adobe-firefly-reunit-runway-sora-2-et-kling-dans-un-seul-outil-creatif/" };
const FIREFLY_SEP = { label: "Tutkit · Adobe Firefly, nouveaux modèles et partenariats (2026-09-28)", url: "https://www.tutkit.com/en/blog/833-adobe-firefly-continues-to-grow-with-new-models-and-partnerships" };
const PHOTOROOM_H1 = { label: "Photoroom · récap produit S1 2026 (2026-07-01)", url: "https://www.photoroom.com/inside-photoroom/new-in-photoroom-h1-2026-product-recap" };
const FLOW_MAR = { label: "design-offset · mises à jour Google Flow (2026-03-21, mis à jour 2026-04-04)", url: "https://design-offset.com/202603-google-flow-updates/" };
const KLING3 = { label: "Pasquale Pillitteri · guide Kling 3.0 (2026)", url: "https://pasqualepillitteri.it/en/news/2354/kling-ai-3-0-complete-guide-kuaishou-video-generator" };
const RUNWAY_PRICING = { label: "eesel AI · tarifs Runway (2026-06-05, mis à jour 2026-08-31)", url: "https://www.eesel.ai/en/blog/runway-ai-pricing" };
const ELEVEN = { label: "Comparateur-IA · fiche ElevenLabs (2026-03-17)", url: "https://comparateur-ia.com/?p=55" };

export const guides: Guide[] = [
  {
    slug: "legal",
    category: "Métiers spécialisés",
    title: "Les IA juridiques pour avocats et juristes en France (octobre 2026)",
    description: "Doctrine, GenIA-L, Lexis+ avec Protégé, Ordalie, Jimini : ce que fait chaque IA juridique, comment les combiner pour la recherche et les contrats, et les règles du CNB.",
    checked: "2026-10-20",
    intro: "Le marché français de l'IA juridique s'est concentré en 2025-2026 : Doctrine a racheté Predictice, LexisNexis a renommé sa plateforme Lexis+ avec Protégé et les éditeurs proposent désormais des assistants qui rédigent autant qu'ils cherchent. Ces outils visent surtout les avocats et les directions juridiques. Pour un particulier, ils servent à préparer ses questions avant un rendez-vous, pas à remplacer un avocat.",
    tools: [
      { name: "Doctrine", maker: "Doctrine", audience: "Avocats, juristes d'entreprise", what: "Recherche de jurisprudence française, analyse prédictive héritée de Predictice (rachetée en septembre 2025) et Doctrine Flow pour l'ouverture de dossier et la rédaction. Hébergement dans l'UE (Allemagne).", price: "sur devis (2026-04)", source: PLATEYA_LEGAL },
      { name: "GenIA-L", maker: "Lefebvre Dalloz", audience: "Avocats, juristes", what: "Recherche en langage naturel dans les fonds Lefebvre Dalloz avec sources citées. Le mode Assistant analyse, résume, compare et extrait des données de vos documents. Offre spécifique pour les avocats du Barreau de Paris exerçant seuls ou à deux, avec 500 requêtes par utilisateur et par mois par défaut.", source: { label: "Lefebvre Dalloz · CGV GenIA-L Barreau de Paris (version juillet 2026)", url: "https://assistance.lefebvre-dalloz.fr/wp-content/uploads/2026/07/CGV-GenIA-L-Assistant-Barreau-Paris-juillet-2026-fusion.pdf" } },
      { name: "Lexis+ avec Protégé", maker: "LexisNexis", audience: "Cabinets, directions juridiques", what: "Rédaction de notes et clauses, recherche vérifiée sur les sources LexisNexis et vos bases internes, synthèse et chronologie à partir de plusieurs documents. Choix de modèles généralistes (OpenAI, Anthropic, Mistral) hébergés en Europe. Sortie de la plateforme renommée en France en septembre 2026.", price: "sur devis", source: LEXIS_PROTEGE },
      { name: "Ordalie", maker: "Ordalie", audience: "Avocats indépendants, petits cabinets", what: "Recherche juridique sourcée vers les textes officiels, analyse de pièces et chronologie de dossier, comparaison de clauses, workflows prédéfinis. Hébergement en France.", price: "plan gratuit limité à 10 requêtes par semaine ; offre Pro payante, tarif à vérifier (2026-04)", source: { label: "Plateya · Ordalie pour avocats indépendants (2026-04-29)", url: "https://www.plateya.fr/blog/detail/ordalie-lia-juridique-pour-avocats-independants-en-2026" } },
      { name: "Jimini", maker: "Jimini AI", audience: "Cabinets et juristes attentifs à la confidentialité", what: "Recherche unique dans les codes, la jurisprudence et vos documents internes avec citations, aide à la rédaction. Hébergement en France, certification ISO 27001.", source: PLATEYA_LEGAL },
    ],
    workflow: [
      { step: "Poser le problème", detail: "Rédigez les faits dans l'ordre chronologique et formulez vos questions juridiques une par une. Anonymisez les noms, adresses et numéros avant de les confier à une IA généraliste (ChatGPT, Claude, Le Chat)." },
      { step: "Chercher la jurisprudence", detail: "Passez par un outil entraîné sur le droit français (Doctrine, GenIA-L, Lexis+ avec Protégé, Ordalie). Ouvrez chaque décision citée sur Légifrance ou Judilibre pour vérifier qu'elle existe et dit bien ce qu'on lui prête." },
      { step: "Rédiger un premier jet", detail: "Demandez une note ou des conclusions en exigeant la référence de chaque article et de chaque décision utilisés, pour pouvoir tout contrôler." },
      { step: "Relire un contrat", detail: "Faites repérer les clauses déséquilibrées ou manquantes, puis choisissez vous-même les reformulations selon votre position de négociation." },
      { step: "Archiver proprement", detail: "Rangez les recherches et versions dans le dossier client, avec la date de la recherche, car la jurisprudence évolue." },
    ],
    combos: [
      { pair: "Base juridique spécialisée + IA généraliste pour le style", why: "La fiabilité des sources vient de l'outil juridique, la clarté du texte de l'IA généraliste. Les vérifications se font toujours dans l'outil juridique." },
      { pair: "IA juridique + Légifrance / Judilibre", why: "Les sources publiques gratuites permettent de contrôler chaque citation avant de l'utiliser dans un acte." },
      { pair: "Assistant d'analyse documentaire + chronologie", why: "Pour un dossier volumineux, extraire une chronologie des pièces fait gagner du temps sur la relecture des faits." },
    ],
    cautions: [
      "Le CNB a adopté le 17 mars 2026 un guide sur la déontologie et l'IA : secret professionnel, conformité au RGPD, compétence, prudence, indépendance, information du client et juste fixation des honoraires restent la règle.",
      "Ne versez pas de pièces couvertes par le secret dans un outil dont vous ne connaissez pas l'hébergement ni la politique de réutilisation des données.",
      "Une IA généraliste peut inventer une décision ou un numéro de pourvoi. Rien n'entre dans un acte sans vérification de la source.",
      "Les tarifs publiés par les comparatifs divergent d'un site à l'autre. Demandez un devis ou consultez la page tarifs de l'éditeur avant de vous engager.",
    ],
    keywords: ["IA juridique avocat", "Doctrine IA prix", "GenIA-L Lefebvre Dalloz", "Lexis+ avec Protégé", "Ordalie gratuit", "IA analyse de contrat"],
  },
  {
    slug: "labor",
    category: "Métiers spécialisés",
    title: "Droit du travail et RH : quelles IA et quels outils en France (octobre 2026)",
    description: "Code du travail numérique, Payfit AI, Lamyline New, Doctrine : les outils pour vérifier un préavis, une indemnité ou une convention collective, salarié ou employeur.",
    checked: "2026-10-20",
    intro: "En France, il n'existe pas à ce jour de service public d'IA dédié au droit du travail. L'outil de référence gratuit reste le Code du travail numérique, avec ses simulateurs et ses modèles de lettres. Côté entreprise, les logiciels de paie et les éditeurs juridiques ajoutent des assistants IA qui répondent en tenant compte de votre convention collective.",
    tools: [
      { name: "Code du travail numérique", maker: "Ministère du Travail", audience: "Salariés et employeurs", what: "Pas d'assistant IA, mais des simulateurs officiels (indemnité de licenciement, rupture conventionnelle, préavis, salaire brut/net), une recherche de convention collective par nom d'entreprise, SIRET ou IDCC, et des modèles de lettres (démission, convocation à entretien préalable).", price: "gratuit", source: { label: "code.travail.gouv.fr · outils (consulté 2026-10-20)", url: "https://code.travail.gouv.fr/outils" } },
      { name: "Payfit AI (Payfit Copilot)", maker: "Payfit", audience: "TPE et PME clientes de Payfit, RH et salariés", what: "Agent IA paie et RH entraîné sur la législation française, qui s'appuie sur votre convention collective et les données de l'entreprise et répond avec ses sources. Données hébergées en Europe, échanges non utilisés pour entraîner des modèles publics. La validation finale de la paie reste à l'employeur.", price: "offre Starter à 26 € par mois et par salarié ; IA sur démonstration (2026-07)", source: { label: "Payfit · SIRH et assistance IA pour la paie (2026-07-31)", url: "https://payfit.com/fr/fiches-pratiques/logiciels-sirh-assistance-ia-pour-la-gestion-de-la-paie/" } },
      { name: "Lamyline New", maker: "Lefebvre Dalloz", audience: "Juristes et RH en droit social", what: "Base orientée droit du travail, avec des réponses adaptées au niveau d'expertise de l'utilisateur et un partenariat avec Pappers pour les données d'entreprise. Hébergement européen.", price: "sur devis (2026-04)", source: PLATEYA_LEGAL },
      { name: "Doctrine (analyse prédictive ex-Predictice)", maker: "Doctrine", audience: "Avocats en droit social, DRH", what: "L'analyse des décisions de justice pour estimer les chances de succès et les montants d'indemnisation, très utilisée en droit du travail, est désormais intégrée à Doctrine.", price: "sur devis (2026-04)", source: PLATEYA_LEGAL },
    ],
    workflow: [
      { step: "Rassembler les chiffres", detail: "Notez la date d'entrée, le salaire brut des 12 derniers mois, les horaires réels et le motif de rupture. Sans ces éléments, aucun outil ne peut calculer correctement." },
      { step: "Identifier la convention collective", detail: "Retrouvez-la sur le Code du travail numérique avec le SIRET ou le code IDCC du bulletin de paie : elle prévoit souvent plus que le Code du travail." },
      { step: "Simuler avec l'outil officiel", detail: "Calculez préavis et indemnités sur le simulateur public, puis demandez à une IA généraliste de vous expliquer le résultat ligne par ligne si besoin." },
      { step: "Côté employeur : croiser avec la paie", detail: "Un assistant intégré au logiciel de paie (Payfit AI) répond avec vos propres données ; relisez avant toute clôture de paie ou DSN." },
      { step: "Passer la main en cas de litige", detail: "Licenciement contesté, harcèlement, heures supplémentaires impayées : consultez un avocat en droit du travail, un défenseur syndical ou l'inspection du travail. Gardez vos échanges avec l'IA comme aide-mémoire des faits." },
    ],
    combos: [
      { pair: "Simulateur officiel + IA généraliste", why: "Le simulateur donne le montant de référence, l'IA vous aide à comprendre la formule et à préparer vos questions." },
      { pair: "Logiciel de paie avec IA + convention collective", why: "Une réponse qui tient compte de votre convention et de vos données de paie est plus précise qu'une réponse générale." },
      { pair: "Base juridique en droit social + analyse prédictive", why: "Pour un contentieux prud'homal, on cherche d'abord la règle, puis l'ordre de grandeur des condamnations dans des affaires comparables." },
    ],
    cautions: [
      "Une réponse d'IA n'est pas un avis juridique. Pour une rupture ou un litige, faites valider par un avocat en droit du travail ou un défenseur syndical.",
      "Bulletins de paie et contrats contiennent votre numéro de sécurité sociale et votre IBAN : masquez-les avant tout envoi. Le RGPD s'applique aux données des salariés que traite l'employeur.",
      "Les conventions collectives et barèmes évoluent. Demandez toujours à quelle date la réponse est valable et vérifiez sur le Code du travail numérique.",
    ],
    keywords: ["IA droit du travail", "calcul indemnité de licenciement", "trouver sa convention collective", "Payfit IA", "simulateur rupture conventionnelle"],
  },
  {
    slug: "tax-accounting",
    category: "Métiers spécialisés",
    title: "Impôts et comptabilité : les IA utiles en France (octobre 2026)",
    description: "Assistant AMI d'impots.gouv, Pennylane, Indy, Lexis+ avec Protégé : ce que fait chaque outil pour la comptabilité, la TVA et la facturation électronique 2026.",
    checked: "2026-10-20",
    intro: "La comptabilité est l'un des domaines où l'IA est déjà la plus banale en France : catégorisation des transactions bancaires, lecture des justificatifs, préparation des déclarations. La réforme de la facturation électronique, entrée en vigueur le 1er septembre 2026, pousse aussi les entreprises vers des logiciels connectés. Côté particuliers, l'administration fiscale propose un assistant virtuel dans la messagerie sécurisée.",
    tools: [
      { name: "AMI (Assistant Messagerie Impôts)", maker: "DGFiP", audience: "Particuliers", what: "Assistant virtuel en haut à droite de la messagerie sécurisée d'impots.gouv.fr. Il répond aux questions simples, oriente vers le bon formulaire et donne accès à vos avis et déclarations. L'administration ne précise pas s'il repose sur de l'IA générative.", price: "gratuit", source: { label: "impots.gouv.fr · l'assistant virtuel AMI (mis à jour 2026-04-09)", url: "https://www.impots.gouv.fr/lassistant-virtuel-de-la-dgfip-votre-nouvel-ami-0" } },
      { name: "Pennylane", maker: "Pennylane", audience: "TPE, PME, cabinets d'expertise comptable", what: "Catégorisation IA des transactions, génération automatique d'écritures, lecture OCR des justificatifs et notes de frais. Plateforme agréée (PA) par la DGFiP pour la facturation électronique (Factur-X, UBL, CII). Un copilote d'analyse à base d'IA générative pour les comptables est annoncé.", price: "gratuit pour micro-entrepreneurs ; Starter 7 €, Basique 14 €, Essentiel 24 € HT/mois (2026-10)", source: { label: "Freelance Solution · avis Pennylane (2026-07-04, tarifs vérifiés 2026-10-05)", url: "https://www.freelance-solution.fr/outils-freelance/pennylane-avis/" } },
      { name: "Indy", maker: "Indy", audience: "Indépendants, micro-entrepreneurs, SCI/LMNP, petites sociétés", what: "Catégorisation automatique des transactions dès la synchronisation bancaire, déclarations 2035 (BNC) et 2031 (BIC), télétransmission de la TVA (CA3, CA12) dans les formules payantes.", price: "Essentiel gratuit ; Autonomie micro 15 €, EI 22 €, société 49 € HT/mois en annuel (2026-10)", source: { label: "Freelance Solution · avis Indy (2026-05-14, tarifs vérifiés 2026-10-19)", url: "https://www.freelance-solution.fr/outils-freelance/indy-avis/" } },
      { name: "Lexis+ avec Protégé", maker: "LexisNexis", audience: "Experts-comptables, fiscalistes", what: "Assistant conçu pour les professions juridiques et comptables : analyse de documents, rédaction de notes et synthèses avec références LexisNexis. Modèles Mistral disponibles, hébergement dans l'UE, conversations supprimées après 90 jours.", price: "sur devis", source: LEXIS_MISTRAL },
    ],
    workflow: [
      { step: "Connecter la banque", detail: "Synchronisez le compte professionnel avec votre logiciel (Pennylane, Indy) et laissez l'IA proposer les catégories. Validez-les vous-même chaque mois plutôt qu'en fin d'année." },
      { step: "Photographier les justificatifs", detail: "Prenez les tickets et factures en photo au fil de l'eau ; l'OCR les rapproche des paiements. Corrigez à la main les documents mal lus." },
      { step: "Préparer la facturation électronique", detail: "Depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques. Vérifiez que votre outil passe par une plateforme agréée." },
      { step: "Poser vos questions fiscales", detail: "Particulier : commencez par AMI dans la messagerie impots.gouv. Professionnel : utilisez une base fiscale sourcée et ouvrez les textes cités (BOFiP, Légifrance)." },
      { step: "Faire valider", detail: "Avant le dépôt d'une liasse ou d'une déclaration complexe, faites relire par votre expert-comptable ou un avocat fiscaliste." },
    ],
    combos: [
      { pair: "Logiciel comptable avec IA + expert-comptable", why: "L'IA fait la saisie et le rapprochement, l'expert-comptable garde la responsabilité des comptes et des déclarations." },
      { pair: "IA généraliste + BOFiP", why: "L'IA explique un mécanisme en langage simple ; la doctrine officielle confirme la règle et sa date d'application." },
      { pair: "AMI + messagerie sécurisée", why: "Si AMI ne répond pas, il vous oriente vers le bon formulaire : votre demande arrive directement au bon service." },
    ],
    cautions: [
      "La responsabilité d'une déclaration reste celle du contribuable ou de l'expert-comptable, jamais de l'outil. Relisez toute écriture proposée par l'IA avant de la valider.",
      "Les données comptables sont des données personnelles et sensibles : vérifiez l'hébergement dans l'UE et l'absence de réutilisation pour l'entraînement (RGPD).",
      "Les taux de catégorisation automatique annoncés viennent des éditeurs ; ils baissent dès que vos documents sortent des formats habituels.",
      "Les tarifs cités viennent de comparatifs datés d'octobre 2026. Vérifiez la page tarifs officielle avant de souscrire.",
    ],
    keywords: ["IA comptabilité", "logiciel comptable IA", "Pennylane prix", "Indy avis", "facturation électronique septembre 2026", "assistant AMI impots.gouv"],
  },
  {
    slug: "presentation",
    category: "Documents et présentations",
    title: "Créer une présentation avec l'IA : les bons outils et combinaisons (octobre 2026)",
    description: "Gamma, Canva, Gemini dans Google Slides, Copilot dans PowerPoint, Pitch : comment répartir le travail entre ces IA, du plan au PPTX final, avec les prix 2026.",
    checked: "2026-10-20",
    intro: "Les outils de présentation IA se répartissent en trois familles : ceux qui génèrent un deck complet en une phrase (Gamma), ceux qui misent sur le design et la marque (Canva), et les assistants intégrés à la suite que vous utilisez déjà (Gemini dans Google Slides, Copilot dans PowerPoint). Le plus efficace est souvent de construire le plan dans une IA conversationnelle, de générer les diapos dans un outil dédié, puis de finir dans PowerPoint ou Google Slides.",
    tools: [
      { name: "Gamma", audience: "Premier jet rapide", what: "Génère une présentation complète à partir d'une phrase, d'un fichier ou d'un texte, avec des images dans les diapos. Export PPTX possible, mais la mise en forme peut se perdre sur les diapos complexes.", price: "400 crédits gratuits une fois ; Plus env. 9 $/mois, Pro 20 $/mois en annuel (2026-08)", source: DIGITIZ_SLIDES },
      { name: "Canva", audience: "Présentations soignées aux couleurs de la marque", what: "Magic Design, Magic Write et génération d'images pour les présentations, avec une grande bibliothèque de modèles et un kit de marque.", price: "gratuit ; Pro 12 €/mois ou 110 €/an (2026-08)", source: DIGITIZ_SLIDES },
      { name: "Gemini dans Google Slides", maker: "Google", audience: "Équipes sous Google Workspace", what: "Génère des présentations complètes et modifiables en s'appuyant sur vos fichiers Drive et Gmail.", price: "Gemini à partir de Workspace Business Standard, 13,60 € HT/utilisateur/mois (2026-08)", source: DIGITIZ_SLIDES },
      { name: "Copilot dans PowerPoint", maker: "Microsoft", audience: "Entreprises sous Microsoft 365", what: "Crée une présentation à partir d'un document Word et réutilise les ressources de votre environnement Microsoft 365.", price: "30 $/utilisateur/mois en plus de Microsoft 365 (2026-05)", source: PPTAI_2026 },
      { name: "Pitch", audience: "Équipes qui travaillent à plusieurs sur un deck", what: "Pitch Agent restructure les diapositives et génère des visuels ; collaboration en temps réel.", price: "gratuit jusqu'à 5 membres ; Plus 10 $/mois en annuel (2026-08)", source: DIGITIZ_SLIDES },
      { name: "Le Chat", maker: "Mistral AI", audience: "Plan et textes, données traitées dans l'UE", what: "Assistant conversationnel français pour bâtir le plan, reformuler les titres et rédiger les notes d'orateur ; génère aussi des illustrations dans la conversation.", price: "gratuit ; Pro 14,99 €/mois (2026-08)", source: TECHINSIDER_LECHAT },
    ],
    workflow: [
      { step: "Message et public", detail: "Demandez à une IA conversationnelle de formuler en une phrase ce que le public doit retenir ou décider. Cette phrase guide l'ordre des diapos." },
      { step: "Plan en 10 diapos", detail: "Faites produire un titre-affirmation par diapo et un ou deux arguments, avec la source de chaque chiffre." },
      { step: "Génération des diapos", detail: "Collez le plan dans Gamma ou Canva. Dans une entreprise équipée, utilisez directement Gemini (Slides) ou Copilot (PowerPoint) pour rester dans la charte." },
      { step: "Vérifier chiffres et graphiques", detail: "Comparez chaque graphique aux données d'origine. Supprimez ou sourcez tout chiffre sans origine claire." },
      { step: "Finaliser en PPTX", detail: "Exportez vers PowerPoint ou Google Slides, appliquez le modèle et les polices de l'entreprise, puis faites rédiger les notes d'orateur." },
    ],
    combos: [
      { pair: "Le Chat ou ChatGPT pour le plan + Gamma pour les diapos", why: "La structure se règle en conversation, la mise en page en un clic : moins d'allers-retours." },
      { pair: "Gamma + Canva", why: "Gamma pour aller vite, Canva pour reprendre le design aux couleurs de la marque." },
      { pair: "Copilot ou Gemini + documents internes", why: "L'assistant de votre suite bureautique puise dans vos propres fichiers, ce qui limite les copier-coller de données internes." },
    ],
    cautions: [
      "Avant d'importer des documents confidentiels, vérifiez si l'outil réutilise vos contenus pour entraîner ses modèles et où il héberge les données (RGPD).",
      "Les conditions d'usage commercial des images générées varient selon les services ; relisez-les avant une présentation externe.",
      "L'export PPTX n'est pas toujours inclus dans les offres gratuites et peut abîmer la mise en page : testez avant le jour J.",
    ],
    keywords: ["IA présentation PowerPoint", "créer un diaporama IA", "Gamma avis prix", "Copilot PowerPoint", "Gemini Google Slides", "présentation IA gratuite"],
  },
  {
    slug: "poster",
    category: "Design et impression",
    title: "Créer une affiche avec l'IA, de l'idée à l'impression (octobre 2026)",
    description: "ChatGPT Images 2.0, Canva, Adobe Firefly, Le Chat : générer une affiche d'événement ou de commerce lisible en français, puis la préparer en A3 ou A2 pour l'imprimeur.",
    checked: "2026-10-20",
    intro: "Depuis ChatGPT Images 2.0 (avril 2026), les générateurs d'images écrivent enfin des textes lisibles, ce qui change la donne pour les affiches. Mais une affiche imprimée exige encore une mise en page maîtrisée : les dates, l'adresse et les mentions doivent être exactes et modifiables. Le bon réflexe est de générer le visuel avec l'IA et de poser le texte dans un outil de mise en page.",
    tools: [
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "Visuel principal avec texte intégré", what: "Affichage du texte nettement amélioré, mode de réflexion qui peut chercher sur le web, générer plusieurs images à partir d'une demande et vérifier ses résultats. Disponible pour tous les utilisateurs de ChatGPT.", source: FUTURA_IMAGES2 },
      { name: "Canva", audience: "Mise en page et impression", what: "Magic Design propose plusieurs maquettes à partir d'une description ; Canva Print permet ensuite de commander des affiches imprimées.", price: "Pro 12 €/mois ou 110 €/an (2026-04)", source: FORMALIVE_CANVA },
      { name: "Adobe Firefly", maker: "Adobe", audience: "Usage commercial, agences", what: "Firefly Image 5 est entraîné sur des contenus sous licence Adobe Stock, présenté comme le choix sûr pour un usage commercial. Firefly donne aussi accès à des modèles partenaires (FLUX, Google, Runway…).", source: FIREFLY_APR },
      { name: "Le Chat", maker: "Mistral AI", audience: "Brouillons et accroches en français", what: "Génère des illustrations dans la conversation et aide à écrire les accroches ; données et modèles hébergés dans l'UE.", price: "gratuit ; Pro 14,99 €/mois (2026-08)", source: TECHINSIDER_LECHAT },
    ],
    workflow: [
      { step: "Fixer les infos", detail: "Écrivez d'abord le texte exact : titre, date, heure, lieu, prix, contact. C'est ce texte qui sera relu, pas celui de l'image générée." },
      { step: "Générer le visuel", detail: "Demandez 3 ou 4 pistes à ChatGPT Images ou Firefly en précisant le format portrait et l'ambiance. Évitez de faire écrire les petites informations par le générateur." },
      { step: "Mettre en page", detail: "Importez le visuel dans Canva ou Adobe Express et posez le texte en vrai calque. Taille de lecture : le titre doit se lire à plusieurs mètres." },
      { step: "Préparer le fichier d'impression", detail: "Choisissez le format (A3 pour une vitrine, A2 pour un panneau), ajoutez 3 à 5 mm de fond perdu, gardez textes et logos à 5 mm du bord et exportez en PDF haute définition. Demandez à l'imprimeur ses propres exigences." },
      { step: "Relire puis commander", detail: "Relisez dates et orthographe, imprimez un test en A4, puis commandez via Canva Print ou votre imprimeur en ligne habituel." },
    ],
    combos: [
      { pair: "ChatGPT Images 2.0 + Canva", why: "Le visuel vient du générateur, le texte reste modifiable dans Canva : une coquille ne demande pas de tout régénérer." },
      { pair: "Firefly + Adobe Express", why: "Pour un client ou une marque, un modèle entraîné sur contenus sous licence limite le risque juridique sur l'image." },
      { pair: "Le Chat + générateur d'images", why: "L'IA conversationnelle propose plusieurs accroches en bon français, vous choisissez avant de générer le visuel." },
    ],
    cautions: [
      "Une affiche publicitaire diffusée en France doit être rédigée en français (loi Toubon) ; un slogan en anglais doit être accompagné d'une traduction.",
      "Si l'image générée paraît réaliste (personne, lieu, événement), une mention du type « Image générée par IA » est recommandée ; l'ARPP a publié en août 2026 une fiche pratique pour décider quand l'étiqueter.",
      "Les images générées à l'écran sont souvent en basse résolution : vérifiez la définition avant un tirage en A2 ou plus grand, ou utilisez un agrandissement IA.",
    ],
    keywords: ["créer une affiche avec l'IA", "affiche événement IA", "affiche A3 imprimer", "Canva affiche", "ChatGPT Images affiche"],
  },
  {
    slug: "pamphlet",
    category: "Design et impression",
    title: "Flyers, dépliants et menus faits avec l'IA (octobre 2026)",
    description: "Canva, ChatGPT Images 2.0, Le Chat et Adobe Firefly pour créer un flyer A5, un dépliant 3 volets ou un menu de restaurant, puis préparer un PDF d'impression correct.",
    checked: "2026-10-20",
    intro: "Un dépliant contient beaucoup plus de texte qu'une affiche : tarifs, horaires, plan d'accès, mentions. L'IA est très utile pour rédiger et illustrer, mais la mise en page en volets et le contrôle des informations restent un travail d'outil de PAO, même simple comme Canva. En France, les formats courants sont l'A5 pour le flyer et l'A4 plié en trois pour le dépliant.",
    tools: [
      { name: "Canva", audience: "Commerçants, associations, restaurants", what: "Magic Design génère plusieurs maquettes modifiables à partir d'une description, Magic Write rédige titres et textes courts, et Canva Print imprime flyers et brochures.", price: "gratuit ; Pro 12 €/mois ou 110 €/an (2026-04)", source: FORMALIVE_CANVA },
      { name: "Canva Print", maker: "Canva", audience: "Impression sans passer par un imprimeur", what: "Commande de flyers, brochures et affiches livrés ou à retirer en magasin ; une correction automatique signale certains problèmes avant commande.", source: CANVA_PRINT },
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "Illustrations et photos d'ambiance", what: "Génère des illustrations avec un texte bien plus lisible qu'avant et peut proposer plusieurs variantes d'une même demande.", source: FUTURA_IMAGES2 },
      { name: "Le Chat", maker: "Mistral AI", audience: "Rédaction des textes en français", what: "Rédige et raccourcit les textes, avec OCR pour récupérer le contenu d'un ancien flyer ou menu scanné.", price: "gratuit ; Pro 14,99 €/mois (2026-08)", source: TECHINSIDER_LECHAT },
      { name: "Adobe Firefly", maker: "Adobe", audience: "Visuels pour une marque ou un client", what: "Modèle d'image Firefly Image 5 présenté comme sûr pour un usage commercial, plus des modèles partenaires dans le même espace.", source: FIREFLY_SEP },
    ],
    workflow: [
      { step: "Lister le contenu", detail: "Rassemblez tarifs, horaires, adresse, allergènes pour un menu, mentions légales. Si vous partez d'un ancien support, faites-le retranscrire par OCR (Le Chat) puis corrigez." },
      { step: "Rédiger court", detail: "Demandez à l'IA de réduire chaque bloc à l'essentiel : un titre, trois puces, un appel à l'action par volet." },
      { step: "Choisir le format", detail: "Flyer A5 ou A6, dépliant A4 plié en 3 volets (6 faces), menu A4 ou A3 plié. Partez d'un modèle Canva au bon format plutôt que de redimensionner." },
      { step: "Illustrer", detail: "Générez photos d'ambiance ou illustrations, puis placez-les. Pour un menu, préférez de vraies photos de vos plats ou des illustrations clairement non réalistes." },
      { step: "Exporter pour l'imprimeur", detail: "PDF haute définition avec 3 à 5 mm de fond perdu et une marge de sécurité de 5 mm ; images à 300 ppp minimum. Faites une impression test pliée pour vérifier l'ordre des volets." },
    ],
    combos: [
      { pair: "Le Chat (textes) + Canva (mise en page)", why: "Le texte se travaille mieux en conversation, la mise en volets dans un vrai outil de maquette." },
      { pair: "ChatGPT Images + vraies photos", why: "L'IA pour les fonds et ambiances, vos photos pour les produits réels : le client voit ce qu'il achètera." },
      { pair: "Canva + Canva Print", why: "Du modèle à la livraison sans changer d'outil, pratique pour les petites séries." },
    ],
    cautions: [
      "Un plat ou un produit montré avec une image générée qui ne correspond pas à la réalité peut être considéré comme trompeur ; l'ARPP recommande d'apprécier le réalisme et l'impact sur la perception du consommateur.",
      "Les supports publicitaires diffusés en France doivent être en français (loi Toubon), même si vous ajoutez une version anglaise pour les touristes.",
      "Relisez prix et horaires sur l'épreuve finale : ce sont les erreurs les plus fréquentes et les plus coûteuses après impression.",
    ],
    keywords: ["flyer IA", "dépliant 3 volets IA", "menu restaurant IA", "brochure Canva IA", "flyer A5 à imprimer"],
  },
  {
    slug: "ad-image",
    category: "Marketing et publicité",
    title: "Images publicitaires et photos produit avec l'IA (octobre 2026)",
    description: "Photoroom, Adobe Firefly, ChatGPT Images 2.0, Canva : produire photos produit, bannières et visuels Meta ou Google Ads, et respecter l'AI Act et l'étiquetage ARPP.",
    checked: "2026-10-20",
    intro: "Pour une boutique en ligne ou une PME, l'IA permet aujourd'hui de passer d'une photo produit prise au téléphone à une série de visuels publicitaires déclinés en plusieurs formats. La nouveauté de 2026 est réglementaire : depuis le 2 août 2026, l'article 50 de l'AI Act impose de signaler certains contenus générés par IA, et l'ARPP a publié une fiche pratique pour la publicité.",
    tools: [
      { name: "Photoroom", maker: "Photoroom", audience: "E-commerçants, marketplaces", what: "Retouche produit, mannequin virtuel, mise en scène produit et ombres homogènes sur jusqu'à 250 images en lot. Product Fixer corrige une image générée en s'appuyant sur votre photo d'origine. Sortie en 2K ou 4K sur les principaux outils.", source: PHOTOROOM_H1 },
      { name: "Adobe Firefly", maker: "Adobe", audience: "Marques, agences", what: "Firefly Image 5, entraîné sur des contenus sous licence Adobe Stock, plus des modèles partenaires ; modèles personnalisés (en bêta) pour garder un style de marque.", source: FIREFLY_APR },
      { name: "ChatGPT Images 2.0", maker: "OpenAI", audience: "Bannières avec texte, déclinaisons rapides", what: "Rendu du texte très amélioré et mode réflexion qui génère plusieurs images d'une même demande et vérifie le résultat.", source: FUTURA_IMAGES2 },
      { name: "Canva", audience: "Déclinaison des formats réseaux sociaux", what: "Génération d'images (Text to Image), Magic Eraser et Magic Expand pour effacer ou agrandir, Magic Design pour décliner des maquettes.", price: "Pro 12 €/mois ou 110 €/an (2026-04)", source: FORMALIVE_CANVA },
    ],
    workflow: [
      { step: "Partir d'une vraie photo", detail: "Photographiez le produit sur fond neutre avec une bonne lumière. Le produit doit rester fidèle ; l'IA travaille le décor, pas l'objet vendu." },
      { step: "Détourer et mettre en scène", detail: "Utilisez Photoroom ou Firefly pour le fond, l'ombre et la mise en situation. Contrôlez couleurs, logo et proportions du produit après génération." },
      { step: "Ajouter le message", detail: "Posez prix, promotion et appel à l'action dans Canva ou Adobe Express, en texte modifiable, en français." },
      { step: "Décliner les formats", detail: "Préparez le carré 1:1, le portrait 4:5 et le vertical 9:16 pour Meta, et les bannières demandées par Google Ads." },
      { step: "Étiqueter si nécessaire", detail: "Appliquez l'arbre de décision de la fiche ARPP : selon le degré d'IA, le réalisme et l'effet sur le consommateur, ajoutez « Image générée par IA »." },
    ],
    combos: [
      { pair: "Photoroom + Canva", why: "Photoroom produit des photos produit propres en lot, Canva les transforme en publicités aux bons formats." },
      { pair: "Firefly + modèles partenaires", why: "Firefly Image 5 pour les visuels finaux d'une marque, les modèles partenaires pour explorer des pistes créatives." },
      { pair: "ChatGPT Images + test A/B", why: "Générer plusieurs variantes permet de tester les accroches en campagne avant de produire la version définitive." },
    ],
    cautions: [
      "AI Act, article 50 : depuis le 2 août 2026, les contenus de type hypertrucage (image réaliste d'une personne, d'un lieu, d'un événement) doivent être signalés comme générés ou manipulés par IA.",
      "Loi influenceurs du 9 juin 2023 : un contenu commercial d'influenceur produit par IA doit porter la mention « Images virtuelles », et une image retouchée la mention « Images retouchées ».",
      "Une photo produit modifiée au point de ne plus correspondre à l'article vendu peut constituer une pratique commerciale trompeuse.",
      "Pour Firefly, l'usage commercial des modèles partenaires obéit à leurs propres conditions : vérifiez-les avant une campagne.",
    ],
    keywords: ["image publicitaire IA", "photo produit IA", "Photoroom avis", "bannière pub IA", "visuel Meta Ads IA", "étiquetage image générée par IA"],
  },
  {
    slug: "ad-video",
    category: "Marketing et publicité",
    title: "Vidéos publicitaires avec l'IA : Veo, Kling, Runway et les autres (octobre 2026)",
    description: "Veo 3.1 dans Flow, Kling 3.0, Runway Gen-4.5, Firefly et ElevenLabs : comment produire une pub courte ou une vidéo produit, avec prix 2026 et règles AI Act.",
    checked: "2026-10-20",
    intro: "Les générateurs vidéo de 2026 produisent des plans de 8 à 15 secondes avec son natif, ce qui suffit pour une publicité verticale ou une vidéo produit. Aucun outil ne fait tout : on génère plusieurs plans, on les monte, on ajoute la voix et le texte. Pour un public français, vérifiez la qualité du français parlé : tous les modèles ne gèrent pas la synchronisation labiale en français.",
    tools: [
      { name: "Veo 3.1 (dans Flow)", maker: "Google", audience: "Plans réalistes avec son", what: "Flow génère et modifie des vidéos avec Veo 3.1, en 16:9 ou 9:16. Veo 3.1 Lite, ajouté fin mars 2026, coûte moins de crédits pour multiplier les essais.", source: FLOW_MAR },
      { name: "Kling 3.0", maker: "Kuaishou", audience: "Plans de 15 s, scènes à plusieurs personnages", what: "Jusqu'à 15 secondes par plan, audio natif, enchaînement de plusieurs plans et dialogues à plusieurs voix. Synchronisation labiale annoncée en anglais, chinois, japonais, coréen et espagnol, pas en français.", price: "gratuit (720p avec filigrane) ; Standard 6,99 $, Pro 29,99 $/mois (2026)", source: KLING3 },
      { name: "Runway (Gen-4.5)", maker: "Runway", audience: "Cohérence des personnages, montage", what: "Gen-4.5 garde le même personnage d'une scène à l'autre à partir d'une seule image de référence ; Aleph pour éditer une vidéo existante. Les offres payantes donnent aussi accès à Veo 3.1 et Kling 3.0.", price: "Standard 12 $, Pro 28 $/utilisateur/mois en annuel (2026-08)", source: RUNWAY_PRICING },
      { name: "Adobe Firefly", maker: "Adobe", audience: "Agences déjà sous Creative Cloud", what: "Un seul espace pour Firefly Video et des modèles partenaires (Runway Gen-4.5, Sora 2, Veo 3.1, Kling).", source: FIREFLY_APR },
      { name: "ElevenLabs", maker: "ElevenLabs", audience: "Voix off et doublage", what: "Synthèse vocale avec contrôle du style, clonage de voix selon l'offre, doublage multilingue qui conserve la voix d'origine ; le français fait partie des langues proposées.", price: "gratuit puis dès 5 $/mois (2026-03)", source: ELEVEN },
    ],
    workflow: [
      { step: "Écrire un script de 15 à 30 s", detail: "Une accroche dans les 2 premières secondes, un bénéfice produit, un appel à l'action. Faites découper le script en 3 à 5 plans par une IA conversationnelle." },
      { step: "Fixer les références", detail: "Préparez une image de référence du produit et, si besoin, d'un personnage. Elle sert à garder l'apparence d'un plan à l'autre (Runway, Kling)." },
      { step: "Générer plan par plan", detail: "Générez chaque plan en 9:16 pour les Reels et TikTok, plusieurs fois si nécessaire. Utilisez un mode économique (Veo 3.1 Lite, Gen-4 Turbo) pour les essais, le meilleur modèle pour la version finale." },
      { step: "Voix et sous-titres", detail: "Enregistrez la voix off en français avec ElevenLabs ou une vraie voix, et ajoutez des sous-titres : beaucoup de vidéos sont regardées sans le son." },
      { step: "Monter et étiqueter", detail: "Assemblez dans votre logiciel de montage, ajoutez logo et mentions, puis appliquez la fiche ARPP pour décider de l'étiquette « vidéo générée par IA »." },
    ],
    combos: [
      { pair: "Veo 3.1 ou Kling + ElevenLabs", why: "Les modèles vidéo gèrent mal le français parlé synchronisé ; une voix off séparée en français reste plus fiable." },
      { pair: "Runway (références) + Firefly", why: "Runway pour la cohérence d'un personnage ou d'un produit, Firefly pour réunir plusieurs modèles dans le même flux Adobe." },
      { pair: "Image produit Photoroom + génération vidéo", why: "Partir d'une photo produit propre donne une vidéo plus fidèle à l'article réel." },
    ],
    cautions: [
      "AI Act, article 50 : une vidéo réaliste montrant des personnes, lieux ou événements générés doit être signalée comme générée par IA depuis le 2 août 2026 ; le marquage technique des fournisseurs a un délai jusqu'au 2 décembre 2026 pour les systèmes déjà sur le marché.",
      "N'utilisez jamais la voix ou le visage d'une personne réelle sans son accord écrit, même cloné « pour test ».",
      "Les crédits partent vite : une vidéo finale demande souvent plusieurs générations par plan. Évaluez le coût sur un petit projet avant de vous abonner à l'année.",
      "Les prix des outils vidéo sont en dollars et changent souvent ; vérifiez la page tarifs officielle avant de souscrire.",
    ],
    keywords: ["vidéo publicitaire IA", "Veo 3.1 Flow", "Kling 3.0 prix", "Runway Gen-4.5", "voix off IA français", "pub TikTok IA"],
  },
];
