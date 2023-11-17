/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useReportModal from "@/hook/useReportModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

const STEPS = {
  REASON: 0,
  DETAILS: 1,
};

function ReportModal({}) {
  const router = useRouter();
  const reportModal = useReportModal();
  const [step, setStep] = useState(STEPS.REASON);
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
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = (data) => {
    if (step !== STEPS.DETAILS) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.DETAILS);
        reportModal.onClose();
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.REASON) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Why do you report this room?"
        subtitle="This report isn't shared with vendor"
      />
      <div className="w-full flex justify-between items-center cursor-pointer">
        <label
          htmlFor="dishonest"
          className="text-lg text-zinc-600 font-thin cursor-pointer"
        >
          Content that is dishonest or inaccurate
        </label>
        <input
          id="dishonest"
          type="checkbox"
          value=""
          className="w-6 h-6 rounded-full cursor-pointer"
        />
      </div>
      <hr />
      <div className="w-full flex justify-between items-center cursor-pointer">
        <label
          htmlFor="dishonest"
          className="text-lg text-zinc-600 font-thin cursor-pointer"
        >
          This place is not real
        </label>
        <input
          id="dishonest"
          type="checkbox"
          value=""
          className="w-6 h-6 rounded-full cursor-pointer"
        />
      </div>
      <hr />
      <div className="w-full flex justify-between items-center cursor-pointer">
        <label
          htmlFor="dishonest"
          className="text-lg text-zinc-600 font-thin cursor-pointer"
        >
          It's a scam
        </label>
        <input
          id="dishonest"
          type="checkbox"
          value=""
          className="w-6 h-6 rounded-full cursor-pointer"
        />
      </div>
      <hr />
      <div className="w-full flex justify-between items-center cursor-pointer">
        <label
          htmlFor="dishonest"
          className="text-lg text-zinc-600 font-thin cursor-pointer"
        >
          Offensive content
        </label>
        <input
          id="dishonest"
          type="checkbox"
          value=""
          className="w-6 h-6 rounded-full cursor-pointer"
        />
      </div>
      <hr />
      <div className="w-full flex justify-between items-center cursor-pointer">
        <label
          htmlFor="dishonest"
          className="text-lg text-zinc-600 font-thin cursor-pointer"
        >
          Other problems
        </label>
        <input
          id="dishonest"
          type="checkbox"
          value=""
          className="w-6 h-6 rounded-full cursor-pointer"
        />
      </div>
      <hr />
    </div>
  );

  if (step === STEPS.DETAILS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Describe details your report reason" />
        <textarea
          className="order border-solid border-[1px] p-4 rounded-lg w-full focus:outline-none"
          rows={5}
        ></textarea>
        <hr />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={reportModal.isOpen}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondActionLabel}
      secondaryAction={step === STEPS.REASON ? undefined : onBack}
      onClose={reportModal.onClose}
      body={bodyContent}
      reset={reset}
      classname="md:w-2/3 lg:w-1/2 xl:w-1/3"
    />
  );
}

export default ReportModal;
