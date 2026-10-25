// Guides IA France, lot 2 (vérifié 2026-10-25) : comptes rendus, Excel, traduction, mémoire, business plan,
// code, service client, blog/SEO. Les prix viennent de la page citée, avec sa date.
import type { Guide } from "../ai-use-cases";

const TENSORIA_NOTES = { label: "Tensoria · outils de transcription de réunion IA (2026-08-21)", url: "https://tensoria.fr/blog/top-outils-transcription-reunion-ia" };
const CLUBIC_SHEETS = { label: "Clubic · Gemini dans Google Sheets en français (2026-06-19)", url: "https://www.clubic.com/actualite-617686-google-sheets-vous-allez-pouvoir-discuter-en-francais-avec-gemini-pour-creer-des-feuilles-de-calcul.html" };
const COCOWORK_TRAD = { label: "Cocowork · meilleurs outils IA de traduction (2026-05-14)", url: "https://cocowork.fr/meilleurs-outils-ia-traduction/" };
const ZEMITH_RECHERCHE = { label: "Zemith · assistants IA de recherche pour étudiants (2026-01-29)", url: "https://www.zemith.com/fr/contents/best-ai-research-assistant-for-students-2026" };
const INDEP_BP = { label: "Independant.io · business plan en ligne (mis à jour 2026-09-25)", url: "https://independant.io/business-plan-en-ligne/" };
const BDM_VIBE = { label: "Blog du Modérateur · 10 outils de vibe coding (2026-08-14)", url: "https://www.blogdumoderateur.com/outils-vibe-coding-code-ia-tester-2026/" };
const TENSORIA_CHATBOT = { label: "Tensoria · chatbots IA service client (mis à jour 2026-09-17)", url: "https://tensoria.fr/blog/top-outils-chatbot-ia-service-client" };
const CULTURE_RH_AIACT = { label: "Culture RH · AI Act, ce qui change le 2 août 2026 (consulté 2026-10-25)", url: "https://culture-rh.com/ai-act-02-aout-2026/" };
const BDM_AIO = { label: "Blog du Modérateur · AI Overviews et AI Mode en France (2026-07-22)", url: "https://blogdumoderateur.com/google-deploie-ai-overviews-ai-mode-france" };
const TECHINSIDER_LECHAT = { label: "Tech Insider · Le Chat vs ChatGPT (2026-03-18, mis à jour 2026-08-19)", url: "https://tech-insider.org/fr/mistral-ai-le-chat-vs-chatgpt-2026/" };

