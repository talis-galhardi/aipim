---
name: datepicker
description: Um campo de data brasileiro com um botão que abre um calendário, para datas perto de hoje como uma entrega ou uma consulta.
status: beta
group: molecules
html: input, label, button, table
class: aipim-datepicker
css: components/web/datepicker.css
figma: Aipim DS, página Moléculas, Date picker
wcag: ["1.3.1 Informações e Relações", "1.4.1 Uso de Cores", "1.4.11 Contraste Não Textual", "2.1.1 Teclado", "2.1.2 Sem Bloqueio do Teclado", "2.4.3 Ordem do Foco", "2.4.7 Foco Visível", "3.3.1 Identificação de Erro", "3.3.3 Sugestão de Erro", "4.1.2 Nome, Função, Valor"]
related: [brazilian-field, text-field, icon-button, modal]
---

# Date picker

Um campo de data brasileiro com um botão que abre um calendário, para datas perto de hoje como uma entrega ou uma consulta.

## Quando usar

- Uma data que a pessoa escolhe olhando a semana: uma entrega, uma consulta, o início de uma reserva.
- Uma data com limites, em que o calendário mostra de cara quais dias valem.

## Quando não usar

- Uma data que a pessoa sabe de cor, como a data de nascimento: use a data do [campo brasileiro](brazilian-field.md). Digitar oito números é mais rápido que voltar quarenta anos mês a mês.
- Um intervalo de duas datas (entrada e saída): não nesta versão. Use dois date pickers.
- Data e hora juntas: não nesta versão.

## Como funciona

O campo é a data do [campo brasileiro](brazilian-field.md): `data-aipim-format="date"`, com a máscara `dd/mm/aaaa` enquanto você digita e a conferência quando você sai. Ao lado, um [botão de ícone](icon-button.md) abre um calendário que o `aipim.js` escreve embaixo do campo.

- O **botão do calendário** abre o calendário na data do campo. Com o campo vazio, abre em hoje; com limites, no dia permitido mais perto. O foco vai para esse dia.
- As **setas** andam por dia (esquerda e direita) e por semana (cima e baixo), passando de um mês para outro.
- **Home** e **End** vão para o domingo e o sábado da semana.
- **Page Up** e **Page Down** vão para o mês anterior e o seguinte, no mesmo dia. Com **Shift**, um ano.
- **Enter**, **Espaço** ou um **clique** escolhem o dia: a data vai para o campo, o calendário fecha, o foco volta para o botão e o campo dispara `change`.
- **Escape** fecha o calendário sem escolher, e o foco volta para o botão.
- **Tab** circula entre os dois botões de mês e o dia, dentro do calendário.
- Um **clique fora** fecha o calendário.
- Depois que uma data é escolhida ou digitada, o botão diz qual é: "Escolher data, sexta-feira, 20 de novembro de 2026".
- Uma data válida e dentro dos limites mostra o dia da semana numa linha própria, embaixo do texto de ajuda: "Sexta-feira, 20 de novembro". Ele faz parte da descrição do campo, então o leitor de tela lê junto com o texto de ajuda. Quem pensou em sexta e digitou 21 percebe sem abrir o calendário.

Os nomes dos meses e dos dias da semana vêm do `Intl`, no idioma da página (`lang`). A semana começa no domingo, como num calendário brasileiro.

Sem o script o botão fica escondido e o campo é um campo de texto comum: confira o valor no servidor também.

## Decisão: digitar vem primeiro

A maioria dos date pickers faz do calendário a entrada principal e trata o campo de texto como detalhe. O Aipim faz o contrário. O campo recebe os oito números com a máscara, e o calendário é uma segunda entrada, para quando o dia da semana importa. Quem sabe a data nunca precisa abrir o calendário, e quem usa leitor de tela não é obrigado a passar por uma grade de 30 células para digitar uma data que já sabe.

## Decisão: um calendário escrito pelo script

