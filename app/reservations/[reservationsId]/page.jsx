import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ReservationClient from "./ReservationClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getReservationById from "@/app/actions/getReservationById";

export const dynamic = "force-dynamic";

const ReservationPage = async ({ params }) => {
  const accessToken = cookies().get("accessToken")?.value;
  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  // const reservation = await getReservationById(params.reservationsId);

  let reservation;
  if (accessToken && user.role !== 3) {
    reservation = await getReservationById(params.reservationsId);
  } else {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <ClientOnly>
      <ReservationClient reservation={reservation} />
    </ClientOnly>
  );
};

export default ReservationPage;
