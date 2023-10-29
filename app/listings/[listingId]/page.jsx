import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservation from "@/app/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/ListingClient";
// import { mock_data } from "../../../mock-data/listing";
// import { mock_data_2 } from "../../../mock-data/reservation";

export const mock_data = {
  listings: [
    {
      id: "653cb59fa9be5d64b75c3b2e",
      title: "House 1",
      description: "Full house <3",
      imageSrc: "",
      category: "Beach",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 4,
      locationValue: "AF",
      price: 100,
      userId: "653c144ba807c04dc0ac3bc3",
      createdAt: "2023-10-29T12:00:00Z",
    },
    {
      id: "653cb59fa9be5d64b75c3b2f",
      title: "House 2",
      description: "Lovely house <3",
      imageSrc:
        "https://res.cloudinary.com/dypvuoc4n/image/upload/v1698477444/txudbasedbxwbttf5x4s.jpg",
      category: "Windmills",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 6,
      locationValue: "AF",
      price: 150,
      userId: "653c144ba807c04dc0ac3bc3",
      createdAt: "2023-10-29T14:00:00Z",
    },
  ],
};

export const mock_data_2 = {
  reservations: [
    {
      id: "653cbab43bdd2ab25ecac3f1",
      userId: "653c144ba807c04dc0ac3bc3",
      listingId: "653cb59fa9be5d64b75c3b2f",
      startDate: "2023-10-28T07:38:08.598+00:00",
      endDate: "2023-10-28T07:38:08.598+00:00",
      totalPrice: 1,
      createdAt: "2023-10-28T07:39:32.200+00:00",
    },
  ],
};

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
