const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (window.AOS && !reducedMotion.matches) {
  window.AOS.init({ duration: 550, easing: 'ease-out', once: true });
  document.documentElement.classList.add('aos-activo');
}

const contactForm = document.querySelector('#formulario-contacto');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const body = [
    'Nombre: ' + fields.get('nombre'),
    'Correo: ' + fields.get('email'),
    '',
    fields.get('mensaje')
  ].join('\n');
  window.location.href = 'mailto:ingalexbanexx@gmail.com?subject=' +
    encodeURIComponent('Consulta desde Alexbanexx') + '&body=' + encodeURIComponent(body);
});
