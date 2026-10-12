# Verificação

O que foi conferido nos componentes web, como e quando. Rode `python3 tools/verify_web.py` para repetir.

**Última verificação: 2026-10-07**, no Chromium 148, no WebKit 26.4 e no Firefox 150, com o axe-core 4.14.0, em `components/web/examples/index.html`.

## O que passa

| Checagem | Resultado |
|---|---|
| Acessibilidade automática (axe-core), tema claro e escuro, no Chromium, no WebKit e no Firefox | Nenhuma violação |
| Cores forçadas (emuladas: `forced-colors: active`) nos três motores | As mesmas checagens passam (sem a regra de contraste, que fica por conta da paleta do sistema); todo controle e todo contêiner mantêm uma borda visível, e a aba selecionada mantém a barra |
| Contraste da paleta (`tools/build_tokens.py`) | 84 checagens, 0 falhas, mais a simulação de daltonismo. Os links também precisam se destacar do texto do corpo (diferença de cor de pelo menos 20) |
| Teclado: abas (setas, Home, End), dispensar com Enter, abrir o modal e fechar com Esc | Funciona |
| Zoom de 200% no navegador (640 px CSS de largura) | Nenhuma rolagem horizontal, nenhum texto cortado |
| Refluxo a 320 px CSS (zoom de 400%) | Nenhuma rolagem horizontal |
| Fonte da raiz em 200% (um ajuste de texto grande no navegador) | Nenhuma rolagem horizontal; o texto quebra linha em vez de ser cortado |
| Espaçamento de texto da WCAG 1.4.12 (altura de linha 1,5, espaço entre letras 0,12em, entre palavras 0,16em, entre parágrafos 2em) | Nenhum texto cortado |

## Limites conhecidos

- **Alvos de toque.** Os tamanhos pequeno e médio do Button, o link standalone, o icon button pequeno e os botões de dispensar e de remover têm menos de 44px. Eles atendem o mínimo da WCAG 2.2 AA, de 24px (2.5.8), e não o tamanho confortável de 44px. Onde o toque importa, use o Button grande e o icon button médio.
- **Campos de texto.** Um valor maior que o campo rola dentro dele, como em qualquer input nativo.
- **Ainda não testado.** Leitores de tela de verdade (VoiceOver, NVDA, TalkBack), o próprio app do Safari (o WebKit é testado pelo Playwright) e o modo de alto contraste real do Windows (as cores forçadas são só emuladas). Os componentes usam elementos nativos e ARIA como cada especificação descreve, mas ainda não passaram por essas ferramentas.

## Como é conferido

O `tools/verify_web.py` serve a galeria e a carrega num motor de navegador pelo Playwright (Chromium por padrão; `--browser webkit` ou `--browser firefox` para os outros, e `--forced-colors` para as cores forçadas). Ali ele roda o axe-core nos dois temas e faz as checagens de teclado. Depois carrega a página em quatro tamanhos e ajustes, procurando rolagem horizontal da página e texto que escapa da própria caixa. Se uma checagem falha, ele sai com erro. O workflow de CI roda o script a cada push, nos três motores e com cores forçadas.

Quando você mudar um componente, rode de novo e atualize a data acima.

<!-- Translated from docs/en/verification.md, sha256 3f8d76fcd266 -->
