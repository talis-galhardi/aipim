# Layout da documentação

Como uma página de componente é montada no arquivo do Aipim no Figma, para toda página ser lida do mesmo jeito e uma nova poder ser feita sem adivinhação. A referência é a seção do Button na página Átomos do arquivo, e as outras páginas de componente seguem esse modelo.

O arquivo do Figma está em português do Brasil. Páginas, linhas e textos estão em português; os nomes de componentes, variantes, propriedades e variáveis ficam em inglês, porque são os nomes do código.

## A página

- Um frame com **1640px de largura**, com auto layout numa coluna só: o masthead, nove linhas, a barra Prev next e o rodapé.
- O **masthead e o rodapé são escuros**. Eles usam as variáveis semânticas de sempre, com o modo Dark da coleção Semantic aplicado no frame, então não há cores escuras para manter.
- Todo o resto usa só as variáveis semânticas (claro e escuro). Nenhum valor solto.
- Cada componente é uma seção da página do arquivo, com o nome do componente. As seções ficam lado a lado, com 96px entre elas.

## O masthead

O masthead é o **Masthead do kit de documentação** (veja "O kit de documentação"), e não um frame desenhado em cada página.

- O logotipo à esquerda e o sobretítulo (`Componentes · <grupo>`) à direita.
- O nome do componente em Antonio, em maiúsculas, com 150px, numa linha, do mesmo tamanho em toda página. É a única coisa que grita na página.
- Embaixo dele, quatro fatos (Status, Grupo, Versão e Responsável) e dois chips de link: a especificação em Markdown no GitHub e o exemplo na web.
- A faixa de pétalas embaixo fica na cor Folha, a família dos componentes.

## As linhas

Nove linhas, sempre nesta ordem, mais uma opcional (Decisão). Uma linha que não se aplica fica de fora, e nunca vazia.

| Linha | O que vai nela |
|---|---|
| Visão geral | Quando usar e quando não usar, em duas colunas. A descrição de uma linha do componente fica embaixo do título. |
| Variantes | Os estilos, os tamanhos e as opções, cada um num palco. Uma lista curta embaixo do título diz o que varia. |
| Estados | Padrão, hover, foco, desativado e os outros, em palcos. Num componente com comportamento no tempo (toast, modal), a linha é a descrição desse comportamento. |
| Faça e não faça | Um faça e um não faça, cada um com a legenda e um ícone. O palco do não faça leva o tom de `error/bg`. |
| Decisão (opcional) | Só quando uma escolha de design pede explicação (o Text field explica por que o rótulo fica acima do campo). Vem depois do Faça e não faça, com o mesmo formato de título à esquerda e texto à direita. |
| Anatomia | Um desenho claro e um escuro com marcadores numerados, e a tabela das partes. |
| Medidas | Desenhos com as cotas, depois as tabelas de valores e de tokens. |
| Cor | Cada cor que o componente usa, com o valor nos dois temas. |
| Teclado e ARIA | Duas tabelas: a tecla ou a parte à esquerda, o que acontece ou o que fazer à direita. |
| Código e especificação | Uma tabela de conteúdo e link: a especificação em Markdown, o código web e o exemplo. |

Toda linha tem o mesmo formato:

- Uma linha de 1px em cima (`border/strong`), 80px de padding acima e abaixo, 64px nas laterais.
- O **nome à esquerda, numa coluna de 472px** (sobretítulo, depois o título no estilo h3). Embaixo do título vem uma descrição curta no estilo `body-sm` (em tópicos) ou, na Visão geral, uma frase de abertura.
- O **conteúdo à direita**, ocupando o resto (992px). Um espaço de 48px entre os dois.

O texto vem da especificação do componente em `docs/pt-br/components/` (a versão em inglês fica em `docs/en/components/`). Se a especificação muda, a página muda junto.

## Palcos

Um palco é a caixa onde o componente fica.

- Preenchimento `bg/surface`, uma linha de 1px em `border/subtle` e os cantos em `radius/lg`.
- **80px de padding acima e abaixo**, 48px nas laterais, e o conteúdo **centralizado nos dois sentidos**.
- Palcos lado a lado **dividem a altura do mais alto**: os mais baixos crescem, em vez de ficar pequenos.
- O palco escuro é o mesmo palco com o modo Dark aplicado.
- Se dois palcos não cabem lado a lado (um alert largo, um modal), eles se empilham, cada um na largura toda. Se um palco ainda não cabe, o conteúdo dele quebra para a próxima linha.

## Desenhos: anatomia e medidas

Os marcadores, os contornos pontilhados, as áreas de padding coloridas e as linhas de cota pertencem ao componente, e não ao palco.

