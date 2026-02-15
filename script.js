(function () {
  const revealTargets = document.querySelectorAll(".hero, .section, .site-footer");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealTargets.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  const loader = document.getElementById("page-loader");
  window.addEventListener("load", function () {
    if (!loader) return;
    setTimeout(function () {
      loader.classList.add("is-hidden");
      setTimeout(function () {
        loader.remove();
      }, 500);
    }, 500);
  });

  const key = "vbs-cookie-pref";
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    function updateConsentMode(value) {
      if (typeof window.gtag !== "function") return;
      const granted = value === "accepted";
      window.gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied"
      });
    }

    const saved = localStorage.getItem(key);
    if (saved) {
      updateConsentMode(saved);
      banner.style.display = "none";
    }

    function closeWith(value) {
      localStorage.setItem(key, value);
      updateConsentMode(value);
      banner.style.display = "none";
    }

    const accept = document.getElementById("cookie-accept");
    const decline = document.getElementById("cookie-decline");
    if (accept) accept.addEventListener("click", function () { closeWith("accepted"); });
    if (decline) decline.addEventListener("click", function () { closeWith("declined"); });
  }

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (formStatus) formStatus.textContent = "Sending your message...";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          contactForm.reset();
          if (formStatus) formStatus.textContent = "Thanks. Your message has been sent.";
        } else {
          if (formStatus) formStatus.textContent = "Message not sent. Please try again.";
        }
      } catch (error) {
        if (formStatus) formStatus.textContent = "Network error. Please try again.";
      }
    });
  }
})();
