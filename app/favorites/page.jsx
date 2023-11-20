import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import FavoritesClient from "./FavoritesClient";

export const dynamic = "force-dynamic";

const FavoritePage = async (props) => {
  // // const listings = await getFavoriteListings();
  // const listings = mock_data.listings.filter((item) =>
  //   currentUser.favoriteIds.includes(item.id)
  // );

  // if (!currentUser) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState title="Unauthorized" subtitle="Please login" />
  //     </ClientOnly>
  //   );
  // }

  // if (listings.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="No favorites found"
  //         subtitle="Looks like you have no favorite listings."
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <ClientOnly>
      {/* <FavoritesClient listings={listings} currentUser={currentUser} /> */}
      Favorite Page
    </ClientOnly>
  );
};

export default FavoritePage;