- O componente e as anotações dele ficam em **um frame de auto layout** que abraça o componente, chamado "Component with annotations". O padding dele deixa espaço para as anotações.
- As anotações são filhas desse frame que **ignoram o layout** (posição absoluta) e ficam posicionadas em relação ao componente. O palco só centraliza o frame.
- Por isso, um desenho nunca sai do lugar quando o palco fica mais largo ou mais estreito.
- Os marcadores são pílulas numeradas, e as cotas usam as cores de erro para se destacar do componente. O número de um marcador bate com a linha da tabela das partes.

## Tabelas

- Uma tabela arredondada, com cabeçalho em `bg/surface` e uma linha de 1px entre as linhas. O texto quebra dentro da célula.
- **Divida uma tabela antes que ela lote.** Cor é uma tabela por variante. Medidas são agrupadas (tamanho e espaçamento, forma e tipografia, alvos de toque). Teclado e ARIA são duas tabelas.
- As colunas mantêm as proporções da especificação; a última ocupa a largura que sobra.

## Cards

Os cards ficam **dois por linha**. Três por linha é só para informação pequena: números, ou um ícone com um título de uma ou duas palavras e uma descrição curta (o catálogo de componentes, os padrões de fluxo, os temas de exemplo e os créditos).

Quando uma linha precisaria de três cards:

1. **Espalhe em quatro** (dois por dois), quando a informação pode ser dividida sem inventar nada: seis cards em duas linhas de três viram três linhas de dois.
2. **Junte dois em um**, quando dois cards andam juntos: um card com duas seções, uma linha fina entre elas, cada seção com o próprio rótulo pequeno e o próprio título. Escolha os dois mais curtos, para o card ao lado não ficar com um vazio grande.
3. **Se nenhum dos dois funcionar**, ponha dois na primeira linha e o terceiro na seguinte, **com a mesma largura dos outros**, alinhado à esquerda. Nunca estique o terceiro na linha inteira.

Cards que dividem uma linha dividem a altura dela. Quatro por linha é sempre dois por dois, e um card sozinho numa linha pode ocupar a largura toda.

## Links

Um link numa página de documentação começa com um ícone, nunca com um caractere de seta. O ícone diz aonde o link leva:

| Leva a | Ícone |
|---|---|
| Outra página do arquivo do Figma | Figma |
| Um arquivo ou uma pasta do repositório, ou o próprio repositório | GitHub |
| O pacote npm | npm |
| Uma skill do Claude | Claude |
| Um servidor MCP | MCP server |
| O Storybook | Storybook |
| Qualquer outro site | External link |

- O ícone pega a cor do texto do link e fica no começo da linha (20px ao lado do texto do corpo, 16px nos botões pequenos do masthead). Ele substitui o "→" e o "←" que vinham antes do rótulo, e o círculo que marcava uma lista de arquivos.
- Os ícones vêm do Hugeicons Free (MIT), o mesmo conjunto dos ícones do Aipim, com a mesma grade de 24px e o traço de 1,5px. O logo do Storybook é a exceção: o Hugeicons não tem, então ele foi desenhado para o Aipim nessa grade. Os sete estão no catálogo de ícones (External link em Navigation, e os seis logos de plataforma num grupo próprio, Platforms).
- Um link que ainda não existe mantém o ícone e diz "(em breve)" depois do rótulo.
- Uma faixa de valores numa especificação ("48 → 72px") não é link e fica escrita como está.

## Páginas de fundamentos

As páginas de fundamentos (Cor, Tipografia, Espaço, Layout, Forma, Elevação, Movimento, Toque e foco, Ícones, Ilustrações e Padronagens) usam o mesmo frame: o masthead escuro (grupo Fundamentos), linhas com o título à esquerda e o conteúdo à direita, e o rodapé escuro. Elas mudam em relação a uma página de componente nas linhas:

- A primeira linha é sempre a Visão geral, com a frase de abertura da página.
- Depois vem uma linha por assunto (na Cor: como a cor funciona, os primitivos, os papéis semânticos, no contexto e a acessibilidade das cores). Os blocos antigos (tabelas, rampas de amostras, linhas de tokens, cards) ficam à direita, ajustados à coluna de 992px.
- Uma página que passa de uns 6.000px é dividida (a antiga página de espaço, forma e movimento virou seis: Espaço, Layout, Forma, Elevação, Movimento, Toque e foco).
- No arquivo do Figma, as páginas ficam agrupadas em pares, como os componentes: **Espaço e layout**, **Forma e elevação**, **Movimento e toque** e **Ícones e ilustrações** (que também guarda **Padronagens**, como um terceiro frame de página) são uma página do Figma cada, com dois ou três frames de página lado a lado e sem um cabeçalho próprio: o masthead de cada frame é o cabeçalho. Cor e Tipografia têm uma página do Figma só para elas.
- Os cards seguem a regra de "Cards", acima.
- O sobretítulo de cada linha é o nome da página.

## Páginas de guia

As páginas de guia (Comece aqui, Sobre o Aipim, Tutoriais, Visão geral dos componentes, Padrões e telas, Temas e personalização, Roadmap e requisitos, Créditos e licenças e Changelog) usam o mesmo frame das outras, com o masthead escuro, linhas com o título à esquerda e o conteúdo à direita, e o rodapé escuro. Elas mudam em algumas coisas:

- O masthead mantém os fatos do antigo cabeçalho da página (por exemplo Status, Fonte de verdade, Versão e Responsável) nos quatro espaços, e as **pílulas de link** (o mapa do arquivo e os arquivos fora do Figma) ficam embaixo deles, ainda no masthead escuro.
- A frase de abertura da página é a primeira linha, a Visão geral.
- O masthead mostra um **nome curto** quando o nome da página é longo demais para o título de 270px numa linha: Componentes, Padrões, Temas, Desenvolvedores, Roadmap e Créditos. A página do Figma mantém o nome completo na lista de páginas.
- Os cards seguem a regra de "Cards", acima. As telas de celular de Padrões quebram em duas por linha.
- Os links que apontam para outra página de guia apontam para a seção dela, e continuam funcionando quando uma página é refeita.
- O **Comece aqui** é montado com o kit de documentação, na mesma grade das outras páginas. Abre com o Masthead (família Começo, faixa em urucum) e depois vêm faixas com o **Band header** (sobretítulo, título e abertura) na coluna de 472px e o conteúdo na coluna de 992px. Não há linha entre as faixas: elas alternam `bg/surface` e `bg/canvas`, sempre começando pela mais clara (`bg/surface`), porque o florão do Eyebrow já marca onde uma faixa começa. Numa faixa de superfície, os cards de grupo e a legenda de status usam `bg/canvas`, e numa faixa de canvas usam `bg/surface`, para continuarem visíveis; os Cards mantêm a superfície própria e se distinguem pela borda. A primeira faixa são três **Steps** (um Badge com o número, um título, um texto e um link). O mapa agrupa as páginas pelo que a pessoa quer fazer, e não pelo jeito como o arquivo é montado. Um grupo é um card de superfície com um Badge de ícone, um sobretítulo, um título e **Link rows** (o ícone do Figma, o nome da página como Link e uma linha que diz o que tem lá; uma página nunca aparece duas vezes), dois grupos por linha, com o grupo de mais links na largura toda. Os arquivos fora do Figma usam os mesmos grupos, com os ícones do GitHub, do npm e de link externo, e um **Link row soon** para o que ainda não existe. As notas de leitura são Cards (tom Surface), e a legenda de status é um card de superfície com Tags. A página termina com a barra Prev next (só a Próxima, porque é a primeira página) e o rodapé escuro.
- O **Sobre o Aipim** é uma página de documentação, e não uma landing page. Não tem hero, e é a única página em que cada faixa tem a própria composição em vez do mesmo frame de título à esquerda e conteúdo à direita. É montado com o kit: o Masthead (família Começo) e depois onze faixas que alternam `bg/surface` (a primeira) e `bg/canvas`, com 96px de padding. Cards são para coisas que se sustentam sozinhas, então aparecem só em duas faixas: os públicos, nos tons Primary, Secondary e Tertiary, e o roadmap, em Tertiary. Em todo o resto o conteúdo é aberto, com um fio em cima de cada item (`border/subtle`), um Badge e os estilos de texto. 1) Visão geral: o Band header e dois Buttons com os chips embaixo, ao lado de um painel (`bg/canvas`, `radius/2xl`) com quatro **Stats** em dois por dois. 2) Públicos: três Cards de tom na largura toda. 3) Por dentro: o cabeçalho de 472px e um índice de duas colunas com seis itens, cada um com um Badge de ícone, um título e uma linha. 4) Por quê: três colunas abertas, cada uma com um Badge de número, um título em `Aipim/h3` e um texto, e um painel com as duas listas lado a lado. 5) Princípios: o cabeçalho de 472px e seis linhas, cada uma com um Badge de número e o título à esquerda, e os pontos e uma linha Por quê em negrito à direita. 6) Nome: a foto da mandioca à esquerda (metade da largura), e o cabeçalho e três pontos à direita. 7) Como nasceu: o cabeçalho e uma linha do tempo vertical (data, ponto numa linha, título e texto) à esquerda, e a foto do caderno à direita. 8) Feito no Brasil: os quatro cards de cor juntos numa faixa, as três padronagens e o Card do roadmap. 9) Licenças: o cabeçalho de 472px e uma tabela com a licença em `Aipim/h2` e o que ela cobre, e depois a linha de crédito. 10) Opinião: o cabeçalho com um Button outline, e duas listas abertas. 11) Por onde começar: um painel `bg/sunken` com o cabeçalho à esquerda e os Buttons e o Code block à direita. As colunas seguem a grade de 12 colunas da largura de conteúdo de 1512px (espaço de 48): 4 colunas são 472px, 8 são 992px e 6 são 732px. A página termina com a barra Prev next (Comece aqui antes, Identidade da marca depois) e o rodapé escuro.
- A **Identidade da marca** são cinco folhas lado a lado, com oito seções e nenhuma fotografia. 1) Conceito: o masthead, uma abertura com o índice das oito seções, as duas notas com as referências, a atmosfera e os quatro pilares. 2) Logo: o logotipo e por que ele é assim, as versões e os pares mais fortes, como usar (área de proteção, tamanho mínimo, com o símbolo, o que não fazer) e o símbolo. 3) Cor e tipografia, e 4) Padronagens, numa folha. 5) Ilustração e 6) Voz, numa folha. 7) Aplicações e 8) Cuidados e fontes, numa folha. Como o Sobre o Aipim, ela pode fugir do frame comum mais que as outras páginas, porque quase tudo é arte. A primeira folha começa com o Masthead (família Começo; o título é Identidade da marca, os metadados são Status, Folhas, Versão e Responsável, e os dois links são o mapa do arquivo e o guia das padronagens). Cada seção é uma faixa que alterna `bg/surface` (a primeira de uma folha) e `bg/canvas`, com 96px de padding. A primeira faixa de uma seção abre com o Eyebrow, o título em `Aipim/display` e uma abertura em `Aipim/body-lg`. As faixas seguintes da mesma seção usam o Band header (título em `Aipim/h2`), para a folha não gritar em toda faixa. Os subtítulos (`Aipim/h3`) ficam junto do texto ou da arte que apresentam. O índice é uma grade de componentes Link, cada um levando à sua faixa. As referências são caixas discretas (`bg/sunken`) com o número REF como sobretítulo. Os pilares, o símbolo no palco, os palcos do logotipo, os quadrados de padronagem e as cenas são arte e mantêm os próprios tamanhos; as cores deles ficam ligadas aos primitivos. Toda folha termina com Prev next (cada folha para as vizinhas, a última para os Tutoriais) e o rodapé escuro.
- **Visão geral dos componentes, Padrões e telas e Temas e personalização** são montadas com o kit, como o Comece aqui, e dividem uma abertura: o Masthead (faixa Azulejo, Cajá e Folha) e depois uma faixa em `bg/surface` com o Eyebrow, um título em `Aipim/display`, uma abertura em `Aipim/body-lg`, dois Buttons, uma fileira de Tags e um card "Ir para" de Link rows à direita, seguidos de quatro Cards nos tons Primary, Secondary, Tertiary e Success para os números. As faixas seguintes alternam `bg/canvas` e `bg/surface`, e cada uma tem a própria composição. A Visão geral dos componentes tem o catálogo (uma linha por nível, com os componentes como Tag Links), as nove linhas de uma página de componente como um índice numerado, os cinco status como um stepper (um Badge numa linha), os critérios de estável num painel `tint/primary` com ícones de visto, e o layout da página em quatro colunas abertas. Padrões e telas tem os seis fluxos como linhas (nome, quando, componentes como Tag Links), o microcopy como Cards de Diga e Não (tons Success e Surface) com as regras de voz, e as quatro telas de celular duas por linha, cada uma com uma nota ao lado. Temas e personalização tem os quatro passos do fluxo como um stepper e um exemplo resolvido num painel `bg/sunken`: o matiz primário vai de Urucum para Mate, com a linha das sementes, a saída do gerador, a variável CSS e as duas rampas lado a lado. Depois vêm dois Cards (o arquivo de tema e a garantia de acessibilidade no tom Success), as telas de exemplo no claro e no escuro ao lado de uma lista dos componentes que elas usam e de um Alert Info, e três temas de exemplo (Mate, Grafite e Alto contraste, cada um no claro e no escuro). Eles são desenhados com os valores que o gerador produz, recolorindo uma cópia da tela de exemplo: são exemplos, e não modos nas variáveis do Figma. A página fecha com quatro colunas abertas para o Figma (variáveis, modos, sincronia e ilustrações) e o que vem por aí (o construtor visual de temas, numa caixa `bg/sunken`). Cada página termina com Prev next e o rodapé escuro.
- **Roadmap e requisitos, Créditos e licenças e Changelog** usam a mesma abertura das três páginas acima (Masthead na faixa Tinta, depois o título display, os Buttons, as Tags, um card "Ir para" e quatro Cards de tom) e depois uma composição para cada faixa. O Roadmap tem as cinco versões como linhas (a versão e o status à esquerda, os pontos à direita, e uma Tag Planejado no próximo lançamento), os 29 requisitos como checklist, as pendências em três colunas abertas, e a pesquisa e as decisões em três Cards (as decisões no tom Primary). No checklist, cada grupo é uma linha, e cada requisito tem a prioridade como sobretítulo, uma linha de texto, uma nota e uma Tag de status (Feito e Depois em Outline, Parcial em Accent). Créditos tem os créditos como linhas, as licenças como uma tabela com a licença em `Aipim/h2`, as regras de fonte (o que fica de fora, e a linha de crédito num Code block) e as seis referências em células abertas. O Changelog tem como ler (formato e versionamento), as versões como linhas com as entradas em lista, e o modelo de entrada num Code block. É a última página do arquivo, então a barra Prev next dele não tem Próxima.
- A **Cor** é a primeira página de fundamentos montada com o kit, e o modelo para as próximas: o Masthead (família Fundamentos, faixa Azulejo), a abertura em comum (título display, Buttons, Tags, um card "Ir para" e quatro Cards de tom) e depois faixas que alternam `bg/canvas` e `bg/surface`, cada uma com um Band header e o conteúdo na largura cheia de 1512px. Como a cor funciona é um stepper de três passos (primitivos, semânticos, componentes) com três colunas abertas. Primitivos são as seis rampas como cards em `bg/canvas`, com as amostras espalhadas pelo card. Papéis semânticos é um card de tabela por grupo, com o token, o valor claro, o valor escuro e onde ele é usado. No contexto é a **tela de exemplo** (a tela Projetos, com Top bar, um Card com mídia, Tags, um Text field, um Alert, um Button e uma Tab bar) no claro e no escuro, com a lista dos papéis que ela usa e um link para os temas de exemplo. Acessibilidade das cores é a matriz de contraste e a tabela de daltonismo. As tabelas usam `Aipim/body` (16px), e uma linha de texto nunca passa de 732px.
- **Tipografia, Espaço, Layout, Forma, Elevação, Movimento, Toque e foco, Ícones, Ilustrações e Padronagens** seguem a Cor, mas na grade de título e conteúdo: depois do Masthead e da abertura em comum, cada faixa tem o Band header na coluna de 472px e o conteúdo na coluna de 992px. O conteúdo é o que as páginas antigas já tinham (a escala tipográfica, as tabelas de espaçamento e de tamanhos, as telas de exemplo, o catálogo de ícones, os cards de padronagem), levado para a coluna da direita. Os cards ficam dois por linha com espaço de 32px, e numa faixa `bg/surface` eles usam `bg/canvas`. As faixas alternam `bg/canvas` e `bg/surface`, com a primeira faixa depois da abertura em `bg/canvas`. O texto que era de 14px nas tabelas é `Aipim/body` (16px). Espaço e Layout, Forma e Elevação, e Movimento e Toque e foco continuam como dois frames de página numa página do Figma, como antes.
- **As 17 páginas de componente** (Átomos, Moléculas e Organismos) mantêm as nove linhas, mas o masthead e o fim da página vêm do kit: o Masthead (faixa Folha, com os chips de link para a especificação em Markdown e o exemplo na web), as nove linhas, a barra Prev next (os componentes na ordem da barra lateral, da Visão geral dos componentes até Padrões e telas) e o rodapé escuro. O texto que era de 14px é `Aipim/body` (16px), uma linha longa nunca passa de 732px, e o padding e os espaços ficam ligados às variáveis de Space. O texto dentro de uma instância de componente (o rótulo da Tag, por exemplo) mantém o estilo do componente.
- **Sobre e marca** é uma página do Figma com seis folhas lado a lado: primeiro o Sobre o Aipim, depois as cinco folhas da Identidade da marca (Conceito, Logo, Cor, tipografia e padronagens, Ilustração e voz, Aplicações e cuidados). A folha Sobre mantém as onze faixas, mas a faixa de cores e padronagens e a de licenças são curtas (o Band header e alguns Link rows) e apontam para as folhas da marca, para o Roadmap e para Créditos e licenças, de modo que as cores, as padronagens e as licenças sejam contadas num lugar só.
- **A corrente de Prev next** segue a ordem de leitura da barra lateral, e toda barra tem o texto e o link dela: Comece aqui, Sobre o Aipim, as cinco folhas da marca, os três Tutoriais, os onze fundamentos (Cor, Tipografia, Espaço, Layout, Forma, Elevação, Movimento, Toque e foco, Ícones, Ilustrações, Padronagens), Visão geral dos componentes, os 17 componentes (Átomos, depois Moléculas, depois Organismos), Padrões e telas, Temas e personalização, Roadmap e requisitos, Créditos e licenças e Changelog. O Comece aqui não tem Anterior, e o Changelog não tem Próxima.
- **A abertura** é o componente **Opening** do kit, usado em toda página de guia e de fundamentos e feito só de instâncias e variáveis. Ele traz o Eyebrow, o título em `Aipim/display`, a abertura em `Aipim/body-lg` (no máximo 732px), dois Buttons (Primary e Outline, Large), três Tags e, à direita, um card **Ir para** (`bg/canvas`, `border/subtle`, `radius/2xl`, um Ornament e um Link row para cada faixa, com o próprio link; a folha Sobre chama esse card de Onde achar o Aipim e usa os ícones do Figma, do npm, do GitHub e de link externo). Embaixo vêm quatro **Cards** nos tons Primary, Secondary, Tertiary e Success, cada um com o número e o substantivo dele no título e uma linha de texto. A faixa é `bg/surface` com 96px de padding. Os números são os mesmos quatro fatos que os Stats antigos mostravam, então a página continua dizendo o que dizia.
- **Tutoriais** é uma página do Figma com três folhas lado a lado, uma para cada público: Designers, Desenvolvedores e IA. Cada folha é montada com o kit de documentação: o Masthead (o público é o título; dois chips Tag Link, o mapa do arquivo e o tutorial em Markdown) e depois faixas que alternam `bg/surface` (a primeira) e `bg/canvas`, cada uma com um Band header na coluna de 472px e o conteúdo na coluna de 992px. A primeira faixa é a escolha do tutorial: três Cards, o atual no tom Primary e marcado com "Você está aqui", e os outros interativos, com link para a folha deles. Onde isto se encaixa mostra as seis etapas como Cards, com as que o tutorial cobre no tom Primary e, para os designers, um Alert para o stakeholder. O tutorial em si tem a abertura, um Card com o que você precisa e um Card Primary com o que você vai ter na coluna da esquerda, e na coluna da direita os seis Steps (um Badge com o número, um título, um texto, um Code block quando há um comando ou um prompt, e o Alert Success "Pronto quando"), fechados por um Card Success com a checagem final. Depois vêm as faixas de referência das folhas Desenvolvedores e IA (Cards dois por linha, um card ímpar alinhado à esquerda com a mesma largura) e, para Designers e Desenvolvedores, "Tenha isto por perto": uma tabela com os mesmos nomes no Figma e no código, e a ordem para pedir algo novo. Cada folha termina com a barra Prev next (Identidade da marca antes da primeira, Cor depois da última) e o rodapé escuro. Cada folha tem o texto de um arquivo Markdown (`tutorials-designers.md`, `tutorials-developers.md` e `tutorials-ai.md`, em `docs/pt-br/` e em `docs/en/`), escrito uma vez em `tools/tutorials_content_pt.py` e em `tools/tutorials_content.py`.

