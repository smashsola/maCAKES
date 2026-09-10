import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'maCAKES | Sweet tastes. Sweet experiences.',
  icons: {
    icon: [{ url: '/assets/logo-oficial.webp', type: 'image/webp' }],
    apple: '/assets/logo-oficial.webp',
  },
  description:
    'Conheça as tortas, taças e sobremesas da maCAKES Confeitaria, em Fortaleza. Consulte o cardápio e encomende pelo WhatsApp.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
