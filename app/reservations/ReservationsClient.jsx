/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import ReservationItem from "@/components/ReservationItem";
import Button from "@/components/Button";

function ReservationsClient() {
  // function ReservationsClient({ reservations, currentUser }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.info("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <div className="mt-10">
        <Heading title="Reservations" subtitle="Your reservation list" />
      </div>
      {/* <div className="mt-6 space-y-6">
        <span className="text-[24px] font-bold">
          You don't have any reservation to display
        </span>
        <div className="max-w-[160px]">
          <Button label="Booking now" onClick={() => router.push("/")} />
        </div>
      </div> */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
      </div>
    </Container>
  );
}

export default ReservationsClient;
