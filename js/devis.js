/* ============================================================================
   Configurateur de devis - Axe Robotique & Automatisme
   ============================================================================
   - Affiche le catalogue (js/catalogue-data.js) par categories repliables.
   - Permet de choisir une quantite par element.
   - Calcule un total en direct.
   - A l'envoi : ouvre un e-mail (mailto) pre-rempli vers l'entreprise, ET
     affiche un recapitulatif copiable en secours (si le client mail ne
     s'ouvre pas automatiquement sur l'appareil du visiteur).

   >>> ADRESSE DE RECEPTION DES DEVIS : modifiable ci-dessous <<<
   ============================================================================ */

const DESTINATAIRE_EMAIL = "ries.thomas@axerobotique.com";

const STORAGE_KEY = "axe-devis-cart-v1";

// cart = { itemId: quantite }
let cart = {};

function chargerPanier() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cart = raw ? JSON.parse(raw) : {};
  } catch (e) {
    cart = {};
  }
}

function sauvegarderPanier() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) { /* stockage indisponible, tant pis */ }
}

function formatPrix(montant) {
  if (montant === null || montant === undefined) return "Sur devis";
  return montant.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €";
}

// Essaie plusieurs extensions pour la photo d'un article (images/catalogue/<item_id>.<ext>).
// Si aucune n'existe, masque simplement la photo (aucune erreur visible).
const EXTENSIONS_PHOTO = ["jpg", "jpeg", "png", "webp"];
function basculerPhotoSuivante(img) {
  const extActuelle = img.dataset.ext;
  const prochaine = EXTENSIONS_PHOTO[EXTENSIONS_PHOTO.indexOf(extActuelle) + 1];
  if (!prochaine) {
    img.style.display = "none";
    return;
  }
  img.dataset.ext = prochaine;
  img.src = img.src.replace(new RegExp("\\." + extActuelle + "$"), "." + prochaine);
}

// Echappe le HTML puis transforme les retours a la ligne du Sheet (\n, \r\n) en <br>,
// pour que la description d'un article s'affiche avec les memes paragraphes que dans la cellule.
function texteAvecRetoursLigne(texte) {
  return String(texte)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r\n|\r|\n/g, "<br>");
}

function trouverItem(id) {
  for (const cat of CATALOGUE) {
    const found = cat.items.find((i) => i.id === id);
    if (found) return found;
  }
  return null;
}

/* ---------------------------------------------------------------------- */
/* Rendu du catalogue                                                      */
/* ---------------------------------------------------------------------- */

// Categories/articles effectivement affiches (actif !== false), recalcules a chaque rendu.
// Conserve pour que rendreCategorieBadges() reste aligne avec les .category du DOM.
let CATALOGUE_VISIBLE = [];

// Symbole visuel par categorie (identifie par cat.id), independant de la source du
// catalogue (Sheet ou fallback) : evite d'avoir a ajouter une colonne dans le Sheet.
const ICON_CONVOYEUR = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="6" width="4.5" height="5.5"/>
  <rect x="9.7" y="4.3" width="4.5" height="7.2"/>
  <rect x="15.4" y="6" width="4.5" height="5.5"/>
  <rect x="2" y="12.5" width="20" height="3" rx="1.2"/>
  <circle cx="4" cy="18.3" r="1.6"/>
  <circle cx="8.3" cy="18.3" r="1.6"/>
  <circle cx="12.6" cy="18.3" r="1.6"/>
  <circle cx="16.9" cy="18.3" r="1.6"/>
  <circle cx="21.2" cy="18.3" r="1.6"/>
