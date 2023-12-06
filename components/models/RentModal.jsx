/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useRentModal from "@/hook/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookie from "js-cookie";

import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";
import Image from "next/image";
import rent_room_1 from "@/public/assets/rent_room_1.png";
import rent_room_2 from "@/public/assets/rent_room_2.png";
import rent_room_3 from "@/public/assets/rent_room_3.png";
import { API_URL } from "@/const";

const STEPS = {
  BECOME_VENDOR: 0,
  CATEGORY: 1,
  LOCATION: 2,
  INFO: 3,
  IMAGES: 4,
  DESCRIPTION: 5,
  PRICE: 6,
};

function RentModal({}) {
  const router = useRouter();
  const rentModel = useRentModal();
  const [step, setStep] = useState(STEPS.BECOME_VENDOR);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: "",
      max_guest: 0,
      roomCount: 0,
      bathroomCount: 0,
      cover: "",
      price_per_night: 0,
      title: "",
      description: "",
      location: null,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("max_guest");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const cover = watch("cover");

  const [lat, setLat] = useState(51);
  const [lng, setLng] = useState(-0.09);

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [lat, lng]
  );

  const setCustomValue = (id, value) => {
    setValue(id, value);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  function processSearchResult() {
    const numberRegex = /^[0-9]+$/;
    let country = "";
    let city = "";
    let address = "";

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

  const onSubmit = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    try {
      setIsLoading(true);

      // upload photo
      const file = data.cover;
      let imageUrl = "";
      if (file) {
        imageUrl = await handleFileUpload(file);
      }

      const { country, city, address } = processSearchResult();

      const submitValues = {
        name: data.name,
        description: data.description,
        price_per_night: Number(data.price_per_night),
        address: address,
        max_guest: data.max_guest,
        lat: lat,
        lng: lng,
        country: country,
        state: city,
        city: city,
        cover: imageUrl,
      };

      // create place
      const accessToken = Cookie.get("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(`${API_URL}/places`, submitValues, config)
        .then(() => {
          toast.success("Create place successfully");
          reset();
          setStep(STEPS.BECOME_VENDOR);
          rentModel.onClose();
        })
        .catch(() => {
          toast.error("Something Went Wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.BECOME_VENDOR) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const [searchResult, setSearchResult] = useState(null);

  const handleSearchResult = (result) => {
    setSearchResult(result);
  };

  useEffect(() => {
    if (searchResult) {
      setLat(searchResult.y);
      setLng(searchResult.x);
    }
  }, [searchResult]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <div className="grid md:grid-cols-2 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF5A5F]">
        <div className="col-span-1 flex items-center justify-center">
          <span className="text-[24px] font-bold">
            Become a vendor on Paradise
          </span>
        </div>
        <div className="col-span-1 space-y-6">
          <div className="w-full flex justify-between items-start">
            <div className="w-[80%] flex justify-start items-start space-x-3">
              <span className="text-lg font-bold">1</span>
              <div className="space-y-2">
                <p className="text-lg font-bold">Share your room to us</p>
                <p className="text-md font-normal">
                  Share some information such as the location, capacity of your
                  rent room
                </p>
              </div>
            </div>
            <div className="w-[20%]">
              <Image
                width={400}
                height={400}
                src={rent_room_1}
                alt="image 1"
                className="w-full h-full"
              />
            </div>
          </div>
          <hr />
          <div className="w-full flex justify-between items-start">
            <div className="w-[80%] flex justify-start items-start space-x-3">
              <span className="text-lg font-bold">2</span>
              <div className="space-y-2">
                <p className="text-lg font-bold">Make your room outstanding</p>
                <p className="text-md font-normal">
                  Add from 5 images with title and description
                </p>
              </div>
            </div>
            <div className="w-[20%] flex items-center justify-center">
              <Image
                width={400}
                height={400}
                src={rent_room_2}
                alt="image 1"
                className="w-full h-full"
              />
            </div>
          </div>
          <hr />
          <div className="w-full flex justify-between items-start">
            <div className="w-[80%] flex justify-start items-start space-x-3">
              <span className="text-lg font-bold">3</span>
              <div className="space-y-2">
                <p className="text-lg font-bold">Finish and post</p>
                <p className="text-md font-normal">
                  Select options your want and post your room.
                </p>
              </div>
            </div>
            <div className="w-[20%]">
              <Image
                width={400}
                height={400}
                src={rent_room_3}
                alt="image 1"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="grid md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF5A5F]">
        {categories.map((item, index) => (
          <div key={index} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        {/* <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        /> */}
        <div className="w-full relative">
          <input
            value={searchResult ? searchResult.label : ""}
            id="_location"
            readOnly={true}
            className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition opacity-70 cursor-not-allowed border-neutral-300 focus:outline-none`}
          />

          <label
            className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 text-zinc-400`}
          >
            Location
          </label>
        </div>
        <Map center={[lat, lng]} onSearchResult={handleSearchResult} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guest do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("max_guest", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many Bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("cover", value)}
          value={cover}
          classname="h-[40vh] w-full object-cover"
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step == STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
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
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModel.isOpen}
      title="Paradise your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondActionLabel}
      secondaryAction={step === STEPS.BECOME_VENDOR ? undefined : onBack}
      onClose={rentModel.onClose}
      body={bodyContent}
      reset={reset}
      classname="md:w-2/3 lg:w-1/2"
    />
  );
}

export default RentModal;
