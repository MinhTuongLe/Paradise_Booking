import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import getPlaces from "./actions/getPlaces";
import { mock_data } from "../mock-data/listing";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  // const listing = await getListings(searchParams);
  // const listing = mock_data.listings;
  const currentUser = await getCurrentUser();
  const places = await getPlaces();
  // console.log(places);

  // const currentUser = localStorage.

  if (places.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-8 overflow-x-hidden">
          {places.data.map((place) => {
            return (
              <ListingCard
                key={place.id}
                data={place}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
