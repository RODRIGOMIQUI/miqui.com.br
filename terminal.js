(() => {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const out = $('#output');
  const screen = $('#screen');
  const input = $('#cmd');
  const form = $('#prompt');

  // ---------- Utilitários ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const link = (href, text = href) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
  const shot = (p) => `<img class="shot" src="${esc(p.image)}" alt="${esc(p.imageAlt || 'Tela do projeto ' + p.title)}" loading="lazy">`;
  const c = (cls, text) => `<span class="${cls}">${esc(text)}</span>`;
  const prompt = `<span class="p-user">${esc(S.handle)}@${esc(S.host)}</span>:<span class="p-path">~</span>$`;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sem storage */ } },
  };

  function print(html = '', cls = '') {
    const div = document.createElement('div');
    div.className = `line ${cls}`;
    div.innerHTML = html;
    out.appendChild(div);
  }

  const scrollDown = () => { screen.scrollTop = screen.scrollHeight; };

  // ---------- Conteúdo ----------
  const ASCII = String.raw`           _             _
 _ __ ___ (_) __ _ _   _(_)
| '_ ' _ \| |/ _' | | | | |
| | | | | | | (_| | |_| | |
|_| |_| |_|_|\__, |\__,_|_|
                |_|`;

  const CAR = String.raw`      ______
  ___/__|__\____
 |  _       _   |-
 '-(_)-----(_)--'`;

  const files = {
    'sobre.txt': () => cmds.sobre(),
    'experiencia.md': () => cmds.experiencia(),
    'formacao.md': () => cmds.formacao(),
    'skills.json': () => cmds.skills(),
    'contato.txt': () => cmds.contato(),
    'now.md': () => cmds.now(),
  };

  const cmds = {
    help() {
      const list = [
        ['sobre', 'quem sou eu'],
        ['projetos [n]', 'lista projetos; "projetos 1" mostra detalhes'],
        ['experiencia', 'trajetória profissional'],
        ['formacao', 'formação acadêmica'],
        ['skills', 'tecnologias que uso'],
        ['now', 'no que estou focado agora'],
        ['contato', 'como falar comigo'],
        ['ls / cat <arquivo>', 'navegue como num shell de verdade'],
        ['neofetch', 'resumo do sistema (eu)'],
        ['garagem', 'vroom'],
        ['tema', 'alterna verde / âmbar'],
        ['simples', 'versão sem terminal'],
        ['clear', 'limpa a tela'],
      ];
      print(c('c-muted', 'Comandos disponíveis:'));
      print(`<div class="grid">${list.map(([k, v]) => `${c('c-accent b', k)}<span class="c-muted">${esc(v)}</span>`).join('')}</div>`);
      print(c('c-muted', '\nDica: use Tab para completar e ↑/↓ para o histórico.'));
    },

    whoami() { print(`${c('b', S.name)} ${c('c-muted', '·')} ${esc(S.role)}`); },

    sobre() {
      print(`${c('c-accent b', S.name)} ${c('c-muted', `· ${S.role} · ${S.location}`)}`);
      print(esc(S.tagline), 'c-yellow');
      S.about.forEach((p) => print('\n' + esc(p)));
    },

    projetos(n) {
      if (n) {
        const p = S.projects[Number(n) - 1];
        if (!p) return print(c('c-red', `projeto ${n} não existe. Use 1 a ${S.projects.length}.`));
        print(c('c-accent b', p.title));
        print(esc(p.desc));
        print(`${c('c-muted', 'stack:')} ${esc(p.stack.join(', '))}`);
        if (p.url) print(`${c('c-muted', 'link:')}  ${link(p.url)}`);
        if (p.repo) print(`${c('c-muted', 'código:')} ${link(p.repo)}`);
        if (p.image) {
          print(shot(p));
          // a imagem carrega depois do print: rola de novo para ela ficar visível
          out.lastElementChild.querySelector('img').addEventListener('load', scrollDown);
        }
        return;
      }
      print(`<div class="grid">${S.projects.map((p, i) =>
        `${c('c-yellow', `[${i + 1}] ${p.name}`)}<span>${esc(p.desc)}</span>`).join('')}</div>`);
      print(c('c-muted', '\nDigite "projetos <número>" para ver detalhes.'));
    },

    experiencia() {
      if (S.since) print(c('c-muted', `Desenvolvendo desde ${S.since} (${new Date().getFullYear() - S.since} anos de estrada)\n`));
      S.experience.forEach((e, i) => {
        const head = e.role ? `${c('c-accent b', e.role)} ${c('c-muted', '@')} ${c('c-blue', e.company)}` : `${c('c-accent', '▸')} ${c('c-blue b', e.company)}`;
        print(`${i ? '\n' : ''}${head}${e.period ? '  ' + c('c-muted', e.period) : ''}`);
        if (e.desc) print(esc(e.desc));
      });
      if (S.cv) print(`\n${c('c-muted', 'CV completo:')} ${link(S.cv, 'baixar PDF')}`);
    },

    formacao() {
      S.education.forEach((e, i) => {
        print(`${i ? '\n' : ''}${c('c-accent b', e.course)}  ${c('c-muted', e.period)}`);
        print(esc(e.school), 'c-blue');
      });
    },

    skills() {
      const entries = Object.entries(S.skills);
      print('{');
      entries.forEach(([k, v], i) => {
        const vals = v.map((x) => c('c-yellow', `"${x}"`)).join(', ');
        print(`  ${c('c-blue', `"${k}"`)}: [${vals}]${i < entries.length - 1 ? ',' : ''}`);
      });
      print('}');
    },

    now() { S.now.forEach((x) => print(`${c('c-accent', '▸')} ${esc(x)}`)); },

    contato() {
      const { email, github, linkedin } = S.contact;
      print(`<div class="grid">${c('c-muted', 'email')}${link('mailto:' + email, email)}${github ? c('c-muted', 'github') + link(github) : ''}${c('c-muted', 'linkedin')}${link(linkedin)}</div>`);
    },

    ls(arg) {
      if (arg && arg.replace(/\/$/, '') === 'projetos') {
        return print(S.projects.map((p) => c('c-blue', p.name + '/')).join('  '));
      }
      print([c('c-blue b', 'projetos/'), ...Object.keys(files).map(esc)].join('  '));
    },

    cat(file) {
      if (!file) return print(c('c-red', 'uso: cat <arquivo>'));
      if (files[file]) return files[file]();
      if (file.startsWith('projetos')) return print(c('c-red', `cat: ${file}: É um diretório. Tente "projetos".`));
      print(c('c-red', `cat: ${file}: Arquivo ou diretório inexistente`));
    },

    cd(dir) {
      if (!dir || dir === '~') return;
      if (dir.replace(/\/$/, '') === 'projetos') return cmds.projetos();
      print(c('c-red', `cd: ${dir}: Arquivo ou diretório inexistente`));
    },

    neofetch() {
      const info = [
        [`${S.handle}@${S.host}`, ''],
        ['-'.repeat(`${S.handle}@${S.host}`.length), ''],
        ['Nome', S.name],
        ['Função', S.role],
        ['Local', S.location],
        ['Uptime', S.since ? `${new Date().getFullYear() - S.since} anos (desde ${S.since})` : ''],
        ['Stack', Object.values(S.skills).flat().slice(0, 4).join(', ')],
        ['Projetos', String(S.projects.length)],
        ['Shell', 'miqui-sh 1.0'],
      ];
      const right = info.map(([k, v]) => v ? `${c('c-accent b', k)}: ${esc(v)}` : c('c-accent b', k)).join('\n');
      print(`<div class="neofetch"><div class="ascii">${esc(ASCII)}</div><div>${right}</div></div>`);
    },

    garagem() {
      print(`<div class="ascii">${esc(CAR)}</div>`);
      print(esc(S.hotwheels || 'Vroom!'), 'c-yellow');
    },

    tema() {
      const amber = document.body.classList.toggle('theme-ambar');
      store.set('tema', amber ? 'ambar' : 'verde');
      print(c('c-muted', `tema: ${amber ? 'âmbar' : 'verde'}`));
    },

    simples() { setMode('gui'); },

    clear() { out.innerHTML = ''; },

    historico() { history.forEach((h, i) => print(`${c('c-muted', String(i + 1).padStart(4))}  ${esc(h)}`)); },

    pwd() { print(`/home/${esc(S.handle)}`); },
    date() { print(esc(new Date().toLocaleString('pt-BR'))); },
    echo(...args) { print(esc(args.join(' '))); },
    sudo() { print(c('c-red', `${S.handle} não está no arquivo sudoers. Este incidente será reportado. 😉`)); },
    rm() { print(c('c-yellow', 'Boa tentativa. Nada foi apagado.')); },
    exit() { print(c('c-muted', 'Não há saída. Mas você pode me mandar um e-mail: digite "contato".')); },
    vim() { print(c('c-muted', 'Você entrou no vim. Para sair... brincadeira, aqui não precisa de :q!')); },
  };

  // Apelidos (inclusive em inglês)
  const aliases = {
    about: 'sobre', projects: 'projetos', experience: 'experiencia', 'experiência': 'experiencia',
    contact: 'contato', 'formação': 'formacao', education: 'formacao', ajuda: 'help', '?': 'help', history: 'historico', theme: 'tema',
    gui: 'simples', cls: 'clear', hotwheels: 'garagem', carros: 'garagem', banner: 'neofetch', dir: 'ls', nano: 'vim',
  };

  // ---------- Execução ----------
  const history = [];
  let hIndex = 0;

  function run(raw, { record = true } = {}) {
    const line = raw.trim();
    print(`${prompt} ${esc(line)}`, 'echo');
    if (line && record) { history.push(line); }
    hIndex = history.length;
    if (line) {
      const [name, ...args] = line.split(/\s+/);
      const key = aliases[name.toLowerCase()] || name.toLowerCase();
      const fn = cmds[key];
      if (fn) fn(...args);
      else print(`${c('c-red', `comando não encontrado: ${name}`)}. Digite ${c('c-accent', 'help')} para ver as opções.`);
    }
    scrollDown();
  }

  function submit() {
    run(input.value);
    input.value = '';
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); submit(); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      hIndex = Math.max(0, Math.min(history.length, hIndex + (e.key === 'ArrowUp' ? -1 : 1)));
      input.value = history[hIndex] ?? '';
      requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      complete();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      cmds.clear();
    }
  });

  function complete() {
    const parts = input.value.split(/\s+/);
    const isArg = parts.length > 1;
    const word = parts[parts.length - 1];
    const pool = isArg ? [...Object.keys(files), 'projetos/'] : Object.keys(cmds);
    const matches = pool.filter((x) => x.startsWith(word));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      input.value = parts.join(' ') + (isArg ? '' : ' ');
    } else if (matches.length > 1) {
      print(`${prompt} ${esc(input.value)}`, 'echo');
      print(matches.map(esc).join('  '), 'c-muted');
      scrollDown();
    }
  }

  // Clicar no terminal foca o input, sem atrapalhar seleção de texto ou links
  screen.addEventListener('click', (e) => {
    if (e.target.closest('a') || String(window.getSelection())) return;
    input.focus({ preventScroll: true });
  });

  // Atalhos clicáveis (úteis no celular)
  const chips = ['help', 'sobre', 'projetos', 'experiencia', 'skills', 'contato'];
  $('#chips').innerHTML = chips.map((x) => `<button type="button" data-cmd="${x}">${x}</button>`).join('');
  $('#chips').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) { run(b.dataset.cmd); input.focus({ preventScroll: true }); }
  });

  // ---------- Modo simples ----------
  function renderGui() {
    const { email, github, linkedin } = S.contact;
    $('#gui').innerHTML = `
      <header>
        <div>
          <h1>${esc(S.name)}</h1>
          <p class="role">${esc(S.role)} · ${esc(S.location)}</p>
        </div>
        <button type="button" class="switch" data-mode="term">&gt;_ modo terminal</button>
      </header>
      <p class="c-yellow">${esc(S.tagline)}</p>
      <h2>sobre</h2>
      ${S.about.map((p) => `<p>${esc(p)}</p>`).join('')}
      <h2>projetos</h2>
      ${S.projects.map((p) => `
        <div class="card">
          <h3>${p.url || p.repo ? link(p.url || p.repo, p.title) : esc(p.title)}</h3>
          <p>${esc(p.desc)}</p>
          ${p.image ? shot(p) : ''}
          <div class="tags">${esc(p.stack.join(' · '))}</div>
          ${p.repo ? `<div class="tags">código: ${link(p.repo, p.repo.replace(/^https:\/\//, ''))}</div>` : ''}
        </div>`).join('')}
      <h2>experiência</h2>
      ${S.since ? `<p class="c-muted">Desenvolvendo desde ${S.since}.</p>` : ''}
      ${S.experience.map((e) => `
        <div class="card">
          <h3>${e.role ? `${esc(e.role)} <span class="c-muted">@ ${esc(e.company)}</span>` : esc(e.company)}</h3>
          ${e.period ? `<div class="tags">${esc(e.period)}</div>` : ''}
          ${e.desc ? `<p>${esc(e.desc)}</p>` : ''}
        </div>`).join('')}
      ${S.cv ? `<p>${link(S.cv, 'Baixar CV em PDF')}</p>` : ''}
      <h2>formação</h2>
      ${S.education.map((e) => `
        <div class="card">
          <h3>${esc(e.course)}</h3>
          <div class="tags">${esc(e.school)} · ${esc(e.period)}</div>
        </div>`).join('')}
      <h2>skills</h2>
      <ul>${Object.entries(S.skills).map(([k, v]) => `<li><span class="c-blue">${esc(k)}:</span> ${esc(v.join(', '))}</li>`).join('')}</ul>
      <h2>agora</h2>
      <ul>${S.now.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <h2>contato</h2>
      <ul>
        <li>${link('mailto:' + email, email)}</li>
        ${github ? `<li>${link(github, 'GitHub')}</li>` : ''}
        <li>${link(linkedin, 'LinkedIn')}</li>
      </ul>
      <footer>© ${new Date().getFullYear()} ${esc(S.name)} · ${esc(S.host)}</footer>`;
  }

  function setMode(mode) {
    const gui = mode === 'gui';
    if (gui && !$('#gui').innerHTML) renderGui();
    $('#terminal').hidden = gui;
    $('#gui').hidden = !gui;
    store.set('modo', mode);
    if (gui) window.scrollTo(0, 0);
    else input.focus({ preventScroll: true });
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-mode]');
    if (b) setMode(b.dataset.mode);
  });

  // ---------- Inicialização ----------
  $('label[for="cmd"]').innerHTML = prompt;
  if (store.get('tema') === 'ambar') document.body.classList.add('theme-ambar');

  print(`<div class="ascii">${esc(ASCII)}</div>`);
  print(`\nBem-vindo(a)! Sou ${c('c-accent b', S.name)}, ${esc(S.role.toLowerCase())}.`);
  print(`Digite ${c('c-accent', 'help')} para começar ou clique nos atalhos abaixo.`);
  print(c('c-muted', 'Prefere algo tradicional? Use o botão "modo simples".'));

  if (location.hash === '#simples' || store.get('modo') === 'gui') setMode('gui');
  else input.focus({ preventScroll: true });
})();
