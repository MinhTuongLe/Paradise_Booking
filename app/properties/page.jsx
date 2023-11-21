import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getPlaceByVendorId from "@/app/actions/getPlaceByVendorId";
import getUserById from "@/app/actions/getUserById";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const PropertiesPage = async () => {
  let unauthorized = false;
  const userId = cookies().get("userId")?.value;
  if (!userId) unauthorized = true;
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) unauthorized = true;

  const user = await getUserById(userId);
  let places = [];
  if (user?.role === 2) places = await getPlaceByVendorId(userId);
  else unauthorized = true;

  if (unauthorized) {
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
