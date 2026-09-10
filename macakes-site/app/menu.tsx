'use client';
import { Photo } from './site-interactions';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
type MenuGroup = {
  name: string;
  note?: string;
  items: [string, string, [string, string][]][];
};
const groups: MenuGroup[] = [
  {
    name: 'Cheesecakes',
    note: 'Base de biscoito, creme de cream cheese e cobertura.',
    items: [
      [
        'Frutas Vermelhas',
        'Com geleia de frutas vermelhas e morangos frescos.',
        [
          ['P · 8–10 pessoas', '170,00'],
          ['G · 15 pessoas', '225,00'],
        ],
      ],
      [
        'Romeu e Julieta',
        'Com goiabada cremosa.',
        [
          ['P · 8–10 pessoas', '135,00'],
          ['G · 15 pessoas', '195,00'],
        ],
      ],
      [
        'Pistache',
        'Com ganache de chocolate meio amargo e oreo.',
        [['Tamanho único', '225,00']],
      ],
    ],
  },
  {
    name: 'Tortas',
    items: [
      [
        'Torta Búlgara',
        'Torta densa e cremosa de chocolate com geleia de frutas vermelhas artesanal.',
        [['Único · 15–18 pessoas', '199,00']],
      ],
      [
        'Torta petit Búlgara',
        'Torta búlgara com recheio de brigadeiro preto cremoso.',
        [['Único · 15–18 pessoas', '199,00']],
      ],
      [
        'Torta Brownie',
        'Nosso famoso brownie com recheio de brigadeiro preto.',
        [
          ['P · 8–10 pessoas', '110,00'],
          ['G · 15 pessoas', '185,00'],
        ],
      ],
      [
        'Torta de Limão',
        'Base de biscoito, creme de limão assado finalizado com merengue maçaricado.',
        [
          ['P · 6–8 pessoas', '80,00'],
          ['G · 12–15 pessoas', '120,00'],
        ],
      ],
      [
        'Banoffe',
        'Base de massa sablé, doce de leite, bananas caramelizadas, chantilly artesanal, cacau em pó e canela.',
        [
          ['P · 6–8 pessoas', '110,00'],
          ['G · 12–15 pessoas', '180,00'],
        ],
      ],
    ],
  },
  {
    name: 'Taças',
    items: [
      [
        'Taça Tiramissu',
        'Creme de queijo com biscuit cuillere embebido no café e cacau em pó.',
        [['Único · 15 pessoas', '235,00']],
      ],
      [
        'Taça Chocomelo',
        'Camadas de mousse de chocolate blend intercaladas com toffe de cramelo, pedaços de brownie e flor de sal.',
        [['Único · 10 pessoas', '170,00']],
      ],
      ['Taça de Morango', '', [['Único · 10 pessoas', '170,00']]],
    ],
  },
  {
    name: 'Brownies',
    items: [
      [
        'Brownie Funcional',
        'Brownie feito com açúcar demerara, óleo de côco, farinha de arroz, farinha de linhaça, chocolate 54% cacau, cacau em pó e bicarbonato de sódio. Sem glúten e sem adição de refinados.',
        [
          ['P · Individual', '17,00'],
          ['G · 4 pessoas', '48,00'],
        ],
      ],
    ],
  },
  {
    name: 'Bolos',
    items: [
      [
        'Bolo Vulcão',
        'Massa de bolo fofo e úmido com cobertura cremosa. Chocolate / Romeu e Julieta / Doce de leite Crocante / Limão / Cenoura.',
        [
          ['P · 8–10 pessoas', '79,00'],
          ['G · 15 pessoas', '110,00'],
        ],
      ],
    ],
  },
  {
    name: 'Sobremesas',
    items: [
      [
        'Pudim',
        'Pudim sem furinhos e super cremoso. Acompanha forma de alumínio que fica de cortesia para o cliente.',
        [
          ['M · 1,1 kg', '105,00'],
          ['G · 2 kg', '150,00'],
        ],
      ],
      [
        'Pavlova',
        'Base de biscoito, creme de cream cheese e geleia de frutas vermelhas artesanal.',
        [['Único · 15 pessoas', '220,00']],
      ],
      [
        'Sorvete de Pudim',
        'Sorvete Artesanal com pedaços de pudim, crumble de castanha de caju e toffe de caramelo.',
        [
          ['P · 240 ml', '24,90'],
          ['G · 1,2 kg', '110,00'],
        ],
      ],
    ],
  },
];
const whatsapp =
  'https://wa.me/5585981237701?text=' +
  encodeURIComponent(
    'Olá! Vi o cardápio no site da maCakes e gostaria de fazer uma encomenda.',
  );
