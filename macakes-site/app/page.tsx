import Menu from './menu';
import { MapPin, Navigation, ArrowUpRight, Star } from 'lucide-react';
import {
  Brand,
  Header,
  Photo,
  SiteMotion,
  SocialLinks,
  InstagramIcon,
  WhatsAppIcon,
} from './site-interactions';
const placeId = 'ChIJQd9G1kZJxwcRcgybwq4m_Ac';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=maCAKES+Confeitaria+Fortaleza&query_place_id=${placeId}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=maCAKES+Confeitaria+Fortaleza&destination_place_id=${placeId}`;
const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
const whatsapp =
  'https://wa.me/5585981237701?text=' +
  encodeURIComponent('Olá! Gostaria de fazer uma encomenda na maCAKES.');
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#cardapio">
        Ir para o cardápio
      </a>
      <Header />
      <main id="inicio">
        <section className="container hero">
          <div className="hero-copy">
            <p className="eyebrow">Confeitaria artesanal · Fortaleza</p>
            <h1>
              Uma pausa.
              <br />
              Um pedaço.
              <br />
              <em>Mais um?</em>
            </h1>
            <p className="intro">
              Tortas, bolos e sobremesas para colocar no centro da mesa.
            </p>
            <div className="actions">
              <a className="button" href={whatsapp}>
                <WhatsAppIcon />
                Fazer meu pedido <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#cardapio">
                Conhecer os sabores ↓
              </a>
            </div>
            <p className="hero-note">Encomendas com 2 dias de antecedência.</p>
          </div>
          <div className="hero-composition">
            <figure className="hero-main">
              <Photo
                src="/assets/pagina-3-X10.webp"
                alt="Torta Búlgara de chocolate com frutas vermelhas"
                priority
              />
              <figcaption>
                <span>Torta Búlgara</span>
              </figcaption>
            </figure>
            <figure className="hero-detail">
              <Photo
                src="/assets/pagina-2-X10.webp"
                alt="Cheesecake de Pistache, detalhe da fatia"
              />
            </figure>
          </div>
        </section>
        <div className="signature-strip" data-reveal="left">
          <div className="container">
            <span>
              Sweet tastes. <i>Sweet experiences.</i>
            </span>
            <span>maCAKES · Aldeota</span>
          </div>
        </div>
        <section className="container menu-section" id="cardapio">
          <div className="section-heading" data-reveal="left">
            <div>
              <p className="eyebrow">O cardápio maCAKES</p>
              <h2>
                É de dar
                <br />
                <em>água na boca.</em>
              </h2>
            </div>
            <p>
              Do chocolate intenso ao frescor das frutas.
              <br />
              Escolha o sabor e o tamanho da sua vontade.
            </p>
          </div>
          <div className="menu-spotlight" data-reveal="photo">
            <Photo
              src="/assets/pagina-4-X11.webp"
              alt="Pavlova maCAKES com morangos"
            />
            <div>
              <p className="eyebrow">Para compartilhar</p>
              <h3>Pavlova</h3>
              <p>
                Creme de cream cheese e geleia de frutas vermelhas artesanal.
              </p>
              <div className="spotlight-price">
                <span>15 pessoas</span>
                <strong>R$ 220,00</strong>
              </div>
              <a className="text-link" href="#categoria-5">
                Conhecer as sobremesas <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <Menu />
        </section>
        <section className="about" id="sobre">
          <div className="container about-inner">
            <div className="about-photo" data-reveal="photo">
              <Photo
              src="/assets/pagina-3-X8.webp"
                alt="Taça Chocomelo com chocolate, brownie e caramelo"
              />
            </div>
            <div className="about-copy" data-reveal="right">
              <p className="eyebrow">A maCAKES</p>
              <h2>
                O doce tem
                <br />
                <em>lugar à mesa.</em>
              </h2>
              <p>
                Na Aldeota, em Fortaleza, a maCAKES reúne bolos, doces finos e
                sobremesas artesanais. Para dividir em uma comemoração ou levar
                para casa.
              </p>
              <p>
                Os pedidos são preparados com antecedência. Fale com a gente
                para combinar a sua encomenda.
              </p>
              <a
                className="text-link"
                href="https://linktr.ee/macakesconfeitaria"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conheça nossos canais oficiais <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="container contact" id="contato">
          <div className="section-heading" data-reveal="left">
            <div>
              <p className="eyebrow">Aldeota · Fortaleza</p>
              <h2>
                Entre.
                <br />
                <em>A casa é doce.</em>
              </h2>
            </div>
            <div className="contact-address">
              <div className="address-lines">
                <span className="info-icon" data-reveal="icon">
                  <MapPin size={17} />
                </span>
                <address>
                  <strong>maCAKES Confeitaria</strong>
                  <br />
                  R. João Carvalho, 625 — Loja 13
                  <br />
                  Aldeota · Fortaleza/CE
                </address>
              </div>
              <SocialLinks whatsapp={whatsapp} />
            </div>
          </div>
          <div className="visit-layout">
            <figure className="store-photo" data-reveal="photo">
              <Photo
                src="/assets/loja-macakes-limpa.webp"
                alt="Interior da loja maCAKES, com balcão de doces e letreiro dourado"
              />
              <figcaption>
                Nossa loja na Aldeota <span>maCAKES Confeitaria</span>
              </figcaption>
            </figure>
            <div className="visit-card" data-reveal="right">
              <div className="map-heading">
                <MapPin size={18} />
                <span>Encontre a maCAKES</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ampliar mapa"
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
              <iframe
                className="contact-map"
                title="Localização da maCAKES Confeitaria em Fortaleza"
                src="https://maps.google.com/maps?q=maCakes%20Confeitaria%20Fortaleza&z=16&output=embed"
                width="600"
                height="350"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="visit-info">
                <p>Esperamos você por aqui.</p>
                <a
                  className="button"
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation size={17} />
                  Como chegar
                </a>
                <a
                  className="text-link"
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Star size={17} />
                  Avaliar no Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container footer" data-reveal="up">
            <Brand />
            <span>Sweet tastes. Sweet experiences.</span>
            <a className="back-to-top" href="#inicio">
              Voltar ao topo <span aria-hidden="true">↑</span>
            </a>
          </div>
        </footer>
      </main>
      <SiteMotion />
    </>
  );
}
