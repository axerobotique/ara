/*
 * ============================================================================
 * CATALOGUE DE SECOURS - Axe Robotique & Automatisme
 * ============================================================================
 * Le catalogue affiche normalement est charge depuis un Google Sheet par
 * js/catalogue-loader.js (voir ce fichier pour la configuration).
 *
 * CE fichier ne sert QUE de secours : il est utilise automatiquement si le
 * Sheet n'est pas configure ou momentanement inaccessible. Vous pouvez tout
 * de meme le maintenir a jour manuellement pour garder un filet de securite,
 * en suivant la meme structure :
 *   - id       : identifiant unique (pas d'espace, pas d'accents)
 *   - name     : nom affiche
 *   - desc     : courte description (optionnelle, peut etre vide "")
 *   - price    : prix HT en euros (nombre). Mettre null si "Sur devis".
 *   - unit     : unite affichee (ex: "cellule", "piece", "prestation")
 *   - active   : optionnel. Mettre "false" pour masquer l'article sur le
 *                site (absent ou "true" = affiche).
 * ============================================================================
 */

const CATALOGUE_FALLBACK = [
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
  },
  {
    id: "bloc-base",
    title: "BLOC Base (modules robotiques mobiles)",
    items: [
      {
        id: "bloc-base-s",
        name: "BLOC Base version S",
        desc: "Module de base avec emplacement compatible robot au choix, systeme d'automatisme pour la flexibilite, detection automatique du poste de travail, armoire electrique de pilotage, interconnexion multipoint, 1 systeme de bridage, emplacement baie robot. Dossier technique, montage, cablage, programmation et livraison inclus (kit pour deux postes a distribuer).",
        price: 4500,
        unit: "module"
      },
      {
        id: "bloc-base-m",
        name: "BLOC Base version M",
        desc: "Idem version S, gabarit intermediaire adapte a un robot ou une application de taille moyenne.",
        price: 6000,
        unit: "module"
      },
      {
        id: "bloc-base-l",
        name: "BLOC Base version L",
        desc: "Idem version S, gabarit large adapte a un robot ou une application de plus grande taille.",
        price: 8700,
        unit: "module"
      }
    ]
  },
  {
    id: "bloc-modules",
    title: "BLOC Modules (a ajouter a un BLOC Base)",
    items: [
      {
        id: "bloc-plate",
        name: "BLOC Plate - plateau tournant multipositions",
        desc: "Module equipe d'un plateau tournant (4 a 12 positions) pour le positionnement des pieces a traiter : station d'accueil mecanique, systeme de referencement, electro-aimant de bridage. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 16000,
        unit: "module"
      },
      {
        id: "bloc-plate-specifique",
        name: "KIT Specifique Plate - etude des posages",
        desc: "Etude et fourniture specifique des posages/accessoires du module BLOC Plate en fonction du besoin client. Dossier technique, etude, montage, cablage, programmation et livraison inclus.",
        price: null,
        unit: "prestation"
      },
      {
        id: "bloc-2dvision",
        name: "BLOC 2DVision - devracage 2D sur convoyeur",
        desc: "Chargement d'une piece client par devracage 2D sur convoyeur : tremie de distribution + camera de vision 2D transmettant les points de prise au robot du BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 29000,
        unit: "module"
      },
      {
        id: "bloc-3dvision",
        name: "BLOC 3DVision - devracage 3D en vrac",
        desc: "Chargement d'une piece client par devracage 3D : camera de vision 3D + emplacement pour le contenant des pieces, transmettant les points de prise au robot du BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 57000,
        unit: "module"
      },
      {
        id: "bloc-accuplate",
        name: "BLOC AccuPlate - chargement ou dechargement",
        desc: "Module de convoyage de plateaux avec 1 systeme d'accumulation (convoyeur de 2 m + 1 ascenseur a plateau) pour une autonomie accrue. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 21000,
        unit: "module"
      },
      {
        id: "bloc-accuplate-mixte",
        name: "BLOC AccuPlate Mixte - chargement et dechargement",
        desc: "Module de convoyage de plateaux avec 2 systemes d'accumulation (convoyeur de 3 m + 2 ascenseurs a plateau) : les pieces sont presentees au robot puis rerangees. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 33000,
        unit: "module"
      },
      {
        id: "bloc-flexibowl",
        name: "BLOC FlexiBowl - devracage 2D sur bol rotatif",
        desc: "Bol rotatif + tremie vibrante + camera de vision 2D transmettant les points de prise au robot du BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 39500,
        unit: "module"
      },
      {
        id: "bloc-asyril",
        name: "BLOC Asyril - devracage 2D flexible (pieces <= 40 mm)",
        desc: "Systeme Asyril (pieces jusqu'a 40 mm) + tremie vibrante + camera de vision 2D transmettant les points de prise au robot du BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 39000,
        unit: "module"
      },
      {
        id: "bloc-conveyor",
        name: "BLOC Conveyor - convoyeur d'arrivee (2 m)",
        desc: "Convoyeur de 2 m integre sur un module, permettant l'acheminement des pieces deposees par le systeme client jusqu'au BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: 7900,
        unit: "module"
      },
      {
        id: "bloc-specifique",
        name: "BLOC Specifique - application sur mesure",
        desc: "Module adapte a une application specifique client (gravure, assemblage, controle d'aspect par vision, depose d'etiquette...). Dossier technique, montage, cablage, programmation et livraison inclus. A ajouter a un BLOC Base S, M ou L.",
        price: null,
        unit: "module"
      }
    ]
  },
  {
    id: "kits-bloc-base",
    title: "KITS pour BLOC Base",
    items: [
      {
        id: "bloc-kit-box",
        name: "KIT Box - posage carton (2 emplacements)",
        desc: "Deux emplacements sur le module de base pour la mise en place de deux cartons vides ou autres contenants. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 1800,
        unit: "piece"
      },
      {
        id: "bloc-kit-support",
        name: "KIT Support - posage pieces",
        desc: "Dispositif de posage concu pour les pieces du client, integre directement au module BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 1600,
        unit: "piece"
      },
      {
        id: "bloc-kit-conveyor",
        name: "KIT Conveyor - convoyeur sur BLOC Base (2 m)",
        desc: "Convoyeur de 2 m integre sur le module BLOC Base, permettant aux pieces d'etre deposees par le systeme client ou par le robot. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 7900,
        unit: "piece"
      },
      {
        id: "bloc-kit-lock",
        name: "KIT Lock - bridage mecanique (1 poste)",
        desc: "Systeme mecanique avec station d'accueil, referencement et electro-aimant de bridage a installer sur le module de base, avec prise de communication. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 2400,
        unit: "piece"
      },
      {
        id: "bloc-kit-dock",
        name: "KIT Dock - referencement devant poste",
        desc: "Systeme mecanique de referencement a installer sur la machine du client, avec prise de communication. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 1750,
        unit: "piece"
      },
      {
        id: "bloc-kit-visioncal",
        name: "KIT VisionCal - recalage automatique des trajectoires",
        desc: "Camera de vision + TAG de precision pour deux postes de travail : recalage automatique des reperes et trajectoires du robot au demarrage. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 8000,
        unit: "piece"
      }
    ]
  },
  {
    id: "kits-prehenseur-bloc",
    title: "KITS Prehenseur (BLOC Base)",
    items: [
      {
        id: "bloc-kit-aspi-mousse",
        name: "KIT Aspi Mousse - aspiration par mousse",
        desc: "Prehenseur d'aspiration par mousse pour cartons fermes. Dossier technique, montage et cablage inclus.",
        price: 4000,
        unit: "piece"
      },
      {
        id: "bloc-kit-aspi-ventouse",
        name: "KIT Aspi Ventouse - aspiration par ventouse",
        desc: "Prehenseur d'aspiration par ventouse pour cartons fermes. Dossier technique, montage et cablage inclus.",
        price: 3500,
        unit: "piece"
      },
      {
        id: "bloc-kit-pincepneu",
        name: "KIT PincePneu - pince pneumatique double",
        desc: "Prehenseur avec systeme de double pince pour la prise de 2 cartons ouverts. Dossier technique, montage et cablage inclus.",
        price: 2500,
        unit: "piece"
      },
      {
        id: "bloc-kit-pince",
        name: "KIT Pince - pince electrique deux mors",
        desc: "Prehenseur a pince electrique deux mors. Dossier technique, montage, cablage et essai inclus.",
        price: 3400,
        unit: "piece"
      },
      {
        id: "bloc-kit-changetool",
        name: "KIT ChangeTool - changeur d'outil automatique",
        desc: "Changeur d'outil automatique sur le robot, compatible avec deux prehenseurs de votre choix (avec leur support), systeme mecanique de posage sur BLOC Base. Dossier technique, montage, cablage et essai inclus.",
        price: 7100,
        unit: "piece"
      }
    ]
  },
  {
    id: "kits-securite-bloc",
    title: "KITS Securite (BLOC Base)",
    items: [
      {
        id: "bloc-kit-laserbloc",
        name: "KIT LaserBloc - radar de securite (module)",
        desc: "Radar de securite integre dans un module BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 4500,
        unit: "piece"
      },
      {
        id: "bloc-kit-2laserbloc",
        name: "KIT 2LaserBloc - 2 radars de securite (module)",
        desc: "Deux radars de securite integres dans un module BLOC Base. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 7500,
        unit: "piece"
      },
      {
        id: "bloc-kit-lasermate",
        name: "KIT LaserMate - radar de securite (poste de travail)",
        desc: "Radar de securite integre sur le poste de travail du client, a associer au KIT Lock. Dossier technique, montage, cablage, programmation et livraison inclus.",
        price: 4000,
        unit: "piece"
      },
      {
        id: "bloc-kit-securebloc-m",
        name: "KIT Secure Bloc M - carterisation",
        desc: "Mise en securite d'un module mobile par carterisation en profile (assemblage, decoupe, element en mouvement...) : mecanique de carterisation + gache de porte. Dossier technique, montage, cablage et essai inclus.",
        price: 2500,
        unit: "piece"
      },
      {
        id: "bloc-kit-barrierbloc",
        name: "KIT Barrier Bloc - carterisation + barriere immaterielle",
        desc: "Securisation d'un module mobile par carterisation en profile et barriere immaterielle qui se rearme automatiquement lors du depot d'une piece. Dossier technique, montage, cablage et essai inclus.",
        price: 7900,
        unit: "piece"
      }
    ]
  }
];

// Ne pas modifier la ligne suivante : elle rend le catalogue disponible aux autres scripts.
if (typeof module !== "undefined") { module.exports = CATALOGUE_FALLBACK; }
