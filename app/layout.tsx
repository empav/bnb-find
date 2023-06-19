import './globals.css';

import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import ToastProvider from './providers/ToastProvider';

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
        <ToastProvider />
        <Navbar />
        <RegisterModal />
        {children}
      </body>
    </html>
  );
}
