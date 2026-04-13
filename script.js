function scrollToId(id) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => scrollToId(btn.getAttribute("data-scroll")));
  });

  const nav = document.getElementById("topNav");
  if (nav) {
    const apply = () => {
      if (window.scrollY > 40) {
        nav.classList.add("nav--scrolled");
      } else {
        nav.classList.remove("nav--scrolled");
      }
    };
    apply();
    window.addEventListener("scroll", apply);
  }

  const faq = document.getElementById("faq");
  if (faq) {
    const items = Array.from(faq.querySelectorAll("button[aria-controls]"));
    items.forEach((btn) => {
      btn.addEventListener("click", () => {
        const controlsId = btn.getAttribute("aria-controls");
        if (!controlsId) return;
        const panel = document.getElementById(controlsId);
        if (!panel) return;

        const isOpen = btn.getAttribute("aria-expanded") === "true";

        items.forEach((otherBtn) => {
          const otherId = otherBtn.getAttribute("aria-controls");
          const otherPanel = otherId ? document.getElementById(otherId) : null;
          if (!otherPanel) return;
          otherBtn.setAttribute("aria-expanded", "false");
          otherPanel.classList.add("hidden");
        });

        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          panel.classList.remove("hidden");
        }
      });
    });
  }

  const productButtons = Array.from(document.querySelectorAll("[data-product-toggle]"));
  if (productButtons.length) {
    productButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-product-toggle");
        if (!key) return;
        const target = document.getElementById(`product-${key}-details`);
        if (!target) return;

        const isOpen = !target.classList.contains("hidden");

        productButtons.forEach((otherBtn) => {
          const otherKey = otherBtn.getAttribute("data-product-toggle");
          if (!otherKey) return;
          const other = document.getElementById(`product-${otherKey}-details`);
          if (!other) return;
          other.classList.add("hidden");
          otherBtn.textContent = "Подробнее";
        });

        if (!isOpen) {
          target.classList.remove("hidden");
          btn.textContent = "Жасыру";
        }
      });
    });
  }
});
