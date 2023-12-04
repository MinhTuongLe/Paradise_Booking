import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import FavoriteClient from "./FavoriteClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";

export const dynamic = "force-dynamic";

const FavoritePage = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  if (!accessToken || user?.role === 3) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  const listings = [
    ,
    {
      id: 1,
      title: "Wishlist 1",
      cover: "",
    },
    {
      id: 2,
      title: "Wishlist 2",
      cover: "",
    },
  ];

  if (!listings || listings?.length === 0)
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
      <FavoriteClient listings={listings} />
    </ClientOnly>
  );
};

export default FavoritePage;
