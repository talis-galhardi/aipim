"""Conteúdo dos tutoriais em português (pt-BR), com a mesma estrutura de tools/tutorials_content.py.
tools/build_tutorials.py gera três arquivos: docs/pt-br/tutorials-designers.md, docs/pt-br/tutorials-developers.md e
docs/pt-br/tutorials-ai.md. A página 'Tutorials' do Figma (uma folha para cada) tem o mesmo texto: mude nos dois lugares,
e mude também a versão em inglês."""

# Os textos fixos do gerador.
LABELS = {
    'tutorial_of': 'Tutorial {n} de 3',
    'choose': 'Escolha o seu tutorial',
    'table_head': '| Tutorial | Para | Onde | Arquivo |',
    'here': ' (você está aqui)',
    'fit': 'Onde isto se encaixa',
    'stage_head': '| Etapa | Nome | Onde é tratada |',
    'this_tutorial': 'Este tutorial',
    'six_steps': 'Os seis passos',
    'need': 'Você precisa de',
    'have': 'Você vai ter',
    'step': 'Passo',
    'done': 'Pronto quando',
    'final': 'Checagem final',
    'final_intro': 'Marque cada linha antes de seguir.',
    'keep': 'Tenha isto por perto',
    'names': 'Os mesmos nomes em todo lugar',
    'names_head': '| No Figma | No código |',
    'ask': 'Precisa de algo novo? Pergunte nesta ordem',
}

INTRO = ('Três tutoriais curtos, um para cada jeito de trabalhar com o Aipim. Cada um tem seis passos. '
         'Faça os passos em ordem e marque a checagem final antes de seguir.')

# (número, título, público, onde, arquivo)
PATHS = [
    (1, 'Desenhe uma tela', 'Designers', 'No Figma', 'tutorials-designers'),
    (2, 'Construa o frame', 'Desenvolvedores', 'Em HTML e CSS', 'tutorials-developers'),
    (3, 'Construa com um agente', 'IA', 'Com qualquer agente de código', 'tutorials-ai'),
]
HEADINGS = {1: 'Tutorial para designers', 2: 'Tutorial para desenvolvedores', 3: 'Tutorial para agentes de IA'}

CHOOSE_INTRO = 'Cada tutorial tem seis passos. Escolha o do seu jeito de trabalhar e volte aos outros quando precisar deles.'
FIT_INTRO = ('O fluxo tem seis etapas. O tutorial de design cobre as quatro primeiras, e os de desenvolvimento e de IA '
             'cobrem as duas últimas. O time inteiro participa da revisão e da entrega.')
FIT = {  # por tutorial: o que a pessoa faz em cada etapa, e os passos que cobrem cada uma
    1: dict(lead='Você conduz as etapas 1, 2 e 4: enquadrar o problema, desenhar com o sistema e entregar para o desenvolvimento. Na etapa 3, a revisão, você participa.',
            steps={1: 'Passo 2', 2: 'Passos 3 a 5', 4: 'Passo 6'}),
    2: dict(lead='Você conduz a etapa 5, a construção. Também participa da revisão (etapa 3) e da entrega (etapa 6).',
            steps={5: 'Passos 1 a 5', 6: 'Passo 6'}),
    3: dict(lead='O agente trabalha na etapa 5, a construção. Você revisa o trabalho dele e decide, e o time entra na etapa 6.',
            steps={5: 'Passos 1 a 4', 6: 'Passos 5 e 6'}),
}
STAGES = [  # (etapa, nome, onde é tratada)
    (1, 'Enquadrar', 'Tutorial 1, passo 2'),
    (2, 'Desenhar', 'Tutorial 1, passos 3 a 5'),
    (3, 'Revisar', 'O time inteiro'),
    (4, 'Entregar para o dev', 'Tutorial 1, passo 6'),
    (5, 'Construir', 'Tutorial 2 ou 3'),
    (6, 'Verificar e publicar', 'Tutoriais 2 e 3, depois o time'),
]
STAKEHOLDERS = ('Se você é stakeholder, não precisa de tutorial. Você escreve o brief com o designer (etapa 1), '
                'revisa no arquivo do Figma e não em slides (etapa 3), e aceita o resultado comparando com o brief (etapa 6).')

