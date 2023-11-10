"use client";

import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
import useLoginModal from "@/hook/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";
import Link from "next/link";

function ForgotPasswordModal({}) {
  const router = useRouter();
  const forgotPasswordModel = useForgotPasswordModal();
  const loginModel = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // setIsLoading(true);

    // signIn("credentials", {
    //   ...data,
    //   redirect: false,
    // }).then((callback) => {
    //   setIsLoading(false);

    //   if (callback?.ok) {
    //     toast.success("Login Successfully");
    //     router.refresh();
    //     forgotPasswordModel.onClose();
    //   } else if (callback?.error) {
    //     toast.error("Something Went Wrong");
    //   }
    // });
  };

  const toggle = useCallback(() => {
    forgotPasswordModel.onClose();
    loginModel.onOpen();
  }, [forgotPasswordModel, loginModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Reset your password!" center />
      <Input
        id="email"
        label="Email Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div>
          {`Remember your password?`}{" "}
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={forgotPasswordModel.isOpen}
      title="Forgot Password"
      actionLabel="Reset password"
      onClose={forgotPasswordModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
    />
  );
}

export default ForgotPasswordModal;
