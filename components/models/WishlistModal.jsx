/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useWishlistModal from "@/hook/useWishlistModal";
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
import WishlistCard from "@/components/listing/WishlistCard";

const STEPS = {
  ADD_TO_WISHLIST: 0,
  CREATE_WISHLIST: 1,
};

function WishlistModal({}) {
  const router = useRouter();
  const wishlistModal = useWishlistModal();
  const [step, setStep] = useState(STEPS.ADD_TO_WISHLIST);
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
      title: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id, value) => {
    setValue(id, value);
  };

  const onBack = () => {
    reset();
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async (data) => {
    if (step !== STEPS.CREATE_WISHLIST) {
      return onNext();
    }

    try {
      setIsLoading(true);
      console.log(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CREATE_WISHLIST) {
      return "Create";
    }

    return "Create new wishlist";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.CREATE_WISHLIST) {
      return "Cancel";
    }
    return undefined;
  }, [step]);

  let bodyContent = (
    <div className="p-8 grid md:grid-cols-2 gap-8 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF5A5F]">
      <div className="col-span-1">
        <WishlistCard
          data={{
            id: 1,
            title: "New Wishlist",
            cover: "",
          }}
        />
      </div>
      <div className="col-span-1">
        <WishlistCard
          data={{
            id: 1,
            title: "New Wishlist",
            cover: "",
          }}
        />
      </div>
      <div className="col-span-1">
        <WishlistCard
          data={{
            id: 1,
            title: "New Wishlist",
            cover: "",
          }}
        />
      </div>
      <div className="col-span-1">
        <WishlistCard
          data={{
            id: 1,
            title: "New Wishlist",
            cover: "",
          }}
        />
      </div>
    </div>
  );

  if (step === STEPS.CREATE_WISHLIST) {
    bodyContent = (
      <div className="space-y-6">
        <div>
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
        <hr />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={wishlistModal.isOpen}
      title="Add to your wishlist"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondActionLabel}
      secondaryAction={step === STEPS.ADD_TO_WISHLIST ? undefined : onBack}
      onClose={wishlistModal.onClose}
      body={bodyContent}
      reset={reset}
      classname="md:w-2/3 lg:w-1/3"
    />
  );
}

export default WishlistModal;
