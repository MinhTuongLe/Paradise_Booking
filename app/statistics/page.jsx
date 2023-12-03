import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import StatisticsClient from "./StatisticsClient";
import getUserById from "@/app/actions/getUserById";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const StatisticsPage = async () => {
  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  if (!user || user.role !== 2) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

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
      <StatisticsClient />
    </ClientOnly>
  );
};

export default StatisticsPage;
