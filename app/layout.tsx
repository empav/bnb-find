import { Nunito } from 'next/font/google';
import './globals.css';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'bnb-find',
  description: 'Find a B&B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>{children}</body>
    </html>
  );
}
