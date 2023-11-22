import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import getPlaces from "./actions/getPlaces";

export const dynamic = "force-dynamic";

export default async function Home({}) {
  const places = await getPlaces();

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
                // currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