# code = (rótulo, linguagem, texto)
TUTORIALS = [
 dict(n=1, audience='Designers', title='Desenhe uma tela',
  lead='Você vai transformar um brief curto numa tela feita só de peças do Aipim e entregá-la a um desenvolvedor que não vai ter nenhuma dúvida básica.',
  need=['O arquivo Aipim DS no Figma', 'Uma ideia de para quem é a tela', 'Um desenvolvedor ou um agente de IA para construí-la'],
  have=['Um brief de uma página', 'Uma tela no claro e no escuro, com todos os estados', 'Um frame marcado como Ready for dev'],
  steps=[
   ('Abra o arquivo e encontre as peças',
    'Abra o Aipim DS no Figma. A página Visão geral dos componentes lista todas as peças, agrupadas em Átomos, Moléculas e Organismos. A página Padrões e telas mostra telas inteiras para você partir delas.',
    None, 'você consegue citar dois componentes que vai usar.'),
   ('Escreva o brief',
    'Quatro linhas, com as suas palavras. Para quem é? O que muda para essas pessoas? Como você vai saber que funcionou? E o que te limita: plataforma, prazo, acessibilidade. Combine o brief com o stakeholder antes de desenhar.',
    None, 'o stakeholder diz que o brief está certo.'),
   ('Parta do que já existe',
    'Pergunte primeiro: um componente ou um padrão já resolve isso? Use. Uma mudança pequena resolveria, como uma variante nova? Proponha. Peça um componente novo só quando ele for necessário em mais de um lugar.',
    None, 'você tem uma lista de peças e nenhum desenho feito à mão.'),
   ('Monte com instâncias e variáveis',
    'Arraste os componentes da biblioteca (página Components) para o seu frame e mantenha-os como instâncias. Nunca dê detach. Para cor, espaço, raio e texto, escolha variáveis e estilos de texto. Nunca digite um hex nem um número solto.',
    None, 'cada camada vem do sistema.'),
   ('Desenhe todos os estados, no claro e no escuro',
    'Mostre a tela vazia, carregando, com erro e com sucesso, e inclua um caso de texto longo. Depois mude o frame para o modo Dark e olhe de novo. Escreva como uma pessoa, com calor e sem rodeio. Um erro diz o que aconteceu e o que fazer, e um botão começa com verbo.',
    None, 'os dois temas estão certos e nenhum texto foi cortado.'),
   ('Entregue para o desenvolvimento',
    'Marque o frame como Ready for dev e coloque o link no ticket. Liste os componentes que usou: o nome no Figma é o nome da classe, então Button vira aipim-button. Aponte o que é personalizado e anote o comportamento, a ordem de foco e os rótulos.',
    None, 'um desenvolvedor consegue começar sem fazer perguntas básicas.'),
  ],
  check=['Só componentes da biblioteca, nenhuma instância com detach', 'Só variáveis, nenhuma cor ou medida solta', 'Claro e escuro conferidos',
         'Todos os estados e um caso de texto longo desenhados', 'O texto segue a voz do Aipim: caloroso e direto', 'Ordem de foco e rótulos anotados']),

 dict(n=2, audience='Desenvolvedores', title='Construa o frame',
  lead='Você vai pegar um frame marcado como Ready for dev e construí-lo em HTML e CSS, usando o Aipim como ele é.',
  need=['Um frame marcado como Ready for dev', 'Um projeto web, em qualquer stack', 'O Aipim, pelo npm ou pelo GitHub'],
  have=['Um pull request que bate com o frame', 'Uma tela que funciona no claro e no escuro, pelo teclado e com zoom de 200%'],
  steps=[
   ('Coloque o Aipim no projeto',
    'Instale o pacote pelo npm ou copie a pasta do GitHub. Tudo o que você precisa fica em node_modules/aipim-ds.',
    ('Terminal', 'bash', 'npm install aipim-ds'),
    'as pastas tokens/build/css e components/web existem no pacote.'),
   ('Carregue as fontes, os tokens e os componentes',
    'Coloque estas linhas no head da página, nesta ordem. Os componentes leem os tokens, então os tokens vêm primeiro. O script é opcional: ele cuida das teclas das abas, dos botões de dispensar e dos comandos de diálogo. Depois defina as cores da página, o fundo com --aipim-bg-canvas e o texto com --aipim-text-primary.',
    ('No head da página', 'html',
     '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@600;700&family=Karla:wght@400;700&display=swap">\n'
     '<link rel="stylesheet" href="node_modules/aipim-ds/tokens/build/css/aipim.css">\n'
     '<link rel="stylesheet" href="node_modules/aipim-ds/components/web/aipim-components.css">\n'
     '<script src="node_modules/aipim-ds/components/web/aipim.js"></script>'),
    'a página tem o fundo do Aipim e o texto em Karla.'),
   ('Leia o frame e as especificações',
    'Abra o frame e leia a nota de entrega. Para cada componente da lista, abra a especificação dele em docs/pt-br/components, como button.md. A especificação tem a marcação, os estados e as notas de acessibilidade.',
    None, 'você conhece cada componente e os estados dele.'),
   ('Copie a marcação e use só tokens',
    'Copie a marcação da especificação. Use elementos nativos: button para ações, a para links, input com um label de verdade. Para cor e espaço, use as variáveis --aipim-*. Nunca escreva um hex.',
    ('Marcação da especificação', 'html', '<button class="aipim-button" type="button">Salvar alterações</button>'),
    'não há nenhum hex no seu código.'),
   ('Personalize pelas variáveis',
    'Precisa de outro tamanho ou de outra cor? Mude as variáveis do próprio componente, como --aipim-button-height. Nunca use !important e nunca reescreva o CSS do componente.',
    ('No seu CSS', 'css', '.toolbar .aipim-button { --aipim-button-height: var(--aipim-size-control-lg); }'),
    'a mudança está nas variáveis e o CSS do componente ficou intacto.'),
   ('Teste e abra o pull request',
    'Teste o claro e o escuro colocando data-theme="dark" no elemento html. Depois use só o teclado: todo controle precisa ser alcançável e mostrar o anel de foco. Dê zoom de 200% e rode uma checagem automática, como o axe. Abra o pull request com o link do frame do Figma.',
    ('Tema escuro', 'html', '<html data-theme="dark">'),
    'as checagens passam e o pull request tem o link do frame.'),
  ],
  check=['Só variáveis --aipim-*, nenhum hex', 'Elementos nativos, anel de foco visível e rótulo em todo controle',
         'Tudo funciona só com o teclado, e o zoom de 200% não quebra o layout', 'Claro, escuro e movimento reduzido conferidos', 'O pull request tem o link do frame do Figma']),

 dict(n=3, audience='IA', title='Construa com um agente',
  lead='Você vai passar um brief para um agente de código com IA, para ele construir com o Aipim, e revisar o trabalho dele antes de publicar. O agente constrói. Quem decide e revisa são as pessoas.',
  need=['Um agente de código com IA que consiga ler os arquivos do projeto', 'O Aipim no projeto (tutorial 2, passo 1)', 'O brief e o link do Figma (tutorial 1)'],
  have=['Uma tela feita só de peças do Aipim', 'Uma mudança revisada, em que você pode confiar'],
  steps=[
   ('Deixe o Aipim ao alcance do agente',
    'Instale o Aipim no projeto. O pacote traz o AGENTS.md, o arquivo que ensina um agente a construir com o Aipim. Muitos agentes leem esse arquivo sozinhos. Se o seu não lê, copie o arquivo para a raiz do projeto.',
    ('Terminal', 'bash', 'cp node_modules/aipim-ds/AGENTS.md .'), 'o agente consegue abrir o AGENTS.md.'),
   ('Entregue três coisas a ele',
    'O brief, o link do Figma e o AGENTS.md. Se o seu agente trabalha melhor com um arquivo só, passe o llms-full.txt, que tem o sistema inteiro num lugar. O llms.txt é o índice curto.',
    None, 'as três coisas estão no projeto ou na conversa.'),
   ('Peça um plano primeiro',
    'Não deixe o agente escrever código ainda. Um plano custa um minuto e pega desvios cedo.',
    ('Prompt', 'text', 'Leia o AGENTS.md. Aqui estão o brief e o frame do Figma: [cole os dois]. Antes de escrever código, liste os componentes do Aipim que você vai usar e o que não se encaixa no sistema.'),
    'você leu o plano e concorda com ele.'),
   ('Peça a construção, com as regras',
    'Diga as regras em voz alta, mesmo que o AGENTS.md já tenha todas. Curto e específico funciona melhor que longo e vago.',
    ('Prompt', 'text', 'Construa a tela só com componentes do Aipim e tokens --aipim-*. Leia a especificação de cada componente que usar. Nada de hex, nada de !important, elementos nativos e anel de foco visível. Depois rode as checagens do AGENTS.md, na seção Verify, e me diga o que elas mostraram.'),
    'o agente diz quais checagens rodou e o que elas mostraram.'),
   ('Revise como um pull request',
    'Não confie de olhos fechados. Abra o diff e a tela, e procure hex e !important. Confira se todo campo tem label e se todo botão só com ícone tem aria-label. Teste com o teclado, no claro e no escuro.',
    None, 'você conseguiria explicar cada mudança do diff.'),
   ('Corrija com um retorno específico',
    'Diga o arquivo, a linha e a regra, e peça para o agente rodar as checagens de novo. Quando passar na sua revisão, abra o pull request com o link do frame do Figma.',
    ('Prompt', 'text', 'A linha 24 de card.html usa #ffffff. Troque por var(--aipim-bg-surface) e rode as checagens de novo.'),
    'uma pessoa aprovou o pull request.'),
  ],
  check=['O agente recebeu o brief, o link do Figma e o AGENTS.md', 'Ele listou os componentes antes de escrever código',
         'Nenhum hex, nenhum !important, nenhuma cópia personalizada de componente', 'Todo controle funciona pelo teclado, no claro e no escuro',
         'Você leu o diff, e uma pessoa aprovou o pull request']),
]

