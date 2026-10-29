/* =========================================================
   DADOS DO PROFISSIONAL — edite aqui seus contatos
   ========================================================= */
const PROFISSIONAL = {
  nome: 'Euller Augusto',
  nomeCompleto: 'Euller Augusto Gonçalves Targino e Silva',
  crn: 'CRN-3 92786',                                   // vazio = não exibe
  instagram: '@oeulleraugusto',
  instagramUrl: 'https://www.instagram.com/oeulleraugusto/',
  youtubeNome: '@oeulleraugusto',
  youtubeUrl: 'https://www.youtube.com/@oeulleraugusto',
  whatsappUrl: 'https://wa.me/5511971972977',           // se vazio, o botão de consulta abre o Instagram
  checkoutDesafio: 'https://chk.eduzz.com/60E2OO8DW3',   // página de pagamento da Eduzz (Desafio 10 em 10)
  agendaUrl: 'https://calendar.app.google/Gejym8KBETNPZoP79'   // página de agendamento do Google Agenda
};

/* =========================================================
   FATORES DE ATIVIDADE (rotina sem exercícios)
   ========================================================= */
const FATORES = [
  { val: 1.2, nome: 'Sedentário',          desc: 'Maior parte do dia sentado ou deitado. Trabalho de escritório ou home office, pouca caminhada.' },
  { val: 1.3, nome: 'Pouco ativo',         desc: 'Trabalho sentado, com alguns deslocamentos a pé e tarefas domésticas leves.' },
  { val: 1.4, nome: 'Levemente ativo',     desc: 'Alterna entre sentado e em pé, caminha parte do dia (ex.: professor, vendedor de loja).' },
  { val: 1.5, nome: 'Moderadamente ativo', desc: 'Passa a maior parte do dia em pé ou andando (ex.: garçom, enfermagem, cabeleireiro).' },
  { val: 1.6, nome: 'Ativo',               desc: 'Trabalho com esforço físico moderado (ex.: estoquista, entregador a pé, jardineiro).' },
  { val: 1.7, nome: 'Muito ativo',         desc: 'Trabalho físico pesado na maior parte do dia (ex.: pedreiro, carregador, trabalhador rural).' },
  { val: 1.9, nome: 'Extremamente ativo',  desc: 'Trabalho braçal muito intenso e prolongado, todos os dias.' }
];

/* =========================================================
   COMPENSAÇÃO ENERGÉTICA NO DÉFICIT (Careau et al., 2021)
   Fração do gasto do exercício "compensada" pela redução do
   gasto basal. 10º percentil de IMC: 29,7%; 90º percentil: 45,7%.
   Sobrepeso: interpolação linear entre os dois valores.
   ========================================================= */
const COMPENSACAO = { eutrofia: 0.297, obesidade: 0.457 };

// Déficit calórico máximo recomendado por dia
const DEFICIT_MAX_KCAL = 1000;  // NHLBI (1998); ABESO (2016); ACSM (Donnelly et al., 2009)
const DEFICIT_MAX_PCT = 0.30;   // 30% do GET (Jensen et al., 2013 – AHA/ACC/TOS)

function fracaoCompensacao(imc) {
  if (imc < 25) return COMPENSACAO.eutrofia;
  if (imc >= 30) return COMPENSACAO.obesidade;
  return COMPENSACAO.eutrofia + (COMPENSACAO.obesidade - COMPENSACAO.eutrofia) * (imc - 25) / 5;
}

/* =========================================================
   EXERCÍCIOS — METs do Compendium of Physical Activities
   ========================================================= */
const EXERCICIOS = {
  'Caminhada': [
    ['Caminhada leve (4 km/h)', 3.0],
    ['Caminhada moderada (5,6 km/h)', 4.3],
    ['Caminhada rápida (6,4 km/h)', 5.0],
    ['Caminhada muito rápida (7,2 km/h)', 7.0],
    ['Trilha / hiking', 6.0],
    ['Subir escadas (ritmo rápido)', 8.8]
  ],
  'Corrida': [
    ['Trote (geral)', 7.0],
    ['Corrida 8 km/h', 8.3],
    ['Corrida 9,7 km/h', 9.8],
    ['Corrida 11,3 km/h', 11.0],
    ['Corrida 12,9 km/h', 11.8],
    ['Corrida 14,5 km/h', 12.8],
    ['Corrida 16 km/h', 14.5]
  ],
  'Ciclismo': [
    ['Bicicleta lazer (< 16 km/h)', 4.0],
    ['Bicicleta 16–19 km/h', 6.8],
    ['Bicicleta 19–22 km/h', 8.0],
    ['Bicicleta 22–25 km/h', 10.0],
    ['Mountain bike', 8.5],
    ['Bicicleta ergométrica leve', 3.5],
    ['Bicicleta ergométrica moderada', 6.8],
    ['Bicicleta ergométrica vigorosa', 8.8],
    ['Spinning / bike indoor', 8.5]
  ],
  'Academia': [
    ['Musculação (moderada)', 3.5],
    ['Musculação (vigorosa)', 6.0],
    ['Treino em circuito / funcional (moderado)', 4.3],
    ['Treino em circuito / funcional (vigoroso)', 8.0],
    ['Calistenia / HIIT (vigoroso)', 8.0],
    ['Elíptico (moderado)', 5.0],
    ['Remo ergômetro (moderado)', 7.0],
    ['Pular corda (moderado)', 11.8],
    ['Aeróbica / ritmos (alto impacto)', 7.3],
    ['Dança / ritmos (baixo impacto)', 5.0]
  ],
  'Corpo e mente': [
    ['Pilates', 3.0],
    ['Yoga (hatha)', 2.5],
    ['Yoga (power)', 4.0],
    ['Alongamento', 2.3]
  ],
  'Aquáticos': [
    ['Natação lazer', 6.0],
    ['Natação crawl (moderado)', 5.8],
    ['Natação crawl (vigoroso)', 9.8],
    ['Natação peito', 5.3],
    ['Hidroginástica', 5.5]
  ],
  'Esportes e lutas': [
    ['Futebol recreativo', 7.0],
    ['Futebol competitivo', 10.0],
    ['Basquete (geral)', 6.5],
    ['Vôlei recreativo', 4.0],
    ['Vôlei de praia', 8.0],
    ['Tênis (simples)', 8.0],
    ['Tênis (duplas)', 6.0],
    ['Artes marciais (judô, jiu-jitsu, karatê)', 10.3],
    ['Boxe (saco de pancada)', 5.5],
    ['Escalada', 8.0],
    ['Patins', 7.0],
    ['Skate', 5.0],
    ['Surf', 3.0]
  ]
};

