import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getPlaceByVendorId from "@/app/actions/getPlaceByVendorId";
import getUserById from "@/app/actions/getUserById";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const PropertiesPage = async () => {
  const userId = cookies().get("userId").value;
  // console.log(userId);
  const accessToken = cookies().get("accessToken").value;
  // console.log(accessToken);

  const user = await getUserById(userId);
  console.log(user);
  let places = [];
  if (user.role === 2) places = await getPlaceByVendorId(userId);
  console.log(places, user);

  if (!accessToken || user.role !== 2) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (places.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you have not any Properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={places} currentUser={user} />
    </ClientOnly>
  );
};

export default PropertiesPage;