</svg>`;

const CATEGORY_ICONS = {
  "cellules": "📦",
  "prehenseurs": "🦾",
  "chassis": "🏗️",
  "convoyeurs": ICON_CONVOYEUR,
  "pilotage": "⚙️",
  "securite": "🛡️",
  "amr": "🤖",
  "montage": "🔧",
  "robots-ur10": "🤖",
  "bloc-base": "🧱",
  "bloc-modules": "🧩",
  "kits-bloc-base": "🧰",
  "kits-prehenseur-bloc": "✋",
  "kits-securite-bloc": "🔒"
};

function rendreCatalogue() {
  const container = document.getElementById("catalogue-container");
  if (!container) return;

  if (!CATALOGUE || CATALOGUE.length === 0) {
    container.innerHTML = `<p style="color:#c00">Le catalogue n'a pas pu etre charge. Merci de reessayer plus tard ou de nous contacter directement.</p>`;
    return;
  }

  CATALOGUE_VISIBLE = CATALOGUE
    .map((cat) => ({ ...cat, items: cat.items.filter((i) => i.active !== false) }))
    .filter((cat) => cat.items.length > 0);

  let html = "";
  CATALOGUE_VISIBLE.forEach((cat) => {
    const nbSelectionnes = cat.items.filter((i) => (cart[i.id] || 0) > 0).length;
    const icon = CATEGORY_ICONS[cat.id] || "🔹";
    html += `<details class="category">`;
    html += `<summary><span class="category-label"><span class="category-icon" aria-hidden="true">${icon}</span>${cat.title}</span>${nbSelectionnes > 0 ? `<span class="category-count">${nbSelectionnes}</span>` : ""}</summary>`;
    cat.items.forEach((item) => {
      const qty = cart[item.id] || 0;
      html += `
        <div class="item-row" data-item-id="${item.id}">
          <img class="item-photo" src="images/catalogue/${item.id}.jpg" data-ext="jpg" alt=""
               onerror="basculerPhotoSuivante(this)">
          <div>
            <div class="item-name">${item.name}</div>
            ${item.desc ? `<div class="item-desc">${texteAvecRetoursLigne(item.desc)}</div>` : ""}
          </div>
          <div class="item-price">${formatPrix(item.price)}<small>${item.unit}</small></div>
          <div class="qty-control">
            <button type="button" class="qty-minus" aria-label="Diminuer la quantite">&minus;</button>
            <input type="number" min="0" step="1" class="qty-input" value="${qty}" aria-label="Quantite pour ${item.name}">
            <button type="button" class="qty-plus" aria-label="Augmenter la quantite">&plus;</button>
          </div>
        </div>`;
    });
    html += `</details>`;
  });
  container.innerHTML = html;
}

/* ---------------------------------------------------------------------- */
/* Recherche dans le catalogue                                             */
/* ---------------------------------------------------------------------- */