## O kit de documentação

As partes de uma página de documentação são componentes do grupo **BIBLIOTECA** do arquivo do Figma, na página **Kit de documentação**, feitos com instâncias dos átomos. Uma página é montada com elas, então uma mudança chega a todas as páginas. O grupo Biblioteca fica depois de PROJETO e antes de ARQUIVO, e tem três páginas: **Componentes** (os 17 componentes, cada um numa seção), **Kit de documentação** (as partes de uma página de documentação) e **Masters da marca** (Pattern, Pattern drawing, Ornament, Symbol, Lockup, Wordmark, Illustration e os 63 masters de Icon; no resto do arquivo os ícones são instâncias). Cada uma tem um Masthead com a faixa da família em Folha. A Biblioteca não faz parte da ordem de leitura, e as barras Prev next pulam esse grupo.

| Parte | O que é | Feita de |
|---|---|---|
| **Masthead** | O topo escuro de uma página: logotipo, sobretítulo, título em Antonio (150px, maiúsculas), quatro pares de metadados e dois links, e depois a faixa de pétalas. É um componente só: a faixa é um Pattern (Petals) exposto, e a propriedade Color dele define a cor da família: Urucum para Começo, Azulejo para Fundamentos, Folha para Componentes, Cajá para Padrões e Personalização, Tinta para Projeto. O frame usa o modo Dark da coleção Semantic. | Wordmark, Pattern, Meta pair, Tag (Link) |
| **Meta pair** | Um rótulo pequeno em cima de um valor, como Status e Estável. | `Aipim/overline`, `Aipim/label` |
| **Eyebrow** | O florão antes de um sobretítulo em urucum. | Ornament (Small, Terracotta) |
| **Band header** | A coluna da esquerda de uma faixa, com 472px: sobretítulo, título (`Aipim/h2`) e abertura (`Aipim/body-lg`). | Eyebrow |
| **Step** | Um número, um título e um texto, com um link opcional (Show link) e uma linha "Pronto quando" opcional (Show alert). | Badge, Link, Alert (Success) |
| **Prev next** | O fim de uma folha: Anterior à esquerda (Outline) e Próxima à direita (Primary), cada um com um ícone de seta. | Button |
| **Code block** | Um comando, um trecho de código ou um prompt num bloco escuro (o modo Dark da coleção Semantic), com um rótulo pequeno em cima. Usado dentro de um Step (Show code). | Aipim/label |
| **Stat** | Um Badge de ícone, um número no estilo `Aipim/h1` na cor de ação e um rótulo de uma linha. | Badge |
| **Link row** | Um ícone, um Link e uma descrição de uma linha. O ícone diz aonde o link leva (veja Links, acima). | Icon, Link |
| **Link row soon** | O mesmo para algo que ainda não existe: um rótulo apagado que termina em "(em breve)", sem link. | Icon |
| **Opening** | A primeira faixa de uma página de guia ou de fundamentos, em `bg/surface`: Eyebrow, título (`Aipim/display`), abertura (no máximo 732px), dois Buttons, três Tags e um card Ir para com até quatro Link rows, e depois quatro Cards nos tons Primary, Secondary, Tertiary e Success. Propriedades: Title, Lead, Jump to title, Show link 3 e Show link 4; toda instância interna fica exposta (Eyebrow, Buttons, Tags, Link rows e Cards). | Eyebrow, Button, Tag, Link row, Card, Ornament |