KEEP_INTRO = ('Duas listas curtas que ajudam em todos os tutoriais: os mesmos nomes no Figma e no código, '
              'e o que fazer quando o sistema não tem a peça de que você precisa.')
NAMES = [  # (no Figma, no código)
    ('Componente Button', 'Classe aipim-button, e a especificação docs/pt-br/components/button.md'),
    ('Variável bg/surface', '--aipim-bg-surface'),
    ('Estilo de texto Aipim/h4', '--aipim-text-h4-*'),
    ('Ícone close', '#aipim-close em icons/sprite.svg'),
]
ASK = [
    'Um componente ou um padrão já resolve? Use.',
    'Uma mudança pequena resolve, como uma variante? Proponha.',
    'Vai ser preciso em mais de um lugar? Peça um componente novo.',
    'Só serve aqui? Construa no seu produto com os tokens do Aipim e deixe fora do sistema.',
]
STUCK = 'Travou? Levante a questão antes de construir uma versão própria.'

# O que as antigas páginas "Para desenvolvedores" e "Para IA" diziam, agora no fim do tutorial a que pertencem.
# Cada item: (título, abertura, [(sobretítulo, título, [itens])])
REFERENCE = {
 2: [
  ('Como o sistema é construído', 'Por que o Aipim funciona do jeito que funciona, e como ele confere a si mesmo.', [
    ('Decidido', 'Copiar o código ou instalar um pacote', ['Componentes: copiados para o projeto, então o código é de quem desenvolve', 'Tokens: os arquivos CSS e o pacote npm aipim-ds', 'Nenhum rastreamento escondido: as licenças pedem crédito e mais nada']),
    ('Uma fonte, muitos destinos', 'O tokens.json gera tudo', ['Variáveis CSS, Jetpack Compose, SwiftUI, um pacote de importação para o Figma e os docs de cor, tipo e espaço', 'Ferramenta: tools/build_tokens.py, que escreve o tokens.json no formato W3C 2025.10']),
    ('Checagem', 'Verificação automática', ['tools/build_tokens.py: checa contraste e daltonismo, e falha se um par falhar', 'tools/build_web.py --check: a folha de estilos dos componentes está em dia', 'tools/build_ai.py --check: llms.txt, llms-full.txt e AGENTS.md estão em dia', 'tools/build_tutorials.py --check: os tutoriais estão em dia']),
    ('Atalhos', 'Experimente agora', ['Abra components/web/examples/index.html: todos os componentes, com troca de claro e escuro', 'Copie um trecho da especificação de cada componente', 'Starters para Vite e Next chegam na v1.5'])]),
  ('Componentes web e o repositório', 'As convenções que todo componente segue, e onde fica cada coisa.', [
    ('Convenções', 'Sem amarra com framework', ['HTML e CSS', 'Só tokens semânticos, nunca valores soltos', 'Variáveis --aipim-* por componente como saída de emergência', 'Nada de !important']),
    ('Variantes e estados', 'Por classes e atributos ARIA', ['Por classes e atributos ARIA', 'Exemplo de uso e de personalização para cada componente']),
    ('Pastas', 'Estrutura do repositório', ['docs/, docs/en/components/ e docs/pt-br/components/', 'tokens/ (tokens.json e build/)', 'components/web/ e icons/', 'tools/ (geradores e checagens)', 'AGENTS.md, llms.txt e llms-full.txt'])]),
  ('Versões e plataformas', 'Como as atualizações chegam até você, e o que vem depois da web.', [
    ('Versões', 'Versionamento e atualização', ['Semver: major quebra, minor acrescenta, patch corrige', 'Changelog em cada versão']),
    ('Mudanças que quebram', 'Descontinuação e migração', ['Aviso de descontinuação antes de remover', 'Notas de migração passo a passo']),
    ('v1', 'Tokens nativos', ['Tema para Compose e SwiftUI gerado dos tokens, ainda não testado num app']),
    ('v2', 'Componentes nativos', ['Compose e SwiftUI, se a v1 ganhar tração'])]),
 ],
 3: [
  ('Como os docs são escritos', 'O objetivo é um agente que acerte de primeira.', [
    ('Objetivo', 'Um agente que acerte de primeira', ['O agente lê o Aipim e gera telas corretas e acessíveis sem ajuda humana', 'O terceiro público do Aipim, ao lado de designers e desenvolvedores']),
    ('Princípios', 'Como os docs são escritos', ['Uma fonte de verdade: o tokens.json', 'Regras explícitas, com valores concretos', 'Cada fato num lugar só', 'Exemplos testados', 'Arquivos curtos, com frontmatter'])]),
  ('O pacote em Markdown', 'Os arquivos que um agente lê, e o formato de uma especificação.', [
    ('Índices para LLMs', 'llms.txt e llms-full.txt', ['llms.txt: um índice curto, com um link e uma linha por documento', 'llms-full.txt: todos os documentos juntos, para colar inteiro no contexto', 'Gerados por tools/build_ai.py a partir das especificações em inglês']),
    ('Regras para agentes', 'AGENTS.md', ['O que é o Aipim, as 12 regras, a instalação, os padrões fáceis de errar e como verificar', 'Uma skill do Claude que diz quando e como aplicar o Aipim chega na v1.5']),
    ('Documentos de base', 'Fundamentos e especificações', ['Cor, tipografia, e espaço, forma e movimento: gerados do tokens.json', 'Uma especificação por componente, sempre com as mesmas seções', 'Padrões de fluxo chegam na v1.1']),
    ('Modelo', 'Especificação de componente em Markdown', ['Frontmatter: name, description, status, html, class, css, figma', 'Tokens usados, critérios WCAG, componentes relacionados', 'Seções fixas, sempre na mesma ordem: quando usar, quando não usar, variantes e props, estados, tokens usados, acessibilidade, exemplos de código, faça e não faça', 'Veja docs/pt-br/components/button.md para um exemplo real'])]),
  ('Use com o seu agente', 'Onde colocar os arquivos nas ferramentas mais usadas.', [
    ('Claude Code', 'Importe o AGENTS.md', ['Copie o AGENTS.md para o projeto e importe-o no CLAUDE.md com @AGENTS.md', 'Aponte o agente para o llms-full.txt quando ele precisar das especificações']),
    ('Cursor e Copilot', 'Leitura pela raiz', ['A maioria das ferramentas de agente lê o AGENTS.md na raiz do projeto', 'Se a sua não lê, aponte uma regra do editor para o arquivo']),
    ('Exemplos de prompt', 'O que pedir', ['“Construa uma tela de login com o Aipim”', '“Mude a cor da marca e valide o contraste”', '“Coloque um empty state nesta lista”'])]),
  ('O que vem a seguir, e uma ressalva', 'Planejado para a v1.5, e o que ainda não está garantido.', [
    ('Futuro · v1.5', 'Servidor MCP', ['Ferramentas: get_tokens, get_component(name), check_contrast(fg, bg)', 'O agente consulta em vez de adivinhar']),
    ('Diferencial · v1.5', 'Bateria de testes (evals)', ['Pedidos de teste e checagens automáticas: usa só tokens? passa no contraste? tem foco visível?', 'Publica o resultado: o quanto os agentes usam bem o Aipim']),
    ('Ressalva', 'O que ainda não está garantido', ['Nem toda ferramenta lê o llms.txt', 'O valor está no conjunto: docs estruturados, AGENTS.md, a skill, o MCP e os testes'])]),
 ],
}
KEEP_IN = (1, 2)  # os tutoriais que fecham com "Tenha isto por perto"