// Enleve les accents et met en minuscules, pour une recherche insensible aux deux.
function normaliserTexte(texte) {
  return String(texte || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Vrai si un des "mots" du texte commence par le terme recherche.
function texteCommenceParTerme(texte, terme) {
  if (!terme) return true;
  return normaliserTexte(texte)
    .split(/[^a-z0-9]+/)
    .some((mot) => mot.startsWith(terme));
}

// Filtre le catalogue affiche selon le terme tape : masque les articles/categories
// qui ne correspondent pas et ouvre automatiquement les categories (<details>) qui
// contiennent au moins un article correspondant.
function filtrerCatalogue(termeBrut) {
  const container = document.getElementById("catalogue-container");
  const emptyEl = document.getElementById("catalogue-search-empty");
  if (!container) return;

  const terme = normaliserTexte((termeBrut || "").trim());
  let nbResultats = 0;

  container.querySelectorAll(".category").forEach((catEl, idx) => {
    const cat = CATALOGUE_VISIBLE[idx];
    if (!cat) return;

    let nbResultatsCategorie = 0;
    catEl.querySelectorAll(".item-row").forEach((rowEl) => {
      const item = cat.items.find((i) => i.id === rowEl.dataset.itemId);
      const correspond =
        !item ||
        texteCommenceParTerme(item.name, terme) ||
        texteCommenceParTerme(item.desc, terme) ||
        texteCommenceParTerme(cat.title, terme);
      rowEl.style.display = correspond ? "" : "none";
      if (correspond) nbResultatsCategorie++;
    });

    if (!terme) {
      catEl.style.display = "";
    } else if (nbResultatsCategorie > 0) {
      catEl.style.display = "";
      catEl.open = true;
      nbResultats += nbResultatsCategorie;
    } else {
      catEl.style.display = "none";
    }
  });

  if (emptyEl) emptyEl.style.display = terme && nbResultats === 0 ? "block" : "none";
}

function initRechercheCatalogue() {
  const input = document.getElementById("catalogue-search");
  if (!input) return;
  input.addEventListener("input", function () {
    filtrerCatalogue(input.value);
  });
}

/* ---------------------------------------------------------------------- */
/* Rendu du panier                                                          */
/* ---------------------------------------------------------------------- */

function rendreCategorieBadges() {
  document.querySelectorAll(".category").forEach((catEl, idx) => {
    const cat = CATALOGUE_VISIBLE[idx];
    if (!cat) return;
    const nbSelectionnes = cat.items.filter((i) => (cart[i.id] || 0) > 0).length;
    const badge = catEl.querySelector(".category-count");
    if (nbSelectionnes > 0 && !badge) {
      catEl.querySelector("summary").insertAdjacentHTML("beforeend", `<span class="category-count">${nbSelectionnes}</span>`);
    } else if (nbSelectionnes > 0 && badge) {
      badge.textContent = nbSelectionnes;
    } else if (nbSelectionnes === 0 && badge) {
      badge.remove();
    }
  });
}

function rendrePanier() {
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("cart-total-value");
  const noteEl = document.getElementById("cart-total-note");
  if (!list) return;

  const entries = Object.keys(cart)
    .map((id) => ({ item: trouverItem(id), qty: cart[id] }))
    .filter((e) => e.item && e.qty > 0);

  if (entries.length === 0) {
    list.innerHTML = `<li class="cart-empty" style="border:none;">Aucun element selectionne pour le moment. Parcourez le catalogue a gauche et indiquez une quantite.</li>`;
  } else {
    list.innerHTML = entries
      .map(
        (e) => `<li>
          <span class="li-name">${e.item.name}</span>
          <span class="li-qty">${e.qty} &times; ${formatPrix(e.item.price)}</span>
        </li>`
      )
      .join("");
  }

  let total = 0;
  let aDesElementsSurDevis = false;
  entries.forEach((e) => {
    if (e.item.price === null) {
      aDesElementsSurDevis = true;
    } else {
      total += e.item.price * e.qty;
    }
  });

  if (totalEl) totalEl.textContent = formatPrix(total);
  if (noteEl) noteEl.textContent = aDesElementsSurDevis
    ? "Hors elements \"sur devis\" (indiques dans le detail)."
    : "Estimation indicative hors taxes.";

  rendreCategorieBadges();
}

/* ---------------------------------------------------------------------- */
/* Gestion des quantites                                                   */
/* ---------------------------------------------------------------------- */

function definirQuantite(itemId, qty) {
  qty = Math.max(0, Math.min(999, Math.round(qty) || 0));
  if (qty === 0) {
    delete cart[itemId];
  } else {
    cart[itemId] = qty;
  }
  sauvegarderPanier();
  rendrePanier();
}

function initEcouteursCatalogue() {
  const container = document.getElementById("catalogue-container");
  if (!container) return;

  container.addEventListener("click", function (e) {
    const row = e.target.closest(".item-row");
    if (!row) return;
    const itemId = row.dataset.itemId;
    const input = row.querySelector(".qty-input");
    const current = parseInt(input.value, 10) || 0;

    if (e.target.classList.contains("qty-plus")) {
      input.value = current + 1;
      definirQuantite(itemId, current + 1);
    } else if (e.target.classList.contains("qty-minus")) {
      input.value = Math.max(0, current - 1);
      definirQuantite(itemId, Math.max(0, current - 1));
    }
  });

  container.addEventListener("change", function (e) {
    if (!e.target.classList.contains("qty-input")) return;
    const row = e.target.closest(".item-row");
    const itemId = row.dataset.itemId;
    definirQuantite(itemId, parseInt(e.target.value, 10) || 0);
  });
}

/* ---------------------------------------------------------------------- */
/* Construction du recapitulatif texte + envoi                             */
/* ---------------------------------------------------------------------- */

function construireRecapitulatif(client) {
  const entries = Object.keys(cart)
    .map((id) => ({ item: trouverItem(id), qty: cart[id] }))
    .filter((e) => e.item && e.qty > 0);

  let total = 0;
  let lignes = entries.map((e) => {
    const sousTotal = e.item.price !== null ? e.item.price * e.qty : null;
    if (sousTotal !== null) total += sousTotal;
    return `- ${e.item.name} | quantite : ${e.qty} | prix unitaire : ${formatPrix(e.item.price)} | sous-total : ${formatPrix(sousTotal)}`;
  });

  const texte = [
    `Demande de devis - Axe Robotique & Automatisme`,
    ``,
    `Client : ${client.nom}`,
    client.societe ? `Societe : ${client.societe}` : null,
    `Email : ${client.email}`,
    client.telephone ? `Telephone : ${client.telephone}` : null,
    ``,
    `Selection (${entries.length} element(s)) :`,
    ...lignes,
    ``,
    `TOTAL ESTIME HT : ${formatPrix(total)}`,
    `(hors elements "sur devis" le cas echeant)`,
    ``,
    client.message ? `Message du client :\n${client.message}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return texte;
}

function afficherMessage(texte, type) {
  const msg = document.getElementById("form-msg");
  if (!msg) return;
  msg.textContent = texte;
  msg.className = "form-msg show " + type;
}

function initFormulaire() {
  const form = document.getElementById("devis-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const societe = document.getElementById("societe").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const message = document.getElementById("message").value.trim();

    const entries = Object.keys(cart).filter((id) => cart[id] > 0);

    if (entries.length === 0) {
      afficherMessage("Veuillez selectionner au moins un element du catalogue avant d'envoyer votre demande.", "error");
      return;
    }
    if (!nom || !email) {
      afficherMessage("Merci de renseigner au minimum votre nom et votre email.", "error");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      afficherMessage("L'adresse email saisie ne semble pas valide.", "error");
      return;
    }

    const client = { nom, email, societe, telephone, message };
    const recap = construireRecapitulatif(client);

    const sujet = `Demande de devis - ${nom}${societe ? " - " + societe : ""}`;
    const mailtoUrl =
      `mailto:${DESTINATAIRE_EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(recap)}`;

    // Tentative d'ouverture du client mail du visiteur
    window.location.href = mailtoUrl;

    afficherMessage(
      "Votre client mail a du s'ouvrir avec le message pre-rempli. Si ce n'est pas le cas, utilisez le recapitulatif ci-dessous pour l'envoyer manuellement.",
      "success"
    );

    const fallback = document.getElementById("fallback-box");
    const textarea = document.getElementById("fallback-text");
    if (fallback && textarea) {
      textarea.value = `A : ${DESTINATAIRE_EMAIL}\nObjet : ${sujet}\n\n${recap}`;
      fallback.style.display = "block";
    }
  });

  const copyBtn = document.getElementById("copy-fallback");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const textarea = document.getElementById("fallback-text");
      textarea.select();
      textarea.setSelectionRange(0, 999999);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textarea.value).then(() => {
          copyBtn.textContent = "Copie !";
          setTimeout(() => (copyBtn.textContent = "Copier le texte"), 2000);
        });
      } else {
        document.execCommand("copy");
      }
    });
  }
}

/* ---------------------------------------------------------------------- */
/* Initialisation                                                          */
/* ---------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  chargerPanier();
  initEcouteursCatalogue();
  initRechercheCatalogue();
  initFormulaire();

  const catalogueContainer = document.getElementById("catalogue-container");
  if (catalogueContainer) {
    Promise.resolve(window.catalogueReady).then(function () {
      rendreCatalogue();
      rendrePanier();
    });
  }
});
