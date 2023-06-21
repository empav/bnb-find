'use client';

import Image from 'next/image';

type AvatarProps = {
  src: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className='rounded-full min-w-[40px]'
      height='40'
      width='40'
      alt='Avatar'
      src={src || '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;
