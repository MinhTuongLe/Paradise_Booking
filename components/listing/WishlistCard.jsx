/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, Fragment, useRef } from "react";
import { IoIosCloseCircle, IoIosSave, IoMdClose } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { API_URL } from "@/const";
import Cookie from "js-cookie";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import useWishlistModal from "@/hook/useWishlistModal";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

function WishlistCard({ data }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [wishlistLength, setWishlistLength] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const getPlacesByWishlistId = async () => {
    const accessToken = Cookie.get("accessToken");
    const config = {
      params: {
        wish_list_id: data.id,
      },
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios
      .get(`${API_URL}/place_wish_lists/place`, config)
      .then((response) => {
        setWishlistLength(response.data.data.length);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      });
    setIsLoading(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    const accessToken = Cookie.get("accessToken");

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        title: title,
      },
    };

    axios
      .put(`${API_URL}/wish_lists/${data.id}`, null, config)
      .then(() => {
        setIsLoading(false);
        toast.success(`Update Wishlist Title Successfully`);
        router.refresh();
        setEditMode(false);
      })
      // .then(() => {
      //   getPlacesByWishlistId();
      // })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  const onDelete = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleDeleteWishlist = () => {
    const accessToken = Cookie.get("accessToken");

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .delete(`${API_URL}/wish_lists/${data.id}`, config)
      .then(() => {
        setIsLoading(false);
        toast.success(`Delete Wishlist Successfully`);
        router.refresh();
        setEditMode(false);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
    setOpen(false);
  };

  useEffect(() => {
    getPlacesByWishlistId();
  }, []);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete wishlist
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure to delete this wishlist?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDeleteWishlist}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="col-span-1 group"
      >
        <div className="flex flex-col gap-2 w-full relative">
          <div
            className="aspect-square w-full relative oerflow-hidden rounded-xl cursor-pointer "
            onClick={() => router.push(`/favorites/${data.id}`)}
          >
            <Image
              fill
              className="object-cover aspect-square h-full w-full rounded-xl"
              src="/assets/wishlist_cover.png"
              alt="wishlists"
              priority
            />
          </div>
          <div className="font-semibold text-lg text-ellipsis line-clamp-1">
            {!editMode ? (
              <div className="flex flex-col items-start justify-start">
                <div
                  className="flex font-semibold text-lg text-ellipsis line-clamp-1 cursor-pointer justify-start items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditMode(true);
                  }}
                >
                  <CiEdit size={16} className="mr-2" />
                  {data.title || "-"}
                </div>
                <div className="font-light text-neutral-500 text-ellipsis line-clamp-1">
                  Saved {wishlistLength || 0} item(s)
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                  <div className="font-light text-neutral-500 text-ellipsis line-clamp-1">
                    Saved {wishlistLength || 0} item(s)
                  </div>
                </div>
                <div className="bg-white rounded-full p-2 border-[#1975d3] border-[1px] overflow-hidden">
                  <IoIosSave
                    color="#1975d3"
                    size={24}
                    onClick={handleEdit}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="cursor-pointer absolute top-2 right-2 text-rose-500 border-[3px] rounded-full p-2 hover:bg-rose-500 hover:text-white font-bold"
            onClick={onDelete}
            style={{
              borderColor: "#f43f5e",
            }}
          >
            <IoMdClose size={24} />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default WishlistCard;
