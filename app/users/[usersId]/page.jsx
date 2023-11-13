import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../../actions/getCurrentUser";
import UserClient from "./UserClient";
import { mock_data } from "../../../mock-data/listing";

export const dynamic = "force-dynamic";

const UserPage = async (props) => {
  const currentUser = await getCurrentUser();
  const listing = mock_data.listings;

  // if (!currentUser) {
  //   return <EmptyState title="Unauthorized" subtitle="Please login" />;
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
  return <UserClient listing={listing} currentUser={currentUser} />;
};

export default UserPage;
