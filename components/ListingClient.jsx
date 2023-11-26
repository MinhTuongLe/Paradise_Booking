"use client";

import useLoginModel from "@/hook/useLoginModal";
import useReportModal from "@/hook/useReportModal";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

import Container from "./Container";
import ListingHead from "./listing/ListingHead";
import ListingInfo from "./listing/ListingInfo";
import ListingReservation from "./listing/ListingReservation";
import { categories } from "./navbar/Categories";
import ListingComments from "./listing/ListingComments";
import { IoChevronBack } from "react-icons/io5";
import Image from "next/image";
import { FaBusinessTime, FaFlag, FaStar } from "react-icons/fa";
import Button from "./Button";
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function ListingClient({ reservations = [], place, currentUser }) {
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
  const coordinates = [place.lat, place.lng];

  const router = useRouter();
  const loginModal = useLoginModel();
  const reportModal = useReportModal();

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
  const [totalPrice, setTotalPrice] = useState(place.price_per_night);
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
        placeId: place.id,
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
  }, [totalPrice, dateRange, place.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const count = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      setDayCount(count);

      if (count && place.price_per_night) {
        setTotalPrice(count * place.price_per_night);
      } else {
        setTotalPrice(place.price_per_night);
      }
    }
  }, [dateRange, place.price_per_night]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === place.category);
  }, [place.category]);

  return (
    <Container>
      {!paymentMode ? (
        <div className="w-full mx-auto mt-4">
          <div className="flex flex-col">
            <ListingHead
              title={place.name}
              imageSrc={place.cover || emptyImageSrc}
              locationValue={place.country}
              id={place.id}
              currentUser={currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 my-8">
              <ListingInfo
                user={currentUser}
                category={category}
                description={place.description}
                roomCount={place.roomCount || 0}
                guestCount={place.guestCount || 0}
                bathroomCount={place.bathroomCount || 0}
                locationValue={place.country}
              />
              <div className="order-first mb-10 md:order-last md:col-span-3 space-y-6">
                <ListingReservation
                  price={place.price_per_night}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={() => setPaymentMode(true)}
                  disabled={isLoading}
                  disabledDates={disableDates}
                />
                <div className="w-full flex justify-center items-start">
                  <div
                    className="flex justify-center items-center gap-4 cursor-pointer"
                    onClick={reportModal.onOpen}
                  >
                    <FaFlag size={16} />
                    <span className="underline">Report this room</span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <ListingComments />
            <hr />
            <div className="my-8 w-1/2">
              <p className="text-xl font-semibold mb-8">{`Where you’ll be`}</p>
              <Map center={coordinates} locationValue={place.country} />
            </div>
            <hr />
            <div className="my-8 w-full">
              <p className="flex gap-1 text-2xl font-semibold mb-4">
                Things to know
              </p>
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4">
                  <p className="flex gap-1 text-lg font-semibold mb-2">
                    House rules
                  </p>
                  <ul className="flex flex-col justify-between items-start text-md font-thin space-y-2">
                    <li className="text-md font-thin">Checkin after 15:00</li>
                    <li className="text-md font-thin">Checkout before 12:00</li>
                    <li className="text-md font-thin">Maximum 14 guest</li>
                  </ul>
                </div>
                <div className="col-span-4">
                  <p className="flex gap-1 text-lg font-semibold mb-2">
                    Safe rules
                  </p>
                  <ul className="flex flex-col justify-between items-start text-md font-thin space-y-2">
                    <li className="text-md font-thin">
                      There is no information about having a CO gas detector
                    </li>
                    <li className="text-md font-thin">
                      There is no information about the presence of smoke
                      detectors
                    </li>
                  </ul>
                </div>
                <div className="col-span-4">
                  <p className="flex gap-1 text-lg font-semibold mb-2">
                    Cancel rules
                  </p>
                  <ul className="flex flex-col justify-between items-start text-md font-thin space-y-2">
                    <li className="text-md font-thin">
                      Partial refund: Receive a refund for all nights 24 hours
                      or more before your cancellation. There are no refunds for
                      service fees or charges for nights you have stayed
                    </li>
                    <li className="text-md font-thin">
                      Please read the entire Host/Organizer cancellation policy
                      which applies even if you cancel due to illness or
                      disruption due to COVID-19
                    </li>
                  </ul>
                </div>
              </div>
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
                <span className="text-lg font-bold block">
                  Contact to vendor
                </span>
                <div className="flex justify-start items-center space-x-6 my-4">
                  <Image
                    width={40}
                    height={40}
                    src={emptyImageSrc}
                    alt="Avatar"
                    className="rounded-full h-[40px] w-[40px]"
                  />
                  <div>
                    <h1 className="text-md font-bold space-y-3">Conal</h1>
                    <p>tháng 11 năm 2023</p>
                  </div>
                </div>
                <textarea
                  className="order border-solid border-[1px] p-4 rounded-lg w-full focus:outline-none"
                  rows={5}
                ></textarea>
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
                      src={place.imageSrc || emptyImageSrc}
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
                      $ {place?.price_per_night ? place?.price_per_night : 0} x{" "}
                      {dayCount ? dayCount : 1}
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
