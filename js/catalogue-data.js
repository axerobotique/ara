/*
 * ============================================================================
 * CATALOGUE PRODUITS - Axe Robotique & Automatisme
 * ============================================================================
 * Ce fichier contient TOUT le catalogue affiche sur la page devis.
 * Pour AJOUTER, MODIFIER ou SUPPRIMER un element, il suffit de modifier ce
 * fichier (pas besoin de toucher au reste du site).
 *
 * Pour ajouter un nouvel article, copiez un bloc { ... } et adaptez :
 *   - id       : identifiant unique (pas d'espace, pas d'accents)
 *   - name     : nom affiche
 *   - desc     : courte description (optionnelle, peut etre vide "")
 *   - price    : prix HT en euros (nombre). Mettre null si "Sur devis".
 *   - unit     : unite affichee (ex: "cellule", "piece", "prestation")
 *
 * Pour ajouter une CATEGORIE, copiez un bloc de categorie complet.
 * ============================================================================
 */

const CATALOGUE = [
  {
    id: "cellules",
    title: "Cellules de palettisation completes",
    items: [
      {
        id: "pal-12kg",
        name: "Palettiseur robotise 12 Kg",
        desc: "Robot 6 axes 2050 mm, cadence 20 cartons/min, chassis, pilotage intuitif, prehenseur aspiration, securite grille & scanner, installation incluse (200 km).",
        price: 67000,
        unit: "cellule"
      },
      {
        id: "pal-25kg",
        name: "Palettiseur robotise 25 Kg",
        desc: "Robot 6 axes 2295 mm, cadence 20 cartons/min, chassis, pilotage intuitif, prehenseur aspiration, securite grille & scanner, installation incluse (200 km).",
        price: 72900,
        unit: "cellule"
      },
      {
        id: "pal-cobot-20kg",
        name: "Palettiseur robotise Cobotique No-Code 20 Kg",
        desc: "Cobot 6 axes 2150 mm, cadence 10 cartons/min, chassis, pilotage intuitif, prehenseur aspiration, certifie CE, installation incluse (200 km).",
        price: 84900,
        unit: "cellule"
      },
      {
        id: "pal-cobot-12kg-nu",
        name: "Version Cobot No-Code 12 Kg (cellule seule)",
        desc: "Robot 6 axes 2050 mm - 12 Kg, cadence 10 cartons/min. Dossier technique, montage, cablage, livraison, mise en service inclus.",
        price: null,
        unit: "cellule"
      },
      {
        id: "pal-cobot-30kg-nu",
        name: "Version Cobot No-Code 30 Kg (cellule seule)",
        desc: "Robot 6 axes 2050 mm - 30 Kg, cadence 10 cartons/min. Dossier technique, montage, cablage, livraison, mise en service inclus.",
        price: null,
        unit: "cellule"
      }
    ]
  },
  {
    id: "prehenseurs",
    title: "Prehenseurs",
    items: [
      {
        id: "prehenseur-mousse",
        name: "Prehenseur - Version Mousse",
        desc: "Prehenseur d'aspiration par mousse, pour cartons fermes. Dossier technique, preparation, montage et cablage inclus.",
        price: 4000,
        unit: "piece"
      },
      {
        id: "prehenseur-pince",
        name: "Prehenseur - Version Pince",
        desc: "Systeme de double pince pour la prise de 2 cartons ouverts. Dossier technique, preparation, montage et cablage inclus.",
        price: 5500,
        unit: "piece"
      }
    ]
  },
  {
    id: "chassis",
    title: "Chassis",
    items: [
      {
        id: "chassis-standard",
        name: "Chassis avec colonne fixe - Standard",
        desc: "Chassis a fixer au sol, 2 emplacements palettes, colonne fixe centrale, passage de cables integre, emplacement armoire(s).",
        price: 5000,
        unit: "piece"
      },
      {
        id: "chassis-inox",
        name: "Chassis avec colonne fixe - Version INOX agroalimentaire",
        desc: "Meme conception que la version standard, en inox pour environnement agroalimentaire.",
        price: 7000,
        unit: "piece"
      },
      {
        id: "chassis-telescopique-100kg",
        name: "Chassis avec colonne telescopique - 100 Kg",
        desc: "Colonne telescopique a moteur brushless installee sur le chassis, charge 100 Kg.",
        price: 9500,
        unit: "piece"
      },
      {
        id: "chassis-motorise-200kg",
        name: "Chassis avec colonne motorisee - 200 Kg",
        desc: "Robot sur bras deporte + axe lineaire motorise (courroie crantee) reprenant l'effort de charge, 200 Kg.",
        price: 15500,
        unit: "piece"
      },
      {
        id: "chassis-simple-ur10",
        name: "Chassis simple pour palettisation (UR10, LIFKIT, baie robot, 2 palettes)",
        desc: "Chassis monte en atelier, emplacements pour UR10, LIFKIT, baie robot et 2 palettes.",
        price: 4800,
        unit: "piece"
      },
      {
        id: "chassis-mobile-station",
        name: "Chassis mobile avec station d'accueil",
        desc: "Chassis mobile monte en atelier avec station d'accueil pour palettisation (UR10, LIFKIT, baie robot, 2 palettes).",
        price: 6000,
        unit: "piece"
      },
      {
        id: "station-accueil-sup",
        name: "Station d'accueil supplementaire (pour chassis mobile)",
        desc: "Ajout d'un poste au chassis mobile, raccordement electrique et pneumatique manuel.",
        price: 1800,
        unit: "piece"
      }
    ]
  },
  {
    id: "convoyeurs",
    title: "Convoyeurs",
    items: [
      {
        id: "convoyeur-simple",
        name: "Module convoyeur d'arrivee des produits - simple voie",
        desc: "Convoyeur a rouleaux pour acheminer les cartons jusqu'au robot + coffret electrique de pilotage.",
        price: 9500,
        unit: "piece"
      },
      {
        id: "convoyeur-kit-alignement-s",
        name: "Kit alignement carton (convoyeur simple)",
        desc: "Aligne le carton sur un cote pour le referencement par le robot.",
        price: 3000,
        unit: "option"
      },
      {
        id: "convoyeur-kit-hauteur-s",
        name: "Kit mesure de hauteur des cartons (convoyeur simple)",
        desc: "Mesure la hauteur des cartons en transit.",
        price: 2000,
        unit: "option"
      },
      {
        id: "convoyeur-kit-codebarre-s",
        name: "Kit lecture codes-barres (convoyeur simple)",
        desc: "Lecture des codes-barres des cartons en transit.",
        price: 4000,
        unit: "option"
      },
      {
        id: "convoyeur-kit-intercalaire-s",
        name: "Kit support intercalaires (convoyeur simple)",
        desc: "Support pour intercalaires au-dessus du convoyeur.",
        price: 3000,
        unit: "option"
      },
      {
        id: "convoyeur-double",
        name: "Module convoyeur d'arrivee des produits - double voie",
        desc: "Convoyeur a rouleaux divise en 2 voies independantes pour augmenter la cadence + coffret electrique de pilotage.",
        price: 13500,
        unit: "piece"
      },
      {
        id: "convoyeur-kit-hauteur-d",
        name: "Kit mesure de hauteur des cartons (convoyeur double)",
        desc: "Mesure la hauteur des cartons en transit.",
        price: 3500,
        unit: "option"
      },
      {
        id: "convoyeur-kit-alignement-d",
        name: "Kit alignement carton (convoyeur double)",
        desc: "Aligne le carton sur un cote pour le referencement par le robot.",
        price: null,
        unit: "option"
      },
      {
        id: "convoyeur-kit-codebarre-d",
        name: "Kit lecture codes-barres (convoyeur double)",
        desc: "Lecture des codes-barres des cartons en transit.",
        price: null,
        unit: "option"
      },
      {
        id: "convoyeur-kit-intercalaire-d",
        name: "Kit support intercalaires (convoyeur double)",
        desc: "Support pour intercalaires au-dessus du convoyeur.",
        price: null,
        unit: "option"
      },
      {
        id: "butee-simple",
        name: "Butee pour convoyeur client - simple",
        desc: "Etude mecanique + automatisme, fourniture du materiel avec pilotage, premontage atelier.",
        price: 1500,
        unit: "piece"
      },
      {
        id: "butee-complexe",
        name: "Butee pour convoyeur client - complexe (sur etude)",
        desc: "Idem version simple, cas complexe necessitant une etude specifique.",
        price: 3000,
        unit: "piece"
      },
      {
        id: "convoyeur-arrivee-2m",
        name: "Convoyeur arrivee des produits (2 m, charge max 20 kg)",
        desc: "Etude mecanique + automatisme, fourniture du materiel avec pilotage, premontage atelier.",
        price: 13500,
        unit: "piece"
      },
      {
        id: "convoyeur-arrivee-robotiq",
        name: "Convoyeur arrivee des produits pour cellule ROBOTIQ",
        desc: "Idem convoyeur standard + ajout de securite integre dans la cellule ROBOTIQ.",
        price: 13500,
        unit: "piece"
      },
      {
        id: "magasins-intercalaires",
        name: "Magasins intercalaires",
        desc: "Fourniture du materiel avec pilotage, premontage en atelier.",
        price: 4000,
        unit: "piece"
      }
    ]
  },
  {
    id: "pilotage",
    title: "Pilotage, automate & programmation",
    items: [
      {
        id: "kit-pilotage-intuitif",
        name: "Kit Pilotage intuitif",
        desc: "Surcouche logicielle + afficheur tactile + automate programmable pour un pilotage simplifie de la cellule.",
        price: 7500,
        unit: "piece"
      },
      {
        id: "kit-automate-programme",
        name: "Kit Automate et programme",
        desc: "Automate programmable, gestion de la mise en cycle, choix d'une recette de production, lancement en production.",
        price: 2800,
        unit: "piece"
      },
      {
        id: "kit-nocode-calepinage",
        name: "Kit Programmation No-Code - plan de calepinage",
        desc: "Logiciel de programmation simplifie, creation des trajectoires par simple choix de positions. A combiner avec le Kit Automate et programme.",
        price: 4200,
        unit: "piece"
      },
      {
        id: "kit-dev-calepinage",
        name: "Developpement d'un plan de calepinage sur mesure",
        desc: "Creation et test des trajectoires, deplacement et frais sur site client (prix moyen).",
        price: 1500,
        unit: "prestation"
      },
      {
        id: "armoire-electrique",
        name: "Armoire electrique de raccordement",
        desc: "Sectionneur general, alimentation 24VDC, protections, arret d'urgence, FRL air, relais de dialogue machine, cablage + schema electrique.",
        price: 4400,
        unit: "piece"
      },
      {
        id: "modem-telemaintenance",
        name: "Modem de telemaintenance",
        desc: "Fourniture, precablage et connexion (wifi ou cable) sur l'internet du client.",
        price: 1300,
        unit: "piece"
      }
    ]
  },
  {
    id: "securite",
    title: "Securite",
    items: [
      {
        id: "kit-securite-grille",
        name: "Kit Securite grille & scanner",
        desc: "Grilles de securite sur les cotes des deux palettes + scanner de securite a l'avant de la cellule.",
        price: 6500,
        unit: "piece"
      },
      {
        id: "kit-securite-renforce",
        name: "Kit securite renforce (grillage + radar)",
        desc: "Etude grillage de securite de chaque cote des deux palettes + 1 radar de securite, installation et mise en service incluses.",
        price: 9700,
        unit: "piece"
      },
      {
        id: "certification-securite",
        name: "Certification securite",
        desc: "Etude des risques et fourniture de l'analyse des risques.",
        price: 2200,
        unit: "prestation"
      }
    ]
  },
  {
    id: "amr",
    title: "Gestion de flux - robots mobiles AMR",
    items: [
      {
        id: "kit-gestion-flux-amr",
        name: "Kit gestion des flux d'AMR",
        desc: "Logiciel de gestion des flux, ordinateur + armoire de controle, 2 coffrets pour la gestion de postes, ecran de supervision. Licence pour 1 a 10 robots.",
        price: 9500,
        unit: "piece"
      },
      {
        id: "amr-mise-en-service",
        name: "Mise en service + demarrage sur 2 postes AMR",
        desc: "Installation de l'armoire principale et demarrage de l'application sur 2 postes (hors frais de deplacement).",
        price: 5500,
        unit: "prestation"
      },
      {
        id: "amr-poste-supplementaire",
        name: "Poste supplementaire a gerer par les robots AMR",
        desc: "Kit permettant d'ajouter un poste supplementaire (hors frais de deplacement).",
        price: 2000,
        unit: "piece"
      }
    ]
  },
  {
    id: "montage",
    title: "Montage & mise en service",
    items: [
      {
        id: "montage-atelier",
        name: "Montage de la cellule a l'atelier",
        desc: "Montage sur chassis, raccordement, prehenseur teste, capteurs testes, mise sous tension et test des trajectoires.",
        price: 2500,
        unit: "prestation"
      },
      {
        id: "montage-client",
        name: "Montage de la cellule chez le client (1 semaine)",
        desc: "Montage et recablage chez le client, mise en service de l'application sur un plan de palettisation.",
        price: 3200,
        unit: "prestation"
      },
      {
        id: "mise-en-service-200km",
        name: "Mise en service - rayon ~200 km",
        desc: "Montage, cablage, mise au point d'une recette, livraison, installation et mise en service chez le client.",
        price: 8600,
        unit: "prestation"
      },
      {
        id: "mise-en-service-500km",
        name: "Mise en service - rayon ~500 km",
        desc: "Idem prestation ci-dessus pour une distance d'environ 500 km.",
        price: 10500,
        unit: "prestation"
      }
    ]
  },
  {
    id: "robots-ur10",
    title: "Ensembles robot UR10 / LIFKIT",
    items: [
      {
        id: "ur10-lifkit",
        name: "Ensemble Robot UR10 + LIFKIT (course 900 mm)",
        desc: "UR10 e-Serie, LIFKIT jusqu'a 900 mm de course, chaine porte-cable, collier et gaine. A monter par le client.",
        price: null,
        unit: "piece"
      },
      {
        id: "ur10-lifkit-force",
        name: "Ensemble Robot UR10 + LIFKIT avec capteur de force",
        desc: "UR10 e-Serie avec capteur de force, LIFKIT jusqu'a 900 mm de course, chaine porte-cable, collier et gaine. A monter par le client.",
        price: null,
        unit: "piece"
      }
    ]
  }
];

// Ne pas modifier la ligne suivante : elle rend le catalogue disponible aux autres scripts.
if (typeof module !== "undefined") { module.exports = CATALOGUE; }
