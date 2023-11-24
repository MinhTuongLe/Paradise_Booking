import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import TripsClient from "./TripsClient";
import { mock_data } from "../../mock-data/listing";
import { mock_data_2 } from "../../mock-data/reservation";

export const dynamic = "force-dynamic";

const TripsPage = async (props) => {
  // if (!currentUser) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState title="Unauthorized" subtitle="Please login" />
  //     </ClientOnly>
  //   );
  // }

  // // const reservations = await getReservation({
  // //   userId: currentUser.id,
  // // });

  // const _reservations = mock_data_2.reservations.filter(
  //   (item) => item.userId === currentUser.id
  // );

  // const reservations = _reservations.map((item) => {
  //   const listingId = item.listingId;
  //   const listing = mock_data.listings.find((item) => item.id === listingId);
  //   return {
  //     ...item,
  //     listing,
  //   };
  // });

  // if (reservations.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="No trips found"
  //         subtitle="Looks like you havent reserved any trips."
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <ClientOnly>
      {/* <TripsClient reservations={reservations} currentUser={currentUser} /> */}
      Trips Page
    </ClientOnly>
  );
};

export default TripsPage;
