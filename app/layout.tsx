import './globals.css';

import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ToastProvider from './providers/ToastProvider';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'bnb-find',
  description: 'Find a B&B',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        <RegisterModal />
        <LoginModal />
        {children}
      </body>
    </html>
  );
}
