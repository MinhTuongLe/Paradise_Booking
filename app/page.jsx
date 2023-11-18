import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { mock_data } from "../mock-data/listing";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  // const listing = await getListings(searchParams);
  const listing = mock_data.listings;
  const currentUser = await getCurrentUser();
  // const expiresAt = localStorage.getItem("expiresAt");

  // const currentTimestamp = Math.floor(Date.now() / 1000);

  // if (currentTimestamp >= expiresAt) {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("expiresAt");
  //   console.log("Token has expired. Removed from localStorage.");
  // } else {
  //   console.log("Token is still valid.");
  // }

  // const currentUser = localStorage.

  if (listing.length === 0) {
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
          {listing.map((list) => {
            return (
              <ListingCard
                key={list.id}
                data={list}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
