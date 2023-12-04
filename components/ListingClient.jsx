/* eslint-disable react-hooks/exhaustive-deps */
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
import Cookie from "js-cookie";

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
import { useForm } from "react-hook-form";
import Input from "./inputs/Input";
import { API_URL } from "@/const";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function ListingClient({ reservations = [], place, currentUser }) {
  const emptyImageSrc =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

  const location = {
    address: place.address,
    city: place.city,
    country: place.country,
  };
  const [lat, setLat] = useState(place?.lat);
  const [lng, setLng] = useState(place?.lng);

  const Map = useMemo(
    () =>
      dynamic(() => import("../components/Map"), {
        ssr: false,
      }),
    [lat, lng]
  );
  const router = useRouter();
  const loginModal = useLoginModel();
  const reportModal = useReportModal();

  const disableDates = useMemo(() => {
    let dates = [];

    reservations &&
      reservations.forEach((reservation) => {
        const range = eachDayOfInterval({
          start: new Date(reservation.checkin_date),
          end: new Date(reservation.checkout_date),
        });

        dates = [...dates, ...range];
      });
    return dates;
  }, [reservations]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      guest_name: "",
      content_to_vendor: "",
      number_of_guest: place.max_guest || 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(place.price_per_night);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [paymentMode, setPaymentMode] = useState(false);
  const [dayCount, setDayCount] = useState(1);
  const [bookingMode, setBookingMode] = useState(1);

  const [searchResult, setSearchResult] = useState(null);
  const handleSearchResult = (result) => {
    setSearchResult(result);
  };

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onCreateReservation = async (data) => {
    try {
      setIsLoading(true);
      const checkin_date = `${dateRange.startDate.getDate()}-${dateRange.startDate.getMonth()}-${dateRange.startDate.getFullYear()}`;
      const checkout_date = `${dateRange.endDate.getDate()}-${dateRange.endDate.getMonth()}-${dateRange.endDate.getFullYear()}`;

      const submitValues = {
        user_id: currentUser.id,
        place_id: place.id,
        checkin_date,
        checkout_date,
        booking_info: {
          ...data,
          type: bookingMode,
          total_price: totalPrice,
          number_of_guest: Number(data.number_of_guest),
        },
      };

      if (data.number_of_guest > place.max_guest) {
        toast.error(
          "No guest must be less or equal to max guest(s) of this place"
        );
        return;
      }

      const accessToken = Cookie.get("accessToken");
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios
        .post(`${API_URL}/bookings`, submitValues, config)
        .then((response) => {
          setIsLoading(false);
          toast.success(
            "Booking Successfully! Please check your email in 1 day to confirm."
          );
          router.refresh();
          reset();
          router.push(`/reservations/${response.data.data.id}`);
        })
        .catch((err) => {
          toast.error("Booking Failed");
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    if (searchResult) {
      setLat(searchResult.y);
      setLng(searchResult.x);
    }
  }, [searchResult]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [paymentMode]);

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
              locationValue={location}
              id={place.id}
              currentUser={currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 my-8">
              <ListingInfo
                user={currentUser}
                category={category}
                description={place.description}
                roomCount={place.roomCount || 0}
                guestCount={place.max_guest || 0}
                bathroomCount={place.bathroomCount || 0}
              />
              <div className="order-first mb-10 md:order-last md:col-span-3 space-y-6">
                <ListingReservation
                  price={place.price_per_night}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={() => {
                    setPaymentMode(true);
                  }}
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
            <div className="my-8 w-full">
              <p className="text-xl font-semibold mb-8">{`Where you’ll be`}</p>
              <Map
                center={[lat, lng]}
                locationValue={place.country}
                onSearchResult={handleSearchResult}
              />
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
              onClick={() => {
                setPaymentMode(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer"
            />
            <span className="text-xl font-extrabold">Finish your booking</span>
          </div>
          <div className="grid grid-cols-12 w-full mt-8 space-x-16">
            <div className="col-span-7">
              <div className="mb-6">
                <span className="text-lg font-bold mb-6 block">
                  Your booking info
                </span>
                <Input
                  id="full_name"
                  label="Full Name"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <div className="flex gap-6 my-6">
                  <div className="flex-1">
                    <Input
                      id="phone"
                      label="Phone"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                      type="tel"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      id="email"
                      label="Email"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                      type="email"
                    />
                  </div>
                </div>
                <Input
                  id="number_of_guest"
                  label="No Guest"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                  type="number"
                />
              </div>
              <hr />
              <div className="my-6">
                <div className="flex gap-6 my-6">
                  <div className="flex-1 flex gap-6 justify-start items-center">
                    <input
                      type="radio"
                      id="forMyself"
                      name="bookingMode"
                      value={bookingMode}
                      onChange={() => setBookingMode(1)}
                      defaultChecked={bookingMode === 1}
                      className="w-[20px] h-[20px]"
                      required
                    />
                    <label htmlFor="forMyself">Booking for myself</label>
                  </div>
                  <div className="flex-1 flex gap-6 justify-start items-center">
                    <input
                      type="radio"
                      id="forOther"
                      name="bookingMode"
                      value={bookingMode}
                      onChange={() => setBookingMode(2)}
                      defaultChecked={bookingMode === 2}
                      className="w-[20px] h-[20px]"
                      required
                    />
                    <label htmlFor="forOther">Booking for other</label>
                  </div>
                </div>
                {bookingMode === 2 && (
                  <Input
                    id="guest_name"
                    label="Guest Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                  />
                )}
              </div>
              <hr />
              <div className="my-6">
                <div className="flex flex-col justify-between items-start mt-4">
                  <span className="text-md font-bold">Date</span>
                  <span className="text-md font-thin">
                    {dayCount > 1
                      ? `${dateRange.startDate.getDate()}/${dateRange.startDate.getMonth()}/${dateRange.startDate.getFullYear()} - ${dateRange.endDate.getDate()}/${dateRange.endDate.getMonth()}/${dateRange.endDate.getFullYear()}`
                      : `${dateRange.startDate.getDate()}/${dateRange.startDate.getMonth()}/${dateRange.startDate.getFullYear()}`}
                  </span>
                </div>
                <div className="flex flex-col justify-between items-start">
                  <span className="text-md font-bold">Place max guest(s)</span>
                  <span className="text-md font-thin">
                    {place.max_guest || 0} guest(s)
                  </span>
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
                    src={currentUser?.avatar || emptyImageSrc}
                    alt="Avatar"
                    className="rounded-full h-[40px] w-[40px]"
                    priority
                  />
                  <div>
                    <h1 className="text-md font-bold space-y-3">
                      {currentUser?.full_name || "User"}
                    </h1>
                    <p>
                      {currentUser.created
                        .split(" ")[0]
                        .split("-")
                        .reverse()
                        .join("/") || "-"}
                    </p>
                  </div>
                </div>
                <textarea
                  className="order border-solid border-[1px] p-4 rounded-lg w-full focus:outline-none"
                  rows={5}
                  name="content_to_vendor"
                  onChange={(e) =>
                    setCustomValue("content_to_vendor", e.target.value)
                  }
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
                  onClick={handleSubmit(onCreateReservation)}
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
                      src={place?.cover || emptyImageSrc}
                      alt="room image"
                      className="rounded-xl"
                      priority
                    />
                  </div>
                  <div className="w-[70%]">
                    <div className="space-y-1">
                      <p className="text-sm font-thin">Room type</p>
                      <p className="text-md font-bold">
                        {place?.name || "Room Name"}
                      </p>
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
