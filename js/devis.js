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

function rendreCatalogue() {
  const container = document.getElementById("catalogue-container");
  if (!container) return;

  if (!CATALOGUE || CATALOGUE.length === 0) {
    container.innerHTML = `<p style="color:#c00">Le catalogue n'a pas pu etre charge. Merci de reessayer plus tard ou de nous contacter directement.</p>`;
    return;
  }

  let html = "";
  CATALOGUE.forEach((cat, idx) => {
    const nbSelectionnes = cat.items.filter((i) => (cart[i.id] || 0) > 0).length;
    html += `<details class="category" ${idx === 0 ? "open" : ""}>`;
    html += `<summary>${cat.title}${nbSelectionnes > 0 ? `<span class="category-count">${nbSelectionnes}</span>` : ""}</summary>`;
    cat.items.forEach((item) => {
      const qty = cart[item.id] || 0;
      html += `
        <div class="item-row" data-item-id="${item.id}">
          <img class="item-photo" src="images/catalogue/${item.id}.jpg" data-ext="jpg" alt=""
               onerror="basculerPhotoSuivante(this)">
          <div>
            <div class="item-name">${item.name}</div>
            ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ""}
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
/* Rendu du panier                                                          */
/* ---------------------------------------------------------------------- */

function rendreCategorieBadges() {
  document.querySelectorAll(".category").forEach((catEl, idx) => {
    const cat = CATALOGUE[idx];
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
  initFormulaire();

  const catalogueContainer = document.getElementById("catalogue-container");
  if (catalogueContainer) {
    Promise.resolve(window.catalogueReady).then(function () {
      rendreCatalogue();
      rendrePanier();
    });
  }
});
