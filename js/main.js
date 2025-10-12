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
