import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import PropertyClient from "./PropertyClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getPlaceById from "@/app/actions/getPlaceById";
import getReservationByPlaceId from "@/app/actions/getReservationByPlaceId";

export const dynamic = "force-dynamic";

const PropertyPage = async ({ params }) => {
  const accessToken = cookies().get("accessToken")?.value;
  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  let place, reservations;
  if (accessToken && user.role === 2) {
    const { place: fetchedPlace, vendor_id } = await getPlaceById(
      params?.propertiesId
    );
    place = fetchedPlace;

    reservations = await getReservationByPlaceId(params?.propertiesId);
  } else {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <ClientOnly>
      <PropertyClient place={place} reservations={reservations} />
    </ClientOnly>
  );
};

export default PropertyPage;
