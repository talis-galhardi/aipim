---
name: brazilian-field
description: Um campo de texto para dados brasileiros (CPF, CNPJ, CEP, telefone, data e reais), com máscara e checagem.
status: beta
group: molecules
html: input, label
class: aipim-field
css: components/web/text-field.css
figma: Aipim DS, página Moléculas, Brazilian field
wcag: ["1.3.1 Informações e Relações", "1.3.5 Identificar o Propósito de Entrada", "3.3.1 Identificação de Erro", "3.3.2 Rótulos ou Instruções", "3.3.3 Sugestão de Erro", "4.1.2 Nome, Função, Valor"]
related: [text-field]
---

# Brazilian field

Um campo de texto para dados brasileiros (CPF, CNPJ, CEP, telefone, data e reais), com máscara e checagem.

## Quando usar

- Para os documentos e formatos que todo formulário brasileiro pede: CPF, CNPJ, CEP, telefone com DDD, data em dd/mm/aaaa e valor em reais.
- Quando a pessoa digita o valor. Um valor escolhido de uma lista é um select.

## Quando não usar

- Para um telefone fora do Brasil: use um [text field](text-field.md) com `type="tel"`.
- Para uma data escolhida num calendário: um date picker (ainda não existe nesta versão).
- Para qualquer outro formato. Os seis formatos são os que têm uma regra brasileira por trás; máscara genérica não faz parte do Aipim.

## Como funciona

É um [text field](text-field.md) com `data-aipim-format` no input. A aparência, os tamanhos, os estados e os tokens são os do text field. O que muda vem de `components/web/aipim.js`:

- **Enquanto você digita**, a máscara entra (pontos, traços, barra, parênteses) e o cursor fica depois do caractere digitado. Colar funciona com ou sem máscara.
- **Backspace num ponto ou num traço** apaga o dígito antes dele. Sem isso, a máscara devolveria o ponto e o cursor não sairia do lugar.
- **Quando você sai do campo**, o valor é checado. Um erro põe `aria-invalid="true"` e escreve a mensagem no texto de ajuda.
- **Assim que o valor volta a ser válido**, o erro some e o texto de ajuda volta. O erro nunca aparece enquanto a pessoa ainda está digitando.

Sem o script, o campo é um text field comum: a pessoa pode digitar o valor com ou sem máscara. Cheque o valor no servidor de qualquer jeito.

| Formato | `data-aipim-format` | Máscara | O que é checado |
|---|---|---|---|
| CPF | `cpf` | 000.000.000-00 | 11 dígitos, os dois dígitos verificadores, não todos iguais |
| CNPJ | `cnpj` | AA.AAA.AAA/AAAA-00 (A é letra ou dígito) | 14 caracteres, letras só nos 12 primeiros, os dois dígitos verificadores |
| CEP | `cep` | 00000-000 | 8 dígitos |
| Telefone | `phone` | (00) 00000-0000 ou (00) 0000-0000 | um DDD que existe; celular tem 11 dígitos e começa com 9, fixo tem 10 e começa com 2 a 5 |
| Data | `date` | dd/mm/aaaa | uma data que existe, ano bissexto incluído |
| Reais | `money` | R$ 1.234,56 | nada: qualquer valor vale. Ao sair do campo, entram os dois decimais |

## Decisão: máscara ao digitar, checagem ao sair

Um campo que fica vermelho no primeiro dígito chama a atenção da pessoa por algo que ela ainda não terminou. Um campo que só formata quando você sai esconde o formato durante a digitação, e a pessoa fica contando dígitos na tela. A máscara ao digitar mostra quanto falta; a checagem ao sair diz o que está errado só quando há algo a dizer.

## Decisão: CNPJ com letras

Desde julho de 2026 a Receita Federal emite CNPJs com letras nos 12 primeiros caracteres (Instrução Normativa RFB 2.229/2024). Os dois dígitos verificadores continuam números. Por isso o campo de CNPJ não tem `inputmode="numeric"`: o teclado numérico bloquearia as letras. As letras viram maiúsculas enquanto você digita, e os CNPJs antigos, só com dígitos, continuam funcionando.

