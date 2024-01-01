/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";

import useCheckAvailableModal from "../../hook/useCheckAvailableModal";
import Modal from "./Modal";
import ListingCard from "../listing/ListingCard";
import { useParams, useSearchParams } from "next/navigation";
import { API_URL, LIMIT } from "@/const";
import axios from "axios";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import PaginationComponent from "../PaginationComponent";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Input from "../inputs/Input";
import Button from "../Button";

function PropertiesFilteredModal() {
  const checkAvailableModal = useCheckAvailableModal();
  const params = useParams();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      place_id: "",
      date_from: "",
      date_to: "",
    },
  });

  const getPlacesFiltered = async (dataFilter) => {
    setIsLoading(true);
    const { place_id, date_from, date_to } = dataFilter;
    const config = {
      params: {
        place_id,
        date_from,
        date_to,
      },
    };

    await axios
      .get(`${API_URL}/places/status_booking`, config)
      .then((response) => {
        console.log(response.data);
        setPlaces(response.data);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFilter = async (data) => {
    const submitValues = {
      ...data,
      place_id: searchValue ? searchValue : 0,
      date_from: data.date_from.split("-").reverse().join("-"),
      date_to: data.date_to.split("-").reverse().join("-"),
    };
    const dateFrom = new Date(data.date_from);
    const dateTo = new Date(data.date_to);

    if (dateFrom > dateTo) {
      toast.error("From Date must be before To Date");
      return;
    }

    // console.log(submitValues);
    getPlacesFiltered(submitValues);
  };

  const handleClearAllFilters = () => {
    reset();
    setSearchValue("");
    setProperties([]);
  };

  const bodyContent = (
    <>
      <div className="flex items-center space-x-8 justify-between">
        <div className="w-[30%]">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="">
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
              placeholder="Search Place ID..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex items-center space-x-12 justify-center">
          <div className="flex space-x-4 items-center">
            <div className="font-bold text-[16px]">From</div>
            <Input
              id="date_from"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="date"
              required
            />
          </div>
          <div className="flex space-x-4 items-center">
            <div className="font-bold text-[16px]">To</div>
            <Input
              id="date_to"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="date"
              required
            />
          </div>
        </div>
        <div className="flex space-x-8">
          <div className="w-24">
            <Button
              disabled={isLoading}
              label="Filter"
              onClick={handleSubmit(handleFilter)}
              medium
            />
          </div>
          <div className="w-24">
            <Button
              outline={true}
              disabled={isLoading}
              label="Clear All"
              onClick={handleSubmit(handleClearAllFilters)}
              medium
            />
          </div>
        </div>
      </div>
      {!isLoading ? (
        properties && properties?.length > 0 ? (
          <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-4 overflow-x-hidden p-8 pb-0">
            {/* {places.data &&
            places.data.length > 0 &&
            places.data.map((list) => {
              return (
                <ListingCard
                  key={list.id}
                  data={list}
                  currentUser={currentUser}
                  shrink={true}
                />
              );
            })} */}
          </div>
        ) : (
          <div className="text-[32px] font-bold mt-12 text-center pb-48">
            Enter date range to filter
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );

  const footerContent = (
    <>
      {/* {places.paging?.total > (places.paging?.limit || LIMIT) && (
        <PaginationComponent
          page={Number(searchParams.get("page")) || 1}
          total={searchParams.paging?.total || LIMIT}
          limit={searchParams.paging?.limit || LIMIT}
        />
      )} */}
    </>
  );

  return (
    <Modal
      isOpen={checkAvailableModal.isOpen}
      title="Properties Filter By Date Range"
      onClose={checkAvailableModal.onClose}
      body={bodyContent}
      footer={footerContent}
      classname="sm:w-full md:w-3/4 lg:w-2/3"
    />
  );
}

export default PropertiesFilteredModal;
