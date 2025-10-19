document.addEventListener('DOMContentLoaded', () => {

  // ===== Menú =====
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('show'); // coincide con tu CSS
    });
  }

  // ===== Mascota tickets =====
  const buttons = document.querySelectorAll('.tickets button');
  const mascot = document.getElementById('mascota-ticket');

  if (buttons.length && mascot) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tipo = btn.dataset.type;

        // Reinicia animación
        mascot.style.animation = 'none';
        mascot.offsetHeight; // fuerza reflow

        switch (tipo) {
          case 'general':
            mascot.style.animation = 'flotar 3s ease-in-out infinite';
            break;
          case 'vip':
            mascot.style.animation = 'flotar 1.5s ease-in-out infinite';
            break;
          case 'allaccess':
            mascot.style.animation = 'flotar 0.8s ease-in-out infinite';
            break;
        }
      });
    });
  }

  // ===== Popup entradas =====
  const popup = document.getElementById("popup");
  const imagenEntrada = document.getElementById("imagenEntrada");

  buttons.forEach(boton => {
    boton.addEventListener("click", () => {
      const tipo = boton.dataset.type;

      if (tipo === "general") imagenEntrada.src = "img/entrada-general.jpg";
      else if (tipo === "vip") imagenEntrada.src = "img/entrada-vip.jpg";
      else if (tipo === "allaccess") imagenEntrada.src = "img/entrada-allaccess.jpg";

      popup.style.display = "flex";
    });
  });

  window.cerrarPopup = function() {
    popup.style.display = "none";
  }

  // ===== Carrusel merch =====
document.addEventListener('DOMContentLoaded', () => {
  const carrusel = document.querySelector('.carrusel');
  if (!carrusel) return;

  // Duplicamos los productos para simular scroll infinito
  carrusel.innerHTML += carrusel.innerHTML;

  const itemWidth = carrusel.children[0].offsetWidth + 20; // ancho + gap
  let scrollSpeed = 1; // pixeles por frame

  function autoScroll() {
    carrusel.scrollLeft += scrollSpeed;

    // Si llegamos al final del contenido original, reseteamos scroll
    if (carrusel.scrollLeft >= carrusel.scrollWidth / 2) {
      carrusel.scrollLeft = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  // Solo activamos en móviles
  if (window.innerWidth <= 768) {
    autoScroll();
  }

  // Ajustar al cambiar tamaño
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      autoScroll();
    }
  });
});