/* =========================================================
   EQUAÇÕES DE GASTO ENERGÉTICO EM REPOUSO (kcal/dia)
   d = { sexo, idade, peso, altura (cm), gordura (%) }
   ========================================================= */
const faixaHenry = (i) => i < 18 ? 0 : i < 30 ? 1 : i < 60 ? 2 : i < 70 ? 3 : 4;
const faixaSchofield = (i) => i < 18 ? 0 : i < 30 ? 1 : i < 60 ? 2 : 3;
const mlg = (d) => d.peso * (1 - d.gordura / 100);

const EQUACOES = {
  mifflin: {
    nome: 'Mifflin-St Jeor (1990)',
    formula: (d) => d.sexo === 'M'
      ? '10 × peso + 6,25 × altura − 5 × idade + 5'
      : '10 × peso + 6,25 × altura − 5 × idade − 161',
    calc: (d) => 10 * d.peso + 6.25 * d.altura - 5 * d.idade + (d.sexo === 'M' ? 5 : -161),
    valida: (d) => d.idade >= 18,
    indicacao: 'Adultos, incluindo sobrepeso e obesidade'
  },
  hbRev: {
    nome: 'Harris-Benedict revisada (1984)',
    formula: (d) => d.sexo === 'M'
      ? '88,362 + 13,397 × peso + 4,799 × altura − 5,677 × idade'
      : '447,593 + 9,247 × peso + 3,098 × altura − 4,330 × idade',
    calc: (d) => d.sexo === 'M'
      ? 88.362 + 13.397 * d.peso + 4.799 * d.altura - 5.677 * d.idade
      : 447.593 + 9.247 * d.peso + 3.098 * d.altura - 4.330 * d.idade,
    valida: (d) => d.idade >= 18,
    indicacao: 'Adultos; boa opção em atletas sem % de gordura'
  },
  hbOrig: {
    nome: 'Harris-Benedict original (1919)',
    formula: (d) => d.sexo === 'M'
      ? '66,47 + 13,75 × peso + 5,00 × altura − 6,76 × idade'
      : '655,1 + 9,56 × peso + 1,85 × altura − 4,68 × idade',
    calc: (d) => d.sexo === 'M'
      ? 66.473 + 13.7516 * d.peso + 5.0033 * d.altura - 6.755 * d.idade
      : 655.0955 + 9.5634 * d.peso + 1.8496 * d.altura - 4.6756 * d.idade,
    valida: (d) => d.idade >= 18,
    indicacao: 'Histórica; tende a superestimar o gasto'
  },
  henry: {
    nome: 'Henry / Oxford (2005)',
    formula: () => 'a × peso + b (coeficientes por sexo e faixa etária)',
    calc: (d) => {
      const M = [[18.4, 581], [16.0, 545], [14.2, 593], [13.0, 567], [13.7, 481]];
      const F = [[11.1, 761], [13.1, 558], [9.74, 694], [10.2, 572], [10.0, 577]];
      const [a, b] = (d.sexo === 'M' ? M : F)[faixaHenry(d.idade)];
      return a * d.peso + b;
    },
    valida: () => true,
    indicacao: 'Adolescentes (10–17 anos) e adultos'
  },
  schofield: {
    nome: 'FAO/OMS – Schofield (1985)',
    formula: () => 'a × peso + b (coeficientes por sexo e faixa etária)',
    calc: (d) => {
      const M = [[17.686, 658.2], [15.057, 692.2], [11.472, 873.1], [11.711, 587.7]];
      const F = [[13.384, 692.6], [14.818, 486.6], [8.126, 845.6], [9.082, 658.5]];
      const [a, b] = (d.sexo === 'M' ? M : F)[faixaSchofield(d.idade)];
      return a * d.peso + b;
    },
    valida: () => true,
    indicacao: 'Referência populacional; tende a superestimar'
  },
  cunningham: {
    nome: 'Cunningham (1980)',
    formula: () => '500 + 22 × massa livre de gordura',
    calc: (d) => d.gordura ? 500 + 22 * mlg(d) : null,
    valida: (d) => !!d.gordura && d.idade >= 18,
    indicacao: 'Atletas, quando o % de gordura é conhecido'
  },
  katch: {
    nome: 'Katch-McArdle',
    formula: () => '370 + 21,6 × massa livre de gordura',
    calc: (d) => d.gordura ? 370 + 21.6 * mlg(d) : null,
    valida: (d) => !!d.gordura && d.idade >= 18,
    indicacao: 'Adultos ativos com % de gordura conhecido'
  }
};

