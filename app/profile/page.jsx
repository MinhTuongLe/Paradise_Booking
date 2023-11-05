import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ProfileClient from "./ProfileClient";
import { mock_data } from "../../mock-data/listing";

const ProfilePage = async (props) => {
  // const currentUser = await getCurrentUser();

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
  return <ProfileClient />;
};

export default ProfilePage;
