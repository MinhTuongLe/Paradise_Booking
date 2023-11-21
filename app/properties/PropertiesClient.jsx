/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import { API_URL } from "@/const";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

function PropertiesClient({ listings, currentUser }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const onDelete = (id) => {
    setIsLoading(true);
    const accessToken = Cookie.get("accessToken");
    const config = {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .delete(`${API_URL}/places`, config)
      .then(() => {
        toast.success(`Delete room successfully`);
        setIsLoading(false);
        router.refresh();
      })
      .catch(() => {
        toast.error("Delete room failed");
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {!isLoading &&
          listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;
