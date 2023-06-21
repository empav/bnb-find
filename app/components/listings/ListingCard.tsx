'use client';

import Image from 'next/image';
import useCountries from '@/app/hooks/useCountries';
import { Listing } from '@prisma/client';

interface ListingCardProps {
  data: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  return (
    <div onClick={() => {}} className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col gap-2 w-full'>
        <div
          className='
            aspect-square
            relative 
            w-full  
            overflow-hidden 
            rounded-xl
          '
        >
          <Image
            fill
            className='
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            '
            src={data.imageSrc}
            alt='Listing'
          />
        </div>
        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>{data.category}</div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>
            $ {data.price}{' '}
            <span className='font-light text-neutral-500'>night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