const productImages: Record<string, string> = {
  Pistache: '/assets/pagina-2-X10.webp',
  'Torta Búlgara': '/assets/pagina-3-X10.webp',
  'Torta petit Búlgara': '/assets/pagina-3-X11.webp',
  'Torta Brownie': '/assets/pagina-4-X8.webp',
  'Torta de Limão': '/assets/pagina-5-X8.webp',
  Banoffe: '/assets/pagina-5-X10.webp',
  'Taça Tiramissu': '/assets/pagina-2-X9.webp',
  'Taça Chocomelo': '/assets/pagina-3-X8.webp',
  'Taça de Morango': '/assets/pagina-5-X11.webp',
  'Brownie Funcional': '/assets/pagina-4-X10.webp',
  'Bolo Vulcão': '/assets/pagina-6-X10.webp',
  Pudim: '/assets/pagina-2-X5.webp',
  Pavlova: '/assets/pagina-4-X11.webp',
  'Sorvete de Pudim': '/assets/pagina-6-X8.webp',
};
export default function Menu() {
  const [open, setOpen] = useState<string[]>([]);
  useEffect(() => {
    const revealCategory = () => {
      const match = window.location.hash.match(/^#categoria-(\d)$/);
      if (match && groups[Number(match[1])])
        setOpen((value) => Array.from(new Set([...value, match[1]])));
    };
    revealCategory();
    window.addEventListener('hashchange', revealCategory);
    return () => window.removeEventListener('hashchange', revealCategory);
  }, []);
  const covers = [
    'pagina-2-X10.webp',
    'pagina-3-X10.webp',
    'pagina-5-X11.webp',
    'pagina-4-X10.webp',
    'pagina-6-X10.webp',
    'pagina-4-X11.webp',
  ];
  const descriptions = [
    'Cremosos, do primeiro ao último pedaço.',
    'Chocolate, frutas e boas combinações.',
    'Camadas para compartilhar.',
    'Chocolate em cada pedaço.',
    'Escolha a sua cobertura.',
    'Para fechar a mesa com um doce.',
  ];
  return (
    <>
      <Accordion
        className="menu-accordion"
        multiple
        value={open}
        onValueChange={setOpen}
      >
        {groups.map((group, index) => (
          <AccordionItem
            className={`menu-category category-${index}`}
            id={`categoria-${index}`}
            key={group.name}
            value={String(index)}
            data-reveal="up"
          >
            <AccordionTrigger className="category-toggle">
              <span className="category-cover">
                <img
                  src={`/assets/${covers[index]}`}
                  alt=""
                  width="110"
                  height="110"
                  loading="lazy"
                />
              </span>
              <span className="category-label">
                <span className="category-name">{group.name}</span>
                <span className="category-description">
                  {descriptions[index]}
                </span>
              </span>
              <span className="category-action">
                <span className="category-open-label">Ver opções</span>
                <span className="category-close-label">Fechar</span>
                <span className="category-plus" aria-hidden="true" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="accordion-products" keepMounted>
              {group.note && <p className="category-note">{group.note}</p>}
              <div className="product-grid">
                {group.items.map(([name, description, prices]) => (
                  <article
                    className={`product ${productImages[name] ? 'with-photo' : 'without-photo'}`}
                    key={name}
                  >
                    {productImages[name] && (
                      <Photo
                        src={productImages[name]}
                        alt={name}
                        className="product-photo"
                      />
                    )}
                    <div className="product-copy">
                      <h4>{name}</h4>
                      {description && <p>{description}</p>}
                      <dl>
                        {prices.map(([size, price]) => (
                          <div className="price-row" key={size}>
                            <dt>{size}</dt>
                            <dd>R$ {price}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </article>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="menu-end" data-reveal="up">
        <div>
          <h3>Já escolheu o seu?</h3>
          <p>Encomende com pelo menos 2 dias de antecedência.</p>
        </div>
        <a className="button" href={whatsapp}>
          Fazer pedido pelo WhatsApp <span aria-hidden="true">↗</span>
        </a>
        <a
          className="text-link"
          href="/assets/cardapio-original.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cardápio completo em PDF ↗
        </a>
      </div>
    </>
  );
}
