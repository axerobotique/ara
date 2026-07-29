/* ============================================================================
   Chargement du catalogue depuis un Google Sheet publie
   ============================================================================
   Pour connecter votre propre Google Sheet :

   1. Creez un Google Sheet avec ces colonnes en ligne 1 (voir le fichier
      catalogue-sheet-import.csv fourni, a importer directement) :
        categorie_id | categorie_titre | item_id | item_nom | item_desc | prix | unite | actif

   2. Une ligne = un article. Repetez categorie_id/categorie_titre pour
      chaque article d'une meme categorie (l'ordre des categories suit leur
      premiere apparition dans la feuille). Laissez "prix" vide pour
      afficher "Sur devis".

      La colonne "actif" est facultative : mettez "non" (ou "0"/"false")
      pour masquer une ligne sur le site sans la supprimer du Sheet. Vide
      ou "oui" = ligne affichee.

   3. Partagez le Sheet en lecture : bouton "Partager" > "General access" >
      "Anyone with the link" > role "Viewer".

   4. Recuperez l'ID du Sheet dans son URL :
        https://docs.google.com/spreadsheets/d/CET_ID_LA/edit
      et renseignez-le ci-dessous dans SHEET_ID.

   Si SHEET_ID est vide ou si le Sheet est inaccessible, le site bascule
   automatiquement sur le catalogue de secours (js/catalogue-data.js).
   ============================================================================ */

const SHEET_ID = "1m1CTv4amzo0Lcg3wVtUdlSwWkZtPD16mmPwkPuhUAHM";
const SHEET_NAME = ""; // optionnel : nom de l'onglet si ce n'est pas le premier

const COLONNES_ATTENDUES = ["categorie_id", "categorie_titre", "item_id", "item_nom", "item_desc", "prix", "unite"];
// Colonne facultative : si absente du Sheet, tous les articles sont consideres actifs.
const COLONNE_ACTIF = "actif";
const VALEURS_INACTIF = ["non", "no", "false", "0", "n"];

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      rows.push(row); row = [];
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => !(r.length === 1 && r[0] === ""));
}

function csvVersCatalogue(text) {
  const rows = parseCSV(text);
  if (rows.length < 2) throw new Error("Feuille vide");

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = {};
  COLONNES_ATTENDUES.forEach((col) => { idx[col] = header.indexOf(col); });
  if (Object.values(idx).some((i) => i === -1)) {
    throw new Error("Colonnes manquantes dans le Sheet (attendu : " + COLONNES_ATTENDUES.join(", ") + ")");
  }
  const idxActif = header.indexOf(COLONNE_ACTIF); // -1 si colonne absente : tout est actif

  const categories = [];
  const parCategorie = {};

  rows.slice(1).forEach((r) => {
    const catId = (r[idx.categorie_id] || "").trim();
    const itemId = (r[idx.item_id] || "").trim();
    if (!catId || !itemId) return; // ligne vide ou incomplete : ignoree

    if (!parCategorie[catId]) {
      const cat = { id: catId, title: (r[idx.categorie_titre] || catId).trim(), items: [] };
      parCategorie[catId] = cat;
      categories.push(cat);
    }

    const prixBrut = (r[idx.prix] || "").trim();
    const prix = prixBrut === "" ? null : Number(prixBrut.replace(",", "."));

    const actifBrut = idxActif === -1 ? "" : (r[idxActif] || "").trim().toLowerCase();
    const active = !VALEURS_INACTIF.includes(actifBrut);

    parCategorie[catId].items.push({
      id: itemId,
      name: (r[idx.item_nom] || "").trim(),
      desc: (r[idx.item_desc] || "").trim(),
      price: prix === null || isNaN(prix) ? null : prix,
      unit: (r[idx.unite] || "").trim(),
      active: active,
    });
  });

  if (categories.length === 0) throw new Error("Aucun article valide trouve dans le Sheet");
  return categories;
}

function chargerCatalogueDepuisSheet() {
  if (!SHEET_ID) return Promise.reject(new Error("SHEET_ID non configure"));

  const url =
    "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?tqx=out:csv" +
    (SHEET_NAME ? "&sheet=" + encodeURIComponent(SHEET_NAME) : "");

  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(csvVersCatalogue);
}

// Promesse consommee par js/devis.js : se resout quand window.CATALOGUE est pret.
window.catalogueReady = chargerCatalogueDepuisSheet()
  .then((cat) => {
    window.CATALOGUE = cat;
  })
  .catch((err) => {
    console.warn("Catalogue Google Sheet indisponible, utilisation du catalogue de secours.", err);
    window.CATALOGUE = CATALOGUE_FALLBACK;
  });
