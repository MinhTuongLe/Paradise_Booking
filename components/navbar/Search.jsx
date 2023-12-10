/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useSearchModal from "@/hook/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

function Search({}) {
  const searchModel = useSearchModal();
  const params = useSearchParams();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return "";
    }

    return "Anywhere";
  }, [locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guessLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, []);

  return (
    <div
      onClick={() => searchModel.onOpen(1)}
      className="border-[1px] w-full rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between py-3">
        <div
          className="text-sm font-semibold px-6 whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            searchModel.onOpen(1);
          }}
        >
          {locationLabel}
        </div>
        <div
          className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            searchModel.onOpen(2);
          }}
        >
          {durationLabel}
        </div>
        <div
          className="hidden sm:inline-block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            searchModel.onOpen(3);
          }}
        >
          {guessLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 whitespace-nowrap">
          <div
            className="hidden sm:block text-center"
            onClick={(e) => {
              e.stopPropagation();
              searchModel.onOpen(4);
            }}
          >
            Price Range
          </div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