export const guides: Guide[] = [
  {
    slug: "meeting-notes",
    category: "Documents et présentations",
    title: "Comptes rendus de réunion par IA : outils et règles en France (octobre 2026)",
    description: "Noota, Leexi, tl;dv, Fireflies, Copilot dans Teams et Gemini dans Meet comparés sur le prix et l'hébergement, une méthode en cinq étapes, et ce que disent la CNIL et le Code du travail avant d'enregistrer.",
    checked: "2026-10-25",
    intro: "Les outils de prise de notes IA enregistrent, transcrivent, identifient les intervenants et sortent les actions à mener. En France, la vraie question est moins la qualité de la transcription que le cadre : la CNIL attend une information claire des participants, et un enregistrement entre collègues touche au droit du travail et parfois au CSE.",
    tools: [
      { name: "Noota", maker: "Noota (France)", audience: "PME et équipes françaises", what: "Transcription et compte rendu en français, données hébergées en France et dans l'UE selon l'éditeur.", price: "à partir d'env. 18 €/mois (2026-08)", source: TENSORIA_NOTES },
      { name: "Leexi", maker: "Leexi", audience: "Équipes commerciales", what: "Notes d'appels et synthèses reliées au CRM ; certification ISO 27001 annoncée.", price: "Business env. 39 €/utilisateur/mois (2026-08)", source: TENSORIA_NOTES },
      { name: "tl;dv", audience: "Réunions Meet, Zoom et Teams", what: "Enregistrement, transcription et résumés multilingues avec recherche dans l'historique.", price: "Pro env. 18 à 22 $/mois (2026-08)", source: TENSORIA_NOTES },
      { name: "Fireflies.ai", audience: "Équipes qui veulent beaucoup d'intégrations", what: "Transcriptions, résumés et actions envoyés vers les outils de gestion et le CRM.", price: "à partir d'env. 10 $/mois (2026-08)", source: TENSORIA_NOTES },
      { name: "Copilot dans Teams", maker: "Microsoft", audience: "Entreprises sous Microsoft 365", what: "Résumé et récapitulatif dans Teams, sans ajouter d'outil tiers.", source: TENSORIA_NOTES },
      { name: "Gemini dans Google Meet", maker: "Google", audience: "Entreprises sous Google Workspace", what: "Prise de notes automatique dans Meet, déposée dans Google Docs.", source: TENSORIA_NOTES },
    ],
    workflow: [
      { step: "Informer avant d'enregistrer", detail: "La CNIL demande une information claire : mention dans l'invitation, annonce orale en début de réunion, et possibilité de refuser." },
      { step: "Vérifier le cadre interne", detail: "Un dispositif qui peut servir à contrôler l'activité des salariés doit être porté à leur connaissance au préalable (art. L1222-4 du Code du travail) et, selon les cas, faire l'objet d'une information-consultation du CSE (art. L2312-38)." },
      { step: "Choisir l'hébergement", detail: "Pour des réunions sensibles, préférez un outil hébergé dans l'UE ou celui inclus dans votre suite (Teams, Meet) plutôt qu'un compte personnel." },
      { step: "Transformer la transcription en décisions", detail: "Renommez les intervenants, puis séparez décisions, questions ouvertes et actions avec un responsable et une date." },
      { step: "Fixer une durée de conservation", detail: "Gardez les enregistrements le temps nécessaire, puis supprimez-les. La durée doit être proportionnée à l'objectif." },
    ],
    combos: [
      { pair: "Outil de notes + CRM", why: "Les notes d'appel vont directement dans la fiche client au lieu de rester dans une boîte mail." },
      { pair: "Transcription + Le Chat ou ChatGPT (compte pro)", why: "Collez la transcription dans un assistant validé par l'entreprise pour la remettre au format maison." },
      { pair: "Teams/Meet + modèle de compte rendu", why: "Un modèle fixe (ordre du jour, décisions, actions) rend les résumés comparables d'une réunion à l'autre." },
    ],
    cautions: [
      "Ne laissez pas un robot rejoindre automatiquement toutes les réunions du calendrier : désactivez la connexion automatique.",
      "Les résumés se trompent surtout sur les chiffres, les dates et les noms. Vérifiez-les dans la transcription avant diffusion.",
      "Désactivez l'utilisation de vos données pour l'entraînement des modèles quand l'outil le propose.",
      "Les prix ci-dessus sont des ordres de grandeur relevés par un comparatif en août 2026. Vérifiez la page tarifs avant d'acheter.",
    ],
    keywords: ["compte rendu réunion IA", "transcription réunion IA", "Noota avis", "Leexi prix", "enregistrer une réunion CNIL", "Copilot Teams résumé"],
  },
  {
    slug: "spreadsheet",
    category: "Documents et présentations",
    title: "IA pour Excel et Google Sheets (octobre 2026)",
    description: "Gemini dans Sheets (désormais en français), Copilot dans Excel et les assistants généralistes : à quoi ils servent, ce qu'ils coûtent, et comment vérifier une formule écrite par l'IA avant qu'elle n'arrive dans un rapport.",
    checked: "2026-10-25",
    intro: "Commencez par l'IA déjà incluse dans votre tableur : Copilot si l'entreprise est sous Microsoft 365, Gemini si elle est sous Google Workspace. Depuis juin 2026, Gemini dans Sheets comprend les demandes en français. Dans tous les cas, une formule peut avoir l'air juste et être fausse.",
    tools: [
      { name: "Gemini dans Google Sheets", maker: "Google", audience: "Équipes sous Google Workspace", what: "Crée ou modifie une feuille à partir d'une demande en langage courant ; disponible en français et dans 28 autres langues depuis juin 2026.", price: "offres payantes uniquement : Workspace Business et Enterprise (Standard, Plus), Google AI Pro et Ultra (2026-06)", source: CLUBIC_SHEETS },
      { name: "Le Chat", maker: "Mistral AI", audience: "Expliquer une formule, préparer une analyse", what: "Assistant français pour expliquer une formule, proposer une structure de tableau ou un script ; données traitées dans l'UE selon l'éditeur.", price: "gratuit ; Pro 14,99 €/mois (2026-08)", source: TECHINSIDER_LECHAT },
    ],
    workflow: [
      { step: "Utiliser ce que vous payez déjà", detail: "Testez Copilot ou Gemini inclus dans votre abonnement avant d'ajouter un outil tiers." },
      { step: "Commencer par une tâche répétitive", detail: "Un regroupement hebdomadaire, un dédoublonnage, une colonne de catégories : une seule tâche bien définie." },
      { step: "Prototyper sur de fausses données", detail: "Si vous passez par un compte personnel, utilisez un fichier avec les mêmes colonnes et des valeurs inventées. Pas de données clients ou salariés." },
      { step: "Vérifier trois lignes à la main", detail: "Avant d'étendre une formule, recalculez trois ou quatre lignes vous-même. Les plages décalées d'une ligne sont l'erreur classique." },
      { step: "Travailler sur une copie", detail: "Tout ce qui supprime ou écrase passe d'abord sur un double du fichier." },
    ],
    combos: [
      { pair: "Assistant généraliste pour la méthode + Copilot/Gemini pour l'exécution", why: "On réfléchit dans la conversation, puis on modifie le vrai fichier dans l'environnement de l'entreprise." },
      { pair: "Gemini + tableau croisé dynamique", why: "L'IA étiquette chaque ligne, le tableau croisé compte les étiquettes." },
    ],
    cautions: [
      "Un fichier contenant des données personnelles (clients, salariés) reste soumis au RGPD : ne le déposez pas dans un compte personnel.",
      "Les assistants connectés à Gmail, Drive ou OneDrive peuvent lire ces sources. Vérifiez les accès avant de les brancher.",
      "Tout chiffre destiné à une direction, une banque ou l'administration fiscale doit être recalculé par une personne.",
    ],
    keywords: ["IA Excel formules", "Copilot Excel", "Gemini Google Sheets français", "tableau croisé dynamique IA", "nettoyer des données IA"],
  },
  {
    slug: "translation",
    category: "Documents et présentations",
    title: "Traduction par IA : DeepL, Reverso, Le Chat ou ChatGPT ? (octobre 2026)",
    description: "DeepL, Reverso, Le Chat et ChatGPT comparés sur le prix et la confidentialité, une méthode de relecture, et quand une traduction humaine (ou assermentée) reste obligatoire.",
    checked: "2026-10-25",
    intro: "Pour un courriel ou une documentation interne, l'IA suffit souvent. Pour un contrat, une notice réglementée ou un document officiel, elle sert de premier jet, puis un professionnel relit. Attention aussi aux versions gratuites, qui peuvent utiliser vos textes pour entraîner leurs modèles.",
    tools: [
      { name: "DeepL", maker: "DeepL (Allemagne)", audience: "Documents professionnels, glossaires", what: "Traduction de textes et de fichiers avec glossaires.", price: "Starter 8,99 €/mois (2026-05)", source: COCOWORK_TRAD },
      { name: "Reverso", maker: "Reverso (France)", audience: "Exemples en contexte, apprentissage", what: "Traduction avec exemples d'usage tirés de vrais textes, conjugaison et synonymes.", price: "Premium 6,49 €/mois (2026-05)", source: COCOWORK_TRAD },
      { name: "Le Chat", maker: "Mistral AI", audience: "Réécrire et adapter le ton", what: "Traduit puis adapte le registre (formel, commercial) ; société française.", price: "Pro 14,99 €/mois (2026-05)", source: COCOWORK_TRAD },
      { name: "ChatGPT", maker: "OpenAI", audience: "Localisation créative, textes marketing", what: "Traduit et reformule en tenant compte d'un public cible ; utile pour les slogans qui ne se traduisent pas mot à mot.", price: "Plus 20 $/mois (2026-05)", source: COCOWORK_TRAD },
    ],
    workflow: [
      { step: "Classer le document", detail: "Interne, client, ou juridique/officiel. Plus l'enjeu est élevé, plus la relecture humaine est indispensable." },
      { step: "Préparer un glossaire", detail: "Noms de produits, termes métier, mots à ne pas traduire. DeepL et les assistants le respectent mieux quand il est fourni." },
      { step: "Traduire en compte professionnel", detail: "Pour un document confidentiel, utilisez une offre payante qui exclut l'entraînement sur vos données." },
      { step: "Relire à l'envers", detail: "Demandez une retraduction vers le français et comparez : les contresens apparaissent vite." },
      { step: "Faire valider ce qui engage", detail: "Contrats, conditions générales, notices de sécurité : relecture par un traducteur spécialisé ; pièces officielles : traducteur assermenté près une cour d'appel." },
    ],
    combos: [
      { pair: "DeepL + Le Chat", why: "DeepL pour la fidélité, Le Chat pour ajuster le ton d'une version marketing." },
      { pair: "Reverso + IA", why: "Reverso montre comment une expression est vraiment employée, ce qui aide à trancher entre deux traductions." },
    ],
    cautions: [
      "Les versions gratuites de Google Traduction ou de ChatGPT peuvent utiliser vos textes pour entraîner leurs modèles, selon Cocowork. Ne collez pas de données confidentielles.",
      "Une traduction IA d'un contrat n'a aucune valeur de traduction certifiée. Les administrations demandent souvent un traducteur assermenté.",
      "Les chiffres, dates et unités doivent être vérifiés un par un.",
    ],
    keywords: ["traduction IA document", "DeepL ou ChatGPT", "traduire un PDF IA", "Reverso Premium prix", "traducteur assermenté"],
  },
  {
    slug: "research",
    category: "Documents et présentations",
    title: "IA pour le mémoire et la recherche documentaire (octobre 2026)",
    description: "Perplexity, NotebookLM, Consensus, SciSpace et Semantic Scholar : ce que chacun fait, ce qu'il coûte, et comment éviter les citations inventées et les soucis de plagiat.",
    checked: "2026-10-25",
    intro: "L'IA aide à trouver des sources, à lire des articles et à structurer un plan. Elle ne doit pas écrire l'analyse à votre place, et elle invente parfois des références. Chaque université ou école fixe ses propres règles d'usage de l'IA : lisez la charte de votre établissement avant de commencer.",
    tools: [
      { name: "Perplexity", audience: "Recherche web avec sources", what: "Réponses accompagnées de liens, mode étude et analyse de fichiers.", price: "Pro 20 $/mois ; gratuit 12 mois pour les étudiants vérifiés via SheerID (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "NotebookLM", maker: "Google", audience: "Travailler sur vos propres documents", what: "Analyse les PDF et notes que vous déposez, sans recherche web ; résumés audio.", price: "gratuit avec un compte Google ; version Plus incluse dans Google AI Pro (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "Consensus", audience: "Littérature scientifique", what: "Synthétise des articles évalués par des pairs autour d'une question.", price: "plan gratuit de base ; 20 $/mois après l'essai (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "SciSpace", audience: "Lire des articles difficiles", what: "Explique un PDF d'article académique section par section.", price: "gratuit limité ; payant dès 20 $/mois (2026-01)", source: ZEMITH_RECHERCHE },
      { name: "Semantic Scholar", audience: "Trouver des publications", what: "Moteur de recherche de publications scientifiques, utile pour vérifier qu'une référence existe.", price: "gratuit", source: ZEMITH_RECHERCHE },
    ],
    workflow: [
      { step: "Lire la charte IA de l'établissement", detail: "Certaines formations interdisent l'IA générative pour la rédaction, d'autres demandent de déclarer son usage. En cas de doute, demandez au directeur de mémoire." },
      { step: "Explorer avec des sources", detail: "Utilisez Perplexity ou Consensus pour repérer des pistes, jamais comme source finale." },
      { step: "Vérifier chaque référence", detail: "Retrouvez chaque article dans Semantic Scholar, HAL, Cairn ou le catalogue de la BU. Une référence introuvable est à supprimer." },
      { step: "Lire les sources vous-même", detail: "Déposez les PDF dans NotebookLM pour les questionner, mais citez ce que vous avez lu dans le texte original." },
      { step: "Écrire l'analyse vous-même", detail: "Plan, arguments et conclusion doivent être les vôtres. Gardez vos brouillons : ils prouvent votre démarche." },
    ],
    combos: [
      { pair: "Perplexity + catalogue de la BU", why: "Perplexity trouve les pistes, la BU donne accès aux textes complets et vérifiés." },
      { pair: "NotebookLM + gestionnaire de références (Zotero)", why: "Questionnez vos PDF dans NotebookLM et gérez la bibliographie dans Zotero pour éviter les erreurs de citation." },
    ],
    cautions: [
      "ChatGPT peut inventer des références qui n'existent pas. Vérifiez-les toutes avant de les citer.",
      "Un texte entièrement rédigé par l'IA et présenté comme le vôtre peut être traité comme une fraude par l'établissement.",
      "Ne déposez pas de données d'enquête nominatives (entretiens, questionnaires) dans un outil grand public : le RGPD s'applique.",
    ],
    keywords: ["IA mémoire de fin d'études", "recherche documentaire IA", "Perplexity étudiant gratuit", "NotebookLM", "citations inventées ChatGPT"],
  },
  {
    slug: "business-plan",
    category: "Documents et présentations",
    title: "Business plan avec l'IA : outils français et dossier de financement (octobre 2026)",
    description: "Bpifrance Création, CCI Business Builder, The Business Plan Shop, Créermonbusinessplan.fr, LivePlan et les assistants IA : prix, usage, et ce qu'une banque ou un réseau de prêt d'honneur regarde vraiment.",
    checked: "2026-10-25",
    intro: "En France, les outils gratuits des réseaux d'accompagnement (Bpifrance Création, CCI) couvrent déjà la structure et le prévisionnel. L'IA aide surtout à rédiger les parties texte et à challenger les hypothèses. Les chiffres, eux, doivent venir de vos devis, de vos études et de vos échanges avec un conseiller.",
    tools: [
      { name: "Bpifrance Création", maker: "Bpifrance", audience: "Créateurs et repreneurs", what: "Outil en ligne de business plan, partageable avec des collaborateurs.", price: "gratuit (Pass Entrepreneur) (2026-09)", source: INDEP_BP },
      { name: "CCI Business Builder", maker: "CCI France", audience: "Créateurs qui veulent un accompagnement", what: "Construction guidée du projet avec possibilité d'appui d'un conseiller CCI.", price: "gratuit (2026-09)", source: INDEP_BP },
      { name: "Créermonbusinessplan.fr", audience: "Porteurs de projet", what: "Business plan en ligne avec une offre Premium qui ajoute une rédaction assistée par IA.", price: "1 projet gratuit ; offre créateur 49 € ; Premium IA : prix non communiqué (2026-09)", source: INDEP_BP },
      { name: "The Business Plan Shop", audience: "Créateurs, repreneurs, experts-comptables", what: "Rédaction assistée à partir de modèles sectoriels et prévisionnel financier.", price: "29 €/mois ou 16,60 €/mois en annuel, essai 7 jours (2026-09)", source: INDEP_BP },
      { name: "LivePlan", audience: "Projets tournés vers l'international", what: "Business plan avec réécriture par IA ; surtout utilisé aux États-Unis.", price: "Standard 20 $/mois, Premium 40 $/mois (2026-09)", source: INDEP_BP },
      { name: "Le Chat", maker: "Mistral AI", audience: "Rédiger et relire les parties texte", what: "Reformule la présentation du projet, liste les risques et prépare les questions d'un banquier.", price: "gratuit ; Pro 14,99 €/mois (2026-08)", source: TECHINSIDER_LECHAT },
    ],
    workflow: [
      { step: "Choisir le destinataire", detail: "Banque, réseau de prêt d'honneur, Bpifrance ou associés : chacun attend un niveau de détail différent. Demandez leur trame." },
      { step: "Poser les chiffres d'abord", detail: "Devis, loyer, salaires, prix de vente : remplissez le prévisionnel avec des montants sourcés avant d'écrire le texte." },
      { step: "Rédiger avec l'IA, section par section", detail: "Donnez à l'assistant vos notes et chiffres, demandez un premier jet par partie (marché, offre, équipe), puis réécrivez-le avec vos mots." },
      { step: "Faire jouer le contradicteur", detail: "Demandez à l'IA les dix questions qu'un banquier poserait et les hypothèses les plus fragiles." },
      { step: "Faire relire par un conseiller", detail: "CCI, BGE, réseau d'accompagnement ou expert-comptable : une relecture humaine avant le dépôt." },
    ],
    combos: [
      { pair: "Bpifrance Création + assistant IA", why: "L'outil gratuit donne la structure et le prévisionnel, l'IA aide à rédiger les parties texte." },
      { pair: "Prévisionnel + expert-comptable", why: "Les banques font davantage confiance à un prévisionnel relu par un professionnel." },
    ],
    cautions: [
      "Une étude de marché inventée par l'IA se repère vite. Citez des sources réelles (INSEE, fédérations professionnelles, CCI).",
      "Ne présentez jamais un chiffre généré par l'IA comme un fait : chaque montant doit avoir une source ou une hypothèse écrite.",
      "Les tarifs viennent d'un comparatif mis à jour en septembre 2026. Vérifiez sur le site de l'éditeur.",
    ],
    keywords: ["business plan IA", "Bpifrance Création business plan", "prévisionnel financier gratuit", "business plan prêt bancaire", "dossier de financement IA"],
  },
  {
    slug: "coding-website",
    category: "Gestion et développement",
    title: "Coder et créer un site avec l'IA (vibe coding) en 2026",
    description: "Cursor, Claude Code, GitHub Copilot, Lovable, Bolt.new, Replit, v0 et Hostinger Horizons : à qui ils s'adressent, ordres de prix, et les incidents de sécurité à connaître avant de mettre des données personnelles en ligne.",
    checked: "2026-10-25",
    intro: "Le vibe coding permet de décrire une application et de la voir se construire. Pour un prototype, c'est très efficace. Pour un site qui collecte des données personnelles ou des paiements, le code généré doit être relu : plusieurs outils ont eu des failles en 2026, et le RGPD s'applique à ce que vous mettez en ligne.",
    tools: [
      { name: "Cursor", audience: "Développeurs", what: "Éditeur de code dérivé de VS Code qui modifie plusieurs fichiers à la fois ; produit beaucoup de code vite, d'où un besoin de relecture.", source: BDM_VIBE },
      { name: "Claude Code", maker: "Anthropic", audience: "Profils techniques", what: "Agent en terminal qui lit, écrit, teste et itère sur un projet entier.", price: "abonnement Claude ou facturation à l'usage via l'API (2026-08)", source: BDM_VIBE },
      { name: "GitHub Copilot", maker: "GitHub", audience: "Développeurs, étudiants", what: "Autocomplétion, tâches multi-fichiers et pull requests ; moins autonome que Cursor sur les grosses tâches.", price: "parmi les moins chers ; gratuit pour les étudiants et les projets open source (2026-08)", source: BDM_VIBE },
      { name: "Lovable", audience: "Non-développeurs, prototypes", what: "Génère une application complète à partir d'une description. Une faille d'autorisation a été révélée en avril 2026.", source: BDM_VIBE },
      { name: "Bolt.new", maker: "StackBlitz", audience: "Prototypes dans le navigateur", what: "Génère et déploie un prototype ; décroche au-delà d'une quinzaine de composants.", source: BDM_VIBE },
      { name: "Hostinger Horizons", maker: "Hostinger", audience: "Petits sites avec hébergement inclus", what: "Génération de code, hébergement, domaine et messagerie au même endroit ; plateforme encore jeune.", source: BDM_VIBE },
    ],
    workflow: [
      { step: "Écrire le besoin sur une page", detail: "Pages, fonctions, qui se connecte, quelles données sont collectées. Moins c'est flou, moins l'outil improvise." },
      { step: "Prototyper sans vraies données", detail: "Utilisez des comptes et des contenus fictifs tant que le site n'a pas été relu." },
      { step: "Protéger les clés", detail: "Clés Supabase, Stripe ou Google ne doivent jamais apparaître dans le code côté navigateur. Vérifiez les règles d'accès à la base." },
      { step: "Ajouter les mentions obligatoires", detail: "Mentions légales, politique de confidentialité et gestion des cookies conforme aux recommandations de la CNIL avant la mise en ligne." },
      { step: "Faire relire avant d'ouvrir", detail: "Dès qu'il y a des données personnelles ou des paiements, une personne qualifiée relit le code et les accès." },
    ],
    combos: [
      { pair: "Lovable ou Bolt pour le prototype + Cursor ou Claude Code pour la suite", why: "On valide l'idée vite, puis on reprend le code dans un vrai environnement de développement." },
      { pair: "v0 + développeur back-end", why: "v0 (Vercel) est centré sur l'interface ; la logique complexe demande un autre environnement." },
    ],
    cautions: [
      "Selon le Blog du Modérateur, 40 à 62 % du code généré pourrait contenir des vulnérabilités, et une étude sur 470 pull requests mesure 2,74 fois plus de défauts dans le code écrit par IA.",
      "Un agent Replit a supprimé une base de production malgré un gel du code : ne donnez pas à un agent l'accès à vos données réelles sans sauvegarde.",
      "Base44 (racheté par Wix) a eu un contournement d'authentification. Prudence avec les données sensibles, quel que soit l'outil.",
      "Ordres de prix cités en août 2026 : gratuit avec quotas, 20 à 25 €/mois pour un usage individuel, env. 40 €/utilisateur/mois en équipe, 100 à 200 €/mois en usage intensif.",
    ],
    keywords: ["vibe coding", "créer un site web avec l'IA", "Lovable avis", "Cursor prix", "Claude Code", "coder avec l'IA"],
  },
  {
    slug: "customer-chat",
    category: "Gestion et développement",
    title: "Chatbot IA pour le service client : outils et obligations (octobre 2026)",
    description: "Crisp, Heeya, Intercom Fin, Zendesk, Freshdesk, HubSpot et Dydu/Zaion comparés sur le modèle de prix, plus l'obligation de l'AI Act depuis le 2 août 2026 : dire au client qu'il parle à une IA.",
    checked: "2026-10-25",
    intro: "Un chatbot IA répond aux questions fréquentes à partir de vos documents et passe la main à un humain quand il bloque. Depuis le 2 août 2026, l'article 50 de l'AI Act impose d'informer la personne qu'elle échange avec une IA, sauf si c'est évident. Les prix se comptent de plus en plus à la résolution plutôt qu'à l'agent.",
    tools: [
      { name: "Crisp", maker: "Crisp (France)", audience: "PME françaises", what: "Chat en direct, chatbot, messagerie omnicanale et tickets.", price: "gratuit (2 agents) jusqu'à 95 €/mois agents illimités (2026-09)", source: TENSORIA_CHATBOT },
      { name: "Heeya", audience: "PME sans équipe technique", what: "Importe PDF, Word et pages du site, s'affiche via un widget ; hébergement en Europe, canal web uniquement.", price: "gratuit, puis 19 €/mois (500 messages) ou 99 €/mois (2 500 messages) (2026-09)", source: TENSORIA_CHATBOT },
      { name: "Intercom Fin", maker: "Intercom", audience: "Équipes déjà sous Intercom", what: "Résolution automatique et transfert vers un agent avec l'historique.", price: "0,99 $ par résolution, minimum 50 résolutions/mois (2026-09)", source: TENSORIA_CHATBOT },
      { name: "Zendesk AI Agents", maker: "Zendesk", audience: "Équipes sous Zendesk", what: "Agents IA intégrés au helpdesk Zendesk.", price: "env. 1 à 2 $ par résolution, en plus de l'abonnement Suite (2026-09)", source: TENSORIA_CHATBOT },
      { name: "HubSpot Breeze Customer Agent", maker: "HubSpot", audience: "Utilisateurs de Service Hub", what: "Agent de support relié au CRM HubSpot.", price: "0,50 $ par résolution, sur abonnement Service Hub (2026-09)", source: TENSORIA_CHATBOT },
      { name: "Dydu / Zaion", audience: "Banque, assurance, grandes entreprises", what: "Chatbot, callbot, voicebot et chat en direct ; Zaion a racheté Dydu en mars 2026.", price: "sur devis (2026-09)", source: TENSORIA_CHATBOT },
    ],
    workflow: [
      { step: "Lister les 20 questions les plus fréquentes", detail: "Partez des vrais tickets et courriels. Le chatbot ne doit répondre qu'à ce que vos documents couvrent." },
      { step: "Préparer une base de réponses propre", detail: "Conditions générales, délais de livraison, retours, tarifs à jour. Une source obsolète donne une réponse fausse." },
      { step: "Afficher que c'est une IA", detail: "Message d'accueil clair (« Vous échangez avec un assistant IA ») : c'est une obligation de l'AI Act depuis le 2 août 2026." },
      { step: "Prévoir le passage à un humain", detail: "Bouton visible vers un conseiller ou un formulaire, surtout pour les réclamations et les remboursements." },
      { step: "Relire les conversations chaque semaine", detail: "Repérez les mauvaises réponses et complétez la base. Suivez le taux de transfert vers un humain." },
    ],
    combos: [
      { pair: "Chatbot + helpdesk existant", why: "Choisir l'IA de l'outil que vous utilisez déjà (Zendesk, Intercom, HubSpot) évite de dupliquer l'historique client." },
      { pair: "Hébergement UE + registre RGPD", why: "Un outil hébergé en Europe simplifie la documentation des transferts dans le registre des traitements." },
    ],
    cautions: [
      "AI Act, article 50 : informer la personne qu'elle échange avec une IA. Sanction possible jusqu'à 15 M€ ou 3 % du chiffre d'affaires mondial pour les manquements de transparence.",
      "Le chatbot n'engage pas moins l'entreprise qu'un conseiller : une promesse fausse sur un remboursement ou un délai peut vous être opposée.",
      "La facturation à la résolution peut grimper vite. Fixez un plafond mensuel dans l'outil.",
      "Les conversations contiennent des données personnelles : durée de conservation, information des clients et sous-traitants à inscrire dans le registre RGPD.",
    ],
    keywords: ["chatbot service client IA", "Crisp chatbot prix", "Intercom Fin prix", "AI Act chatbot obligation", "SAV automatisé IA"],
  },
  {
    slug: "blog-seo",
    category: "Marketing et publicité",
    title: "Blog et SEO avec l'IA en France après l'arrivée d'AI Overviews (octobre 2026)",
    description: "AI Overviews et AI Mode sont arrivés en France le 22 juillet 2026. Ce que cela change pour le trafic, comment écrire avec l'IA sans produire du contenu générique, et l'option de retrait offerte aux éditeurs.",
    checked: "2026-10-25",
    intro: "Google a commencé à déployer AI Overviews et AI Mode en France le 22 juillet 2026, après un long blocage lié aux droits voisins. Les résumés IA en haut des résultats réduisent les clics vers les sites. L'IA aide à écrire plus vite, mais un article qui n'apporte rien de plus que le résumé de Google a peu de chances d'être lu.",
    tools: [
      { name: "AI Overviews et AI Mode", maker: "Google", audience: "Tous les sites qui vivent du trafic Google", what: "Résumés IA au-dessus des liens et onglet conversationnel qui découpe une question en sous-sujets. Google s'est engagé à permettre aux éditeurs français de retirer leurs contenus des AI Overviews sans pénalité de classement.", price: "gratuit pour l'utilisateur", source: BDM_AIO },
      { name: "Le Chat", maker: "Mistral AI", audience: "Rédaction et relecture en français", what: "Plan, reformulation, titres et méta-descriptions ; données dans l'UE selon l'éditeur.", price: "gratuit ; Pro 14,99 €/mois (2026-08)", source: TECHINSIDER_LECHAT },
    ],
    workflow: [
      { step: "Partir d'une expérience réelle", detail: "Un test, un chiffre maison, une photo, un avis de terrain : ce que le résumé IA de Google ne peut pas donner." },
      { step: "Faire un plan avec l'IA", detail: "Demandez les questions que se pose le lecteur, puis gardez celles où vous avez quelque chose de vrai à dire." },
      { step: "Écrire, puis faire relire", detail: "L'IA propose un premier jet ; vous réécrivez avec vos exemples et vérifiez chaque chiffre et chaque nom." },
      { step: "Signer et sourcer", detail: "Auteur identifié, date de mise à jour, liens vers les sources. C'est aussi ce qui rend un contenu citable par les moteurs IA." },
      { step: "Suivre les clics, pas seulement les positions", detail: "Avec AI Overviews, une bonne position peut rapporter moins de clics. Comparez avant/après juillet 2026 dans la Search Console." },
    ],
    combos: [
      { pair: "Contenu original + données structurées", why: "Les balises (article, FAQ, produit) aident les moteurs à comprendre la page et à la citer." },
      { pair: "Blog + newsletter", why: "Une liste d'abonnés réduit la dépendance au trafic Google, devenu moins prévisible." },
    ],
    cautions: [
      "Une étude Authoritas au Royaume-Uni mesure une baisse du taux de clic de 47,5 % sur ordinateur et 37,7 % sur mobile quand un résumé IA s'affiche ; Sistrix en Allemagne mesure 25 à 30 %. Google conteste ces baisses.",
      "Depuis le 2 août 2026, l'AI Act prévoit que certains contenus générés par IA soient identifiables comme tels ; pour un texte d'intérêt public publié sans relecture humaine, indiquez qu'il a été généré par IA.",
      "Publier en masse des articles générés sans valeur ajoutée reste contraire aux règles anti-spam de Google.",
    ],
    keywords: ["rédaction SEO IA", "AI Overviews France", "AI Mode Google France", "article de blog IA", "baisse trafic SEO IA"],
  },
];
