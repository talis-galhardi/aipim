---
name: avatar
description: Uma pessoa ou uma coisa dentro de um círculo: uma foto, as iniciais sobre um tom, ou um ícone.
status: beta
group: atoms
html: span, img
class: aipim-avatar
css: components/web/avatar.css
figma: Aipim DS, página Átomos, Avatar
wcag: ["1.1.1 Conteúdo Não Textual", "1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)", "1.4.11 Contraste Não Textual"]
related: [list-item, badge, tag]
---

# Avatar

Uma pessoa ou uma coisa dentro de um círculo: uma foto, as iniciais sobre um tom, ou um ícone. Dá rosto a uma lista, a um comentário ou a um grupo.

## Quando usar

- Para mostrar quem é a pessoa, ou o que é o item, numa lista, num comentário ou num cartão.
- Para mostrar quantas pessoas participam, com o grupo e o contador ("+3").

## Quando não usar

- Só para enfeitar. Se o avatar não diz quem é, não use.
- Para o ícone de uma ação: use o [botão de ícone](icon-button.md).
- Para um número ou um estado sobre um ícone: use o [badge](badge.md).

## Decisão: foto, iniciais ou ícone

O avatar desenha o que recebe. Quem monta a tela escolhe: a foto quando ela existe, as iniciais quando só há o nome, o ícone quando não há nem nome. O Aipim não faz essa escolha por você.

## Decisão: quatro tons, com o texto do tom

O fundo das iniciais usa um dos quatro tons do sistema (salmão, azul, amarelo e verde), sempre com o texto do tom (`tint/text`), que o gerador de tokens confere. O Aipim não escolhe o tom: use o mesmo para a mesma pessoa em toda tela, e uma lista longa fica colorida sem parecer sorteada.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-avatar` | O círculo, de 40px. Sem tom, fica em `bg/sunken`, para o ícone, o espaço da foto e o contador. |
| `aipim-avatar--sm`, `aipim-avatar--lg` | 32px e 48px. O pequeno escreve as iniciais no estilo overline e desenha um ícone de 16px. |
| `aipim-avatar--primary`, `--secondary`, `--tertiary`, `--success` | O tom atrás das iniciais. |
| `img` dentro | A foto. Ela preenche o círculo. |
| `svg.aipim-icon` dentro | O ícone, com `aria-hidden="true"`. |
| `aipim-avatar-group` | Uma fileira de avatares que se sobrepõem, cada um com um anel de 3px na cor da página. Ponha `role="group"` e um `aria-label`. |
| `aipim-avatar-group--sm`, `--lg` | Dimensiona os avatares de dentro e define a sobreposição: 6, 8 (padrão) e 12px. |

## Estados

O avatar só mostra. Não tem hover, foco nem estado desativado. Quando está dentro de um link ou de um botão, o estado é do link ou do botão.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Fundo das iniciais | Primário | `tint/primary` | #FEBBA9 | #892402 |
| Fundo das iniciais | Secundário | `tint/secondary` | #AED1FE | #014B95 |
| Fundo das iniciais | Terciário | `tint/tertiary` | #FFD337 | #5E4B03 |
| Fundo das iniciais | Sucesso | `tint/success` | #A0DFB5 | #025D33 |
| Texto das iniciais | Os quatro | `tint/text` | #1A1511 | #FDF9F6 |
| Fundo | Ícone, foto, contador | `bg/sunken` | #ECE5DF | #0E0A07 |
| Ícone | Ícone | `text/secondary` | #4A423C | #ECE5DF |
| Texto do contador | Contador | `text/primary` | #1A1511 | #FDF9F6 |
| Anel do grupo | Grupo | `bg/surface` | #FDF9F6 | #302A25 |

| Medida | Token | Pequeno | Médio | Grande |
|---|---|---|---|---|
| Diâmetro | `size/control-sm`, `size/control-md`, `size/control-lg` | 32 | 40 | 48 |
| Ícone | `size/icon-sm`, `size/icon-md` | 16 | 20 | 20 |
| Iniciais | `text/overline`, `text/label` | Overline | Label | Label |
| Sobreposição no grupo | `space/8`, `space/12` | 6 (sem token) | 8 | 12 |

| Medida | Token | Valor |
|---|---|---|
| Canto | `radius/full` | Sempre círculo |
| Anel do grupo | `border/thick` | 3 |

A sobreposição é uma margem negativa, porque um token não pode ser negativo. O anel é desenhado por fora do círculo e não ocupa espaço: um grupo de quatro avatares médios tem 136px de largura.

## Acessibilidade

- O Tab não para num avatar. Dentro de um link ou de um botão, o foco vai para o link ou para o botão.
- Uma foto é um `img` cujo `alt` é o nome da pessoa. Quando o nome está escrito ao lado, use `alt` vazio.
- As iniciais levam `aria-hidden="true"` quando o nome está ao lado. Sozinhas, levam `role="img"` e um `aria-label` com o nome.
- Um ícone leva `aria-hidden="true"`: é só enfeite.
- Um grupo leva `role="group"` e um `aria-label` ("Participantes"). O contador tem um texto escondido (`aipim-visually-hidden`) que o completa: "+3 pessoas".
- As iniciais usam `tint/text` sobre cada tom, um par que o gerador de tokens confere no claro e no escuro.

## Exemplos de código

```html
<span class="aipim-avatar aipim-avatar--primary" role="img" aria-label="Talis Galhardi">TG</span>

<span class="aipim-avatar"><img src="ana.jpg" alt="Ana Vieira"></span>

<span class="aipim-avatar" aria-hidden="true">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-user"></use></svg>
</span>

<div class="aipim-avatar-group" role="group" aria-label="Participantes">
  <span class="aipim-avatar aipim-avatar--primary" role="img" aria-label="Talis Galhardi">TG</span>
  <span class="aipim-avatar aipim-avatar--secondary" role="img" aria-label="Ana Vieira">AV</span>
  <span class="aipim-avatar aipim-avatar--success" role="img" aria-label="Lucas Ueda">LU</span>
  <span class="aipim-avatar">+3<span class="aipim-visually-hidden"> pessoas</span></span>
</div>
```

## Faça e não faça

- Faça: mostre até quatro avatares e resuma o resto no contador (+3).
- Não faça: oito avatares empilhados, que viram uma faixa ilegível.

<!-- Translated from docs/en/components/avatar.md, sha256 2aa4c8ede2d4 -->
