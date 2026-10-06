(() => {
'use strict';

/* ---------- Puzzle definitions (data only) ---------- */
const shift = (s, k) => [...s].map(c => /[A-Z]/.test(c) ? String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65) : c).join('');
const toBin = s => [...s].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
const pos = s => [...s].reduce((a, c) => a + c.charCodeAt(0) - 64, 0);

const LEVELS = [
  { name: 'Caesar cipher', time: 60, stages: [{
    type: 'text', prompt: 'Every letter was shifted forward by a fixed amount. Crack the shift.',
    data: 'KHOOR', answer: 'HELLO', hint: 'Shift each letter back by 3. K becomes H.' }] },
  { name: 'Binary', time: 75, stages: [{
    type: 'text', prompt: 'Each byte is one ASCII letter. Decode the word.',
    data: toBin('OPEN'), answer: 'OPEN', hint: 'Capital letters start at 01000001 (A = 65). 01001111 is 79, the 15th letter.' }] },
  { name: 'Pattern', time: 60, stages: [{
    type: 'text', prompt: 'Find the missing value.',
    data: '2, 6, 12, 20, 30, ?', answer: '42', hint: 'The gaps grow by 2 each step: +4, +6, +8, +10...' }] },
  { name: 'Logic', time: 90, stages: [{
    type: 'choice', prompt: 'Exactly one server is compromised, and only it lies. The other three tell the truth. Which is compromised?',
    data: 'ALPHA:   "BRAVO is compromised."\nBRAVO:   "ALPHA is lying."\nCHARLIE: "I am clean."\nDELTA:   "BRAVO is lying."',
    choices: ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA'], answer: 'BRAVO',
    hint: 'Assume one server is the liar, then check that all four statements still hold. DELTA contradicts ALPHA.' }] },
  { name: 'Hash match', time: 90, stages: [{
    type: 'choice', prompt: 'Checksum = sum of letter positions (A=1, B=2 ... Z=26). Which string matches the target?',
    data: 'TARGET CHECKSUM: ' + pos('LOGIN'),
    choices: ['ROOT', 'ADMIN', 'LOGIN', 'GUEST'], answer: 'LOGIN',
    hint: 'ADMIN = 1+4+13+9+14 = 41, so it is not that one. Work through the rest.' }] },
  { name: 'Port sequence', time: 90, stages: [{
    type: 'text', prompt: 'Enter the knock sequence (ports separated by spaces) using the clues.',
    data: 'PORTS: 22 SSH | 80 HTTP | 443 HTTPS | 3306 DATABASE\n1. SSH is knocked first.\n2. HTTP comes after SSH and before HTTPS.\n3. The database port is never knocked.',
    answer: '22 80 443', hint: 'Three ports remain after dropping the database. The order is SSH, HTTP, HTTPS.' }] },
  { name: 'Memory', time: 60, stages: [{
    type: 'memory', showMs: 4000, prompt: 'Memorize the sequence. It disappears in 4 seconds, then type it back.',
    data: 'K7 M2 Q9 X4', answer: 'K7M2Q9X4', hint: 'Letters ascend through the alphabet: K, M, Q, X. Digits: 7, 2, 9, 4.' }] },
  { name: 'Final breach', time: 150, stages: [
    { type: 'text', prompt: 'Stage 1/3. Caesar shift.', data: shift('CRYPTO', 3), answer: 'CRYPTO', hint: 'Shift back by 3.' },
    { type: 'text', prompt: 'Stage 2/3. Binary.', data: toBin('KEY'), answer: 'KEY', hint: 'K = 75, E = 69, Y = 89.' },
    { type: 'text', prompt: 'Stage 3/3. Pattern.', data: '3, 6, 12, 24, ?', answer: '48', hint: 'Each value doubles.' }] }
];


/* ---------- Randomized generators (new puzzle every run) ---------- */
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[rnd(0, a.length - 1)];
const CWORDS = ['FIREWALL', 'ACCESS', 'SERVER', 'PACKET', 'TOKEN', 'ROUTER', 'PROXY', 'CRYPTO', 'SOCKET', 'KERNEL'];
const BWORDS = ['OPEN', 'DATA', 'HACK', 'PORT', 'NODE', 'ROOT', 'BYTE', 'SCAN'];
const gCaesar = (prompt = 'Every letter was shifted forward by a fixed amount. Crack the shift.') => {
  const w = pick(CWORDS), k = rnd(2, 9);
  return { type: 'text', prompt, data: shift(w, k), answer: w, hint: 'The shift is ' + k + '. Move each letter back by ' + k + '.' };
};
const gBinary = (prompt = 'Each byte is one ASCII letter. Decode the word.') => {
  const w = pick(BWORDS);
  return { type: 'text', prompt, data: toBin(w), answer: w, hint: 'Capital A is 01000001 (65). Convert each byte to a number, then to its letter.' };
};
const gPattern = (prompt = 'Find the missing value.') => {
  const t = rnd(0, 3), a = rnd(2, 6), d = rnd(3, 9), s = [];
  for (let n = 1; n <= 6; n++) s.push(t === 0 ? a + d * n : t === 1 ? a * Math.pow(2, n - 1) : t === 2 ? n * n + a : n * (n + 1) + a);
  const hints = ['It adds ' + d + ' every step.', 'Each value doubles.', 'These are square numbers plus ' + a + '.', 'The gaps grow by 2 each step.'];
  return { type: 'text', prompt, data: s.slice(0, 5).join(', ') + ', ?', answer: String(s[5]), hint: hints[t] };
};
LEVELS[0].stages = [() => gCaesar()];
LEVELS[1].stages = [() => gBinary()];
LEVELS[2].stages = [() => gPattern()];
LEVELS[7].stages = [() => gCaesar('Stage 1/3. Caesar shift.'), () => gBinary('Stage 2/3. Binary.'), () => gPattern('Stage 3/3. Pattern.')];

/* ---------- Sound (Web Audio, no files) ---------- */
let ac, muted = false;
try { muted = localStorage.getItem('cipherbreak.muted') === '1'; } catch (e) {}
function beep(f, d = .12, type = 'square', v = .04, when = 0) {
  if (muted) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + when;
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d);
  } catch (e) {}
}
const sfx = {
  ok: () => { beep(660); beep(880, .15, 'square', .04, .1); },
  bad: () => beep(140, .3, 'sawtooth'),
  hint: () => beep(520, .1, 'triangle'),
  tick: () => beep(900, .03, 'square', .02),
  win: () => [523, 659, 784, 1046].forEach((f, i) => beep(f, .18, 'square', .04, i * .12)),
  lose: () => [330, 262, 196, 130].forEach((f, i) => beep(f, .25, 'sawtooth', .04, i * .15))
};

