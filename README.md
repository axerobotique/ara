# Site Axe Robotique & Automatisme

Site vitrine statique (HTML/CSS/JS, aucune installation requise) avec un
configurateur de devis en ligne.

## Structure

```
index.html          Accueil
activites.html       Nos 4 activités
catalogue.html       Configurateur de devis (fonctionnalité principale)
realisations.html    Exemples de réalisations
contact.html         Coordonnées
css/style.css        Toute la mise en forme du site
js/catalogue-data.js Le catalogue produits (à éditer pour ajouter/modifier des éléments)
js/devis.js          Logique du configurateur (panier, calcul, envoi d'email)
js/main.js           Menu mobile
assets/logo.svg       Logo
```

## 1. Ajouter / modifier un élément du catalogue

Tout se passe dans `js/catalogue-data.js`. Chaque catégorie contient une liste
d'éléments de ce type :

```js
{
  id: "mon-nouvel-element",   // identifiant unique, sans espace/accent
  name: "Nom affiché",
  desc: "Description courte (peut être vide : \"\")",
  price: 4200,                // prix HT en euros, ou null si "Sur devis"
  unit: "pièce"                // "pièce", "cellule", "prestation", "option"...
}
```

Copiez un bloc existant, collez-le dans la bonne catégorie (ou créez une
nouvelle catégorie en copiant un bloc `{ id, title, items: [...] }`), modifiez
les valeurs, enregistrez le fichier : le site est mis à jour automatiquement,
sans toucher au reste du code.

## 2. Comment fonctionne la demande de devis

Le client sélectionne des quantités sur `catalogue.html`. Au clic sur
"Envoyer ma demande de devis" :

1. Le site ouvre le client mail par défaut du visiteur (mailto) avec un
   message pré-rempli (coordonnées client + détail de la sélection + total)
   adressé à **ries.thomas@axerobotique.com**.
2. En parallèle, un récapitulatif texte s'affiche avec un bouton "Copier le
   texte", au cas où le client mail ne s'ouvre pas automatiquement (certains
   ordinateurs n'ont pas de client mail configuré) — le visiteur peut alors
   coller le texte dans un email manuellement.

C'est une solution qui fonctionne **sans aucun compte ni service tiers**,
gratuite et immédiate.

### Pour un envoi automatique et silencieux (sans action du visiteur)

Si vous préférez que l'email parte tout seul, sans dépendre du client mail du
visiteur, il faut un service d'envoi (le site étant statique, sans serveur).
Le plus simple est **EmailJS** (gratuit jusqu'à 200 emails/mois) :

1. Créez un compte sur https://www.emailjs.com
2. Connectez votre boîte mail (ou un service SMTP) comme "service"
3. Créez un template avec les variables `nom`, `societe`, `email`,
   `telephone`, `message`, `recap`, `total`
4. Récupérez votre `Service ID`, `Template ID` et `Public Key`
5. Dites-moi ces trois identifiants et j'adapte `js/devis.js` pour utiliser
   EmailJS à la place du mailto (quelques lignes à changer).

## 3. Mettre le site en ligne (gratuitement, sans compétence technique)

**Le plus rapide (test / partage immédiat) :**
1. Allez sur https://app.netlify.com/drop
2. Glissez-déposez le dossier `axe-robotique-site` entier
3. Netlify vous donne une adresse en `.netlify.app` immédiatement

**Pour un vrai nom de domaine (ex: axerobotique.com) :**
- Netlify, Vercel ou GitHub Pages permettent tous de brancher un nom de
  domaine personnalisé gratuitement (seul le nom de domaine lui-même est
  payant, environ 10-15€/an chez un registrar comme OVH, Gandi, Namecheap...).
- Si vous voulez, je peux vous accompagner pas à pas pour cette étape une
  fois que vous aurez choisi un hébergeur.

## 4. Photos et contenu à compléter

Les blocs marqués "Photo à ajouter" (page Réalisations) ou "Chargement..."
sont des emplacements à remplacer par vos propres visuels. Il suffit de me
transmettre les photos et je les intègre, ou de les glisser dans le dossier
`assets/` et de mettre à jour le `<img src="...">` correspondant.
