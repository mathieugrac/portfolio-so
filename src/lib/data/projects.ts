export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  layout?: "center" | "left" | "right" | "center-small";
}

export interface DistributionItem {
  role: string;
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  director: string;
  cover: string;
  description?: string;
  distribution?: DistributionItem[];
  images?: ProjectImage[];
  content?: string; // HTML content for rich text sections
}

export const projects: Project[] = [
  {
    slug: "art-de-la-joie",
    title: "L'Art de la joie",
    subtitle: "d'après Goliarda Sapienza",
    year: 2023,
    director: "Ambre Kahan",
    cover: "/img/cover/art-de-la-joie-ambre-kahan-sapienza-mc93-couverture.jpg",
    description: `Après une première collaboration sur IVRES, j'embarque de nouveau avec Ambre Kahan sur l'adaptation de l'Art de la joie : œuvre immensément riche à tous points de vue. Grandement inspiré de l'architecture Italienne et plus particulièrement de la Sicile - lieu emblématique du récit - nous avons imaginé un décor qui puisse accueillir cette traversée dans le temps, cette épopée joyeuse qu'est le parcours de Modesta (interprétée par Noémie Gantier). Porté par 14 acteurs et actrices, le spectacle tend à raconter les deux premières parties du roman de Goliarda Sapienza, de 1905 à 1930.`,
    distribution: [
      { role: "Mise en scène", name: "Ambre Kahan" },
      {
        role: "Collaboration",
        name: "Romain Tamisier (assistant à la mise en scène)",
      },
      { role: "Scénographie", name: "Anne-Sophie Grac" },
      { role: "Lumières", name: "Zélie Champeau" },
      {
        role: "Son",
        name: "Mathieu Plantevin et Jean-Baptiste Cognet à la création musicale",
      },
      { role: "Costumes", name: "Angèle Gaspar" },
      { role: "Maquillage", name: "Judith Scotto (maquillage et perruques)" },
      {
        role: "Avec",
        name: "Aymeline Alix, Jean Aloïs Belbachir, Florent Favier, Noémie Gantier, Vanessa Koutseff, Elise Martin, Serge Nicolaï, Léonard Prego, Louise Rieger, Richard Sammut, Romain Tamisier, Sélim Zahrani et les musicien·nes Amandine Robilliard et Romain Thorel",
      },
      { role: "Crédit photo", name: "Charles Rey et Ida Renouvel au plateau" },
      {
        role: "Régie générale et plateau",
        name: "Christophe Raynaud de Lage & Matthieu Sandjivy",
      },
    ],
    images: [
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-theatre-des-celestins-noemie-gantier.jpg",
        alt: "Scène de L'Art de la joie",
        layout: "center",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-anne-sophie-grac-scenographie-decor.jpg",
        alt: "Croquis de scénographie",
        caption:
          "Croquis présentant les trois configurations du décor : le Couvent, le Château du Carmel et la Villa Suravita.",
        layout: "center",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-theatre-des-celestins-noemie-gantier-modesta.jpg",
        alt: "Noémie Gantier dans le rôle de Modesta",
        caption: "Noémie Gantier dans le rôle principal de Modesta.",
        layout: "left",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-theatre-des-celestins-couvent.jpg",
        alt: "Les sœurs du Couvent",
        caption:
          "Les sœurs du Couvent de la Vierge aux sept douleurs (tableau 1).",
        layout: "right",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-grac-scenographie.jpg",
        alt: "Vue d'ensemble du décor",
        caption:
          'Vue d\'ensemble du décor dans la configuration "Château du Carmel".',
        layout: "left",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-MC93-aymeline-alix.jpg",
        alt: "Aymeline Alix et Elise Martin",
        caption:
          "Aymeline Alix dans le rôle de Gaïa et Elise Martin dans le rôle de Béatrice.",
        layout: "left",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-mc93-vanessa-koutseff-selim-zahrani.jpg",
        alt: "La Villa Suravita",
        caption:
          "La Villa Suravita. Vanessa Koutseff (Inès), Sélim Zahrani (Pietro) et Noémie Gantier (Modesta).",
        layout: "center",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-mc93-florent-favier-noemie-gantier.jpg",
        alt: "Florent Favier et Noémie Gantier",
        caption:
          "Florent Favier dans le rôle de Carlo et Noémie Gantier (Modesta).",
        layout: "right",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-theatre-des-celestins-villa-suravita.jpg",
        alt: "Villa Suravita",
        layout: "center",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-theatre-des-celestins.mc93-serge-nicolai.jpg",
        alt: "Serge Nicolaï et Noémie Gantier",
        caption:
          "Serge Nicolaï dans le rôle de Carmine et Noémie Gantier (Modesta).",
        layout: "left",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-theatre-des-celestins-alois-belbachir.jpg",
        alt: "Jean Aloïs Belbachir",
        layout: "right",
      },
      {
        src: "/img/joie/art-de-la-joie-ambre-kahan-goliarda-sapienza-scenographie-theatre-des-celestins.jpg",
        alt: "Image finale",
        caption: "Image finale de l'Art de la joie (Parties 1 & 2)",
        layout: "center",
      },
    ],
  },
  {
    slug: "le-diner-chez-les-francais",
    title: "Le dîner chez les Français",
    year: 2023,
    director: "Léo Cohen-Paperman, Julien Campani",
    cover:
      "/img/cover/diner-chez-les-francais-vge-leo-cohen-paperman-couverture.jpg",
  },
  {
    slug: "la-culotte",
    title: "La culotte",
    year: 2023,
    director: "Émeline Bayart",
    cover:
      "/img/cover/la-culotte-emeline-bayart-grac-anne-sophie-couverture.jpg",
  },
  {
    slug: "o-mon-bel-inconnu",
    title: "Ô mon bel inconnu",
    year: 2022,
    director: "Émeline Bayart",
    cover:
      "/img/cover/o-mon-bel-inconnu-emeline-bayart-palazzetto-bru-zane-couverture.jpg",
  },
  {
    slug: "gretel-hansel-et-les-autres",
    title: "Gretel, Hansel et les autres",
    year: 2022,
    director: "Igor Mendjisky",
    cover:
      "/img/cover/gretel-hansel-et-les-autres-igor-mendjisky-anne-sophie-grac-couverture.jpg",
  },
  {
    slug: "ivres",
    title: "Ivres",
    year: 2021,
    director: "Ambre Kahan",
    cover: "/img/cover/ivres-ambre-kahan-le-quai-angers-couverture.jpg",
  },
  {
    slug: "une-vague-esperance",
    title: "Une vague espérance",
    year: 2021,
    director: "Joël Dragutin",
    cover:
      "/img/cover/une-vague-esperance-joel-dragutin-anne-sophie-grac-couverture.jpg",
  },
  {
    slug: "la-terre-se-revolte",
    title: "La terre se révolte",
    year: 2020,
    director: "Sara Llorca",
    cover:
      "/img/cover/la-terre-se-revolte-MC93-sara-llorca-lou-de-laage-couverture.jpg",
  },
  {
    slug: "data-mossoul",
    title: "Data, Mossoul",
    year: 2019,
    director: "Joséphine Serre",
    cover:
      "/img/cover/Data-mossoul-josephine-serre-la-colline-veronique-caye-video-scene-burka.jpg",
  },
  {
    slug: "devotion",
    title: "Dévotion",
    year: 2019,
    director: "Clément Bondu",
    cover: "/img/cover/devotion-cover-3.jpg",
  },
  {
    slug: "othello",
    title: "Othello",
    year: 2018,
    director: "Léo Cohen-Paperman",
    cover:
      "/img/cover/othello-leo-cohen-paperman-julien-romelard-anna-fournier-couverture.jpg",
  },
  {
    slug: "les-eaux-et-forets",
    title: "Les Eaux et Forêts",
    year: 2017,
    director: "Michel Didym",
    cover:
      "/img/cover/Les-eaux-et-forets-michel-didym-scenographie-couverture.jpg",
  },
  {
    slug: "la-loi-de-la-gravite",
    title: "La loi de la gravité",
    year: 2017,
    director: "Anthony Thibault",
    cover:
      "/img/cover/la-loi-de-la-gravite-anthony-thibault-anne-sophie-grac-quentin-laugier-alison-valence-couverture.jpg",
  },
  {
    slug: "la-famille-royale",
    title: "La Famille Royale",
    year: 2017,
    director: "Thierry Jolivet",
    cover:
      "/img/cover/la-famille-royale-thierry-jolivet-zoe-fauconnet-couverture.jpg",
  },
  {
    slug: "dans-un-canard",
    title: "Dans un canard",
    year: 2017,
    director: "Jean-Daniel Magnin",
    cover:
      "/img/cover/couverture-emeline-bayart-manuel-le-lievre-quentin-baillot-theatre-rond-point.jpg",
  },
  {
    slug: "une-maison-de-poupee",
    title: "Une Maison de poupée",
    year: 2016,
    director: "Lorraine de Sagazan",
    cover: "/img/cover/couverture-maison-de-poupee-scenographie.jpg",
  },
  {
    slug: "chinoiseries",
    title: "Chinoiseries",
    year: 2016,
    director: "Nabil El Azan",
    cover:
      "/img/cover/chinoiseries-nabil-el-azan-vingtieme-theatre-christine-murillo-cover.jpg",
  },
  {
    slug: "elle",
    title: "Elle",
    year: 2016,
    director: "Vincent Thépaut",
    cover: "/img/cover/elle-jean-genet-decor-anne-sophie-grac-cover.jpg",
  },
  {
    slug: "madame-de-neandertal",
    title: "Madame de Néandertal",
    year: 2015,
    director: "Corinne Lallemand et Emmanuelle Rozes",
    cover: "/img/cover/madame-de-neandertal-pascale-vignal-couverture.jpg",
  },
  {
    slug: "arance",
    title: "Arance",
    subtitle: "Arance, avoid shooting blacks",
    year: 2015,
    director: "Pietro Marullo",
    cover: "/img/cover/cover-arance_pietro-marullo-festival-emulation-2015.jpg",
    description: `À travers la figure d'Ahmed, immigré du Ghana qui perdra la vie dans une usine désafectée du sud de l'Italie, ARANCE - avoid shooting blacks (Oranges - évitez de tirer sur les noirs) est un spectacle sur l'esclavagisme moderne et le lien entre les politiques agricoles et celles de l'immigration. Les révoltes des travailleurs immigrés saisonniers, qui éclatent régulièrement en Italie, en Espagne et en Grèce depuis 2004, nous révèlent un nouveau visage de la campagne européenne. Arance est un spectacle d'images, d'impressions et de métaphores, qui nous conduit dans un voyage onirique, au berceau de l'humanité. J'ai travaillé en collaboration avec Pietro Marullo et Bertrand Nodet sur la scénographie et les costumes.`,
    distribution: [
      { role: "Mise en scène", name: "Pietro Marullo" },
      {
        role: "Scénographie",
        name: "Anne-Sophie Grac, Pietro Marullo, Bertrand Nodet",
      },
      { role: "Son", name: "Jean-Noël Boissé" },
      { role: "Lumières", name: "Marc Lhommel" },
      {
        role: "Costumes",
        name: "Anne-Sophie Grac, Pietro Marullo, Bertrand Nodet",
      },
      {
        role: "Avec",
        name: "Paola Di Bella, Noémi Knecht, Adrien Letartre, Hamado Tiemtoré, Baptiste Toulemonde et GUESTS",
      },
      {
        role: "Crédit photo",
        name: "Stéphane Deleersnijder, Dominique Houcmant",
      },
    ],
    images: [
      {
        src: "/img/arance/arance-pietro-marullo-emulation-2015-melancolia.jpg",
        alt: "Scène du spectacle Arance",
        caption:
          "ARANCE s'est joué au Théâtre de Liège (salle de la Grande Main) en avril 2015, dans le cadre du Festival Emulation. Le parti pris scénographique a été de renverser l'espace scène/salle en plaçant les spectateurs sur le plateau (au lointain). Au cours de la représentation, le rideau de fer s'ouvrait, découvrant ainsi l'entièreté de la salle et son gradin de 600 places.",
        layout: "center",
      },
      {
        src: "/img/arance/arance_festival-emulation-2015.jpg",
        alt: "Festival Emulation 2015",
        layout: "right",
      },
      {
        src: "/img/arance/arance-pietro-marullo-2015-hamado-tiemtore.jpg",
        alt: "Hamado Tiemtoré dans le rôle d'Ahmed",
        caption: "Hamado Tiemtoré dans le rôle d'Ahmed.",
        layout: "left",
      },
      {
        src: "/img/arance/arance-pietro-marullo-2015-paola-di-bella.jpg",
        alt: "Paola Di Bella",
        caption:
          'Création d\'une robe "changeante" pour Paola Di Bella, danseuse et performeuse.',
        layout: "center",
      },
      {
        src: "/img/arance/arance-pietro-marullo-2015-adrien-baptiste.jpg",
        alt: "Baptiste Toulemonde et Adrien Letartre",
        caption: 'Baptiste Toulemonde et Adrien Letartre - "les caporaux".',
        layout: "left",
      },
      {
        src: "/img/arance/arance-pietro-marullo-festival-emulation-2015.jpg",
        alt: "Scène des oranges",
        caption: 'Scène des "oranges". Comédiens et figurants.',
        layout: "right",
      },
      {
        src: "/img/arance/arance_pietro-marullo-emulation-2015-oranges.jpg",
        alt: "Les oranges",
        layout: "left",
      },
      {
        src: "/img/arance/arance-pietro-marullo-2015-boom.jpg",
        alt: "Noémi Knecht et Paola Di Bella",
        caption: "Au centre : Noémi Knecht et Paola Di Bella.",
        layout: "center",
      },
    ],
    content: `<p>L'aventure d'ARANCE a commencé dès 2012, avec comme point de départ : « l'après Lampedusa ». Si la mer rejette des corps sur les plages de Lampedusa, si ce « cimetière des rêves » est un choix « entre la mort et la mort », que deviennent les hommes et les femmes qui survivent à la traversée ? Pietro Marullo et sa jeune équipe sont partis à leur rencontre.</p>
<p>A Lecce, dans les Pouilles - mais ça pourrait être une autre région du Sud de l'Italie -, la plupart récoltent des fruits au rythme des saisons. Ils sont des « saisonniers », sans papiers, et vivent concentrés dans des ghettos sans eau ni électricité. Leurs abris sont faits de pneus, de sièges de voiture, de bâches, de morceaux de tôles ou de bouts de plastique. Leur travail au noir est très pauvrement payé. De leur maigre salaire, des « caporaux » - sorte de contremaîtres engagés la plupart du temps par des mafias locales pour contrôler leur travail - retirent le prix du loyer, de la nourriture et même celui de leurs déplacements « professionnels ». L'embauche n'est jamais garantie. Seuls les plus forts seront choisis. Le racisme et la violence se vivent au quotidien.</p>`,
  },
  {
    slug: "elvis-polyptyque",
    title: "Elvis (Polyptyque)",
    subtitle: "de Emmanuel Darley",
    year: 2015,
    director: "Emmanuel Darley et Gilone Brun",
    cover: "/img/cover/cover-elvis-polyptique-darley.jpg",
    description: `Quelque part dans le sud des États-Unis, un jeune garçon répondant au nom d'Elvis Aaron Presley se rêve camionneur. Sa mère lui offre un peigne pour coiffer ses cheveux. Son père lui offre une guitare. Sa bonne fée vient lui dire que plus tard, en fait, c'est plutôt King du rock qu'il fera comme métier. Alors il se met à chanter, et de suite tout le monde l'aime (...). J'ai assisté Gilone Brun sur la scénographie et les costumes de Elvis (Polyptyque), écrit par Emmanuel Darley. Cette collaboration m'a permis de participer pleinement à la conception de l'espace scénique, mais aussi de suivre de près le travail de mise en scène, aux côtés de l'auteur du texte.`,
    distribution: [
      { role: "Mise en scène", name: "Emmanuel Darley et Gilone Brun" },
      { role: "Scénographie", name: "Gilone Brun" },
      { role: "Son", name: "Manu Deligne" },
      { role: "Lumières", name: "José Victorien" },
      { role: "Costumes", name: "Gilone Brun" },
      { role: "Régie Générale", name: "Juliette Besançon" },
      {
        role: "Avec",
        name: "Émeline Bayart, Heidi Becker-Babel, Vincent Leenhardt, Dominique Parent, Yan Tassin",
      },
      { role: "Crédit photo", name: "Noric Laruelle" },
    ],
    images: [
      {
        src: "/img/elvis/elvis-polyptyque-emmanuel-darley-yan-tassin.jpg",
        alt: "Yan Tassin dans le rôle d'Elvis",
        caption:
          "Yan Tassin dans le rôle double d'Elvis et Jesse Garon, son frère jumeau mort-né.",
        layout: "center",
      },
      {
        src: "/img/elvis/elvis-polyptyque-heidi-becker-babel.jpg",
        alt: "Heidi Becker-Babel",
        caption:
          "Heidi Becker-Babel dans le rôle de la Fée, \"Little Queenie\". Création d'une maquette en \"pop-up\" représentant la maison d'enfance d'Elvis Presley à Tupelo (d'après photographies).",
        layout: "right",
      },
      {
        src: "/img/elvis/elvis-polyptyque-darley-vincent-leenhardt-emeline-bayart.jpg",
        alt: "Vincent Leenhardt et Emeline Bayart",
        caption:
          "Vincent Leenhardt et Emeline Bayart dans les rôles de Vernon Presley et Gladys Love Smith, les parents d'Elvis.",
        layout: "left",
      },
      {
        src: "/img/elvis/elvis-polyptyque-darley-orage.jpg",
        alt: "Scène de l'orage",
        layout: "right",
      },
      {
        src: "/img/elvis/elvis-polyptyque-yan-tassin-dominique-parent.jpg",
        alt: "Yan Tassin et Dominique Parent",
        caption:
          "Yan Tassin (Elvis) et Dominique Parent dans le rôle du Colonel.",
        layout: "left",
      },
      {
        src: "/img/elvis/elvis-polyptyque-darley-fans-heidi-emeline.jpg",
        alt: "Les fans",
        caption: "Heidi Becker-Babel et Emeline Bayart : les fans.",
        layout: "center",
      },
      {
        src: "/img/elvis/elvis-polyptyque-darley-2015-les-fans.jpg",
        alt: "Les fans",
        layout: "center",
      },
    ],
    content: `<h2>Note de l'auteur</h2>
<p>« Écrire sur une idole. Un personnage ainsi adulé, adoration presque religieuse, démesurée, invraisemblable. Elvis Presley. Trouver la manière de raconter cette vie-là, ce qui brille de mille feux et puis le sombre, ce qui se joue derrière. Naissance/mort du frère, enfance, découverte de la musique, gloire fulgurante. Focale sur l'intime. Le point de départ de ce projet, c'est une envie, un questionnement autour de la peinture de la Renaissance, des retables en particulier. Chercher une équivalence de ces polyptyques dans l'écriture théâtrale. Faire le portrait en creux d'un disparu. »</p>
<p><em>— Emmanuel Darley</em></p>`,
  },
  {
    slug: "le-vice-consul",
    title: "Le Vice Consul",
    year: 2014,
    director: "Éric Vigner",
    cover: "/img/cover/cover-vice-consul.jpg",
  },
  {
    slug: "la-difficulte-de-s-exprimer",
    title: "La Difficulté de s'exprimer",
    year: 2014,
    director: "Sacha Todorov",
    cover: "/img/cover/cover-copi.jpg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
