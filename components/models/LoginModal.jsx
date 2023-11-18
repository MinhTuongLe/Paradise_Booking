"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import { setLoggUser, setAuthState } from "@/components/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

function LoginModal({}) {
  const router = useRouter();
  const registerModel = useRegisterModal();
  const loginModel = useLoginModel();
  const forgotPasswordModel = useForgotPasswordModal();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios
      .post("http://localhost:8081/api/v1/login", data)
      .then((callback) => {
        // console.log(callback.data);

        localStorage.setItem("accessToken", callback.data.accessToken);
        localStorage.setItem("expiresAt", callback.data.expiresAt);
        toast.success("Login Successfully");
        dispatch(setAuthState(true));
        setIsLoading(false);
        router.refresh();
        loginModel.onClose();

        const config = {
          params: {
            email: data.email,
          },
        };
        axios
          .get("http://localhost:8081/api/v1/get-profile", config)
          .then((callback) => {
            console.log(callback.data.data);
            dispatch(setLoggUser(callback.data.data));
          })
          .catch((err) => {toast.error("Get user information failed"); setIsLoading(false)});
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    loginModel.onClose();
    registerModel.onOpen();
  }, [loginModel, registerModel]);

  const toggleForgotPasswordModal = useCallback(() => {
    loginModel.onClose();
    forgotPasswordModel.onOpen();
  }, [loginModel, forgotPasswordModel]);

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4" onKeyDown={onKeyPress}>
      <Heading title="Welcome Back" subtitle="Login to your Account!" center />
      <Input
        id="email"
        label="Email Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="email"
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
      <span
        onClick={toggleForgotPasswordModal}
        className="text-neutral-800 cursor-pointer hover:underline text-right "
      >
        Forgot password
      </span>
      <hr />
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
      {/* <Button
        outline
        label="Continue with Facebook"
        icon={AiFillFacebook}
        onClick={() => signIn("facebook")}
        isColor
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div>
          {`Didn't have an Account?`}{" "}
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an Account
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
      classname="md:w-2/3 lg:w-1/2 xl:w-1/3"
    />
  );
}

export default LoginModal;