O calendário não está no HTML: o `aipim.js` escreve ele na primeira vez que a página carrega, dentro do campo. A marcação que a página escreve fica pequena (um label, um input, um botão e o texto de ajuda), e o calendário é igual em qualquer framework. O `input type="date"` nativo era a escolha óbvia, e era a errada: a aparência e a ordem de dia e mês mudam com o navegador e o sistema, ele não aceita a máscara brasileira, e alguns navegadores nem mostram calendário.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-field aipim-datepicker` | O invólucro. Usa as partes do campo de texto. |
| `aipim-field--lg` | Campo grande, 48px. O padrão é médio, 40px. O calendário fica do mesmo tamanho. |
| `data-aipim-format="date"` no input | A data brasileira: máscara, conferência e o valor como `yyyy-mm-dd` pelo `Aipim.br.clean`. Acrescente `inputmode="numeric"` e `autocomplete="off"`. |
| `aipim-icon-button aipim-datepicker__button` com `aria-label` | O botão do calendário, 32px, dentro do campo. O `aria-label` ganha a data escolhida depois de uma vírgula. O ícone é `calendar`; o calendário pega os ícones de mês do mesmo sprite. |
| `data-aipim-min`, `data-aipim-max` no input | Opcionais, como `yyyy-mm-dd`. Os dias fora ficam desabilitados no calendário, e uma data digitada fora mostra um erro quando a pessoa sai. |
| `data-aipim-error-range` no input | Sua própria mensagem para uma data fora dos limites, no lugar da padrão. |
| `--aipim-datepicker-day` | O tamanho de um dia no calendário. Padrão `size/control-md`, 40px. |

O script acrescenta estas partes, e a página não escreve nenhuma delas:

| Classe | O que é |
|---|---|
| `aipim-datepicker__popup` | O calendário, `role="dialog"` com `aria-modal="true"`, embaixo do campo. |
| `aipim-datepicker__header` | Os botões de mês e o nome do mês. |
| `aipim-datepicker__month` | "Novembro de 2026", `aria-live="polite"`, o nome da grade. |
| `aipim-datepicker__grid` | Uma `table` com `role="grid"`, uma linha por semana. |
| `aipim-datepicker__day` | Um dia, um `td` com `role="gridcell"` e a data completa como `aria-label`. |
| `aipim-datepicker__weekday` | O dia da semana da data do campo, um `span` no fim do texto de ajuda, escondido enquanto a data está vazia, inválida ou fora dos limites. |

## Estados

O campo tem os estados do [campo de texto](text-field.md): padrão, hover, foco, erro e desabilitado. Um campo desabilitado tem o botão desabilitado. Cada dia do calendário tem estes:

- **Padrão:** o número em `text/primary`.
- **Hover:** um círculo `bg/sunken`.
- **Foco:** um anel de 3px em `focus/ring`, dentro do círculo.
- **Hoje:** um anel de 1px em `border/strong` e o número em negrito.
- **Escolhido:** um círculo preenchido com `action/primary/bg`, o número em negrito. Hoje e o dia escolhido se distinguem por forma e peso, nunca só por cor.
- **Desabilitado** (fora dos limites): o número em `text/muted`, riscado.

## Tokens usados

O campo, o label e o texto de ajuda usam os tokens do [campo de texto](text-field.md). Os botões de mês são [botões de ícone](icon-button.md). O date picker acrescenta:

| Aplica-se a | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Ícone do botão do calendário | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Fundo do calendário | Aberto | `bg/surface` | #FDF9F6 | #302A25 |
| Borda do calendário | Aberto | `border/subtle` | #DAD1CA | #4A423C |
| Sombra do calendário | Aberto | `elevation/overlay` | | |
| Nome do mês, dia | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Dia da semana | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Fundo do dia | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Anel do dia | Hoje | `border/strong` | #837A73 | #A39992 |
| Fundo do dia | Escolhido | `action/primary/bg` | #B43000 | #FF9275 |
| Número do dia | Escolhido | `action/primary/text` | #FDF9F6 | #1A1511 |
| Número do dia | Desabilitado | `text/muted` | #665D56 | #DAD1CA |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | Valor |
|---|---|---|
| Botão do calendário | `size/control-sm` | 32 |
| Ícone do botão do calendário | `size/icon-md` | 20 |
| Dia | `size/control-md` | 40 |
| Altura da linha dos dias da semana | `size/control-sm` | 32 |
| Botões de mês | `size/control-md` | 40 |
| Espaço entre campo e calendário | `space/4` | 4 |
| Respiro interno do calendário | `space/8` | 8 |
| Largura do calendário | dia × 7 + `space/8` × 2 + borda | 298 |
| Canto do calendário | `radius/md` | 8 |
| Canto do dia | `radius/full` | Totalmente redondo |
| Anel de hoje | `border/thin` | 1 |
| Anel de foco | `border/thick` | 3 |
| Camada do calendário | `z/dropdown` | |

## Acessibilidade

- Segue o [exemplo de date picker em diálogo da ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/): um botão abre um diálogo modal com uma grade, e o foco volta para o botão quando ele fecha.
- A grade tem como nome o nome do mês, que é uma região live: ir para outro mês lê o novo.
- Cada dia tem a data completa como nome ("sexta-feira, 20 de novembro de 2026"), então o mês e o dia da semana são lidos junto. O dia escolhido tem `aria-selected="true"`, hoje tem `aria-current="date"`, e um dia fora dos limites tem `aria-disabled="true"`.
- Um dia da grade por vez fica na ordem do Tab (`tabindex` itinerante). O Tab fica dentro do diálogo, e o Escape sempre sai dele (WCAG 2.1.2).
- O Escape dentro de um [modal](modal.md) fecha o calendário primeiro, e só o próximo fecha o modal.
- Os cabeçalhos dos dias da semana são curtos ("seg") com o nome completo em `abbr`.
- Uma data fora dos limites mostra um erro com ícone e texto que diz os limites, nunca só cor.

### Leitores de tela

Conferido à mão com cada par abaixo. As verificações no navegador cobrem o teclado e os atributos ARIA; só uma pessoa confirma o que é lido em voz alta.

| Leitor de tela | Navegador | Status |
|---|---|---|
| VoiceOver (macOS) | Safari | A conferir |
| NVDA (Windows) | Firefox, Chrome | A conferir |
| TalkBack (Android) | Chrome | A conferir |

O que ouvir: no botão, "Escolher data" e, quando há uma data, a data; ao abrir, "Escolher data, diálogo" e o dia com o foco; nas setas, cada data completa; no Page Down, o novo mês; no Enter, o foco de volta no botão com a data escolhida.

## Exemplos de código

```html
<div class="aipim-field aipim-datepicker">
  <label class="aipim-field__label" for="entrega">Data de entrega</label>
  <input class="aipim-field__control" id="entrega" type="text" inputmode="numeric" autocomplete="off" data-aipim-format="date" data-aipim-min="2026-11-02" data-aipim-max="2026-12-18" aria-describedby="entrega-ajuda">
  <button class="aipim-icon-button aipim-datepicker__button" type="button" aria-label="Escolher data">
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-calendar"></use></svg>
  </button>
  <p class="aipim-field__helper" id="entrega-ajuda">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>De 02/11 a 18/12</span>
  </p>
</div>
```

## Faça e não faça

- Faça: diga os limites no texto de ajuda, para a pessoa saber antes de abrir o calendário.
- Não faça: um date picker para a data de nascimento, em que a pessoa precisa voltar décadas mês a mês.

<!-- Translated from docs/en/components/datepicker.md, sha256 afcfeb59a690 -->
