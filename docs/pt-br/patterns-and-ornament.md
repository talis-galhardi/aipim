# Padronagens e o florão

O Aipim tem quatro padronagens de marca e um ornamento pequeno, o florão, que também é o símbolo da marca. Eles vêm de coisas da casa e da rua brasileiras e são construídos como a Bauhaus ensinou (formas básicas e cor chapada, em módulos que se repetem). A família caminha para a cor chapada, sem linha de tinta: o Cobogó e o Calçadão já são desenhados assim, e os Cacos e as Pétalas mantêm a linha até serem redesenhados. Eles vivem no arquivo do Figma como quatro componentes (Pattern, Cobogó block, Ornament e Symbol). Assim, uma mudança é feita uma vez e todos os usos acompanham. Eles decoram. Nunca levam informação.

## Os elementos

| Elemento | Nome | Função | Referência arquitetônica | Referência estética |
|---|---|---|---|---|
| Cacos | Cacos (piso de cacos) | Assinatura: áreas de destaque, capas, imagens para redes sociais | Cerâmica quebrada assentada como mosaico em pisos e paredes de casas, começou nos anos 1940 e 1950 em São Caetano do Sul com os cacos de uma fábrica de cerâmica, primeiro nas casas de operários e depois nas de classe média | Peças irregulares vermelhas, amarelas e pretas presas pelo rejunte; o pote emendado, quebrado e inteiro de novo |
| Calçadão | Calçadão | Movimento: divisórias de blocos, rodapés, faixas de transição entre seções | O piso de ondas da orla de Copacabana, assentado em pedra portuguesa em 1906 a partir do motivo "Mar Largo" de Lisboa, depois redesenhado e ampliado por Roberto Burle Marx nos anos 1970 | Ondas sinuosas e contínuas que formam um mar geométrico, em preto e branco chapados |
| Cobogó | Cobogó | Estrutura: painéis laterais, banners, molduras de imagens | Blocos vazados empilhados como paredes que deixam passar ar e luz, criados em Pernambuco em 1929 e adotados pela arquitetura moderna brasileira | Luz e sombra por uma abertura repetida; ritmo e sombra; um módulo só que levanta uma parede inteira, ideia próxima da Bauhaus |
| Petals | Pétalas | Discreto: atrás de formulários, empty states, páginas longas | Paredes de azulejo feitas pela repetição de um módulo, da tradição do azulejo de padrão, que no Brasil foi parar sobretudo em cozinhas e banheiros | Rosáceas feitas de círculos sobrepostos; um ritmo discreto, tom sobre tom |
| Ornament | Florão | A pequena assinatura e o símbolo da marca: marcadores, divisórias, selos em cards; num quadrado sólido, o avatar e o favicon | O florão: o ornamento em forma de flor no centro dos forros de estuque, do barroco mineiro aos palácios e solares do Brasil imperial | Uma pequena flor de quatro partes, como um florão de tipografia: uma marca discreta que assina um lugar |

As afirmações históricas têm referências, que também estão reunidas no manual da marca dentro do arquivo do Figma:

- **Cacos.** FRANCESCHINI, Rafael. *Mosaico cerâmico como signo da cidade de São Caetano do Sul: comunicação para preservação da memória*. 2025. Dissertação (Mestrado Profissional) – Universidade Municipal de São Caetano do Sul, 2025. CAMPOS, Mariani. A origem dos pisos de caquinhos de cerâmica de São Paulo. *Veja São Paulo*, 3 abr. 2020.
- **Cobogó.** ARAUJO, Adriana Castelo Branco Ponte de; ENGLER, Rita de Castro. Design e modernidade de cobogós na arquitetura do Nordeste: exemplares de um patrimônio construtivo regional. *Revista Arquitetura e Lugar*, Campina Grande, v. 3, n. 11, p. 19–35, 2025. DOI: 10.35572/arql.v3i11.6610.
- **Calçadão.** YLLANA, T. S. Histórias não contadas sobre o calçadão de Copacabana. *Oculum Ensaios*, Campinas, v. 19, e225322, 2022. DOI: 10.24220/2318-0919v19e2022a5322.
- **Pétalas.** WANDERLEY, Ingrid Moura. *Azulejo na arquitetura brasileira: os painéis de Athos Bulcão*. 2006. Dissertação (Mestrado) – Escola de Engenharia de São Carlos, Universidade de São Paulo, São Carlos, 2006. A fonte sustenta o azulejo de padrão (um módulo repetido para cobrir uma parede) e o azulejo em cozinhas e banheiros; o desenho das pétalas é do próprio Aipim.
- **Florão.** ÁVILA, Affonso; GONTIJO, João Marcos Machado; MACHADO, Reinaldo Guedes. *Barroco mineiro: glossário de arquitetura e ornamentação*. Belo Horizonte: Fundação João Pinheiro, Centro de Estudos Históricos e Culturais, 1996. FLORÃO. In: *Michaelis: dicionário brasileiro da língua portuguesa*. São Paulo: Melhoramentos. A CASA SENHORIAL: anatomia dos interiores. *Palácio Imperial* e *Palacete da Babilônia*, https://acasasenhorial.org.

