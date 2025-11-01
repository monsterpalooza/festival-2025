// main.js - reemplazar TODO por esto
console.log('[main.js] cargando...');

document.addEventListener('DOMContentLoaded', () => {
  console.log('[main.js] DOM listo');

  // --- Helpers para debug ---
  function safeLog(...args){ if (window.location.search.indexOf('debug') !== -1) console.log(...args); }

  // ===== Menú simple (si existe) =====
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => menu.classList.toggle('show'));
    safeLog('[menu] toggle listo');
  } else safeLog('[menu] no encontrado (ok si no existe en esta página)');

  // ===== Entradas & Popup (delegación segura) =====
  const popup = document.getElementById('popup');
  const mensaje = document.getElementById('mensaje-popup');
  const cerrarBtn = document.getElementById('cerrar-popup');

  // Verificación simple (log)
  console.log('[popup] elementos -> popup:', !!popup, 'mensaje:', !!mensaje, 'cerrarBtn:', !!cerrarBtn);

  // Delegación: capturamos clicks sobre botones dentro de .tickets
  document.addEventListener('click', (e) => {
    const boton = e.target.closest && e.target.closest('.tickets button');
    if (!boton) return;

    const tipo = boton.dataset.type || 'unknown';
    console.log('[entradas] clic detectado tipo=', tipo);

    // Si tenemos la imagen de entrada (opcional), cambiarla
    const imagenEntrada = document.getElementById('imagenEntrada');
    if (imagenEntrada) {
      imagenEntrada.src = `img/entrada-${tipo}.png`;
      console.log('[entradas] imagenEntrada set ->', imagenEntrada.src);
    }

    // Mostrar popup con mensaje (si existe)
    if (popup && mensaje) {
      if (tipo === 'general') mensaje.textContent = '🎟️ Entrada General adquirida';
      else if (tipo === 'vip') mensaje.textContent = '✨ Entrada VIP adquirida';
      else if (tipo === 'allaccess') mensaje.textContent = '🔥 Entrada All Access adquirida';
      else mensaje.textContent = 'Entrada adquirida';

      popup.classList.add('show');
      console.log('[popup] mostrado');
    } else {
      console.warn('[popup] no configurado en esta página; chequeá HTML y IDs.');
    }
  });

  // Cerrar popup por botón
  if (cerrarBtn && popup) {
    cerrarBtn.addEventListener('click', () => {
      popup.classList.remove('show');
      console.log('[popup] cerrado (botón)');
    });
  }

  // Cerrar popup haciendo click fuera
  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('show');
        console.log('[popup] cerrado (fuera)');
      }
    });
  }

  // ===== Mascota (opcional) =====
  const mascota = document.getElementById('mascota-ticket');
  if (mascota) {
    document.addEventListener('click', (e) => {
      const boton = e.target.closest && e.target.closest('.tickets button');
      if (!boton) return;
      const tipo = boton.dataset.type;
      mascota.style.animation = 'none';
      mascota.offsetHeight;
      let dur = '3s';
      if (tipo === 'vip') dur = '1.5s';
      else if (tipo === 'allaccess') dur = '0.8s';
      mascota.style.animation = `flotar ${dur} ease-in-out infinite`;
      console.log('[mascota] animación ->', dur);
    });
  }

  // ===== Carrusel infinito en móvil (si existe) =====
  const carrusel = document.querySelector('.carrusel');
  if (carrusel) {
    if (!carrusel.dataset.duplicated) {
      carrusel.innerHTML += carrusel.innerHTML;
      carrusel.dataset.duplicated = 'true';
      console.log('[carrusel] duplicado para infinito');
    }
    let raf;
    function autoScroll() {
      carrusel.scrollLeft += 0.8;
      if (carrusel.scrollLeft >= carrusel.scrollWidth / 2) carrusel.scrollLeft = 0;
      raf = requestAnimationFrame(autoScroll);
    }
    function startStop() {
      if (window.innerWidth <= 768 && !carrusel.dataset.scrolling) {
        carrusel.dataset.scrolling = '1'; raf = requestAnimationFrame(autoScroll); console.log('[carrusel] start');
      } else if (window.innerWidth > 768 && carrusel.dataset.scrolling) {
        cancelAnimationFrame(raf); carrusel.dataset.scrolling = ''; console.log('[carrusel] stop');
      }
    }
    startStop();
    window.addEventListener('resize', startStop);
  } else console.log('[carrusel] no existe en esta página');

  console.log('[main.js] inicialización completa');
});


// Popup de Merch
document.querySelectorAll('.comprar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = btn.dataset.producto;
    const popup = document.getElementById('popup');
    const mensaje = document.getElementById('mensaje-popup');
    if (popup && mensaje) {
      mensaje.textContent = `${producto} adquirido`;
      popup.classList.add('show');
    }
  });
});

// Cerrar popup
const cerrarBtn = document.getElementById('cerrar-popup');
if (cerrarBtn) {
  cerrarBtn.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    if (popup) popup.classList.remove('show');
  });
}


document.addEventListener("DOMContentLoaded", () => {
  // Referencias a los elementos del contador
  const elWeeks = document.getElementById("weeks");
  const elDays = document.getElementById("days");
  const elHours = document.getElementById("hours");
  const elMinutes = document.getElementById("minutes");
  const elSeconds = document.getElementById("seconds");

  // Chequeo rápido: si alguno falta, mostramos error en consola y salimos
  if (!elWeeks || !elDays || !elHours || !elMinutes || !elSeconds) {
    console.error("Elementos del contador no encontrados. IDs esperados: weeks, days, hours, minutes, seconds");
    return;
  }

  // Fecha objetivo: 22 de noviembre de 2025 a las 00:00 (hora local del navegador)
  const festivalDate = new Date("2025-11-22T00:00:00");

  // Función para añadir ceros a la izquierda (2 dígitos)
  const pad = (n) => String(n).padStart(2, "0");

  function updateCountdown() {
    const now = new Date();
    const distance = festivalDate.getTime() - now.getTime();

    if (distance <= 0) {
      // Si ya pasó la fecha
      clearInterval(timerInterval);
      elWeeks.textContent = "00";
      elDays.textContent = "00";
      elHours.textContent = "00";
      elMinutes.textContent = "00";
      elSeconds.textContent = "00";
      // Opcional: mostrar mensaje en la pantalla
      const cont = document.querySelector(".contador");
      if (cont) cont.innerHTML = "<h3>¡El festival ha comenzado! 🎉</h3>";
      return;
    }

    // Cálculos
    const totalSeconds = Math.floor(distance / 1000);
    const seconds = totalSeconds % 60;

    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;

    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;

    const totalDays = Math.floor(totalHours / 24);
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    // Poner en el DOM con formato
    elWeeks.textContent = pad(weeks);
    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  // Ejecutar inmediatamente y luego cada segundo
  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);

  // Para debug: imprimimos la fecha objetivo en consola
  console.info("Contador configurado hasta:", festivalDate.toString());
});