function escolherEquacao(d) {
  const imc = d.peso / Math.pow(d.altura / 100, 2);
  if (d.idade < 18) {
    return { key: 'henry', motivo: 'Para menores de 18 anos, as equações de Henry (Oxford, 2005) são as recomendadas: foram desenvolvidas com amostra ampla e diversa, ao contrário de Mifflin-St Jeor, validada apenas em adultos. Para crianças e adolescentes, o acompanhamento profissional é ainda mais importante.' };
  }
  if (d.perfil === 'atleta' && d.gordura) {
    return { key: 'cunningham', motivo: `Como você treina intensamente e informou o % de gordura, usamos Cunningham, baseada na massa livre de gordura (${fmt(mlg(d), 1)} kg). Em atletas, ela apresentou as menores diferenças em relação à calorimetria indireta (ten Haaf & Weijs, 2014; Jagim et al., 2018).` };
  }
  if (d.perfil === 'atleta') {
    return { key: 'hbRev', motivo: 'Para atletas sem % de gordura conhecido, Harris-Benedict revisada foi uma das mais precisas em estudos com calorimetria. Mifflin-St Jeor tende a subestimar o gasto de quem tem muita massa muscular. Informe seu % de gordura para usar Cunningham, que é mais precisa.' };
  }
  let motivo = 'Mifflin-St Jeor foi a equação mais precisa na revisão sistemática da American Dietetic Association (Frankenfield et al., 2005): erro de até ±10% em ~82% dos adultos não obesos e ~70% dos obesos.';
  if (imc >= 30) motivo += ` Com IMC de ${fmt(imc, 1)} kg/m², ela continua sendo a mais indicada, conforme a revisão de Madden et al. (2016).`;
  if (d.idade >= 60) motivo += ' Acima de 60 anos, as evidências ainda são limitadas e Mifflin e Henry têm desempenho parecido. Compare os valores na tabela abaixo.';
  return { key: 'mifflin', motivo };
}

/* =========================================================
   UTILITÁRIOS
   ========================================================= */
const $ = (s) => document.querySelector(s);
const fmt = (n, dec = 0) => Number(n).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });

// Efeito "count up": anima o número de 0 até o valor final
function countUp(el, to, { duration = 1600, decimals = 0, prefix = '', suffix = '' } = {}) {
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
  cancelAnimationFrame(el._raf);
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = prefix + fmt(to * ease(p), decimals) + suffix;
    if (p < 1) el._raf = requestAnimationFrame(step);
  };
  el._raf = requestAnimationFrame(step);
}

/* =========================================================
   ESTADO E INTERFACE
   ========================================================= */
const state = { sexo: 'M', fa: 1.2, objetivo: 'perder', exercicios: [] };

function initToggle(id, key, onChange) {
  const wrap = document.getElementById(id);
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    wrap.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state[key] = btn.dataset.val;
    onChange && onChange();
  });
}

function renderFatores() {
  $('#faList').innerHTML = FATORES.map((f) => `
    <div class="fa-item${f.val === state.fa ? ' active' : ''}" data-val="${f.val}" tabindex="0" role="button">
      <span class="fa-val">${fmt(f.val, 1)}</span>
      <span class="fa-name">${f.nome}</span>
      <p class="fa-desc">${f.desc}</p>
    </div>`).join('');
  $('#faList').querySelectorAll('.fa-item').forEach((el) => {
    const select = () => { state.fa = parseFloat(el.dataset.val); renderFatores(); };
    el.addEventListener('click', select);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });
  });
}

function renderSelectExercicios() {
  $('#exercicio').innerHTML = Object.entries(EXERCICIOS).map(([grupo, lista]) =>
    `<optgroup label="${grupo}">${lista.map(([n, met]) =>
      `<option value="${met}" data-nome="${n}">${n} — ${fmt(met, 1)} MET</option>`).join('')}</optgroup>`
  ).join('');
}

const pesoAtual = () => parseFloat($('#peso').value) || 0;
// Gasto líquido: (MET − 1) × kg × horas. O 1 MET de repouso já está no GER × FA.
const kcalSessao = (ex, peso) => (ex.met - 1) * peso * (ex.min / 60);

