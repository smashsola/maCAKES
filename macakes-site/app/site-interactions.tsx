'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
export function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4Z" />
      <path d="M8.2 7.4c-.4 0-1.1.5-1.1 1.6 0 2.7 4.1 6.8 6.8 6.8 1.1 0 1.6-.7 1.6-1.1l-2.3-1.4-.9 1c-1.5-.6-2.6-1.7-3.2-3.2l1-.9-1.4-2.3Z" />
    </svg>
  );
}
export function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.7" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="maCAKES, início">
      <img src="/assets/logo-oficial.webp" width="400" height="400" alt="" />
      <span>
        <i>ma</i>
        <span className="brand-caps">CAKES</span>
        <small>Confeitaria artesanal</small>
      </span>
    </a>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#cardapio">Cardápio</a>
          <a href="#sobre">A maCAKES</a>
          <a href="#contato">Visite a loja</a>
        </nav>
        <button
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="mobile-navigation" showCloseButton={false}>
          <DialogTitle>maCAKES</DialogTitle>
          <DialogDescription>
            Confeitaria artesanal em Fortaleza
          </DialogDescription>
          <DialogClose className="mobile-close" aria-label="Fechar menu">
            <X />
          </DialogClose>
          <nav aria-label="Navegação no celular">
            {[
              ['Cardápio', '#cardapio'],
              ['A maCAKES', '#sobre'],
              ['Visite a loja', '#contato'],
            ].map(([label, href], i) => (
              <a
                key={href}
                style={{ animationDelay: `${i * 65}ms` }}
                href={href}
                onClick={() => setOpen(false)}
              >
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  );
}
export function Photo({
  src,
  alt,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <button
      className={`photo ${className}`}
      data-gallery-src={src}
      data-gallery-alt={alt}
      aria-label={`Ampliar foto: ${alt}`}
      onClick={() =>
        window.dispatchEvent(new CustomEvent('macakes-photo', { detail: src }))
      }
    >
      <img
        src={src}
        alt={alt}
        width={700}
        height={1050}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
      <span className="photo-zoom" aria-hidden="true">
        ↗
      </span>
    </button>
  );
}
export function SiteMotion() {
  const [photos, setPhotos] = useState<{ src: string; alt: string }[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    if (!reduced) {
      nodes.forEach((node, index) => {
        node.style.setProperty('--delay', `${(index % 4) * 45}ms`);
        node.classList.add('will-reveal');
        observer.observe(node);
      });
    } else {
      nodes.forEach((node) => node.classList.add('revealed'));
    }
    const all = Array.from(
      document.querySelectorAll<HTMLElement>('[data-gallery-src]'),
    )
      .map((el) => ({
        src: el.dataset.gallerySrc!,
        alt: el.dataset.galleryAlt!,
      }))
      .filter(
        (photo, i, array) => array.findIndex((p) => p.src === photo.src) === i,
      );
    setPhotos(all);
    const show = (event: Event) => {
      const index = all.findIndex(
        (p) => p.src === (event as CustomEvent<string>).detail,
      );
      if (index >= 0) setCurrent(index);
    };
    window.addEventListener('macakes-photo', show);
    return () => {
      observer.disconnect();
      window.removeEventListener('macakes-photo', show);
    };
  }, []);
  const move = (direction: number) =>
    setCurrent((value) =>
      value === null
        ? null
        : (value + direction + photos.length) % photos.length,
    );
  return (
    <Dialog
      open={current !== null}
      onOpenChange={(open) => {
        if (!open) setCurrent(null);
      }}
    >
      <DialogContent
        className="photo-dialog"
        showCloseButton={false}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') move(1);
          if (e.key === 'ArrowLeft') move(-1);
        }}
      >
        <DialogTitle className="sr-only">
          {current === null ? 'Fotografias maCAKES' : photos[current]?.alt}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Use as setas para navegar pelas fotografias e Escape para fechar.
        </DialogDescription>
        <DialogClose className="lightbox-close" aria-label="Fechar fotografia">
          <X />
        </DialogClose>
        {current !== null && (
          <>
            <img
              key={photos[current]?.src}
              src={photos[current]?.src}
              alt={photos[current]?.alt}
              onTouchStart={(e) => {
                touch.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touch.current !== null) {
                  const distance = touch.current - e.changedTouches[0].clientX;
                  if (Math.abs(distance) > 45) move(distance > 0 ? 1 : -1);
                  touch.current = null;
                }
              }}
            />
            <div className="lightbox-caption">
              <button aria-label="Foto anterior" onClick={() => move(-1)}>
                <ChevronLeft />
              </button>
              <span>{photos[current]?.alt}</span>
              <button aria-label="Próxima foto" onClick={() => move(1)}>
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
export function SocialLinks({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="contact-links">
      <a
        href="https://www.instagram.com/macakesconfeitaria/"
        target="_blank"
        rel="noopener noreferrer"
        data-reveal="icon"
      >
        <InstagramIcon />
        @macakesconfeitaria
      </a>
      <a href={whatsapp} data-reveal="icon">
        <WhatsAppIcon />
        (85) 98123-7701
      </a>
    </div>
  );
}
