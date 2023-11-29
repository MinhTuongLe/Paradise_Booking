import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ReservationsClient from "./ReservationsClient";

export const dynamic = "force-dynamic";

const ReservationsPage = async (props) => {
  // if (!currentUser) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState title="Unauthorized" subtitle="Please login" />
  //     </ClientOnly>
  //   );
  // }

  // // const reservations = await getReservation({
  // //   authorId: currentUser.id,
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
  //         title="No Reservation found"
  //         subtitle="Looks like you have no reservations on your properties."
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <ClientOnly>
      <ReservationsClient
      // reservations={reservations}
      // currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
