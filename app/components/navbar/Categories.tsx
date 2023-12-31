'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from '../CategoryBox';
import Container from '../Container';
import useCategories from '@/app/hooks/useCategories';

const Categories = () => {
  const categories = useCategories();
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
