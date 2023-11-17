"use client";

import useDeleteModal from "@/hook/useDeleteModal";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
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

function DeleteModal() {
  const router = useRouter();
  const deleteModal = useDeleteModal();
  const [isLoading, setIsLoading] = useState(false);

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

    //  onDelete.then((callback) => {
    //     setIsLoading(false);

    //     if (callback?.ok) {
    //       toast.success("Delete Successfully");
    //       router.refresh();
    //       deleteModal.onClose();
    //     } else if (callback?.error) {
    //       toast.error("Something Went Wrong");
    //     }
    //   });
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4" onKeyDown={onKeyPress}>
      <Heading title="Are you sure to delete ABC?" center />
    </div>
  );

  const footerContent = (
    <div className="flex gap-4 mt-3">
      <hr />
      <Button label="Cancel" onClick={deleteModal.onClose} />
      <Button
        outline
        label="Delete"
        onClick={() => signIn("facebook")}
        isColor
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={deleteModal.isOpen}
      title="Delete"
      onClose={deleteModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
      classname="md:w-1/3 lg:w-1/3 xl:w-1/4"
    />
  );
}

export default DeleteModal;