function renderExercicios() {
  const lista = $('#exList');
  if (!state.exercicios.length) {
    lista.innerHTML = '<li class="empty">Nenhum exercício adicionado.</li>';
    return;
  }
  const peso = pesoAtual();
  lista.innerHTML = state.exercicios.map((ex, i) => `
    <li class="ex-item">
      <div>
        <div class="ex-name">${ex.nome}</div>
        <div class="ex-meta">${fmt(ex.met, 1)} MET · ${ex.min} min · ${ex.freq}x/semana</div>
      </div>
      <span class="ex-kcal">${peso ? '≈ ' + fmt(kcalSessao(ex, peso)) + ' kcal/sessão' : 'informe o peso'}</span>
      <button class="ex-remove" data-i="${i}" aria-label="Remover">×</button>
    </li>`).join('');
}

function atualizarCamposMeta() {
  const o = state.objetivo;
  $('#metaFields').classList.toggle('hidden', o === 'manter');
  $('#kgMetaLabel').textContent = o === 'ganhar' ? 'Quantos kg quer ganhar?' : 'Quantos kg quer perder?';
}

/* =========================================================
   CÁLCULO PRINCIPAL
   ========================================================= */
function calcular() {
  const erro = $('#erro');
  erro.textContent = '';
  const d = {
    sexo: state.sexo,
    idade: parseFloat($('#idade').value),
    peso: parseFloat($('#peso').value),
    altura: parseFloat($('#altura').value),
    gordura: parseFloat($('#gordura').value) || null,
    perfil: $('#perfil').value
  };

  if (!(d.idade >= 10 && d.idade <= 100)) return (erro.textContent = 'Informe uma idade entre 10 e 100 anos.');
  if (!(d.peso >= 25 && d.peso <= 300)) return (erro.textContent = 'Informe um peso entre 25 e 300 kg.');
  if (!(d.altura >= 120 && d.altura <= 230)) return (erro.textContent = 'Informe a altura em centímetros (entre 120 e 230).');
  if (d.gordura && (d.gordura < 3 || d.gordura > 60)) return (erro.textContent = 'O % de gordura deve estar entre 3 e 60.');

  let kg = 0, semanas = 0;
  if (state.objetivo !== 'manter') {
    kg = parseFloat($('#kgMeta').value);
    semanas = parseFloat($('#semanas').value);
    if (!(kg > 0)) return (erro.textContent = 'Informe quantos kg deseja alterar.');
    if (!(semanas >= 1)) return (erro.textContent = 'Informe o prazo em semanas (mínimo 1).');
  }

  // 1) GER
  const escolha = escolherEquacao(d);
  const eq = EQUACOES[escolha.key];
  const ger = eq.calc(d);

  // 2) Fator de atividade e 3) exercícios
  const atividade = ger * (state.fa - 1);
  const exercicioBruto = state.exercicios.reduce((s, ex) => s + kcalSessao(ex, d.peso) * ex.freq / 7, 0);

  // Em déficit, parte do gasto do exercício é compensada pela redução do gasto basal
  const imc = d.peso / Math.pow(d.altura / 100, 2);
  const compensacao = state.objetivo === 'perder' && exercicioBruto > 0 ? fracaoCompensacao(imc) : 0;
  const exercicio = exercicioBruto * (1 - compensacao);

  // 4) Efeito térmico: 10% da ingestão de manutenção → GET = base / 0,9
  const base = ger + atividade + exercicio;
  const get = base / 0.9;
  const eta = get - base;

  // 5) Meta de ingestão
  const ajusteSolicitado = state.objetivo === 'manter' ? 0 : (kg * 7700) / (semanas * 7);
  // Déficit máximo: o menor entre 1.000 kcal/dia (NHLBI 1998; ABESO 2016) e 30% do GET (Jensen et al., 2013)
  const deficitMax = Math.min(DEFICIT_MAX_KCAL, DEFICIT_MAX_PCT * get);
  const limitado = state.objetivo === 'perder' && ajusteSolicitado > deficitMax;
  const ajuste = limitado ? deficitMax : ajusteSolicitado;
  const meta = state.objetivo === 'perder' ? get - ajuste : get + ajuste;
  const ritmo = state.objetivo === 'manter' ? 0 : (ajuste * 7) / 7700;
  const semanasNecessarias = limitado ? (kg * 7700) / (ajuste * 7) : semanas;

  mostrarResultados({ d, escolha, eq, ger, atividade, exercicio, exercicioBruto, compensacao, imc, eta, get,
    ajuste, ajusteSolicitado, deficitMax, limitado, semanasNecessarias, meta, ritmo, kg, semanas });
}