- Os chips do masthead são a Tag no estilo Link, porque navegam. A Tag no estilo Inverse é para um chip que não navega, numa superfície escura ou colorida.
- Um card com uma lista ("Você precisa de", "Você vai ter") é o Card estático, no tom Surface. Um card que importa usa um tom.
- O título do masthead é o único texto do kit sem estilo de texto: não existe estilo de 150px, e o masthead é o único lugar com esse tamanho.
- **Nenhum parágrafo passa de 732px** (a largura de 6 colunas da grade), em nenhuma página. O kit garante isso. O texto dentro de Step, Band header, Alert e Card tem largura máxima de 732, e o Code block tem largura máxima de 780 (732 de texto e 24px de padding de cada lado), então uma parte pode ocupar uma faixa larga e o texto dela continua parando em 732. O texto que você escreve numa página, fora de uma parte, segue a mesma largura máxima (um Max width de 732 no texto, ou uma largura fixa de 732). Títulos e rótulos de uma linha não são parágrafos.
- **O espaço entre cards é de 32px** (`space/32`), na horizontal e na vertical, em toda página. Vale também para quadrados de arte que ficam lado a lado como cards (fotos, quadrados de padronagem, cenas, palcos). Colunas abertas sem caixa, como as três diferenças ou o índice, mantêm 48px, e uma faixa de blocos de cor juntos de propósito não tem espaço.
- As páginas feitas antes do kit ainda têm versões feitas à mão dessas partes, e passam para o kit uma página de cada vez.

