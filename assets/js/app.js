const btnEn = document.querySelector(".english");
const btnHi = document.querySelector(".hindi");
const btnGu = document.querySelector(".gujrati");

const DEFAULT_LANG = "English";
const STORAGE_KEY = "selectedLanguage";
let translations = {};

// set active button
function setActiveButton(activeBtn) {
  [btnEn, btnHi, btnGu].forEach((btn) => btn.classList.remove("active"));
  if (activeBtn) activeBtn.classList.add("active");
}

// apply language
function applyLanguage(lang) {
  const langData = translations[lang];
  if (!langData) return;

  document.documentElement.lang = lang;

  if (lang === "English") {
    document.body.setAttribute("data-lang", "en");
    setActiveButton(btnEn);
  } else if (lang === "Hindi") {
    document.body.setAttribute("data-lang", "hi");
    setActiveButton(btnHi);
  } else if (lang === "Gujarati") {
    document.body.setAttribute("data-lang", "gu");
    setActiveButton(btnGu);
  }

  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.getAttribute("data-lang-key");
    if (langData[key] !== undefined) {
      el.innerHTML = String(langData[key]).replace(/\n/g, "<br>");
    }
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

// detect refresh
function isPageRefresh() {
  const navEntries = performance.getEntriesByType("navigation");
  if (navEntries.length > 0) {
    return navEntries[0].type === "reload";
  }
  return performance.navigation.type === 1;
}

// load language
window.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/json/data.json")
    .then((res) => res.json())
    .then((data) => {
      translations = data;

      let langToApply = DEFAULT_LANG;
      const savedLang = localStorage.getItem(STORAGE_KEY);

      if (isPageRefresh()) {
        // on refresh always reset to English
        langToApply = DEFAULT_LANG;
        localStorage.setItem(STORAGE_KEY, DEFAULT_LANG);
      } else {
        // on normal page load / navigation keep selected language
        langToApply = savedLang || DEFAULT_LANG;
      }

      applyLanguage(langToApply);
    })
    .catch((err) => console.error("Error loading translations:", err));
});

// button clicks
if (btnEn) {
  btnEn.addEventListener("click", () => applyLanguage("English"));
}
if (btnHi) {
  btnHi.addEventListener("click", () => applyLanguage("Hindi"));
}
if (btnGu) {
  btnGu.addEventListener("click", () => applyLanguage("Gujarati"));
}

// ---- Sound effects ----
const soundCache = {};

function playSound(src) {
  let audio = soundCache[src];
  if (!audio) {
    audio = new Audio(src);
    soundCache[src] = audio;
  }
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// Play a sound, then follow the link once it's had time to start
function navigateWithSound(link, soundSrc, delay) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    e.preventDefault();
    playSound(soundSrc);

    setTimeout(function () {
      window.location.href = href;
    }, delay);
  });
}

// Language toggle buttons -> per-language voice clip
const langAudio = {
  English: "./assets/audio/Eng.mpeg",
  Hindi: "./assets/audio/Hin.mpeg",
  Gujarati: "./assets/audio/Guj.mpeg",
};

if (btnEn) btnEn.addEventListener("click", () => playSound(langAudio.English));
if (btnHi) btnHi.addEventListener("click", () => playSound(langAudio.Hindi));
if (btnGu) btnGu.addEventListener("click", () => playSound(langAudio.Gujarati));

// Home / back buttons -> click.mp3
document.querySelectorAll(".home-button, .home-btn-1, .back-btn").forEach((link) => {
  navigateWithSound(link, "./assets/audio/click.mp3", 200);
});

// Sub-point navigation (the 5 topic pages) -> pop.mp3
document.querySelectorAll(".pages .page").forEach((link) => {
  navigateWithSound(link, "./assets/audio/pop.mp3", 200);
});

// Swiper prev/next controls -> swiper.mp3
document.querySelectorAll(".prev-btn, .next-btn").forEach((btn) => {
  btn.addEventListener("click", () => playSound("./assets/audio/swiper.mp3"));
});

// Pranam page -> play pranam.mp3 once on arrival
// (falls back to the first interaction if the browser blocks autoplay)
if (document.querySelector(".pranam-container")) {
  const pranamAudio = new Audio("./assets/audio/pranam.mp3");

  function playPranamOnce() {
    pranamAudio.currentTime = 0;
    const playPromise = pranamAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const retry = () => {
          document.removeEventListener("click", retry);
          document.removeEventListener("keydown", retry);
          document.removeEventListener("touchstart", retry);
          playPranamOnce();
        };
        document.addEventListener("click", retry, { once: true });
        document.addEventListener("keydown", retry, { once: true });
        document.addEventListener("touchstart", retry, { once: true });
      });
    }
  }

  playPranamOnce();
}