// Menu mobile
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});

document.querySelectorAll('.mobile-nav a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open'))
);

// Formulário → WhatsApp
function enviar(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const tel  = document.getElementById('tel').value.trim();
  const data = document.getElementById('data').value;
  const tipo = document.getElementById('tipo').value;
  const msg  = document.getElementById('msg').value.trim();

  if (!nome || !tel || !data) {
    alert('Preencha nome, WhatsApp e data do evento.');
    return;
  }

  const dataFmt = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');
  const texto = [
    'Olá, Zé Locações! 🎉',
    '',
    `👤 Nome: ${nome}`,
    `📱 WhatsApp: ${tel}`,
    `📅 Data: ${dataFmt}`,
    tipo ? `🎊 Evento: ${tipo}` : '',
    msg  ? `📝 Detalhes: ${msg}` : '',
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/5541987147287?text=${encodeURIComponent(texto)}`, '_blank');
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
    }
  });
});

// Animação de entrada
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .price-block, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(el);
});
