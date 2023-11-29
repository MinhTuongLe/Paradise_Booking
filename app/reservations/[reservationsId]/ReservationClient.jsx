/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
"use client";

import Input from "@/components/inputs/Input";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
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

function ReservationClient({ place }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const authState = useSelector((state) => state.authSlice.authState);

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
      <div>
        <div>
          <div className="flex justify-between items-center">
            <span>HCM City</span>
            <span>Booking ID: 123123123</span>
          </div>
          <div className="">
            <div className="flex justify-between items-center">
              <div>Successfully</div>
              <div>$9999</div>
            </div>
            <div className="flex justify-start items-center space-x-32">
              <div className="">
                <div>From</div>
                <div>Fri, 1 Dec 2023</div>
              </div>
              <div className="">
                <div>To</div>
                <div>Fri, 2 Dec 2023</div>
              </div>
            </div>
            <div className="flex justify-start items-center space-x-32">
              <div className="">
                <div>PURCHASED ON</div>
                <div>Fri, 1 Dec 2023</div>
              </div>
              <div className="">
                <div>PAYMENT METHOD</div>
                <div>Paypal</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span>Place Details</span>
          <div className="">
            <Image
              height={100}
              width={100}
              alt="upload"
              className="rounded-2xld w-[100px] h-[100px]"
              src={place?.cover || ""}
            />
            <div>
              <div className="flex justify-between items-center">
                <span>{place?.name || ""}</span>
                <span className="text-rose-500 font-semibold text-md cursor-pointer hover:text-rose-700">
                  Details
                </span>
              </div>
              <div>{`${place?.address ? place?.address : ""}`}</div>
              <div>{`${place?.city ? place?.city + ", " : ""} ${
                place?.country || "-"
              }`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationClient;
