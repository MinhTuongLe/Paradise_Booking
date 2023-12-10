/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ReservationItem from "@/components/ReservationItem";
import { useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import {
  API_URL,
  LIMIT,
  booking_status,
  classNames,
  place_status,
} from "@/const";
import Cookie from "js-cookie";
import Loader from "@/components/Loader";
import PaginationComponent from "@/components/PaginationComponent";
import { useSelector } from "react-redux";
import EmptyState from "@/components/EmptyState";

function ReservationsClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [item, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState({});
  const [selected, setSelected] = useState(place_status[0]);
  const authState = useSelector((state) => state.authSlice.authState);
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);

  const cancelButtonRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date_from: "",
      date_to: "",
      statuses: selected,
    },
  });

  const handleFilter = async (data) => {
    let statuses = selected.id === 0 ? null : [selected.id];
    const submitValues = {
      ...data,
      statuses,
    };
    getReservations(submitValues);
  };

  const handleClearAllFilters = () => {
    reset();
    setSelected(place_status[0]);
    getReservations();
  };

  const onDelete = (item) => {
    setItem(item);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (item.status_id !== 5 && item.status_id !== 6 && item.status_id !== 1) {
      toast.error(`Delete failed. This reservation is processing`);
      setOpen(false);
      return;
    }

    setIsLoading(true);
    const accessToken = Cookie.get("accessToken");

    if (item.status_id === 1) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          id: item.id,
        },
      };

      try {
        setOpen(false);
        const res = await axios.post(`${API_URL}/cancel_booking`, null, config);
        if (res.data.data) {
          await getReservations();
          toast.success(`Cancel reservation successfully`);
        } else {
          toast.error("Cancel reservation failed");
        }
      } catch (error) {
        toast.error("Cancel reservation failed");
      }
      setIsLoading(false);
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try {
        setOpen(false);
        const res = await axios.delete(
          `${API_URL}/bookings/${item.id}`,
          config
        );
        if (res.data.data) {
          await getReservations();
          toast.success(`Delete reservation successfully`);
        } else {
          toast.error("Delete reservation failed");
        }
      } catch (error) {
        toast.error("Delete reservation failed");
      }
    }
    setIsLoading(false);
  };

  const getReservations = async (filterValues) => {
    setIsLoading(true);
    const accessToken = Cookie.get("accessToken");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: params.get("page") || 1,
        limit: params.get("limit") || LIMIT,
      },
    };

    await axios
      .post(`${API_URL}/booking_list`, filterValues || null, config)
      .then((response) => {
        setReservations(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (authState && loggedUser.role !== 3) getReservations();
  }, [params]);

  if (!authState || loggedUser.role === 3) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

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
                          {item?.status_id === 1
                            ? "Cancel reservation"
                            : "Delete reservation"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure to{" "}
                            {item?.status_id === 1 ? "cancel" : "delete"} this
                            reservation?
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
                      {item?.status_id === 1 ? "Cancel" : "Delete"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Back
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="mt-10">
        <Heading title="Reservations" subtitle="Your reservation list" />
      </div>
      <div className="mt-10 flex justify-between items-center w-full">
        <div className="flex items-center w-[75%] space-x-16">
          <div className="w-[20%] space-y-2">
            <div className="font-bold text-[16px]">Reservation status</div>
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="relative w-[180px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        {selected?.icon && (
                          <div className={`text-[${selected.color}]`}>
                            {selected.icon}
                          </div>
                        )}
                        <span className="ml-3 block truncate">
                          {selected.name}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {booking_status.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active ? "bg-rose-100" : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-9"
                              )
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <div className={`text-[${person.color}]`}>
                                    {person.icon}
                                  </div>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "ml-3 block truncate"
                                    )}
                                  >
                                    {person.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active
                                        ? "text-gray-900"
                                        : "text-rose-500",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="flex items-center space-x-8">
            <div className="space-y-2">
              <div className="font-bold text-[16px]">From</div>

              <Input
                id="date_from"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="date"
              />
            </div>
            <div className="space-y-2">
              <div className="font-bold text-[16px]">To</div>
              <Input
                id="date_to"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="w-[25%] flex justify-between items-center space-x-8">
          <Button
            outline={true}
            disabled={isLoading}
            label="Clear All"
            onClick={handleSubmit(handleClearAllFilters)}
          />
          <Button
            disabled={isLoading}
            label="Filter"
            onClick={handleSubmit(handleFilter)}
          />
        </div>
      </div>
      {!isLoading ? (
        reservations && reservations.data?.data?.length > 0 ? (
          <>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {reservations.data.data.map((item, index) => {
                return (
                  <div key={item.id}>
                    <ReservationItem
                      onDelete={() => onDelete(item)}
                      data={item}
                    />
                  </div>
                );
              })}
            </div>
            {reservations.paging.total > LIMIT && (
              <PaginationComponent
                page={Number(params.get("page")) || 1}
                total={reservations.paging?.total || LIMIT}
                limit={reservations.paging?.limit || LIMIT}
              />
            )}
          </>
        ) : (
          <div className="mt-12 space-y-4">
            <span className="text-[24px] font-bold">
              You don't have any reservation to display
            </span>
            <div className="max-w-[160px]">
              <Button label="Booking now" onClick={() => router.push("/")} />
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default ReservationsClient;
