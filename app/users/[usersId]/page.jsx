import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import UserClient from "./UserClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getPlaceByVendorId from "@/app/actions/getPlaceByVendorId";
import RoomsModal from "@/components/models/RoomsModal";

export const dynamic = "force-dynamic";

const UserPage = async ({ params }) => {
  const accessToken = cookies().get("accessToken")?.value;

  const user = await getUserById(params?.usersId);

  // let places = [];
  // if (user.id === 2) places = await getPlaceByVendorId(user.id);
  const places = await getPlaceByVendorId(user?.id);

  if (!accessToken && user.role !== 2) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  return (
    <ClientOnly>
      <RoomsModal currentUser={user} places={places} />
      <UserClient places={places} currentUser={user} role={user.role} />
    </ClientOnly>
  );
};

export default UserPage;
