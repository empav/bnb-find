'use client';

import Container from '../Container';
import Categories from './Categories';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

import { User } from '@prisma/client';

type NavbarProps = {
  currentUser?: User | null;
};

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className='fixed w-full z-10 shadow-sm bg-white'>
      <div className='py-2 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
