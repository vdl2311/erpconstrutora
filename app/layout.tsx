import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'ObraMaster ERP - Gestão de Construção Civil',
  description: 'Sistema ERP completo para gestão de obras, finanças, frota, compras e equipe.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
