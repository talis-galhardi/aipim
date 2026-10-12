# Padronagens e o florão

O Aipim tem quatro padronagens de marca e um ornamento pequeno, o florão, que também é o símbolo da marca. Eles vêm de coisas da casa brasileira e são construídos como a Bauhaus ensinou (formas básicas e cor chapada, em módulos que se repetem). Todos são desenhados do mesmo jeito (uma linha de tinta com a cor impressa um pouco fora dela, em tons de terracota com poucos acentos) e vivem no arquivo do Figma como três componentes (Pattern, Ornament e Symbol). Assim, uma mudança é feita uma vez e todos os usos acompanham. Eles decoram. Nunca levam informação.

## Os elementos

| Elemento | Nome | Função | Referência arquitetônica | Referência estética |
|---|---|---|---|---|
| Cacos | Cacos (piso de cacos) | Assinatura: áreas de destaque, capas, imagens para redes sociais | Cerâmica quebrada assentada como mosaico em pisos e paredes de casas, começou nos anos 1940 e 1950 em São Caetano do Sul com os cacos de uma fábrica de cerâmica, primeiro nas casas de operários e depois nas de classe média | Peças irregulares vermelhas, amarelas e pretas presas pelo rejunte; o pote emendado, quebrado e inteiro de novo |
| Hydraulic tile | Ladrilho hidráulico | Superfície: cabeçalhos de cards, divisórias, empty states | Ladrilhos de cimento nos pisos de corredores, cozinhas e varandas das casas brasileiras, desde o fim do século XIX | Motivos geométricos fortes em xadrez; cores chapadas e cara de prensado à mão; a geometria modular que a Bauhaus também ensinou |
| Cobogó | Cobogó | Estrutura: painéis laterais, banners, molduras de imagens | Blocos vazados empilhados como paredes que deixam passar ar e luz, criados em Pernambuco em 1929 e adotados pela arquitetura moderna brasileira | Luz e sombra por uma abertura repetida; ritmo e sombra; um módulo só que levanta uma parede inteira, ideia próxima da Bauhaus |
| Petals | Pétalas | Discreto: atrás de formulários, empty states, páginas longas | Paredes de azulejo feitas pela repetição de um módulo, da tradição do azulejo de padrão, que no Brasil foi parar sobretudo em cozinhas e banheiros | Rosáceas feitas de círculos sobrepostos; um ritmo discreto, tom sobre tom |
| Ornament | Florão | A pequena assinatura e o símbolo da marca: marcadores, divisórias, selos em cards; num quadrado sólido, o avatar e o favicon | O florão: o ornamento em forma de flor no centro dos forros de estuque, do barroco mineiro aos palácios e solares do Brasil imperial | Uma pequena flor de quatro partes, como um florão de tipografia: uma marca discreta que assina um lugar |

As afirmações históricas têm referências, que também estão reunidas no manual da marca dentro do arquivo do Figma:

- **Cacos.** FRANCESCHINI, Rafael. *Mosaico cerâmico como signo da cidade de São Caetano do Sul: comunicação para preservação da memória*. 2025. Dissertação (Mestrado Profissional) – Universidade Municipal de São Caetano do Sul, 2025. CAMPOS, Mariani. A origem dos pisos de caquinhos de cerâmica de São Paulo. *Veja São Paulo*, 3 abr. 2020.
- **Cobogó.** ARAUJO, Adriana Castelo Branco Ponte de; ENGLER, Rita de Castro. Design e modernidade de cobogós na arquitetura do Nordeste: exemplares de um patrimônio construtivo regional. *Revista Arquitetura e Lugar*, Campina Grande, v. 3, n. 11, p. 19–35, 2025. DOI: 10.35572/arql.v3i11.6610.
- **Ladrilho hidráulico.** ARAGÃO, Solange de; SOUZA, Thaís. Do palacete ao cortiço: o emprego do ladrilho nas construções paulistanas da passagem do século XIX para o século XX. *Antíteses*, Londrina, v. 7, n. 14, p. 348–372, 2014. DOI: 10.5433/1984-3356.2014v7n14p348. LAMAS, Márcia Lopes; LONGO, Orlando Celso; SOUZA, Vicente Custódio de. A produção de ladrilho e o ofício de ladrilhar: método de produção de ladrilhos do século XVIII aos nossos dias. *Anais do Museu Paulista: História e Cultura Material*, São Paulo, v. 26, e09, 2018. DOI: 10.1590/1982-02672018v26e09.
- **Pétalas.** WANDERLEY, Ingrid Moura. *Azulejo na arquitetura brasileira: os painéis de Athos Bulcão*. 2006. Dissertação (Mestrado) – Escola de Engenharia de São Carlos, Universidade de São Paulo, São Carlos, 2006. A fonte sustenta o azulejo de padrão (um módulo repetido para cobrir uma parede) e o azulejo em cozinhas e banheiros; o desenho das pétalas é do próprio Aipim.
- **Florão.** ÁVILA, Affonso; GONTIJO, João Marcos Machado; MACHADO, Reinaldo Guedes. *Barroco mineiro: glossário de arquitetura e ornamentação*. Belo Horizonte: Fundação João Pinheiro, Centro de Estudos Históricos e Culturais, 1996. FLORÃO. In: *Michaelis: dicionário brasileiro da língua portuguesa*. São Paulo: Melhoramentos. A CASA SENHORIAL: anatomia dos interiores. *Palácio Imperial* e *Palacete da Babilônia*, https://acasasenhorial.org.

