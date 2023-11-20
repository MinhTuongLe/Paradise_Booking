"use client";

import useFiltersModal from "../../hook/useFiltersModal";
// import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "../Button";
import Heading from "../Heading";
// import Input from "../inputs/Input";
import Modal from "./Modal";
import { BiDollar } from "react-icons/bi";

function FiltersModal({}) {
  const filtersModal = useFiltersModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      setIsLoading(false);
      return;
    }

    const { confirmPassword, ...formData } = data;

    // axios
    //   .post("/api/register", formData)
    //   .then(() => {
    //     toast.success("Success!");
    //     loginModel.onOpen();
    //     filtersModal.onClose();
    //   })
    //   .catch((err) => toast.error("Something Went Wrong"))
    //   .finally(() => {
    //     setIsLoading(false);
    //     toast.success("Register Successfully");
    //   });
  };

  const toggle = useCallback(() => {
    filtersModal.onClose();
  }, [filtersModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Place type"
        subtitle="Find rooms, houses or any type of accommodation."
      />
      <div className="flex justify-center items-center border-b-[1px] pb-6">
        <div className="border-[1px] w-2/3 py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="text-sm font-semibold px-6 w-1/3 text-center">
              Any type
            </div>
            <div className="hidden sm:block text-losm font-semibold px-6 border-x-[1px] flex-1 text-center w-1/3">
              Room
            </div>
            <div className="text-sm font-semibold px-6 w-1/3 text-center">
              House
            </div>
          </div>
        </div>
      </div>

      <Heading title="Price range" subtitle="Price per night." />
      <div className="flex justify-center items-center">
        <div className="w-full relative">
          <BiDollar
            size={24}
            className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
          />
          <input
            placeholder=""
            type="text"
            className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-9
        }`}
          />

          <label
            className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-9 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400`}
          >
            Min price
          </label>
        </div>
        <span className="border-b-[1px] w-10 mx-4"></span>
        <div className="w-full relative">
          <BiDollar
            size={24}
            className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
          />
          <input
            placeholder=""
            type="text"
            className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-9
        }`}
          />
          <label
            className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-9 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400`}
          >
            Max price
          </label>
        </div>
      </div>

      {/* <Heading title="Rooms" />
      <div className="flex flex-col border-b-[1px] pb-6 space-y-3">
        <div className="flex flex-col items-start justify-start">
          <div className="font-light text-neutral-500 mb-1">Bedroom</div>
          <div className="flex justify-start items-start space-x-6">
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              Any
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              1
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              2
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              3
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              4
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              5+
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="font-light text-neutral-500 mb-1">Bed</div>
          <div className="flex justify-start items-start space-x-6">
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              Any
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              1
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              2
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              3
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              4
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              5+
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="font-light text-neutral-500 mb-1">Bathroom</div>
          <div className="flex justify-start items-start space-x-6">
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              Any
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              1
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              2
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              3
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              4
            </button>
            <button className="px-4 py-2 rounded-full border-[1px] w-[64px]">
              5+
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );

  const footerContent = (
    <>
      <hr />
      <div className="flex flex-row gap-4">
        <Button
          outline
          label="Remove all"
        />
        <Button
          label={`Display ${7} Result(s)`}
        />
      </div>
    </>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={filtersModal.isOpen}
      title="Filters"
      onClose={filtersModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
      classname="md:w-2/3 lg:w-1/2 xl:w-1/3"
    />
  );
}

export default FiltersModal;
