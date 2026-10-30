// Todo o conteúdo do site fica aqui. Edite à vontade: o terminal e o modo simples
// são gerados a partir deste objeto. Itens marcados com TODO são exemplos.
window.SITE = {
  handle: 'miqui',
  host: 'miqui.com.br',
  name: 'Rodrigo Miqui',
  role: 'Desenvolvedor Fullstack',
  location: 'Florianópolis / SC',
  since: 1996,
  tagline: 'Desenvolvendo software desde 1996, do back-end à interface.',

  about: [
    'Sou desenvolvedor fullstack desde 1996, com passagens por empresas como IBM, Banco Itaú, C&A, Diário Popular e Philips.',
    'Nessas três décadas acompanhei a web nascer e mudar várias vezes, e sigo construindo sistemas de ponta a ponta.',
    'Fora do código: pai do JP e colecionador de Hot Wheels.',
  ],

  skills: {
    backend: ['.NET', 'C#', 'ASP.NET', 'Node.js'],
    frontend: ['TypeScript', 'Angular', 'React'],
    dados: ['SQL Server', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Cosmos DB'],
    cloud: ['Azure', 'Azure DevOps', 'CI/CD'],
    testes: ['xUnit', 'Cypress'],
    ia: ['LLMs', 'IA aplicada'],
  },

  projects: [
    {
      name: 'zona-azul-digital',
      title: 'Zona Azul Digital',
      desc: 'Desenvolvimento e sustentação do ecossistema de estacionamento rotativo digital da Estapar.',
      stack: ['.NET C#', 'Angular', 'SQL Server'],
    },
    {
      name: 'plataforma-imobiliaria-eua',
      title: 'Plataforma imobiliária (EUA)',
      desc: 'Sistema robusto e escalável para uma grande empresa do setor imobiliário nos Estados Unidos, com app mobile multiplataforma.',
      stack: ['React', 'TypeScript', '.NET C#', 'PostgreSQL', 'Azure', 'xUnit', 'Cypress', 'Flutter'],
    },
    {
      name: 'tesouraria-seguros',
      title: 'Tesouraria para seguradoras',
      desc: 'Aplicações de tesouraria que automatizaram processos financeiros, reduziram erros operacionais e integraram sistemas corporativos.',
      stack: ['ASP.NET', 'VB.NET', 'SQL Server', 'JavaScript'],
    },
    {
      name: 'miqui.com.br',
      title: 'Este site',
      desc: 'Portfólio em formato de terminal, sem framework e sem dependências.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://miqui.com.br',
    },
  ],

  experience: [
    { period: 'out 2025 — atual', role: 'Engenheiro de Software', company: 'Estapar', desc: 'Desenvolvimento e sustentação do ecossistema Zona Azul Digital, com .NET C#, Angular e SQL Server.' },
    { period: 'nov 2018 — jul 2025', role: 'Desenvolvedor Full Stack Sênior', company: 'Tech6 Group', desc: 'Plataforma para uma grande imobiliária dos EUA: React e TypeScript no front, .NET C# e PostgreSQL no back, Azure com CI/CD, testes com xUnit e Cypress e app mobile em Flutter.' },
    { period: 'out 2013 — ago 2018', role: 'Desenvolvedor de Software Sênior', company: 'ITG', desc: 'Sistemas de tesouraria para seguradoras, automatizando processos financeiros com ASP.NET, VB.NET e SQL Server.' },
    { period: 'ago 2008 — out 2013', role: 'Engenheiro de Software', company: 'Simplex Brasil', desc: 'Sistemas para laboratórios farmacêuticos com .NET C#, PHP e SQL.' },
    { period: 'jan 2003 — ago 2008', role: 'Analista de Sistemas / Programador', company: 'Philips', desc: 'Desenvolvimento e administração de aplicações web.' },
    { period: 'jul 2000 — dez 2002', role: 'Analista de Sistemas / Programador', company: 'Banco Itaú' },
    { period: 'abr 1998 — jun 2000', role: 'Analista de Suporte', company: 'IBM' },
    // Passagens curtas no início da carreira; o nome da empresa é o que importa
    { role: 'Suporte', company: 'C&A' },
    { role: 'Suporte', company: 'Diário Popular' },
  ],

  // Easter egg: comando `garagem`
  hotwheels: 'Colecionador de Hot Wheels nas horas vagas.',

  education: [
    { period: '2000', course: 'Pós-graduação, Internet Consultant', school: 'Faculdades Associadas de São Paulo' },
    { period: '1997 — 1999', course: 'Tecnólogo em Processamento de Dados', school: 'Universidade Presbiteriana Mackenzie' },
  ],

  now: [
    'Usando IA nas tarefas do dia a dia de desenvolvimento',
    'Construindo este site com ajuda de IA',
  ],

  contact: {
    email: 'rodrigo@miqui.com.br',
    github: 'https://github.com/RODRIGOMIQUI',
    linkedin: 'https://www.linkedin.com/in/rodrigomiqui',
  },

  cv: '', // TODO: caminho de um PDF, ex.: 'cv.pdf'
};
