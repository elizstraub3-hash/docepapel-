// Menu mobile
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Fecha menu ao clicar em um link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Formulário -> WhatsApp
function enviarOrcamento(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const data = document.getElementById('data').value;
  const tipo = document.getElementById('tipo').value;
  const convidados = document.getElementById('convidados').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !telefone || !data) {
    alert('Por favor, preencha nome, WhatsApp e data do evento!');
    return;
  }

  const dataFormatada = data ? new Date(data + 'T12:00:00').toLocaleDateString('pt-BR') : '';

  const texto = [
    `Olá, Zeca Locações! 🎉`,
    ``,
    `*Solicitação de Orçamento*`,
    `👤 Nome: ${nome}`,
    `📱 WhatsApp: ${telefone}`,
    `📅 Data do evento: ${dataFormatada}`,
    tipo ? `🎊 Tipo de evento: ${tipo}` : '',
    convidados ? `👥 Convidados: ${convidados}` : '',
    mensagem ? `📝 Detalhes: ${mensagem}` : '',
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/5541987147287?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// Scroll suave para header fixo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Animação de entrada dos cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.catalogo-card, .package, .depoimento, .diferencial').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
