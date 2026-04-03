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
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Smooth scrolling for buttons marked with data-scroll
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => scrollToId(btn.getAttribute("data-scroll")));
  });

  // Nav background on scroll
  const nav = document.getElementById("topNav");
  if (nav) {
    const apply = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled) {
        nav.classList.remove("bg-transparent", "py-6");
        nav.classList.add("bg-card/95", "backdrop-blur-md", "shadow-sm", "py-4");
      } else {
        nav.classList.add("bg-transparent", "py-6");
        nav.classList.remove("bg-card/95", "backdrop-blur-md", "shadow-sm", "py-4");
      }
    };
    apply();
    window.addEventListener("scroll", apply);
  }

  // FAQ accordion: only one open at a time
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

        // Close others
        items.forEach((otherBtn) => {
          const otherId = otherBtn.getAttribute("aria-controls");
          const otherPanel = otherId ? document.getElementById(otherId) : null;
          if (!otherPanel) return;
          otherBtn.setAttribute("aria-expanded", "false");
          otherPanel.classList.add("hidden");
        });

        // Toggle current
        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          panel.classList.remove("hidden");
        }
      });
    });
  }

  // Product cards: expandable details (one open at a time)
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
          otherBtn.textContent = "Толығырақ";
        });

        if (!isOpen) {
          target.classList.remove("hidden");
          btn.textContent = "Жасыру";
        }
      });
    });
  }
});
