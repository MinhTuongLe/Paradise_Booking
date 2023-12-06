import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import FavoriteClient from "./FavoriteClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getPlacesByWishlistId from "@/app/actions/getPlacesByWishlistId";
import getWishlistById from "@/app/actions/getWishlistById";

export const dynamic = "force-dynamic";

const FavoritePage = async ({ params }) => {
  const accessToken = cookies().get("accessToken")?.value;
  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  const wish_list_id = params?.favoritesId;
  let places = [];
  let wishlist = {};

  if (!accessToken || !user || user?.role === 3) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  } else {
    places = await getPlacesByWishlistId(wish_list_id);
    wishlist = await getWishlistById(wish_list_id);
  }

  if (!wishlist || !places || places?.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="Create your first Wishlist"
          subtitle="During your search, click the heart icon to save the properties and Experiences you like to your Wishlist."
        />
      </ClientOnly>
    );

  return (
    <ClientOnly>
      <FavoriteClient listings={places} wishlist={wishlist} />
    </ClientOnly>
  );
};

export default FavoritePage;
