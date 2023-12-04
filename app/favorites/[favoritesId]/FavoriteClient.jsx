/* eslint-disable react/no-unescaped-entities */
"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import WishlistCard from "@/components/listing/WishlistCard";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { useState, Fragment, useRef, useEffect } from "react";
import { API_URL, booking_status, classNames, place_status } from "@/const";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

function FavoriteClient({ listings }) {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const onDelete = (item) => {
    setItem(item);
    setOpen(true);
  };

  const handleDelete = () => {
    console.log(item.id);
    // setIsLoading(true);
    // const accessToken = Cookie.get("accessToken");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // };
    // axios
    //   .delete(`${API_URL}/bookings/${item.id}`, config)
    //   .then(() => {
    //     toast.success(`Delete reservation successfully`);
    //     getReservations();
    //     setIsLoading(false);
    //     router.refresh();
    //   })
    //   .catch(() => {
    //     toast.error("Delete reservation failed");
    //     setIsLoading(false);
    //   });
    // setOpen(false);
  };

  return (
    <Container>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
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

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                          Delete property
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure to delete this reservation?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDelete}
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
      <div className="mt-10">
        <Heading title="Favorites" subtitle="List of places you favorites!" />
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {listings.map((listing) => (
          <WishlistCard
            key={listing.id}
            data={listing}
            onDelete={() => onDelete(listing)}
          />
        ))}
      </div>
    </Container>
  );
}

export default FavoriteClient;
