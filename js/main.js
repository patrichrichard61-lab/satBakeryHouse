/* ==========================================================================
   Saturday Bakehouse — site JavaScript
   1. Mobile navigation toggle
   2. Order form: validation, "at least one item" check, submit handling
   ========================================================================== */
(function () {
  "use strict";

  /* -------- Mobile nav toggle -------------------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu when a link is tapped (mobile)
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* -------- Order form ---------------------------------------------------- */
  var form = document.getElementById("order-form");
  if (!form) {
    return;
  }

  // TODO(owner): paste your form-service endpoint here (e.g. Formspree:
  // "https://formspree.io/f/xxxxxxx"). While this is empty, the form does
  // NOT send anything over the network — it shows a confirmation and offers
  // the email fallback link so the page still works. See README.md.
  var ENDPOINT = "";

  var status = document.getElementById("form-status");
  var submitBtn = form.querySelector('[type="submit"]');

  function showStatus(message, kind) {
    if (!status) {
      return;
    }
    status.textContent = message;
    status.classList.remove("is-error", "is-success");
    status.classList.add(kind === "success" ? "is-success" : "is-error");
    status.setAttribute("tabindex", "-1");
    status.focus();
  }

  // Returns true if at least one menu item has quantity >= 1
  function hasItems() {
    var qtys = form.querySelectorAll(".order-line__qty");
    for (var i = 0; i < qtys.length; i++) {
      if (Number(qtys[i].value) > 0) {
        return true;
      }
    }
    return false;
  }

  // Build a readable order summary for the email fallback / confirmation
  function buildSummary() {
    var lines = [];
    var qtys = form.querySelectorAll(".order-line__qty");
    qtys.forEach(function (input) {
      var qty = Number(input.value);
      if (qty > 0) {
        lines.push(qty + " x " + (input.dataset.item || input.name));
      }
    });
    return lines;
  }

  form.addEventListener("submit", function (event) {
    // Let native validation handle required fields first
    if (!form.checkValidity()) {
      return; // browser will show its own messages
    }

    if (!hasItems()) {
      event.preventDefault();
      showStatus(
        "Please choose at least one item (set a quantity of 1 or more).",
        "error"
      );
      return;
    }

    // No endpoint configured: don't attempt a network POST. Confirm locally
    // and point the customer at the email fallback so nothing is lost.
    if (!ENDPOINT) {
      event.preventDefault();
      showStatus(
        "Thanks! Your order is ready to send. This demo isn't connected to " +
          "the bakery's inbox yet — please use the “Email this order” " +
          "link below to send it, or call us. (Owner: set ENDPOINT in js/main.js.)",
        "success"
      );
      updateMailtoFallback();
      return;
    }

    // Endpoint configured: submit via fetch so we can show inline feedback.
    event.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    fetch(ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          showStatus(
            "Thank you! Your pickup order has been sent. We'll confirm by " +
              "email or phone. See you Saturday!",
            "success"
          );
        } else {
          showStatus(
            "Something went wrong sending your order. Please try again, or " +
              "use the email link below.",
            "error"
          );
        }
      })
      .catch(function () {
        showStatus(
          "We couldn't reach the server. Please check your connection and " +
            "try again, or use the email link below.",
          "error"
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Place pickup order";
      });
  });

  // Keep the mailto: fallback link in sync with the current selection
  var mailtoLink = document.getElementById("email-fallback");

  function updateMailtoFallback() {
    if (!mailtoLink) {
      return;
    }
    var to = mailtoLink.dataset.to || "orders@example.com";
    var name = (form.querySelector('[name="name"]') || {}).value || "";
    var phone = (form.querySelector('[name="phone"]') || {}).value || "";
    var date = (form.querySelector('[name="pickup_date"]') || {}).value || "";
    var notes = (form.querySelector('[name="notes"]') || {}).value || "";

    var body =
      "Saturday Bakehouse pickup order\n\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Pickup date: " + date + "\n\n" +
      "Items:\n" +
      buildSummary().map(function (l) { return "  - " + l; }).join("\n") +
      "\n\nNotes: " + notes + "\n";

    var href =
      "mailto:" + to +
      "?subject=" + encodeURIComponent("Pickup order — " + (name || "new order")) +
      "&body=" + encodeURIComponent(body);
    mailtoLink.setAttribute("href", href);
  }

  // Update the fallback link as the customer fills things in
  form.addEventListener("input", updateMailtoFallback);
  updateMailtoFallback();
})();
