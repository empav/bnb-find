import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { toast } from 'react-hot-toast';

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });
    return favorites || [];
  } catch (error) {
    toast.error('Something went wrong!');
    return [];
  }
}
