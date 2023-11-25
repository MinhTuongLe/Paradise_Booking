import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import getPlaces from "./actions/getPlaces";
import PaginationComponent from "@/components/PaginationComponent";
import { LIMIT } from "@/const";
export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  // console.log(searchParams);

  const { places, paging } = await getPlaces(
    searchParams || { page: 1, limit: LIMIT }
  );

  if (places?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-5 2xl:col-span-1 gap-8 overflow-x-hidden">
          {places &&
            places.map((place) => {
              return (
                <ListingCard
                  key={place.id}
                  data={place}
                  // currentUser={currentUser}
                />
              );
            })}
        </div>
        <PaginationComponent
          page={Number(searchParams?.page) || 1}
          total={paging?.total || LIMIT}
          limit={paging?.limit || LIMIT}
        />
      </Container>
    </ClientOnly>
  );
}