/* ---------- High score ---------- */
let best = 0;
try { best = Number(localStorage.getItem('cipherbreak.best')) || 0; } catch (e) {}
function saveBest() { try { localStorage.setItem('cipherbreak.best', String(best)); } catch (e) {} }

/* ---------- State ---------- */
const $ = id => document.getElementById(id);
const norm = s => String(s).toUpperCase().replace(/[^A-Z0-9]/g, '');
const S = { level: 0, stage: 0, lives: 3, score: 0, time: 0, hinted: false, timer: null, memTimer: null };
const MAX_LIVES = 3;

/* ---------- Screens ---------- */
function show(id) {
  ['menu', 'game', 'end'].forEach(s => { $(s).hidden = s !== id; });
}
function stopTimers() { clearInterval(S.timer); clearTimeout(S.memTimer); }

/* ---------- Game flow ---------- */
function start() {
  Object.assign(S, { level: 0, stage: 0, lives: MAX_LIVES, score: 0 });
  buildProgress();
  show('game');
  loadLevel();
}

function loadLevel() {
  S.stage = 0;
  S.stages = LEVELS[S.level].stages.map(s => typeof s === 'function' ? s() : s);
  S.time = LEVELS[S.level].time;
  loadStage();
  clearInterval(S.timer);
  S.timer = setInterval(tick, 1000);
}

function loadStage() {
  const L = LEVELS[S.level], st = S.stages[S.stage];
  S.hinted = false;
  $('p-title').textContent = 'Level ' + (S.level + 1) + ': ' + L.name;
  $('p-prompt').textContent = st.prompt;
  $('hint').textContent = '';
  $('feedback').textContent = '';
  $('btn-hint').disabled = false;
  $('answer').value = '';
  const isChoice = st.type === 'choice';
  $('form').hidden = isChoice;
  $('p-choices').hidden = !isChoice;
  const box = $('p-choices');
  box.textContent = '';
  if (isChoice) {
    st.choices.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'btn';
      const k = document.createElement('kbd'); k.textContent = (i + 1) + '.';
      b.append(k, c);
      b.addEventListener('click', () => submit(c));
      box.appendChild(b);
    });
  }
  showData(st);
  hud();
  (isChoice ? box.firstChild : $('answer')).focus();
}

function showData(st) {
  clearTimeout(S.memTimer);
  $('p-data').textContent = st.data;
  if (st.type === 'memory') {
    S.memTimer = setTimeout(() => { $('p-data').textContent = st.data.replace(/[A-Z0-9]/g, '*'); }, st.showMs);
  }
}

