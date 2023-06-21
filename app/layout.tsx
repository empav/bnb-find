import './globals.css';

import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ToastProvider from './providers/ToastProvider';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/modals/RentModal';

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
        <RentModal />
        <div className='pt-28 pb-20'>{children}</div>
      </body>
    </html>
  );
}