## A lista de páginas no Figma

A lista de páginas se lê como um sumário recuado:

- Um grupo é uma página com nome em maiúsculas (`FUNDAMENTOS`, `COMPONENTES`). Uma página chamada `---` entre os grupos é um divisor do Figma.
- Uma página começa com um emoji do assunto e é recuada com espaços, quatro por nível, como se recua código. As páginas de documentação dos componentes ficam um nível abaixo de `Visão geral dos componentes`, agrupadas por atomic design do mesmo jeito que a barra lateral do Storybook: `Átomos` (button, icon button, link, badge, tag, checkbox, radio, switch), `Moléculas` (text field, alert, toast, tabs, card, empty state) e `Organismos` (top bar, tab bar, modal), cada página com uma seção por componente. `Sobre e marca` e `Tutoriais` ficam abaixo de `Comece aqui`.
- Cada página de grupo guarda uma **capa de grupo**, um frame de 1600 por 900px em `bg/canvas`, igual em todo grupo. Ela começa com uma faixa da padronagem Pétalas, com 112px de altura, na cor da família (Urucum para Começo, Azulejo para Fundamentos, Folha para Componentes e Biblioteca, Cajá para Padrões e Personalização, Tinta para Projeto e Arquivo). Embaixo, à esquerda, vêm o logotipo, o Eyebrow "Grupo de páginas", o nome do grupo em Antonio (132px, maiúsculas, o único texto da capa sem estilo de texto, como o título do Masthead), uma descrição de uma frase e o Button "Mapa do arquivo" em urucum escuro, que leva ao mapa do arquivo no Comece aqui. À direita fica o **conteúdo**: um sobretítulo com o florão e uma linha para cada página do grupo (um Badge pequeno numerado e um Link que leva à página, com um fio em cima de cada linha). A capa é feita só de instâncias e variáveis. As famílias são Começo, Fundamentos, Componentes, Padrões, Personalização, Projeto, Biblioteca e Arquivo; o grupo Biblioteca fica fora da ordem de leitura das barras Prev next.
- Os nomes usam "e", nunca "&" (`Espaço e layout`, `Forma e elevação`, `Movimento e toque`).