function mostrarResultados(r) {
  const sec = $('#resultados');
  sec.classList.remove('hidden');
  sec.style.animation = 'none'; void sec.offsetWidth; sec.style.animation = '';

  countUp($('#rGET'), r.get, { duration: 2000 });
  countUp($('#rGER'), r.ger);
  countUp($('#rFA'), r.atividade);
  countUp($('#rEX'), r.exercicio);
  countUp($('#rETA'), r.eta);
  countUp($('#rMeta'), r.meta, { duration: 2200 });
  $('#rFAinfo').textContent = `kcal/dia · FA ${fmt(state.fa, 1)}`;
  $('#rEXinfo').textContent = r.compensacao
    ? `kcal/dia · −${fmt(r.compensacao * 100, 1)}% adaptação (bruto ${fmt(r.exercicioBruto)})`
    : 'kcal/dia';

  // Barra empilhada
  const partes = [
    ['Repouso', r.ger, '#1f9a5f'],
    ['Atividade diária', r.atividade, '#7fc8a0'],
    ['Exercícios', r.exercicio, '#c9a227'],
    ['Efeito térmico', r.eta, '#f4f6f5']
  ];
  const bar = $('#stackBar');
  bar.innerHTML = partes.map(([, , c]) => `<div style="background:${c}"></div>`).join('');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    bar.querySelectorAll('div').forEach((el, i) => { el.style.width = (partes[i][1] / r.get * 100) + '%'; });
  }));
  $('#legend').innerHTML = partes.map(([n, v, c]) =>
    `<span><i style="background:${c}"></i>${n}: ${fmt(v / r.get * 100)}%</span>`).join('');

  // Objetivo
  const o = state.objetivo;
  const sinal = o === 'perder' ? '−' : o === 'ganhar' ? '+' : '';
  $('#rDef').textContent = o === 'manter' ? '0 kcal' : `${sinal}${fmt(r.ajuste)} kcal`;
  $('#rRitmo').textContent = o === 'manter' ? 'Manutenção' : `${sinal}${fmt(r.ritmo, 2)} kg/semana`;
  $('#rMetaTxt').textContent = o === 'manter'
    ? 'Ingestão estimada para manter o peso atual.'
    : r.limitado
      ? `Ingestão ajustada ao déficit máximo recomendado. Neste ritmo, perder ${fmt(r.kg, 1)} kg leva cerca de ${fmt(Math.ceil(r.semanasNecessarias))} semanas.`
      : `Para ${o === 'perder' ? 'perder' : 'ganhar'} ${fmt(r.kg, 1)} kg em ${fmt(r.semanas)} semanas: ${fmt(r.kg, 1)} × 7.700 kcal = ${fmt(r.kg * 7700)} kcal ÷ ${fmt(r.semanas * 7)} dias.`;
  $('#rDefMaxBox').classList.toggle('hidden', o !== 'perder');
  $('#rDefMax').textContent = `${fmt(r.deficitMax)} kcal/dia`;
  $('#goalCard').classList.toggle('limitado', r.limitado);

  // Alertas de segurança
  const alertas = [];
  if (r.limitado) {
    alertas.push(['danger', `Meta muito agressiva: perder ${fmt(r.kg, 1)} kg em ${fmt(r.semanas)} semanas exigiria um déficit de ${fmt(r.ajusteSolicitado)} kcal/dia, acima do máximo recomendado para uma perda de peso saudável (${fmt(r.deficitMax)} kcal/dia, o menor valor entre 1.000 kcal e 30% do seu gasto total). Por isso, o déficit foi limitado a ${fmt(r.deficitMax)} kcal/dia. Para essa meta, o prazo recomendado é de pelo menos ${fmt(Math.ceil(r.semanasNecessarias))} semanas.`]);
  }
  const pctSemana = (r.ritmo / r.d.peso) * 100;
  const minimo = r.d.sexo === 'F' ? 1200 : 1500;
  if (o === 'perder') {
    if (pctSemana > 1.5) alertas.push(['danger', `Ritmo de ${fmt(pctSemana, 1)}% do peso por semana é muito agressivo. O recomendado é entre 0,5% e 1% por semana. Considere aumentar o prazo.`]);
    else if (pctSemana > 1) alertas.push(['warn', `Ritmo de ${fmt(pctSemana, 1)}% do peso por semana está acima do ideal (0,5–1%). Pode aumentar a perda de massa magra.`]);
    if (r.meta < minimo) alertas.push(['danger', `A ingestão calculada (${fmt(r.meta)} kcal) está abaixo de ${fmt(minimo)} kcal, valor mínimo geralmente recomendado sem supervisão profissional.`]);
    else if (r.meta < r.ger) alertas.push(['warn', 'A ingestão calculada ficou abaixo do seu gasto em repouso. Faça isso apenas com acompanhamento profissional.']);
    if (!alertas.length) alertas.push(['ok', 'Meta dentro de um ritmo considerado seguro e sustentável.']);
    if (r.compensacao) {
      const estado = r.imc < 25 ? 'eutrofia' : r.imc >= 30 ? 'obesidade' : 'sobrepeso';
      alertas.push(['warn', `Adaptação metabólica aplicada: em déficit, o corpo compensa parte do gasto do exercício reduzindo o gasto basal. Com IMC de ${fmt(r.imc, 1)} kg/m² (${estado}), o gasto dos exercícios foi reduzido em ${fmt(r.compensacao * 100, 1)}%: de ${fmt(r.exercicioBruto)} para ${fmt(r.exercicio)} kcal/dia (Careau et al., 2021).`]);
    }
    alertas.push(['warn', 'A regra das 7.700 kcal/kg é uma aproximação: com o tempo o corpo se adapta e a perda tende a desacelerar. Reavalie a cada 4–6 semanas.']);
  }
  if (o === 'ganhar') {
    if (r.ritmo > 0.5) alertas.push(['warn', 'Ganhos acima de ~0,5 kg/semana tendem a vir mais de gordura do que de massa muscular.']);
    alertas.push(['warn', 'Para ganho de massa muscular, o custo energético por kg é diferente de 7.700 kcal. Um superávit moderado (≈ 250–500 kcal) com treino de força costuma ser suficiente.']);
  }
  if (r.d.idade < 18) alertas.push(['warn', 'Para menores de 18 anos, restrições calóricas devem ser feitas apenas com acompanhamento profissional.']);
  $('#alertas').innerHTML = alertas.map(([t, m]) => `<li class="${t}">${m}</li>`).join('');

  // Equação escolhida + tabela comparativa
  $('#eqEscolhida').innerHTML = `
    <div class="eq-name">${r.eq.nome}: ${fmt(r.ger)} kcal/dia</div>
    <div class="eq-formula">${r.eq.formula(r.d)}</div>
    <p>${r.escolha.motivo}</p>
    <p style="margin-top:6px;font-size:.82rem;color:#5c6660">Faixa provável (±10%): ${fmt(r.ger * 0.9)} – ${fmt(r.ger * 1.1)} kcal/dia.</p>`;

  $('#eqTabela').innerHTML = Object.entries(EQUACOES).map(([k, e]) => {
    const v = e.calc(r.d);
    const ok = v !== null && e.valida(r.d);
    const cls = k === r.escolha.key ? 'chosen' : ok ? '' : 'na';
    const txt = v === null ? 'requer % gordura' : fmt(v) + ' kcal' + (ok ? '' : ' *');
    return `<tr class="${cls}"><td>${e.nome}</td><td>${txt}</td><td>${e.indicacao}</td></tr>`;
  }).join('') + (r.d.idade < 18 ? '<tr class="na"><td colspan="3">* Equação não validada para menores de 18 anos.</td></tr>' : '');

  setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