function tick() {
  S.time--;
  if (S.time <= 0) {
    S.lives--;
    if (S.lives <= 0) return end(false, 'Time expired. Security locked you out.');
    S.time = LEVELS[S.level].time;
    showData(S.stages[S.stage]);
    say('Time expired. Life lost, timer reset.', false);
    sfx.bad();
  } else if (S.time <= 5) sfx.tick();
  hud();
}

function submit(raw) {
  const L = LEVELS[S.level], st = S.stages[S.stage];
  if (!norm(raw)) return;
  if (norm(raw) === norm(st.answer)) {
    S.score += 100 + S.time * 2;
    S.stage++;
    if (S.stage < S.stages.length) { loadStage(); say('Stage cleared.', true); sfx.ok(); return; }
    S.level++;
    if (S.level >= LEVELS.length) return end(true, 'All eight locks broken. System override complete.');
    loadLevel();
    say('Access granted.', true);
    sfx.ok();
  } else {
    S.lives--;
    if (S.lives <= 0) return end(false, 'Three failed attempts. Terminal locked.');
    $('answer').value = '';
    const p = document.querySelector('#game .panel');
    p.classList.remove('shake'); void p.offsetWidth; p.classList.add('shake');
    say('Access denied. Life lost.', false);
    sfx.bad();
    hud();
  }
}

function hint() {
  if (S.hinted) return;
  S.hinted = true;
  S.score = Math.max(0, S.score - 50);
  $('hint').textContent = S.stages[S.stage].hint;
  $('btn-hint').disabled = true;
  sfx.hint();
  hud();
}

function end(win, msg) {
  stopTimers();
  $('end-title').textContent = win ? 'VICTORY' : 'GAME OVER';
  $('end-text').textContent = msg;
  $('end-score').textContent = S.score;
  const isNew = S.score > best;
  if (isNew) { best = S.score; saveBest(); }
  $('end-best').textContent = isNew ? 'New high score!' : 'High score: ' + best;
  $('best').textContent = best;
  (win ? sfx.win : sfx.lose)();
  show('end');
  $('btn-again').focus();
}

/* ---------- UI helpers ---------- */
function say(msg, ok) {
  const f = $('feedback');
  f.textContent = msg;
  f.className = 'feedback ' + (ok ? 'ok' : 'bad');
}
function buildProgress() {
  const ol = $('progress');
  ol.textContent = '';
  LEVELS.forEach(() => ol.appendChild(document.createElement('li')));
}
function hud() {
  const L = LEVELS[S.level];
  $('hud-level').textContent = Math.min(S.level + 1, LEVELS.length);
  $('hud-score').textContent = S.score;
  $('hud-lives').textContent = '\u2665'.repeat(S.lives) + '\u2661'.repeat(MAX_LIVES - S.lives) + ' ' + S.lives + '/' + MAX_LIVES;
  $('hud-time').textContent = S.time;
  const pct = Math.max(0, S.time / L.time * 100);
  $('timebar').style.width = pct + '%';
  const bar = document.querySelector('.bar');
  bar.classList.toggle('low', pct <= 25);
  bar.setAttribute('aria-valuenow', Math.round(pct));
  [...$('progress').children].forEach((li, i) => {
    li.className = i < S.level ? 'done' : i === S.level ? 'now' : '';
  });
}

/* ---------- Events ---------- */
$('btn-start').addEventListener('click', start);
$('btn-again').addEventListener('click', start);
$('btn-menu').addEventListener('click', () => { stopTimers(); show('menu'); $('btn-start').focus(); });
$('btn-quit').addEventListener('click', () => { stopTimers(); show('menu'); $('btn-start').focus(); });
$('btn-hint').addEventListener('click', hint);
function muteLabel() { $('btn-mute').textContent = muted ? 'Sound: off' : 'Sound: on'; $('btn-mute').setAttribute('aria-pressed', String(muted)); }
$('btn-mute').addEventListener('click', () => {
  muted = !muted;
  try { localStorage.setItem('cipherbreak.muted', muted ? '1' : '0'); } catch (e) {}
  muteLabel(); sfx.hint();
});
muteLabel();
$('best').textContent = best;
$('btn-how').addEventListener('click', e => {
  const h = $('how');
  h.hidden = !h.hidden;
  e.currentTarget.setAttribute('aria-expanded', String(!h.hidden));
});
$('form').addEventListener('submit', e => { e.preventDefault(); submit($('answer').value); });
document.addEventListener('keydown', e => {
  if ($('game').hidden || $('p-choices').hidden || e.target.tagName === 'INPUT') return;
  const b = $('p-choices').children[Number(e.key) - 1];
  if (b) b.click();
});
})();
