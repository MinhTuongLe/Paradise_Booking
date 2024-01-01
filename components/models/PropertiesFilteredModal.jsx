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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date_from: "",
      date_to: "",
    },
  });

  // const getPlacesByVendorId = async () => {
  //   setIsLoading(true);
  //   const config = {
  //     params: {
  //       page: searchParams.get("page") || 1,
  //       limit: searchParams.get("limit") || LIMIT,
  //     },
  //   };

  //   await axios
  //     .get(`${API_URL}/places/owner/${params.usersId}`, config)
  //     .then((response) => {
  //       setPlaces(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       toast.error("Something Went Wrong");
  //       setIsLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   if (checkAvailableModal.isOpen) getPlacesByVendorId();
  // }, [params, checkAvailableModal]);

  const handleFilter = async (data) => {
    const submitValues = {
      ...data,
      date_from: data.date_from.split("-").reverse().join("-"),
      date_to: data.date_to.split("-").reverse().join("-"),
    };
    const dateFrom = new Date(data.date_from);
    const dateTo = new Date(data.date_to);

    if (dateFrom > dateTo) {
      toast.error("From Date must be before To Date");
      return;
    }

    console.log(submitValues);
  };

  const handleClearFilter = () => {
    reset();
    setProperties([]);
  };

  const bodyContent = (
    <>
      <div className="flex items-center space-x-8 justify-between">
        <div className="flex items-center space-x-12 justify-center">
          <div className="flex space-x-4 items-center">
            <div className="font-bold text-[16px]">From</div>
            <Input
              id="date_from"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="date"
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
              label="Clear"
              onClick={handleSubmit(handleClearFilter)}
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