## Paletas

São duas paletas, definidas pela coleção de variáveis `Pattern palette` (dois modos, nove variáveis):

- **Aipim**: tons de terracota e creme, com pequenos acentos de amarelo, azul azulejo e verde folha.
- **Traditional**: tons de terracota, amarelo-claro e um pouco de preto, como são os pisos de verdade. Só os Cacos a têm.

A padronagem Pétalas é tom sobre tom, e a propriedade Color define o fundo: Azulejo (o padrão), Urucum, Folha, Cajá (com as pétalas em tinta suave, porque pétalas creme somem no amarelo) e Tinta. As páginas de documentação usam essa padronagem na faixa embaixo do masthead, com uma cor para cada família de páginas. No Cobogó, a mesma propriedade escolhe a parede: Default é a Barro e Azulejo é a Athos.

## No arquivo do Figma

- **Pattern** é um componente com três propriedades: Pattern (Cacos, Cobogó, Petals, Calçadão), Palette (Aipim, e Traditional para os Cacos) e Color (Default para os Cacos, o Calçadão e a parede Barro; Azulejo para a parede Athos; Azulejo, Urucum, Folha, Cajá ou Tinta para as Pétalas). Coloque a instância dentro de um frame que recorta, com cantos arredondados, e mude a escala para escolher o recorte. Os desenhos ficam no conjunto Pattern drawing, e as cores são as variáveis.
- **Cobogó block** é um componente com doze desenhos: Arcada, Flor, Círculo com arcos, Gomos, Medalhão, Estrela, Arabesco, Cruz com círculo, Janela em X, Catavento, Cruz em X e Xis. A linha é sempre 1/24 do ladrilho: 4px no master de 96px, 6,67px num ladrilho de 160px. Uma parede tem 10 por 6 ladrilhos de 160px, os 1600×960 do Pattern.
- **Ornament** é um componente com Color (Terracotta, Azulejo) e Size: Small tem 24px, Medium 32px e Large 48px. Use esses três tamanhos. As partes do florão acompanham a escala do frame, então ele nunca é cortado num tamanho maior, mas a linha só mantém a espessura nos três tamanhos.
- **Symbol** é o florão num quadrado sólido, numa cor só: Color (Terracotta, Azulejo, Ink) e Shape (Square para ícones e favicons, Circle para avatares). É feito só de preenchimentos, então muda de escala sem mudar de espessura. Ele se lê inteiro a partir de 24 px; em 16 px só aparecem as quatro gotas. A marca é a mesma do Ornament: como símbolo, é sólida e aparece sozinha; como ornamento, é pequena e se repete.
- Só dê detach numa instância quando um contexto precisar de um desenho próprio, e diga o porquê no nome da camada.

## Regras

- Uma padronagem em cada área. Duas padronagens na mesma área disputam a atenção.
- Uma parede de Cobogó usa um desenho. A Barro o coloca em zonas de tom, com um acento. A Athos o gira ladrilho a ladrilho, nunca com o mesmo giro lado a lado e nunca com dois ladrilhos invertidos juntos.
- Uma parede com a paleta inteira (Diagonal e Mosaico, no manual da marca) é uma aplicação de marca, para campanhas e imagens de redes sociais. Ela não faz parte do Pattern e nunca vai para uma tela de produto.
- O texto nunca fica direto sobre uma padronagem: ele fica num Card ou num painel com fundo próprio, com pelo menos 4,5:1 de contraste.
- Troque a paleta pela propriedade Palette, e o fundo das Pétalas ou a parede do Cobogó pela propriedade Color. Não pinte formas à mão nem acrescente cores de fora das duas paletas.
- Um florão em cada lugar (um marcador, uma divisória ou um selo), nunca uma fileira deles. Não gire nem pinte à mão. Como símbolo, ele é sempre creme num quadrado sólido (nunca sobre uma foto ou uma padronagem, nunca com contorno ou sombra).

## Acessibilidade

As padronagens e o florão são decorativos. Na web, são imagens de fundo, imagens com alt vazio ou SVG no código com `aria-hidden="true"`. Nada é escrito dentro deles, e nunca são a única forma de distinguir duas áreas. Eles não se movem; se algum dia se moverem, respeitam o movimento reduzido.

## Situação e entrega

Hoje as padronagens e o florão existem como componentes do Figma, desenhados por Talis Galhardi com a ferramenta caneta. O Cobogó e o Calçadão são chapados; os Cacos e as Pétalas são primeiros rascunhos, que vão ser redesenhados chapados. Os arquivos SVG para a web vêm na v1.2, a começar pelo Cobogó, suas duas regras de parede e a paleta das padronagens nos tokens. Nenhum grafismo de um povo específico e nenhum símbolo sagrado é usado (veja as regras de Ilustrações). Crédito: Aipim design system, de Talis Galhardi, CC BY 4.0.

<!-- Translated from docs/en/patterns-and-ornament.md, sha256 8d908237c11f -->
