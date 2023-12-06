/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useWishlistModal from "@/hook/useWishlistModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import Input from "../inputs/Input";
import Modal from "./Modal";
import { API_URL } from "@/const";
import WishlistCard from "@/components/listing/WishlistCard";
import Loader from "../Loader";

const STEPS = {
  ADD_TO_WISHLIST: 0,
  CREATE_WISHLIST: 1,
};

function WishlistModal() {
  const router = useRouter();
  const wishlistModal = useWishlistModal();
  const [step, setStep] = useState(STEPS.ADD_TO_WISHLIST);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlists, setWishlists] = useState([]);
  const listingId = wishlistModal.listingId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
    },
  });

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
      // setIsLoading(true);
      const accessToken = Cookie.get("accessToken");
      const user_id = Cookie.get("userId");

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const submitValues = {
        ...data,
        user_id: Number(user_id),
      };

      await axios
        .post(`${API_URL}/wish_lists`, submitValues, config)
        .then(() => {
          toast.success("Create New Wishlist Successfully");
          getWishListByUserId();
          setIsLoading(false);
          onBack();
        })
        .catch((err) => {
          toast.error("Create New Wishlist Failed");
          setIsLoading(false);
        });
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

  const getWishListByUserId = async () => {
    setIsLoading(true);
    const user_id = Cookie.get("userId");
    const accessToken = Cookie.get("accessToken");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios
      .get(`${API_URL}/wish_lists/user/${user_id}`, config)
      .then((response) => {
        setWishlists(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  // const handleAddPlaceToWishlist = () => {
  //   return listingId
  // };

  // const handleEditWishlist = () => {
  //   console.log("Edit");
  // };

  // const handleDeleteWishlist = () => {
  //   console.log("Delete");
  // };

  const handleActions = () => {
    return listingId;
  };

  useEffect(() => {
    if (wishlistModal.isOpen) getWishListByUserId();
  }, [wishlistModal.isOpen]);

  let bodyContent = (
    <>
      {!isLoading ? (
        <div className="space-y-6 flex flex-col justify-start items-start max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF5A5F]">
          {wishlists && wishlists.length > 0 ? (
            wishlists.map((item, index) => (
              <div className="w-full" key={index}>
                <WishlistCard
                  data={{
                    id: item.id,
                    title: item.Title,
                  }}
                  onActions={handleActions}
                />
              </div>
            ))
          ) : (
            <div className="text-[24px] font-bold">
              You don't have any wishlist
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
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
