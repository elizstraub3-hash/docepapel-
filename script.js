// slider removido — apenas 1 slide

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

// Acordeão tabela de preços
function togglePrecos(btn) {
  const rows = document.getElementById('price-rows');
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !open);
  btn.querySelector('.toggle-arrow').textContent = open ? '▼' : '▲';
  rows.hidden = open;
}

// Abrir/fechar formulário de orçamento
function toggleOrcamento(btn) {
  const form = document.getElementById('form');
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !open);
  btn.querySelector('.toggle-arrow').textContent = open ? '▼' : '▲';
  form.hidden = open;
}

// Acordeão termos
function toggleTermo(btn) {
  const body = btn.nextElementSibling;
  const open = !body.hidden;
  body.hidden = open;
  btn.querySelector('.termo-arrow').textContent = open ? '▼' : '▲';
  btn.classList.toggle('termo-btn-open', !open);
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
