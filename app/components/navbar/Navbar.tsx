'use client';

import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

type Props = {};

const Navbar: React.FC<Props> = ({}) => {
  return (
    <nav className='fixed w-full z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