## No Storybook

As páginas de docs do Storybook não copiam as linhas de título à esquerda e conteúdo à direita das páginas do Figma: elas usam a grade do portfólio, feita só com CSS (`.storybook/preview.css`). Uma coluna de até 1124px, centralizada, com 24px de margem de cada lado; 12 colunas com 24px de espaço; o título de cada seção em cima do conteúdo, com um fio por cima; o texto do corpo em 8 das colunas e nunca mais largo que 68ch; tabelas, palcos e código nas 12. A página abre com um cabeçalho simples, sem faixa: um sobretítulo pequeno com o grupo, o nome em Antonio, a frase de abertura da especificação e um fio embaixo. As tabelas são cards e as prévias das histórias são palcos. O texto do corpo é o passo `body-lg` (18px com 1,6). O ritmo é uma escala só: os blocos de uma seção ficam a 24px um do outro, uma seção começa 80px abaixo da anterior com um fio em cima do título, uma história a 48px, os itens de lista a 8px, e as abas e o primeiro bloco embaixo delas a 48px. A margem continua em 24px no celular, e o cabeçalho ganha menos espaço por dentro.

Cada página de componente abre com a variação mais reconhecível (a história "Padrão": um botão, um campo, um card, no tamanho real, que também é a primeira miniatura no Chromatic), depois "Todos os estados" e o resto abaixo da especificação. A página continua com uma linha de fatos da especificação (status, grupo, elemento HTML, critérios WCAG, componentes relacionados) e depois as linhas da especificação. A história "Faça e não faça" desenha o exemplo certo e o errado com os componentes de verdade, e as legendas vêm da especificação. Os fundamentos, os guias e a introdução usam o mesmo masthead e a mesma grade. Os fundamentos mostram cada token ao lado de uma prévia feita com a variável CSS de verdade (uma barra para um espaço, uma caixa com o raio, um card com a sombra, um ponto que se move com a duração), e as cores como amostras. O `stories/_foundations.js` lê as tabelas e as amostras dos docs da língua (`docs/pt-br/*.md` ou `docs/en/*.md`) e do `tokens/tokens.json`, então elas não têm como divergir. A barra lateral segue o atomic design: Fundamentos, Átomos, Moléculas, Organismos, Guias. Toda história fica centralizada num palco do tamanho da janela, para as capturas do Chromatic funcionarem como miniaturas, e é capturada no claro e no escuro. A aparência segue a barra de claro e escuro porque usa só tokens semânticos.

