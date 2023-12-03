import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import FavoritesClient from "./FavoritesClient";

export const dynamic = "force-dynamic";

const FavoritePage = async (props) => {

  return (
    <ClientOnly>
      {/* <FavoritesClient listings={listings} currentUser={currentUser} /> */}
      Favorite Page
    </ClientOnly>
  );
};

export default FavoritePage;
