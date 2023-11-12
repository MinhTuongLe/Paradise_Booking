import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/ListingClient";
import { mock_data } from "../../../mock-data/listing";
import { mock_data_2 } from "../../../mock-data/reservation";

export const dynamic = "force-dynamic";

const ListingPage = async ({ params }) => {
  // const listing = await getListingById(params);
  const listing = mock_data.listings.find(
    (item) => item.id === params.listingId
  );
  // const reservations = await getReservation(params);
  const reservations = mock_data_2.reservations.filter(
    (item) => item.listingId === params.listingId
  );

  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
