/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import { API_URL } from "@/const";
import axios from "axios";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import Button from "@/components/Button";
import useCheckAvailableModal from "../../hook/useCheckAvailableModal";

function PropertiesClient({ currentUser }) {
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);

  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const checkAvailableModal = useCheckAvailableModal();

  const cancelButtonRef = useRef(null);

  const onDelete = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setOpen(false);
    const accessToken = Cookie.get("accessToken");
    const config = {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.delete(`${API_URL}/places`, config);

      if (res.data.data) {
        await getPlaces();
        toast.success(`Delete room successfully`);
      } else toast.error("Delete room failed");
    } catch (error) {
      toast.error("Delete room failed");
    }
    setIsLoading(false);
  };

  const getPlaces = async () => {
    setIsLoading(true);
    const accessToken = Cookie.get("accessToken");
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        vendor_id: currentUser.id,
        place_id: searchValue ? searchValue : 0,
      },
    };

    await axios
      .get(`${API_URL}/bookings_list/manage_reservation`, config)
      .then((response) => {
        setPlaces(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleClear = () => {
    setSearchValue("");
    getPlaces();
  };

  useEffect(() => {
    getPlaces();
  }, []);

  if (loggedUser.id !== currentUser.id) {
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
                          Delete property
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure to delete this place?
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
      <div className="mt-10 mb-6">
        <Heading title="Properties" subtitle="List of your properties" />
      </div>
      <div className="flex items-start justify-between space-x-8">
        <div className="w-[70%] flex justify-start space-x-8">
          <div className="w-[30%]">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Search Place ID..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                onClick={getPlaces}
                className="text-white absolute end-0 bg-rose-500 hover:bg-rose-600 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 top-0 bottom-0"
              >
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-[10%] flex justify-between items-center">
            <Button
              outline={true}
              disabled={isLoading}
              label="Clear"
              onClick={handleClear}
              medium
            />
          </div>
        </div>
        <div className="w-[10%] flex justify-between items-center space-x-8">
          <Button
            disabled={isLoading}
            label="Check Available"
            onClick={() => checkAvailableModal.onOpen()}
            medium
          />
        </div>
      </div>
      {!isLoading ? (
        places && places.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {places.map((listing) => (
              <ListingCard
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onDelete}
                actionLabel="Delete property"
                currentUser={currentUser}
                shrink={true}
                disabled={listing?.is_booked === 0}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Properties found"
            subtitle="Looks like you have not any Properties"
          />
        )
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default PropertiesClient;
