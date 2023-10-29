import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import TripsClient from "./TripsClient";
import { mock_data } from "../../mock-data/listing";
import { mock_data_2 } from "../../mock-data/reservation";

// export const mock_data = {
//   listings: [
//     {
//       id: "653cb59fa9be5d64b75c3b2e",
//       title: "House 1",
//       description: "Full house <3",
//       imageSrc: "",
//       category: "Beach",
//       roomCount: 2,
//       bathroomCount: 1,
//       guestCount: 4,
//       locationValue: "AF",
//       price: 100,
//       userId: "653c144ba807c04dc0ac3bc3",
//       createdAt: "2023-10-29T12:00:00Z",
//     },
//     {
//       id: "653cb59fa9be5d64b75c3b2f",
//       title: "House 2",
//       description: "Lovely house <3",
//       imageSrc:
//         "https://res.cloudinary.com/dypvuoc4n/image/upload/v1698477444/txudbasedbxwbttf5x4s.jpg",
//       category: "Windmills",
//       roomCount: 3,
//       bathroomCount: 2,
//       guestCount: 6,
//       locationValue: "AF",
//       price: 150,
//       userId: "653c144ba807c04dc0ac3bc3",
//       createdAt: "2023-10-29T14:00:00Z",
//     },
//   ],
// };

// export const mock_data_2 = {
//   reservations: [
//     {
//       id: "653cbab43bdd2ab25ecac3f1",
//       userId: "653c144ba807c04dc0ac3bc3",
//       listingId: "653cb59fa9be5d64b75c3b2f",
//       startDate: "2023-10-28T07:38:08.598+00:00",
//       endDate: "2023-10-28T07:38:08.598+00:00",
//       totalPrice: 1,
//       createdAt: "2023-10-28T07:39:32.200+00:00",
//     },
//   ],
// };

const TripsPage = async (props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  // const reservations = await getReservation({
  //   userId: currentUser.id,
  // });

  const _reservations = mock_data_2.reservations.filter(
    (item) => item.userId === currentUser.id
  );

  const reservations = _reservations.map((item) => {
    const listingId = item.listingId;
    const listing = mock_data.listings.find((item) => item.id === listingId);
    return {
      ...item,
      listing,
    };
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
