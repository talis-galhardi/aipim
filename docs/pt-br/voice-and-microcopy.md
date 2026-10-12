# Voz e microcopy

Como soam as palavras numa interface do Aipim, e como escrever os textos pequenos: botões, rótulos, textos de ajuda, erros, empty states e diálogos. Os componentes não trazem texto pronto. Essa parte fica com quem escreve a tela.

## Voz

O Aipim fala como uma pessoa prestativa que respeita o seu tempo.

- **Caloroso.** Fale com uma pessoa. Use "você". Seja gentil sem ser fofo.
- **Direto.** Diga primeiro o que mais importa. Frases curtas, uma ideia por mensagem.
- **Simples.** Use as palavras que as pessoas usam. Se uma palavra precisa de explicação, troque por outra.
- **Honesto.** Diga o que aconteceu e o que não é possível. Não esconda um limite atrás de um tom animado.

O que ele não é: formal ("Informamos que") nem cheio de pontos de exclamação, e nunca brincalhão na hora errada. Guarde a comemoração para os momentos que merecem, como terminar algo difícil.

## Regras que valem em todo lugar

1. **Só a primeira letra maiúscula.** "Salvar alterações", e não "Salvar Alterações". Nomes de produtos e nomes próprios mantêm as maiúsculas.
2. **Ações começam com verbo.** "Adicionar pessoa", "Baixar relatório". O rótulo diz o que vai acontecer.
3. **Nunca "OK", "Sim" ou "Enviar" sozinhos.** Diga a ação: "Excluir projeto", "Enviar mensagem". O rótulo precisa fazer sentido sem o texto em volta, porque quem usa leitor de tela muitas vezes ouve botões e links isolados.
4. **Diga o que fazer, não o que a pessoa fez de errado.** "Digite um e-mail como nome@exemplo.com", e não "Entrada inválida".
5. **Sem culpa.** "Não conseguimos salvar as alterações", e não "Você cometeu um erro". Só peça desculpas quando algo falhou do nosso lado.
6. **Não escreva "por favor" antes de toda instrução.** Use uma vez, se ele suaviza um pedido de verdade.
7. **Números e datas do jeito que as pessoas falam.** "3 não lidas", "Hoje, 14:30". Use algarismos para contagens.
8. **Sem jargão e sem nomes internos.** "Sua sessão terminou", e não "Erro 401".
9. **Não monte frases com pedaços.** Frases inteiras se traduzem e são lidas em voz alta melhor que um rótulo colado num número.
10. **Curto, mas não enigmático.** Corte uma palavra só se o sentido continuar.

## Por componente

| Componente | Escreva assim | Exemplo |
|---|---|---|
| **Button** | Verbo, depois o objeto. Duas ou três palavras. | "Adicionar pessoa" |
| **Icon button** | Sem texto visível, então o `aria-label` dá nome à ação. | `aria-label="Fechar"` |
| **Link** | Diga aonde ele leva. Nunca "clique aqui" ou "leia mais" sozinhos. | "Leia as notas de acessibilidade" |
| **Rótulo do text field** | Diga o que digitar. Mantenha acima do campo, sempre visível. | "E-mail" |
| **Texto de ajuda** | O formato ou o motivo, sem repetir o rótulo. | "Usado só para recibos" |
| **Texto de erro** | O que está errado e como corrigir, numa frase. | "Digite um e-mail válido" |
| **Checkbox, radio, switch** | A própria opção, afirmativa e específica. Num switch, diga o que liga. | "Notificações por e-mail" |
| **Alert** | Título opcional (duas a cinco palavras) e uma ou duas frases. | "Confira os dados do cartão e tente de novo." |
| **Toast** | Uma frase curta sobre o que acabou de acontecer, no passado. | "Item salvo." |
| **Empty state** | Um título que diz o que está vazio e uma frase sobre o que fazer. | "Nada aqui ainda" |
| **Modal** | O título dá nome à ação ou faz a pergunta. Os botões repetem a ação. | "Excluir o projeto?" com "Cancelar" e "Excluir projeto" |
| **Tabs e tab bar** | Uma ou duas palavras. Substantivos. | "Visão geral", "Mensagens" |
| **Tag** | Uma ou duas palavras. | "Design" |
| **Top bar** | O nome de onde a pessoa está. | "Configurações" |

## Quatro tipos de mensagem

**Erro.** O que aconteceu, depois o que fazer. Se você não sabe dizer como corrigir, diga o que vai fazer a respeito.
- Faça: "Não conseguimos salvar as alterações. Confira a conexão e tente de novo."
- Não faça: "Erro: falha na operação."

**Sucesso.** Confirme o que foi feito, em poucas palavras. Um toast basta. Não comemore ações de rotina.
- Faça: "Item salvo."
- Não faça: "Incrível! Seu item foi salvo com sucesso!"

**Vazio.** Diga por que está vazio e mostre o próximo passo. Não peça desculpas por estar vazio.
- Faça: "Nenhum projeto ainda. Crie o primeiro para ver aqui."
- Não faça: "Ops! Nada para ver."

**Confirmação.** Diga o que vai acontecer e, quando não der para desfazer, avise.
- Faça: "Excluir o projeto? Não dá para desfazer. Todos os arquivos do projeto serão apagados."
- Não faça: "Tem certeza?"

## Texto acessível

- Todo controle só com ícone tem um `aria-label` que dá nome à ação, com as mesmas palavras que você poria num botão visível.
- Links e botões fazem sentido fora de contexto (veja a regra 3).
- Não use só cor ou posição: "o botão vermelho" e "o campo da direita" não funcionam para todo mundo. Diga o nome do controle.
- Mensagens de status ficam num elemento com `role="status"` (ou `role="alert"` para erros), para a tecnologia assistiva ler. Veja as especificações do Alert e do Toast.
- Escreva em linguagem simples. Um nível de leitura que a maioria dos adultos acompanha sem esforço é uma boa meta para tudo o que pede uma ação.

## Palavras a evitar

| Em vez de | Escreva |
|---|---|
| "Utilize" | "Use" |
| "Clique aqui" | Um link que diz aonde leva |
| Inválido, ilegal | O que se espera: "Digite uma data como 12/05/2026" |
| Falhou | O que não aconteceu: "Não conseguimos enviar a sua mensagem" |
| Ops, opa | Diga o que aconteceu |
| Tem certeza? | Diga a consequência |

## Tradução

Os textos do próprio Aipim são escritos em inglês e em português do Brasil (o Storybook tem os dois, e os docs em português ficam em `docs/pt-br`). Quando você traduzir um produto:
- Mantenha as frases inteiras, sem montar uma frase com pedaços, porque a ordem das palavras muda.
- Deixe espaço: muitas línguas ficam 30% mais longas. Os componentes quebram textos longos em vez de cortar, então os rótulos podem crescer.
- Plurais e números seguem as regras da língua. Use o suporte a plural da sua biblioteca de i18n, e não "item(s)".

<!-- Translated from docs/en/voice-and-microcopy.md, sha256 55c72c717342 -->
