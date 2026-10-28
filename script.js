const notes = {
  tired: {
    title: "When you’re tired",
    icon: "☾",
    message: "kamu nggak harus selalu kuat. istirahat ketika kamu lelah. istirahat bukan berarti kamu menyerah atau lemah tapi itu cara kamu merawat diri sendiri. hari ini kamu udah berusaha, dan itu sudah sangat cukup sayanggg. ♡"
  },
  worried: {
    title: "When you’re worried",
    icon: "✦",
    message: "nunggu hasil nya mungkin bikin pikiran ke mana-mana. tapi kamuuu nggak harus menyelesaikan semua kekhawatiran malam ini. apa pun hasilnya nanti, kita hadapi pelan-pelan yah. masih ada banyak jalan, banyak kesempatan, dan banyak hal baik yang belum kamu temui. kita lalui semuanya bareng bareng sayanggkkuu."
  },
  proud: {
    title: "When you forget",
    icon: "♡",
    message: "aku bangga sama kamu bukan cuma saat kamu berhasil dapetin yang kamu mau. aku juga bangga sama kamu saat kamu takut tapi tetap mencoba, saat kamu capek tapi tetap melangkah, dan saat kamu butuh waktu buat mulai lagi. nilai atau hasil nggak akan bisa menghapus semua usaha itu. please be gentle with yourself sayanggg."
  },
  hug: {
    title: "When you need a hug",
    icon: "∞",
    message: "sini, peluk jauh dulu yang lama. bayangin aku meluk kamu erat-erat, usap kepala kamu, terus bilang: 'udah yah sayangggg, kamu udah berusaha. sekarang istirahat dulu. aku di sini.🫂💙'"
  }
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const modal = document.querySelector("#noteModal");
const modalTitle = document.querySelector("#modalTitle");
const modalMessage = document.querySelector("#modalMessage");
const modalIcon = document.querySelector("#modalIcon");
let lastFocused;

function createHearts(container, count = 14) {
  container.replaceChildren();
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = i % 3 ? "♡" : "♥";
    heart.style.setProperty("--left", `${20 + Math.random() * 60}%`);
    heart.style.setProperty("--size", `${12 + Math.random() * 18}px`);
    heart.style.setProperty("--delay", `${Math.random() * 0.45}s`);
    heart.style.setProperty("--drift", `${-60 + Math.random() * 120}px`);
    container.append(heart);
  }
  window.setTimeout(() => container.replaceChildren(), 2700);
}

document.querySelector("#openGift").addEventListener("click", (event) => {
  if (event.currentTarget.classList.contains("open")) return;
  event.currentTarget.classList.add("open");
  createHearts(document.querySelector("#openingHearts"), 18);
  window.setTimeout(() => {
    document.querySelector("#letter").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, reduceMotion ? 0 : 1100);
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.scroll}`).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
});

document.querySelectorAll("[data-note]").forEach((card) => {
  card.addEventListener("click", () => {
    const note = notes[card.dataset.note];
    lastFocused = card;
    modalTitle.textContent = note.title;
    modalMessage.textContent = note.message;
    modalIcon.textContent = note.icon;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.querySelector(".modal-close").focus();
  });
});

function closeModal() {
  if (!modal.classList.contains("open")) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}

document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if (event.key === "Tab" && modal.classList.contains("open")) {
    event.preventDefault();
    document.querySelector(".modal-close").focus();
  }
});

document.querySelector("#sendHug").addEventListener("click", () => {
  createHearts(document.querySelector("#hugBurst"), 24);
  document.querySelector("#hugResponse").classList.add("show");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
