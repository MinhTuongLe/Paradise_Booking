import getCurrentUser from "@/app/actions/getCurrentUser";
import getPlaceById from "@/app/actions/getPlaceById";
import getUserById from "@/app/actions/getUserById";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/ListingClient";
import { mock_data } from "../../../mock-data/listing";
import { mock_data_2 } from "../../../mock-data/reservation";

export const dynamic = "force-dynamic";

const ListingPage = async ({ params }) => {
  // const listing = await getListingById(params);
  const { place, vendor_id } = await getPlaceById(params.listingId);
  const vendor = await getUserById(vendor_id);
  console.log(vendor_id);
  console.log(vendor);

  const listing = mock_data.listings.find(
    (item) => item.id === params.listingId
  );
  // const reservations = await getReservation(params);
  const reservations = mock_data_2.reservations.filter(
    (item) => item.listingId === params.listingId
  );

  const currentUser = await getCurrentUser();

  if (!place) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        place={place}
        currentUser={vendor}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
