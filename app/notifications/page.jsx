import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import NotificationClient from "./NotificationClient";

export const dynamic = "force-dynamic";

const NotificationPage = async (props) => {

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
  return <NotificationClient />;
};

export default NotificationPage;