## Decisão: data digitada, não `type="date"`

O input de data nativo segue a ordem do idioma do navegador, não a da página: um brasileiro num computador em inglês vê mm/dd/yyyy. E para data de nascimento, oito dígitos são mais rápidos que um calendário que abre no dia de hoje. O campo de data é um text field com a máscara dd/mm/aaaa.

## Variantes e props

| Atributo | O que faz |
|---|---|
| `data-aipim-format` | O formato: `cpf`, `cnpj`, `cep`, `phone`, `date` ou `money`. |
| `data-aipim-error-incomplete`, `data-aipim-error-invalid` | Suas próprias mensagens de erro, no lugar das do script. |
| `data-aipim-help` no `span` do texto de ajuda | O texto de ajuda que volta quando um erro vindo do servidor é corrigido. |

Ponha também estes no input, para o teclado certo no celular e para o preenchimento automático:

| Formato | Atributos |
|---|---|
| CPF | `inputmode="numeric"` |
| CNPJ | `autocapitalize="characters"`, `spellcheck="false"` |
| CEP | `inputmode="numeric"`, `autocomplete="postal-code"` |
| Telefone | `type="tel"`, `autocomplete="tel-national"` |
| Data | `inputmode="numeric"`; para data de nascimento, `autocomplete="bday"` |
| Reais | `inputmode="decimal"` |

Não use `maxlength`: um valor colado com máscara ou com +55 é mais longo que o valor, e o próprio script corta o que sobra.

As mensagens saem em português quando o `lang` mais próximo começa com `pt`, e em inglês nos outros casos.

## No código: `Aipim.br`

As mesmas regras como funções puras, para um app React ou Vue que controla o próprio valor, e para o servidor (copie de `aipim.js`):

| Função | Devolve |
|---|---|
| `Aipim.br.format(type, value, done)` | O valor com a máscara. `done` acrescenta os dois decimais de um valor em reais. |
| `Aipim.br.check(type, value)` | `''` quando válido ou vazio, `'incomplete'` ou `'invalid'`. |
| `Aipim.br.clean(type, value)` | O valor para guardar: os dígitos (o CNPJ em maiúsculas), a data como `yyyy-mm-dd`, o valor como `1234.56`. `''` quando o valor não é válido. |

## Acessibilidade

- Tudo do [text field](text-field.md): rótulo acima do campo, texto de ajuda e de erro ligados com `aria-describedby`, erro com ícone e texto.
- O texto de ajuda diz o formato antes de alguém errar ("Digite só os números", "Com o DDD").
- O erro diz o que está errado e o que conferir ("O CPF tem 11 números. Confira se falta algum."), de acordo com o 3.3.3 Sugestão de Erro.
- A mensagem não é anunciada enquanto o foco está em outro lugar. O leitor de tela lê quando a pessoa volta ao campo. Quando um formulário é enviado com erros, leve o foco ao primeiro campo inválido.
- Os valores de `autocomplete` deixam o navegador preencher o CEP, o telefone e a data de nascimento (1.3.5 Identificar o Propósito de Entrada).

## Exemplos de código

```html
<div class="aipim-field">
  <label class="aipim-field__label" for="cpf">CPF</label>
  <input class="aipim-field__control" id="cpf" name="cpf" type="text" inputmode="numeric" data-aipim-format="cpf" aria-describedby="cpf-help">
  <p class="aipim-field__helper" id="cpf-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>Digite só os números</span>
  </p>
</div>
```

```js
// React: formate no onChange, cheque no onBlur.
const [cpf, setCpf] = useState('');
<input value={cpf} onChange={(e) => setCpf(Aipim.br.format('cpf', e.target.value))}
  onBlur={() => setError(Aipim.br.check('cpf', cpf))} />
```

## Faça e não faça

- Faça: o texto de ajuda diz o formato, e a máscara mostra quanto falta.
- Não faça: um placeholder com a máscara como única pista, que some no primeiro dígito.

<!-- Translated from docs/en/components/brazilian-field.md, sha256 594504825474 -->
