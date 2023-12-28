"use client";

import React from "react";
import Calendar from "../inputs/Calendar";
import Button from "../Button";
import { useSelector } from "react-redux";

function ListingReservation({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) {
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="flex gap-1 text-2xl font-semibold">
          $ {price} <p className="font-light text-neutral-600">/ night</p>
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      {loggedUser.role !== 3 && (
        <>
          <hr />
          <div className="p-4">
            <Button
              disabled={disabled}
              label={disabled ? "Out of rooms" : "Reserve"}
              onClick={onSubmit}
            />
          </div>
        </>
      )}
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p> $ {totalPrice}</p>
      </div>
    </div>
  );
}

export default ListingReservation;
