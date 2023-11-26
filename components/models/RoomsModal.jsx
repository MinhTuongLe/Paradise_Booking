/* eslint-disable react/no-unescaped-entities */
"use client";

import useRoomsModal from "../../hook/useRoomsModal";
import Modal from "./Modal";
import ListingCard from "../listing/ListingCard";

function RoomsModal({ currentUser, places }) {
  const roomsModal = useRoomsModal();

  const bodyContent = (
    <div className="grid grid-cols-3 gap-12 overflow-x-hidden p-4">
      {places &&
        places.map((list) => {
          return (
            <ListingCard
              key={list.id}
              data={list}
              currentUser={currentUser}
              shrink={true}
            />
          );
        })}
    </div>
  );

  const footerContent = (
    <>
      <hr />
      <div className="flex justify-between items-center w-full">
        <button
          className="px-4 py-2 rounded-lg hover:opacity-80 transition bg-white border-black text-black text-sm border-[1px]"
          onClick={roomsModal.onClose}
        >
          Show more rooms
        </button>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={roomsModal.isOpen}
      title={`${places?.length || 0} rooms`}
      onClose={roomsModal.onClose}
      body={bodyContent}
      footer={footerContent}
      classname="sm:w-full md:w-3/4 lg:w-2/3"
    />
  );
}

export default RoomsModal;
