import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ReservationClient from "./ReservationClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getPlaceById from "@/app/actions/getPlaceById";
import RoomsModal from "@/components/models/RoomsModal";

export const dynamic = "force-dynamic";

const ReservationPage = async ({}) => {
  const accessToken = cookies().get("accessToken")?.value;
  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  let place;
  if (accessToken && user.role !== 3) {
    const { place: fetchedPlace, vendor_id } = await getPlaceById(41);
    place = fetchedPlace;
  } else {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  // console.log(places);

  return (
    <ClientOnly>
      <ReservationClient place={place} currentUser={user} />
    </ClientOnly>
  );
};

export default ReservationPage;