/* =========================================================
   RODAPÉ / PROMOÇÃO
   ========================================================= */
function aplicarDadosProfissional() {
  document.querySelectorAll('[data-pro]').forEach((el) => {
    const v = PROFISSIONAL[el.dataset.pro];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('.crn-wrap').forEach((el) => el.classList.toggle('hidden', !PROFISSIONAL.crn));
  $('#lnkWhatsapp').classList.toggle('hidden', !PROFISSIONAL.whatsappUrl);
  $('#lnkWhatsapp').href = PROFISSIONAL.whatsappUrl;
  $('#lnkInstagram').href = PROFISSIONAL.instagramUrl;
  $('#lnkYoutube').href = PROFISSIONAL.youtubeUrl;
  $('#lnkCta').href = PROFISSIONAL.agendaUrl || PROFISSIONAL.whatsappUrl || PROFISSIONAL.instagramUrl;
  $('#ano').textContent = new Date().getFullYear();
}

function efeitosInterativos() {
  // Cartão do profissional e foto com inclinação 3D
  document.querySelectorAll('#proCard, #fotoMoldura').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // Botão flutuante: aparece depois do topo e some no rodapé
  const floatBtn = $('#floatBtn');
  let footerVisivel = false;
  const atualizarFloat = () => floatBtn.classList.toggle('show', window.scrollY > 500 && !footerVisivel);
  new IntersectionObserver(([e]) => { footerVisivel = e.isIntersecting; atualizarFloat(); }).observe($('#contato'));
  window.addEventListener('scroll', atualizarFloat, { passive: true });

  // Revelar seções ao rolar
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll('.step, .science, .footer-inner > *, [data-reveal]').forEach((el) => { el.classList.add('reveal'); io.observe(el); });

  // Contadores: animam de 0 até o valor quando aparecem na tela
  const statEx = $('#statEx'), statEq = $('#statEq');
  if (statEx) statEx.dataset.to = Object.values(EXERCICIOS).reduce((s, l) => s + l.length, 0);
  if (statEq) statEq.dataset.to = Object.keys(EQUACOES).length;
  const ioCount = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countUp(e.target, +e.target.dataset.to, { duration: 2000, suffix: e.target.dataset.sufixo || '' });
    ioCount.unobserve(e.target);
  }), { threshold: 0.5 });
  document.querySelectorAll('.count[data-to]').forEach((el) => ioCount.observe(el));

  // Texto digitando (página Sobre)
  document.querySelectorAll('[data-frases]').forEach((el) => {
    const frases = el.dataset.frases.split('|');
    let f = 0, c = 0, apagando = false;
    const tick = () => {
      const frase = frases[f];
      c += apagando ? -1 : 1;
      el.textContent = frase.slice(0, c);
      let espera = apagando ? 35 : 70;
      if (!apagando && c === frase.length) { apagando = true; espera = 1800; }
      else if (apagando && c === 0) { apagando = false; f = (f + 1) % frases.length; espera = 400; }
      setTimeout(tick, espera);
    };
    tick();
  });
}

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
/* =========================================================
   DESAFIO 10 EM 10 — datas no horário de Brasília (UTC−3)
   ========================================================= */
