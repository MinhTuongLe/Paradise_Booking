"use client";

import useLoginModel from "@/hook/useLoginModal";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

import useCountries from "@/hook/useCountries";
import Container from "./Container";
import ListingHead from "./listing/ListingHead";
import ListingInfo from "./listing/ListingInfo";
import ListingReservation from "./listing/ListingReservation";
import { categories } from "./navbar/Categories";
import ListingComments from "./listing/ListingComments";
import { IoChevronBack } from "react-icons/io5";
import Image from "next/image";
import { FaBusinessTime, FaStar } from "react-icons/fa";
import Button from "./Button";
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function ListingClient({ reservations = [], listing, currentUser }) {
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
  const { getByValue } = useCountries();
  const coordinates = getByValue(listing.locationValue).latlng;

  const router = useRouter();
  const loginModal = useLoginModel();

  const disableDates = useMemo(() => {
    let dates = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [paymentMode, setPaymentMode] = useState(false);
  const [dayCount, setDayCount] = useState(1);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Success!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const count = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      setDayCount(count);

      if (count && listing.price) {
        setTotalPrice(count * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      {!paymentMode ? (
        <div className="w-full mx-auto mt-4">
          <div className="flex flex-col">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc || emptyImageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 my-8">
              <ListingInfo
                user={currentUser}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
              <div className="order-first mb-10 md:order-last md:col-span-3 space-y-6">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={() => setPaymentMode(true)}
                  disabled={isLoading}
                  disabledDates={disableDates}
                />
              </div>
            </div>
            <hr />
            <ListingComments />
            <hr />
            <div className="my-8 w-1/2">
              <p className="text-xl font-semibold mb-8">{`Where you’ll be`}</p>
              <Map center={coordinates} locationValue={listing.locationValue} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[80%] mx-auto mt-12">
          <div className="flex justify-start items-start space-x-6">
            <IoChevronBack
              size={16}
              onClick={() => setPaymentMode(false)}
              className="cursor-pointer"
            />
            <span className="text-xl font-extrabold">Finish your booking</span>
          </div>
          <div className="grid grid-cols-12 w-full mt-8 space-x-16">
            <div className="col-span-7">
              <div className="mb-6">
                <span className="text-lg font-bold">Your booking info</span>
                <div className="flex flex-col justify-between items-start mt-4">
                  <span className="text-md font-bold">Date</span>
                  <span className="text-md font-thin">November 15 - 20</span>
                </div>
                <div className="flex flex-col justify-between items-start">
                  <span className="text-md font-bold">Guest</span>
                  <span className="text-md font-thin">1 guest</span>
                </div>
              </div>
              <hr />
              <div className="my-6">
                <span className="text-lg font-bold">General rule</span>
                <ul className="flex flex-col justify-between items-start mt-4 text-md font-thin">
                  We ask all guests to remember a few simple rules to be a great
                  guest.
                  <li className="text-md font-thin">
                    - Comply with house rules
                  </li>
                  <li className="text-md font-thin">
                    - Maintain the house as if it were your home
                  </li>
                </ul>
              </div>
              <hr />
              <div className="w-full flex justify-between items-start space-x-4 my-6">
                <FaBusinessTime size={64} />
                <span className="text-lg font-semibold">
                  Your reservation/reservation will not be confirmed until the
                  host/organizer accepts your request (within 24 hours).
                  <span className="font-thin ml-2">
                    You will not be charged until then.
                  </span>
                </span>
              </div>
              <hr />
              <div className="w-1/3 mt-6">
                <Button
                  disabled={isLoading}
                  label="Reservation"
                  onClick={onCreateReservation}
                />
              </div>
            </div>
            <div className="col-span-5">
              <div className="p-4 space-y-4 border-[1px] rounded-xl">
                <div className="w-full flex justify-between items-center space-x-4">
                  <div className="w-[30%]">
                    <Image
                      width={500}
                      height={500}
                      src={listing.imageSrc || emptyImageSrc}
                      alt="room image"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="w-[70%]">
                    <div className="space-y-1">
                      <p className="text-sm font-thin">Room type</p>
                      <p className="text-md font-bold">Room name</p>
                    </div>
                    <div className="flex items-center justify-start space-x-2">
                      <FaStar size={8} />
                      <span className="text-sm font-bold">5.0</span>
                      <span className="text-sm font-thin">(4 comments)</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <span className="text-lg font-bold">Price details</span>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-md font-thin">
                      $ {listing?.price ? listing?.price : 0} x{" "}
                      {dayCount ? dayCount : 0}
                    </span>
                    <span className="text-md font-thin">$ {totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-md font-thin">Service fee</span>
                    <span className="text-md font-thin">$ 0</span>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                  <span className="text-md font-bold">Total (USD):</span>
                  <span className="text-md font-bold">$ {totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default ListingClient;
