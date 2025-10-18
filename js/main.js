document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tickets button');
  const mascot = document.getElementById('mascota-ticket');

  if (!buttons.length || !mascot) {
    console.error('No se encontró la mascota o los botones');
    return;
  }

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
});
// Seleccionar todos los botones de entradas
const botones = document.querySelectorAll(".tickets button");
const popup = document.getElementById("popup");
const imagenEntrada = document.getElementById("imagenEntrada");

// Cuando se hace clic en cualquier botón
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const tipo = boton.dataset.type;

    // Cambiar la imagen según el tipo
    if (tipo === "general") {
      imagenEntrada.src = "img/entrada-general.jpg";
    } else if (tipo === "vip") {
      imagenEntrada.src = "img/entrada-vip.jpg";
    } else if (tipo === "allaccess") {
      imagenEntrada.src = "img/entrada-allaccess.jpg";
    }

    // Mostrar el popup
    popup.style.display = "flex";
  });
});

// Función para cerrar el popup
function cerrarPopup() {
  popup.style.display = "none";
}
