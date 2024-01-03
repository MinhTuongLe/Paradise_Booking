/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useSearchModal from "@/hook/useSearchModal";
import { differenceInDays, parse } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

function Search({}) {
  const searchModel = useSearchModal();
  const params = useSearchParams();

  const lat = params?.get("lat");
  const lng = params?.get("lng");
  const startDate = params?.get("date_from");
  const endDate = params?.get("date_to");
  const guest = params?.get("guest");
  const num_bed = params?.get("num_bed");
  const price_from = params?.get("price_from");
  const price_to = params?.get("price_to");

  const locationLabel = useMemo(() => {
    if (lat && lng) {
      return `(${lat}, ${lng})`;
    }

    return "Anywhere";
  }, [lat, lng, startDate, endDate, guest, num_bed, price_from, price_to]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = parse(startDate, "dd-MM-yyyy", new Date());
      const end = parse(endDate, "dd-MM-yyyy", new Date());
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [lat, lng, startDate, endDate, guest, num_bed, price_from, price_to]);

  const guessLabel = useMemo(() => {
    if (guest && num_bed) {
      return `${guest} Guests / ${num_bed} Beds`;
    }

    return "Guests / Beds";
  }, [lat, lng, startDate, endDate, guest, num_bed, price_from, price_to]);

  const priceRangeLabel = useMemo(() => {
    if (price_from && price_to) {
      return `${price_from}$ - ${price_to}$`;
    }

    return "Price Range";
  }, [lat, lng, startDate, endDate, guest, num_bed, price_from, price_to]);

  return (
    <div className="border-[1px] w-full rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
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
        <div className="text-sm pl-6 pr-2 flex flex-row items-center gap-3 whitespace-nowrap">
          <div
            className="hidden sm:block text-center font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              searchModel.onOpen(4);
            }}
          >
            {priceRangeLabel}
          </div>
          <div className="ml-2 p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
