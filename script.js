document.querySelectorAll("[data-include]").forEach(async (el) => {
  const file = el.getAttribute("data-include");
  const res = await fetch(file);
  const html = await res.text();
  el.innerHTML = html;

  // Carrossel
  const carousels = el.querySelectorAll(".carousel");
  carousels.forEach((carouselEl) => {
    new bootstrap.Carousel(carouselEl, {
      interval: 3000,
      ride: "carousel",
    });
  });

  // Offcanvas + rolagem
  const offcanvasElement = document.getElementById("offcanvasNavbar");
  if (offcanvasElement) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    const toggler = document.querySelector(".navbar-toggler");

    offcanvasElement
      .querySelectorAll('.offcanvas-body .nav-link[href^="#"]')
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault(); // evita comportamento padrão do hash
          const targetId = link.getAttribute("href").slice(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            offcanvas.hide();
            toggler?.blur(); // remove foco do botão

            // Rola até a seção suavemente
            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }, 300); // espera o offcanvas fechar
          }
        });
      });
  }
});
