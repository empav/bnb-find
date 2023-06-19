'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';

type Props = {};

const UserMenu: React.FC<Props> = ({}) => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleSignup = useCallback(() => {
    toggleOpen();
    registerModal.onOpen();
  }, [registerModal, toggleOpen]);

  return (
    <div className='relative'>
      <div className='flex items-center gap-3'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
          onClick={() => {}}
        >
          B&B your home
        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
        {isOpen && (
          <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
            <div className='flex flex-col cursor-pointer'>
              <>
                <MenuItem onClick={() => {}} label='Login' />
                <MenuItem onClick={handleSignup} label='Sign up' />
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
