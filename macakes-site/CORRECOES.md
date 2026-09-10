# Correções aplicadas

- Removidos overrides finais conflitantes que escondiam a foto secundária e empilhavam animações infinitas sobre os reveals.
- Mantido o layout/identidade existente; não houve redesign.
- Hero principal usa recorte menos agressivo no mobile; foto secundária permanece visível.
- Fotos horizontais de Tiramissu e Brownie agora usam `cover` com proporção adequada, sem faixas vazias.
- Foto do Bolo Vulcão e foto da loja usam `cover` com posicionamento definido.
- Removida a legenda secundária redundante do hero; permanece apenas o nome do produto.
- `SiteMotion` agora aplica o estado inicial a todos os elementos `data-reveal` e revela uma única vez ao entrar na viewport.
- Categorias do cardápio receberam reveal leve; animação do accordion e hover das fotos foram preservados.
- Restaurado `scripts/preview-local.ps1`, que era referenciado pelos `.cmd` mas estava ausente no ZIP.
- Removidos 6,9 MB de JPG/PNG/WebP duplicados não utilizados.

## Microanimações leves e mobile
- Nav desktop: entrada curta em sequência e hover já existente preservado.
- Logos: entrada curta + microinteração no hover; removida animação infinita.
- Contato: ícones em ordem localização, Instagram e WhatsApp, com reveal leve ao entrar na tela.
- Mobile: removido o CTA de WhatsApp do menu rápido; CTAs principais continuam no site.
- Movimento geral: apenas opacity/transform e transições curtas, com `prefers-reduced-motion` respeitado.
