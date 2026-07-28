Photos des articles du catalogue
==================================

Pour afficher une photo devant un article du configurateur, placez simplement
un fichier image dans ce dossier en le nommant EXACTEMENT comme l'item_id de
l'article (colonne "item_id" du Google Sheet, ou champ "id" dans
js/catalogue-data.js).

Exemple :
  item_id = pal-12kg   ->  images/catalogue/pal-12kg.jpg

Formats acceptes (le site essaie dans cet ordre) : .jpg, .jpeg, .png, .webp

Si aucune image n'est trouvee pour un item_id, l'article s'affiche normalement
sans photo (aucune erreur visible pour le visiteur).
