// ── HERO SLIDER FULL WIDTH ──
let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function goTo(n) {
  currentSlide = (n + heroSlides.length) % heroSlides.length;
  document.getElementById('sliderTrack').style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}
function nextSlide() { goTo(currentSlide + 1); }
function prevSlide() { goTo(currentSlide - 1); }

setInterval(nextSlide, 5000);

// ── MENU MOBILE
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});

document.querySelectorAll('.mobile-nav a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open'))
);

// Formulário → WhatsApp
function enviar(e) {
  e.preventDefault();
  const nome     = document.getElementById('nome').value.trim();
  const tel      = document.getElementById('tel').value.trim();
  const data     = document.getElementById('data').value;
  const endereco = document.getElementById('endereco').value.trim();
  const jogos    = document.getElementById('jogos').value.trim();
  const avulso   = document.getElementById('avulso').value;
  const tipo     = document.getElementById('tipo').value;
  const msg      = document.getElementById('msg').value.trim();

  if (!nome || !tel || !data || !endereco || !jogos) {
    alert('Preencha todos os campos obrigatórios: nome, WhatsApp, data, endereço e quantidade de jogos.');
    return;
  }

  const dataFmt = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');

  // Cálculo automático do preço estimado (cadeira R$50 + mesa R$80 = R$280/jogo)
  const qtd = parseInt(jogos);
  const totalEstimado = (qtd * 280).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const texto = [
    'Olá, Zé Locações! 🎉 Quero fazer um orçamento:',
    '',
    `👤 Nome: ${nome}`,
    `📱 WhatsApp: ${tel}`,
    `📅 Data do evento: ${dataFmt}`,
    `📍 Endereço: ${endereco}`,
    `🪑 Jogos de mesa: ${qtd} jogos (1 mesa + 4 cadeiras cada)`,
    avulso && avulso !== 'Não, só jogos completos' ? `➕ Avulsos: ${avulso}` : '',
    tipo   ? `🎊 Tipo de evento: ${tipo}` : '',
    `💰 Estimativa: ${totalEstimado} (sem taxa de deslocamento)`,
    msg    ? `📝 Observações: ${msg}` : '',
    '',
    'Li e aceito os Termos e Regras de Locação.',
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
