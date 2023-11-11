"use client";

import useLoginModel from "@/hook/useLoginModal";
import useFiltersModal from "../../hook/useFiltersModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { signIn } from "next-auth/react";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

function FiltersModal({}) {
  const filtersModal = useFiltersModal();
  const loginModel = useLoginModel();
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

    axios
      .post("/api/register", formData)
      .then(() => {
        toast.success("Success!");
        loginModel.onOpen();
        filtersModal.onClose();
      })
      .catch((err) => toast.error("Something Went Wrong"))
      .finally(() => {
        setIsLoading(false);
        toast.success("Register Successfully");
      });
  };

  const toggle = useCallback(() => {
    loginModel.onOpen();
    filtersModal.onClose();
  }, [loginModel, filtersModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Paradise"
        subtitle="Create an Account!"
        center
      />
      <Input
        id="email"
        label="Email Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="User Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Facebook"
        icon={AiFillFacebook}
        onClick={() => signIn("facebook")}
        isColor
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div>
          Already have an account?{" "}
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={filtersModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={filtersModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
    />
  );
}

export default FiltersModal;