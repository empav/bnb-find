import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import EmptyState from '@/app/components/EmptyState';
import getListings, { IListingsParams } from '@/app/actions/getListings';
import getCurrentUser from './actions/getCurrentUser';

export interface IParams {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: IParams) => {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (!listings.length) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className='
            pt-12
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          '
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
