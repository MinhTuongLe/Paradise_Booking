/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, Fragment, useRef } from "react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import TripItem from "@/components/TripItem";

function TripsClient() {
  // function TripsClient({ reservations, currentUser }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const onCancel = useCallback(
    (id) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.info("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onDelete = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    // setIsLoading(true);
    // const accessToken = Cookie.get("accessToken");
    // const config = {
    //   params: {
    //     id: id,
    //   },
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // };
    // axios
    //   .delete(`${API_URL}/places`, config)
    //   .then(() => {
    //     toast.success(`Delete room successfully`);
    //     setIsLoading(false);
    //     router.refresh();
    //   })
    //   .catch(() => {
    //     toast.error("Delete room failed");
    //     setIsLoading(false);
    //   });
    console.log(123123123123);
    setOpen(false);
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
        <Heading title="Trips" subtitle="Your trip list" />
      </div>
      {/* <div className="mt-6 space-y-6">
        <span className="text-[24px] font-bold">
          You don't have any reservation to display
        </span>
        <div className="max-w-[160px]">
          <Button label="Booking now" onClick={() => router.push("/")} />
        </div>
      </div> */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
        <TripItem onDelete={onDelete} />
      </div>
    </Container>
  );
}

export default TripsClient;
