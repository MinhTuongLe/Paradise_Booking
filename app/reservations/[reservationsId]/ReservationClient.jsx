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
import { API_URL } from "@/const";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/inputs/ImageUpload";
import Image from "next/image";
import {
  FaAngleDown,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { MdIncompleteCircle, MdPending } from "react-icons/md";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const booking_status = [
  {
    id: 1,
    name: "Pending",
    icon: <MdPending className="text-[22px] text-[#ffa700]" />,
  },
  {
    id: 2,
    name: "Successful",
    icon: <FaCheckCircle className="text-[20px] text-[#05a569]" />,
  },
  {
    id: 3,
    name: "Checkin",
    icon: <FaCalendarAlt className="text-[22px] text-[#55bdbf]" />,
  },
  {
    id: 4,
    name: "Checkout",
    icon: <FaCalendarCheck className="text-[22px] text-[#58a1d8]" />,
  },
  {
    id: 5,
    name: "Completed",
    icon: <MdIncompleteCircle className="text-[22px] text-[#1975d3]" />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ReservationClient({ place, currentUser }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const authState = useSelector((state) => state.authSlice.authState);

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(booking_status[0]);

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
      capacity: place?.capacity,
      address: place?.address,
      lat: place?.lat,
      lng: place?.lng,
      country: place?.country,
      state: place?.city,
      city: place?.city,
      cover: place?.cover || "",
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
        capacity: data?.capacity || 1,
        lat: lat || place.lat,
        lng: lng || place.lng,
        country: country || place.country,
        state: city || place.city,
        city: city || place.city,
        cover: imageUrl || "",
      };

      // console.log(submitValues);
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

  return (
    <div className="max-w-[768px] mx-auto px-4">
      <h1 className="text-2xl font-bold mt-10 mb-3">Reservation Details</h1>
      {currentUser.role === 2 && (
        <div className="mt-6">
          <span className="font-bold text-[16px] text-[#828080]">
            Place Details
          </span>
          <div className="rounded-xl border-[#cdcdcd] border-[1px] p-4 flex justify-start items-start space-x-6 mt-3">
            <Image
              height={100}
              width={100}
              alt="upload"
              className="rounded-2xl w-[100px] h-[100px]"
              src={place?.cover || ""}
            />
            <div className="space-y-1 w-full">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-[20px]">
                  {place?.name || ""}
                </span>
                <span
                  className="text-rose-500 font-semibold text-md cursor-pointer hover:text-rose-700"
                  onClick={() => window.open(`/listings/41`, "_blank")}
                >
                  Details
                </span>
              </div>
              <div className="text-[16px] font-semibold">{`${
                place?.address ? place?.address : ""
              }`}</div>
              <div className="text-[16px] font-semibold">{`${
                place?.city ? place?.city + ", " : ""
              } ${place?.country || "-"}`}</div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6">
        <div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-[16px]">HCM City</span>
            <span className="text-[#828080] font-bold">
              Booking ID: 123123123
            </span>
          </div>
          <div className="mt-3 rounded-xl border-[#cdcdcd] border-[1px]">
            <div className="flex justify-between items-center border-b-[#cdcdcd] border-b-[1px] p-4">
              {currentUser.role === 2 ? (
                <Listbox value={selected} onChange={setSelected}>
                  {({ open }) => (
                    <>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-[180px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            {selected.icon}
                            <span className="ml-3 block truncate">
                              {selected.name}
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
                                      ? "bg-rose-500 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
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
                                            ? "text-white"
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
              ) : (
                <>
                  <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#05a569] p-2 rounded-full text-white">
                      <FaCheckCircle className="text-[20px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">
                      Successfully
                    </span>
                  </div>
                  {/* <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-rose-500 p-2 rounded-full text-white">
                      <IoIosCloseCircle className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Failed</span>
                  </div> */}
                  {/* <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#ffa700] p-2 rounded-full text-white">
                      <MdPending className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Pending</span>
                  </div>
                  <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#1975d3] p-2 rounded-full text-white">
                      <MdIncompleteCircle className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">
                      Completed
                    </span>
                  </div> */}
                  {/* <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#55bdbf] p-2 rounded-full text-white">
                      <FaCalendarAlt className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Checkin</span>
                  </div>
                  <div className="space-x-4 flex justify-between items-center">
                    <div className="bg-[#58a1d8] p-2 rounded-full text-white">
                      <FaCalendarCheck className="text-[22px]" />
                    </div>
                    <span className="font-extrabold text-[20px]">Checkout</span>
                  </div> */}
                </>
              )}
              <div className="font-extrabold text-[20px]">$9999</div>
            </div>
            <div className="flex justify-start items-center space-x-[100px] border-b-[#cdcdcd] border-b-[1px] p-4">
              <div className="text-[16px] font-semibold">
                To: Fri, 2 Dec 2023
              </div>
              <div className="text-[16px] font-semibold">
                From: Fri, 1 Dec 2023
              </div>
            </div>
            <div className="flex justify-start items-center space-x-32 p-4">
              <div className="">
                <div className="text-[#828080] font-bold text-[14px]">
                  PURCHASED ON
                </div>
                <div className="text-[16px] font-semibold">Fri, 1 Dec 2023</div>
              </div>
              <div className="">
                <div className="text-[#828080] font-bold text-[14px]">
                  PAYMENT METHOD
                </div>
                <div className="text-[16px] font-semibold">Paypal</div>
              </div>
            </div>
          </div>
        </div>
        {currentUser.role === 1 && (
          <div className="mt-6">
            <span className="font-bold text-[16px] text-[#828080]">
              Place Details
            </span>
            <div className="rounded-xl border-[#cdcdcd] border-[1px] p-4 flex justify-start items-start space-x-6 mt-3">
              <Image
                height={100}
                width={100}
                alt="upload"
                className="rounded-2xl w-[100px] h-[100px]"
                src={place?.cover || ""}
              />
              <div className="space-y-1 w-full">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[20px]">
                    {place?.name || ""}
                  </span>
                  <span
                    className="text-rose-500 font-semibold text-md cursor-pointer hover:text-rose-700"
                    onClick={() => window.open(`/listings/41`, "_blank")}
                  >
                    Details
                  </span>
                </div>
                <div className="text-[16px] font-semibold">{`${
                  place?.address ? place?.address : ""
                }`}</div>
                <div className="text-[16px] font-semibold">{`${
                  place?.city ? place?.city + ", " : ""
                } ${place?.country || "-"}`}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationClient;
