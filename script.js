(function () {
  const key = "vbs-cookie-pref";
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const saved = localStorage.getItem(key);
  if (saved) {
    banner.style.display = "none";
    return;
  }

  function closeWith(value) {
    localStorage.setItem(key, value);
    banner.style.display = "none";
  }

  const accept = document.getElementById("cookie-accept");
  const decline = document.getElementById("cookie-decline");
  if (accept) accept.addEventListener("click", function () { closeWith("accepted"); });
  if (decline) decline.addEventListener("click", function () { closeWith("declined"); });
})();