const DESAFIO = {
  // Data de lançamento ainda não definida: o site mostra "Em breve" e a lista de espera.
  // Quando houver data, troque null por algo como new Date('2026-11-16T00:00:00-03:00') para voltar o cronômetro.
  inicio: null
};

const dois = (n) => String(n).padStart(2, '0');

function atualizarContagem() {
  if (!DESAFIO.inicio) {  // modo "lançamento em breve"
    document.querySelectorAll('[data-countdown]').forEach((el) => el.classList.add('aberto'));
    document.querySelectorAll('[data-countdown-label]').forEach((el) => { el.textContent = 'Lançamento em breve'; });
    document.querySelectorAll('[data-countdown-nota]').forEach((el) => { el.textContent = 'Fique de olho no WhatsApp: eu aviso a data de início em primeira mão.'; });
    document.querySelectorAll('[data-cd-pill]').forEach((el) => { el.textContent = 'Lançamento em breve · lista de espera aberta'; });
    document.querySelectorAll('[data-cd-frase]').forEach((el) => { el.textContent = 'lançamento em breve'; });
    document.querySelectorAll('[data-countdown-curto]').forEach((el) => { el.textContent = ''; el.hidden = true; });
    return;
  }
  const agora = Date.now();
  const antes = agora < DESAFIO.inicio;
  const resta = Math.max(0, DESAFIO.inicio - agora);
  const dias = Math.floor(resta / 864e5);
  const horas = Math.floor(resta / 36e5) % 24;
  const min = Math.floor(resta / 6e4) % 60;
  const seg = Math.floor(resta / 1e3) % 60;

  // Antes de 23/10: contagem regressiva. Depois: inscrições abertas (10 semanas a partir do início de cada pessoa)
  document.querySelectorAll('[data-countdown]').forEach((el) => {
    el.querySelector('.cd-dias').textContent = dois(dias);
    el.querySelector('.cd-horas').textContent = dois(horas);
    el.querySelector('.cd-min').textContent = dois(min);
    el.querySelector('.cd-seg').textContent = dois(seg);
    el.classList.toggle('aberto', !antes);
  });
  document.querySelectorAll('[data-countdown-label]').forEach((el) => {
    el.textContent = antes ? 'A turma começa em' : 'Turma em andamento · inscrições abertas';
  });
  document.querySelectorAll('[data-countdown-nota]').forEach((el) => {
    el.textContent = antes
      ? 'Início da turma: 23 de outubro, 00h (horário de Brasília) · quem entrar depois também tem 10 semanas completas'
      : 'Entre quando quiser: suas 10 semanas de acompanhamento começam a partir do seu início.';
  });
  document.querySelectorAll('[data-cd-pill]').forEach((el) => {
    el.textContent = antes ? 'Turma começa em 23/10 · entre quando quiser' : 'Inscrições abertas · comece quando quiser';
  });
  document.querySelectorAll('[data-cd-frase]').forEach((el) => { el.textContent = antes ? 'começa em' : '· inscrições abertas, comece quando quiser'; });
  document.querySelectorAll('[data-countdown-curto]').forEach((el) => {
    el.textContent = antes ? `${dias}d ${dois(horas)}h ${dois(min)}min ${dois(seg)}s` : '';
    el.hidden = !antes;
  });
}

function initDesafio() {
  // Botões de pagamento apontam para o checkout configurado acima
  document.querySelectorAll('[data-checkout]').forEach((a) => { if (PROFISSIONAL.checkoutDesafio) a.href = PROFISSIONAL.checkoutDesafio; });

  // Links de WhatsApp com mensagem pronta
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    if (PROFISSIONAL.whatsappUrl) a.href = `${PROFISSIONAL.whatsappUrl}?text=${encodeURIComponent(a.dataset.whatsapp)}`;
  });

  if (document.querySelector('[data-countdown], [data-countdown-curto], [data-cd-pill], [data-cd-frase]')) {
    atualizarContagem();
    if (DESAFIO.inicio) setInterval(atualizarContagem, 1000);
  }

  // Quanto é 10% do seu peso?
  const metaPeso = $('#metaPeso');
  if (metaPeso) {
    let espera;
    metaPeso.addEventListener('input', () => {
      clearTimeout(espera);
      espera = setTimeout(() => {
        const p = parseFloat(metaPeso.value);
        if (!(p >= 40 && p <= 300)) return;
        countUp($('#metaKg'), p * 0.1, { decimals: 1, duration: 1200 });
        countUp($('#metaSemana'), p * 0.01, { decimals: 2, duration: 1200 });
        countUp($('#metaFinal'), p * 0.9, { decimals: 1, duration: 1600 });
      }, 450);
    });
  }
}

/* =========================================================
   LISTA DE ESPERA — formulário que salva numa planilha do Google
   ========================================================= */
const LISTA = {
  planilhaUrl: 'https://script.google.com/macros/s/AKfycbyQwLFFaT4Yo5NS0njkUMF8d1rBUBkXMobY-_yqS2XhjShSOfPitHd-3TeSUFZrlKh-8Q/exec',   // endereço do Apps Script publicado (vazio = modo de teste, nada é salvo)
  grupoUrl: 'https://whatsapp.com/channel/0029Vb9XKUWDeON7tvNFcE0b'   // canal de avisos no WhatsApp (vazio = botão escondido)
};

