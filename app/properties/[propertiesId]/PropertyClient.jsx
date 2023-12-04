/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import Input from "@/components/inputs/Input";
import axios from "axios";
import { useEffect, useState, useMemo, Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import "../../../styles/globals.css";
import { API_URL, booking_status, classNames } from "@/const";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/inputs/ImageUpload";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { MdCancel, MdIncompleteCircle, MdPending } from "react-icons/md";
import { FaCalendarAlt, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";

function PropertyClient({ place, reservations }) {
  const emptyImageSrc = "/assets/avatar.png";
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const authState = useSelector((state) => state.authSlice.authState);

  const [selected, setSelected] = useState(booking_status[0]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price_per_night: place?.price_per_night,
      name: place?.name,
      description: place?.description,
      address: place?.address,
      lat: place?.lat,
      lng: place?.lng,
      country: place?.country,
      state: place?.city,
      city: place?.city,
      cover: place?.cover || "",
      max_guest: place?.max_guest,
    },
  });

  const cover = watch("cover");
  const location = watch("location");
  const [lat, setLat] = useState(place?.lat);
  const [lng, setLng] = useState(place?.lng);

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../../../components/Map"), {
        ssr: false,
      }),
    [lat, lng]
  );

  const [searchResult, setSearchResult] = useState(null);
  const handleSearchResult = (result) => {
    setSearchResult(result);
  };

  function processSearchResult() {
    const numberRegex = /^[0-9]+$/;
    let country = place.country;
    let city = place.city;
    let address = place.address;
    if (searchResult) {
      const array = searchResult?.label.split(", ");

      if (array) {
        const length = array.length;
        country = array[length - 1];
        city = numberRegex.test(array[length - 2])
          ? array[length - 3]
          : array[length - 2];
        const temp = numberRegex.test(array[length - 2])
          ? array.slice(0, length - 3)
          : array.slice(0, length - 2);
        address = temp && temp.length > 1 ? temp.join(", ") : temp.join("");
      }
    }
    return { country, city, address };
  }

  const handleFileUpload = async (file) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const accessToken = Cookie.get("accessToken");

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const imageUrl = "https://" + response.data.data.url;
      toast.success("Uploading photo successfully");
      return imageUrl;
    } catch (error) {
      toast.error("Uploading photo failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBookingStatus = (booking_id, status_id) => {
    setIsLoading(true);
    const accessToken = Cookie.get("accessToken");
    const config = {
      params: {
        booking_id: booking_id,
        status: status_id,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get(`${API_URL}/confirm_booking`, config)
      .then(() => {
        setIsLoading(false);
        toast.success("Update Booking Status Successfully");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Update Booking Status Failed");
        setIsLoading(false);
      });
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // upload photo
      let imageUrl = "";
      if (data.cover) {
        const file = data.cover;
        if (typeof file === "string") {
          imageUrl = place?.cover;
        } else {
          imageUrl = await handleFileUpload(file);
        }
      }

      const { country, city, address } = processSearchResult();

      const submitValues = {
        name: data?.name || "",
        description: data?.description || "",
        price_per_night: Number(data?.price_per_night) || 0,
        address: address || place.address,
        lat: lat || place.lat,
        lng: lng || place.lng,
        country: country || place.country,
        state: city || place.city,
        city: city || place.city,
        cover: imageUrl || "",
        max_guest: Number(data?.max_guest) || place.max_guest || 1,
      };

      const accessToken = Cookie.get("accessToken");
      const config = {
        params: {
          place_id: place.id,
        },
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios
        .put(`${API_URL}/places`, submitValues, config)
        .then(() => {
          setIsLoading(false);
          toast.success("Update Room Successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Update Room Failed");
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchResult) {
      setLat(searchResult.y);
      setLng(searchResult.x);
    }
  }, [searchResult]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <h1 className="text-2xl font-bold mt-10 mb-4">Property Information</h1>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-6">
          <div className="pb-8 space-y-6">
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            {!isLoading && (
              <ImageUpload
                onChange={(value) => setCustomValue("cover", value)}
                value={cover || ""}
                fill={true}
              />
            )}
          </div>
        </div>
        <div className="col-span-6 space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <Input
                id="max_guest"
                label="Max Guest(s)"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="number"
                required
              />
            </div>
            <div className="col-span-6">
              <Input
                id="price_per_night"
                label="Price per Night"
                formatPrice
                type="number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
          <div className="w-full relative">
            <input
              value={
                searchResult
                  ? searchResult.label
                  : `${place?.address ? place?.address + ", " : ""} ${
                      place?.city ? place?.city + ", " : ""
                    } ${place?.country || "-"}`
              }
              id="_location"
              readOnly={true}
              className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition opacity-70 cursor-not-allowed border-neutral-300 focus:outline-none`}
            />
            <label
              className={`absolute text-md duration-150 transform -translate-y-3 top-5 left-4 text-zinc-400`}
            >
              Location
            </label>
          </div>
          <Map center={[lat, lng]} onSearchResult={handleSearchResult} />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6">
              <Button
                outline
                label="Cancel"
                onClick={() => {
                  reset();
                  router.push("/properties");
                }}
              />
            </div>
            <div className="col-span-6">
              <Button
                disabled={isLoading}
                label="Update"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </div>
      {reservations.map((item, index) => {
        return (
          <div key={index} className="mt-16">
            <hr />
            <div className="mt-12">
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[16px]">
                    {`${
                      item.place?.address ? item.place?.address + ", " : ""
                    } ${item.place.city}, ${item.place.country}`}
                  </span>
                  <span className="text-[#828080] font-bold">
                    Booking ID: {item.id}
                  </span>
                </div>
                <div className="mt-3 rounded-xl border-[#cdcdcd] border-[1px]">
                  <div className="flex justify-between items-center border-b-[#cdcdcd] border-b-[1px] p-4">
                    <Listbox
                      value={booking_status.map(
                        (status) => status.id === item.status_id
                      )}
                      onChange={(e) => handleUpdateBookingStatus(item.id, e.id)}
                    >
                      {({ open }) => (
                        <>
                          <div className="relative mt-2">
                            <Listbox.Button className="relative w-[180px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 sm:text-sm sm:leading-6">
                              <span className="flex items-center">
                                {booking_status.map(
                                  (status) =>
                                    status.id === item.status_id && (
                                      <div
                                        key={status.id}
                                        className={`text-[${status.color}]`}
                                      >
                                        {status.icon}
                                      </div>
                                    )
                                )}
                                <span className="ml-3 block truncate">
                                  {booking_status.map(
                                    (status) =>
                                      status.id === item.status_id &&
                                      status.name
                                  )}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {booking_status.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "bg-rose-100"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div
                                          className={`flex items-center text-[${person.color}]`}
                                        >
                                          {person.icon}
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-gray-900"
                                                : "text-rose-500",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                    <div className="font-extrabold text-[20px]">
                      Total Price:
                      <span className="pl-2 font-bold text-[18px]">
                        ${item.place.price_per_night}
                      </span>
                    </div>
                  </div>
                  <div className="border-b-[#cdcdcd] border-b-[1px] p-4 w-full">
                    <div className="text-[#828080] font-bold text-[14px] mb-2">
                      USER INFORMATION
                    </div>
                    <div className="flex justify-start items-start space-x-6 w-full">
                      <Image
                        src={item.user.avatar || emptyImageSrc}
                        width={64}
                        height={64}
                        className="rounded-full"
                        alt="Avatar"
                      />
                      <div className="flex justify-between items-start w-[60%]">
                        <div>
                          <div className="text-[16px] font-semibold">
                            Fullname:{" "}
                            <span className="ml-1 font-normal">
                              {item.user.full_name || "-"}
                            </span>
                          </div>
                          <div className="text-[16px] font-semibold">
                            Email:
                            <span className="ml-1 font-normal">
                              {item.user.email || "-"}
                            </span>
                          </div>
                        </div>
                        {/* <div>
                          <div className="text-[16px] font-semibold">
                            Guestname:
                            <span className="ml-1 font-normal">
                              {loggedUser.full_name || "-"}
                            </span>
                          </div>
                          <div className="text-[16px] font-semibold">
                            Phone:
                            <span className="ml-1 font-normal">
                              {loggedUser.phone || "-"}
                            </span>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start items-center space-x-[100px] border-b-[#cdcdcd] border-b-[1px] p-4">
                    <div className="text-[16px] font-semibold">
                      To: {item.checkin_date}
                    </div>
                    <div className="text-[16px] font-semibold">
                      From: {item.checkout_date}
                    </div>
                  </div>
                  <div className="flex justify-start items-center space-x-32 p-4">
                    <div className="">
                      <div className="text-[#828080] font-bold text-[14px]">
                        PURCHASED ON
                      </div>
                      <div className="text-[16px] font-semibold">
                        {item.created_at
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-") || "-"}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[#828080] font-bold text-[14px]">
                        PAYMENT METHOD
                      </div>
                      <div className="text-[16px] font-semibold">COD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PropertyClient;
