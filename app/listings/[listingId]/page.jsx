import getPlaceById from "@/app/actions/getPlaceById";
import getUserById from "@/app/actions/getUserById";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/ListingClient";
import getReservationByPlaceId from "@/app/actions/getReservationByPlaceId";

export const dynamic = "force-dynamic";

const ListingPage = async ({ params }) => {
  const { place, vendor_id } = await getPlaceById(params.listingId);
  const reservations = await getReservationByPlaceId(params.listingId);

  const vendor = await getUserById(vendor_id);

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