## Paletas

São duas paletas, definidas pela coleção de variáveis `Pattern palette` (dois modos, nove variáveis):

- **Aipim**: tons de terracota e creme, com pequenos acentos de amarelo, azul azulejo e verde folha.
- **Traditional**: tons de terracota, amarelo-claro e um pouco de preto, como são os pisos de verdade.

A padronagem Pétalas é tom sobre tom e usa o acento como fundo: azul azulejo na Aipim, carvão na Traditional. É a única padronagem com escolha de fundo, a propriedade Color: Azulejo (o padrão), Urucum, Folha, Cajá (com as pétalas em tinta suave, porque pétalas creme somem no amarelo) e Tinta. As páginas de documentação usam essa padronagem na faixa embaixo do masthead, com uma cor para cada família de páginas.

## No arquivo do Figma

- **Pattern** é um componente com três propriedades: Pattern (Cacos, Hydraulic tile, Cobogó, Petals), Palette (Aipim, Traditional) e Color (o fundo: Default para Cacos, Hydraulic tile e Cobogó; Azulejo, Urucum, Folha, Cajá ou Tinta para Petals). Coloque a instância dentro de um frame que recorta, com cantos arredondados, e mude a escala para escolher o recorte. Os desenhos ficam no conjunto Pattern drawing, e as cores são as variáveis.
- **Ornament** é um componente com Color (Terracotta, Azulejo) e Size: Small tem 24px, Medium 32px e Large 48px. Use esses três tamanhos. As partes do florão acompanham a escala do frame, então ele nunca é cortado num tamanho maior, mas a linha só mantém a espessura nos três tamanhos.
- **Symbol** é o florão num quadrado sólido, numa cor só: Color (Terracotta, Azulejo, Ink) e Shape (Square para ícones e favicons, Circle para avatares). É feito só de preenchimentos, então muda de escala sem mudar de espessura. Ele se lê inteiro a partir de 24 px; em 16 px só aparecem as quatro gotas. A marca é a mesma do Ornament: como símbolo, é sólida e aparece sozinha; como ornamento, é pequena e se repete.
- Só dê detach numa instância quando um contexto precisar de um desenho próprio, e diga o porquê no nome da camada.

## Regras

- Uma padronagem em cada área. Duas padronagens na mesma área disputam a atenção.
- O texto nunca fica direto sobre uma padronagem: ele fica num Card ou num painel com fundo próprio, com pelo menos 4,5:1 de contraste.
- Troque a paleta pela propriedade Palette e o fundo das Pétalas pela propriedade Color. Não pinte formas à mão nem acrescente cores de fora das duas paletas.
- Um florão em cada lugar (um marcador, uma divisória ou um selo), nunca uma fileira deles. Não gire nem pinte à mão. Como símbolo, ele é sempre creme num quadrado sólido (nunca sobre uma foto ou uma padronagem, nunca com contorno ou sombra).

## Acessibilidade

As padronagens e o florão são decorativos. Na web, são imagens de fundo, imagens com alt vazio ou SVG no código com `aria-hidden="true"`. Nada é escrito dentro deles, e nunca são a única forma de distinguir duas áreas. Eles não se movem; se algum dia se moverem, respeitam o movimento reduzido.

## Situação e entrega

Hoje as padronagens e o florão existem como componentes do Figma. São primeiros rascunhos desenhados em código: a arte final vai ser redesenhada à mão por um designer. Os arquivos SVG e CSS para a web, com as mesmas duas paletas, vêm depois da arte final. Nenhum grafismo de um povo específico e nenhum símbolo sagrado é usado (veja as regras de Ilustrações). Crédito: Aipim design system, de Talis Galhardi, CC BY 4.0.

<!-- Translated from docs/en/patterns-and-ornament.md, sha256 83a74cb61b19 -->
