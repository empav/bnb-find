'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      className='
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition
      '
    >
      <div
        className='
          flex 
          flex-row 
          items-center 
          justify-between
        '
      >
        <div
          className='
            text-sm 
            font-semibold 
            px-4
          '
        >
          {locationLabel}
        </div>
        <div
          className='
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-4 
            border-x-[1px] 
            flex-1 
            text-center
          '
        >
          {durationLabel}
        </div>
        <div
          className='
            text-sm 
            pl-2 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          '
        >
          <div className='hidden sm:block'>{guestLabel}</div>
          <div
            className='
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
              cursor-pointer
            '
          >
            <BiSearch size={16} onClick={searchModal.onOpen} />
          </div>
          <div className='cursor-pointer'>
            <AiOutlineClose onClick={() => router.push('/')} size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
