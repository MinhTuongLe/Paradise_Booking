import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import PropertyClient from "./PropertyClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getPlaceById from "@/app/actions/getPlaceById";
import RoomsModal from "@/components/models/RoomsModal";

export const dynamic = "force-dynamic";

const PropertyPage = async ({ params }) => {
  const accessToken = cookies().get("accessToken")?.value;
  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  let place;
  if (accessToken && user.role === 2) {
    const { place: fetchedPlace, vendor_id } = await getPlaceById(
      params?.propertiesId
    );
    place = fetchedPlace;
  } else {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  // console.log(places);

  return (
    <ClientOnly>
      <PropertyClient place={place} />
    </ClientOnly>
  );
};

export default PropertyPage;
