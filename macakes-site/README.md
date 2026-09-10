# maCAKES

Landing page da maCAKES.

## Executar

Requer Node.js 22.13+ e pnpm 10.9.2.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Build de produção:

```bash
pnpm build
pnpm start
```

No Windows, `iniciar.cmd` / `visualizar.cmd` usam `scripts/preview-local.ps1`.

## Ajustes desta versão

- assets de imagem consolidados em WebP; originais JPG/PNG duplicados foram removidos;
- recortes de hero, produtos horizontais e foto da loja ajustados sem letterboxing;
- animações de entrada usam `data-reveal` + `IntersectionObserver`, executam uma vez e respeitam `prefers-reduced-motion`;
- categorias do cardápio também recebem reveal leve;
- dependências e versões do projeto foram preservadas; o gerenciador foi fixado em pnpm 10.9.2.
