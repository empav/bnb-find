'use client';

import { useClickOutside } from '@react-hooks-library/core';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useRef, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

type UserMenuProps = {
  currentUser?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleSignup = useCallback(() => {
    toggleOpen();
    registerModal.onOpen();
  }, [registerModal, toggleOpen]);

  const handleLogin = useCallback(() => {
    toggleOpen();
    loginModal.onOpen();
  }, [loginModal, toggleOpen]);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className='relative'>
      <div className='flex items-center gap-3'>
        {currentUser && (
          <div
            className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-rose-500 hover:text-white transition cursor-pointer'
            onClick={rentModal.onOpen}
          >
            Rent my home
          </div>
        )}
        <div
          onClick={toggleOpen}
          className='p-1 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu className='hidden md:block' />
          <Avatar src={currentUser?.image} />
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className='absolute rounded-xl shadow-md w-[50vw] md:w-[20vw] bg-white overflow-hidden right-0 top-12 text-sm'
          >
            <div className='flex flex-col cursor-pointer'>
              {currentUser ? (
                <>
                  <MenuItem
                    label='My trips'
                    onClick={() => router.push('/trips')}
                  />
                  <MenuItem
                    label='My favorites'
                    onClick={() => router.push('/favorites')}
                  />
                  <MenuItem
                    label='My properties'
                    onClick={() => router.push('/properties')}
                  />
                  <MenuItem
                    label='Am I booked?'
                    onClick={() => router.push('/reservations')}
                  />
                  <hr />
                  <MenuItem label='Logout' onClick={signOut} />
                </>
              ) : (
                <>
                  <MenuItem label='Login' onClick={handleLogin} />
                  <MenuItem label='Sign up' onClick={handleSignup} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
