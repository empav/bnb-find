import { Nunito } from 'next/font/google';

import './globals.css';
import Navbar from './components/navbar/Navbar';

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
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