O Storybook tem duas línguas, em dois builds: português do Brasil em `/aipim/` (o padrão) e inglês em `/aipim/en/`. As páginas têm o mesmo endereço nos dois, então o botão de idioma da barra abre a mesma página na outra língua. Cada build lê os próprios docs (`docs/pt-br` ou `docs/en`) e as próprias páginas (`stories/pt-br` ou `stories/en`); os textos do próprio Storybook, e as palavras dentro dos exemplos, ficam em `.storybook/i18n.js`. Os nomes de componentes, variantes e tokens ficam em inglês nos dois.

As páginas altas são divididas em abas, as do próprio design system (`.storybook/docs-tabs.js`). Uma página de componente tem cinco: Visão geral (fatos, quando usar, variantes e props, estados), Exemplos (todos os estados, faça e não faça, playground), Código, Tokens e Acessibilidade. As páginas de Cor, Forma e elevação, Espaço e layout, Tipografia e Movimento e toque, a Introdução e os guias longos agrupam as seções do mesmo jeito, com três ou quatro abas por página. O título, a história Padrão e a barra de abas ficam em cima, e a barra gruda no topo da janela enquanto um painel rola. A aba escolhida fica escrita no endereço (`#tab-tokens`), e uma seção também (`#quando-não-usar`), então um link abre a aba certa e rola até a seção, e recarregar a página mantém o seu lugar. Cada aba mostra uma lista "Nesta página" com as seções dela, e o ícone de link de um título copia o endereço daquela seção. O faça e não faça fica na visão geral, junto com as regras, e as outras histórias ficam em Exemplos. O fim de toda página tem links de anterior e próxima na ordem da barra lateral. Na barra de ferramentas, o tema é um botão só: o sol ou a lua é o modo que está ligado, e o rótulo diz o que um clique faz. No celular, as linhas das tabelas viram cards de duas colunas, com três linhas para uma linha de cinco colunas (a aba Tokens do Button tem 4.950px de altura ali; antes tinha 6.400px). Uma página longa nova lista as abas no arquivo `.mdx` de cada língua (`DocTabs` e `DocTab`, ou `MarkdownTabs` para uma página que é um arquivo Markdown só); uma seção que nenhuma aba cita vai para a primeira.

## Como fazer uma página de componente

1. Duplique a seção do Button e ajuste o Masthead (título, sobretítulo, o fato Grupo e os dois links) e os dois rótulos da barra Prev next.
2. Escreva as nove linhas a partir da especificação do componente em `docs/pt-br/components/`. Tire a linha que não se aplica.
3. Monte os palcos com instâncias de verdade do componente, tiradas da Biblioteca (página Componentes), nunca com desenhos dele.
4. Coloque cada desenho no frame "Component with annotations" dele e confira se os números batem com a tabela das partes.
5. Confira o claro e o escuro, e se nenhum palco corta o conteúdo.

Duas coisas que dão errado no Figma e que vale saber:

- Um traço ligado a uma variável também precisa de uma cor de verdade como reserva. Um traço criado com reserva preta aparece preto, mesmo com a variável `border/subtle`.
- Um frame copiado de uma linha horizontal para uma coluna mantém a altura fixa, a não ser que seja ajustado para abraçar o conteúdo. Ajuste, ou o próximo bloco vai ficar por cima dele.

<!-- Translated from docs/en/documentation-layout.md, sha256 9352c8ee8836 -->
