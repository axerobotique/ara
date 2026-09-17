// Verrouillage d'accès au site par identifiant/mot de passe (côté client).
// NB : le code est visible dans les sources du navigateur, ceci n'est donc
// pas une sécurité réelle mais un simple filtre d'accès de convenance.
(function () {
  "use strict";

  var STORAGE_KEY = "axe_auth";

  var COMPTES = [
    { user: "AXE", pass: "Axerob2019-" },
    { user: "FIT", pass: "Fit1981-" }
  ];

  function isAuthenticated() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "ok";
    } catch (e) {
      return false;
    }
  }

  function unlock() {
    document.documentElement.classList.remove("axe-locked");
    var overlay = document.getElementById("axe-login-overlay");
    if (overlay) overlay.remove();
  }

  function checkCredentials(user, pass) {
    for (var i = 0; i < COMPTES.length; i++) {
      if (COMPTES[i].user === user && COMPTES[i].pass === pass) {
        return true;
      }
    }
    return false;
  }

  function buildOverlay() {
    var overlay = document.createElement("div");
    overlay.id = "axe-login-overlay";
    overlay.className = "axe-login-overlay";
    overlay.innerHTML =
      '<div class="axe-login-box">' +
        '<img src="assets/logo.svg" alt="Logo Axe Robotique &amp; Automatisme" class="axe-login-logo">' +
        '<h2>Accès réservé</h2>' +
        '<p>Veuillez vous identifier pour accéder au site.</p>' +
        '<form id="axe-login-form" autocomplete="off">' +
          '<div class="form-field required">' +
            '<label for="axe-login-user">Identifiant</label>' +
            '<input type="text" id="axe-login-user" name="user" autocomplete="username" required>' +
          '</div>' +
          '<div class="form-field required">' +
            '<label for="axe-login-pass">Mot de passe</label>' +
            '<input type="password" id="axe-login-pass" name="pass" autocomplete="current-password" required>' +
          '</div>' +
          '<button type="submit" class="btn btn-primary" style="width:100%;text-align:center;">Se connecter</button>' +
          '<p id="axe-login-error" class="axe-login-error" style="display:none;">Identifiant ou mot de passe incorrect.</p>' +
        '</form>' +
      '</div>';

    document.body.appendChild(overlay);

    var form = document.getElementById("axe-login-form");
    var errorMsg = document.getElementById("axe-login-error");
    var userField = document.getElementById("axe-login-user");
    var passField = document.getElementById("axe-login-pass");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var user = userField.value.trim();
      var pass = passField.value;

      if (checkCredentials(user, pass)) {
        try {
          localStorage.setItem(STORAGE_KEY, "ok");
        } catch (e2) {
          // stockage indisponible (navigation privée, etc.) : accès accordé pour cette page uniquement
        }
        unlock();
      } else {
        errorMsg.style.display = "block";
        passField.value = "";
        passField.focus();
      }
    });

    userField.focus();
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (isAuthenticated()) {
      document.documentElement.classList.remove("axe-locked");
      return;
    }
    buildOverlay();
  });
})();
