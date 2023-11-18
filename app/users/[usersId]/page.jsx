import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import UserClient from "./UserClient";
import { mock_data } from "../../../mock-data/listing";

export const dynamic = "force-dynamic";

const UserPage = async (props) => {
  const listing = mock_data.listings;

  // if (typeof window !== "undefined") {
  //   const accessToken = localStorage.getItem("accessToken");
  //   console.log(accessToken);

  //   if (!accessToken) {
  //     return (
  //       <ClientOnly>
  //         <EmptyState title="Unauthorized" subtitle="Please login" />
  //       </ClientOnly>
  //     );
  //   }
  // }

  // const listings = await getListings({ userId: currentUser.id });

  // const listings = mock_data.listings.filter(
  //   (item) => item.userId === currentUser.id
  // );

  // if (listings.length === 0) {
  //   return (
  //     <EmptyState
  //       title="No Profile found"
  //       subtitle="Looks like you have not any Profile"
  //     />
  //   );
  // }
  return (
    <ClientOnly>
      <UserClient listing={listing} />
    </ClientOnly>
  );
};

export default UserPage;
