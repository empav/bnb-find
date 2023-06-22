'use client';

import { PuffLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <PuffLoader size={100} color='#F43F5E' />
    </div>
  );
};

export default Spinner;