const mascaraWhats = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

function initListaEspera() {
  const modal = $('#listaEspera');
  if (!modal) return;
  const form = $('#listaForm'), erro = $('#listaErro');
  let origem = 'site';

  const abrir = (de) => {
    origem = de || 'site';
    if (!modal.open) modal.showModal();
    if (!form.hidden) setTimeout(() => $('#lNome').focus(), 50);
  };
  document.querySelectorAll('[data-lista]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    abrir(a.textContent.trim().slice(0, 60));
  }));
  modal.querySelector('[data-lista-fechar]').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });   // clique fora da janela
  modal.addEventListener('close', () => { if (location.hash === '#lista') history.replaceState(null, '', location.pathname + location.search); });
  if (location.hash === '#lista') abrir('link #lista');

  const grupo = modal.querySelector('[data-lista-grupo]');
  if (LISTA.grupoUrl) grupo.href = LISTA.grupoUrl;
  else if (LISTA.planilhaUrl) grupo.hidden = true;   // no modo de teste o botão aparece só para ver o visual

  $('#lWhats').addEventListener('input', (e) => { e.target.value = mascaraWhats(e.target.value); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if (d.site) return;   // campo invisível preenchido = robô
    const digitos = d.whatsapp.replace(/\D/g, '');
    erro.textContent =
      d.nome.trim().length < 2 ? 'Digite o seu nome.' :
      digitos.length < 10 ? 'Confira o seu WhatsApp, com DDD.' :
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()) ? 'Confira o seu e-mail.' :
      !d.aceite ? 'Marque a autorização para eu poder te avisar.' : '';
    if (erro.textContent) return;

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Enviando...';
    try {
      if (LISTA.planilhaUrl) {
        // no-cors: o Google não devolve resposta legível, mas recebe os dados
        await fetch(LISTA.planilhaUrl, { method: 'POST', mode: 'no-cors', body: new URLSearchParams({
          nome: d.nome.trim(), whatsapp: d.whatsapp, email: d.email.trim(),
          dificuldade: (d.dificuldade || '').trim(), origem, pagina: location.pathname
        }) });
      }
      modal.querySelector('[data-lista-nome]').textContent = d.nome.trim().split(' ')[0];
      modal.querySelector('[data-lista-teste]').hidden = !!(LISTA.planilhaUrl && LISTA.grupoUrl);
      form.hidden = true;
      $('#listaOk').hidden = false;
    } catch {
      erro.textContent = 'Não consegui enviar agora. Verifique sua internet e tente de novo.';
    } finally {
      btn.disabled = false; btn.textContent = 'Quero entrar na lista';
    }
  });
}

// Ao abrir os arquivos direto do computador, links de pasta ("calculadora/") precisam do index.html
function ajustarLinksLocais() {
  if (location.protocol !== 'file:') return;
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (/^(https?:|mailto:|#)/.test(href)) return;
    const [caminho, ancora] = href.split('#');
    if (caminho.endsWith('/')) a.setAttribute('href', caminho + 'index.html' + (ancora !== undefined ? '#' + ancora : ''));
  });
}

// Remove da barra de endereço os parâmetros de rastreio que o Instagram/Facebook adicionam (utm_*, fbclid...)
function limparEndereco() {
  const url = new URL(location.href);
  const rastreio = [...url.searchParams.keys()].filter((k) => /^(utm_|fbclid$|gclid$|igshid$|mc_)/.test(k));
  if (!rastreio.length) return;
  rastreio.forEach((k) => url.searchParams.delete(k));
  history.replaceState(null, '', url.pathname + url.search + url.hash);
}

document.addEventListener('DOMContentLoaded', () => {
  limparEndereco();
  ajustarLinksLocais();
  aplicarDadosProfissional();
  initDesafio();
  initListaEspera();
  efeitosInterativos();
  if (!$('#faList')) return; // páginas sem a calculadora

  renderFatores();
  renderSelectExercicios();
  initToggle('sexo', 'sexo');
  initToggle('objetivo', 'objetivo', atualizarCamposMeta);

  $('#addEx').addEventListener('click', () => {
    const sel = $('#exercicio');
    const opt = sel.options[sel.selectedIndex];
    const min = parseFloat($('#minutos').value);
    const freq = parseFloat($('#frequencia').value);
    if (!(min > 0) || !(freq > 0)) return ($('#erro').textContent = 'Informe minutos e frequência válidos para o exercício.');
    $('#erro').textContent = '';
    state.exercicios.push({ nome: opt.dataset.nome, met: parseFloat(sel.value), min, freq });
    renderExercicios();
  });
  $('#exList').addEventListener('click', (e) => {
    const btn = e.target.closest('.ex-remove');
    if (!btn) return;
    state.exercicios.splice(+btn.dataset.i, 1);
    renderExercicios();
  });
  $('#peso').addEventListener('input', renderExercicios);
  $('#calcular').addEventListener('click', calcular);
});
