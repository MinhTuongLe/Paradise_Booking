"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import useRentModal from "@/hook/useRentModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import Notification from "@/components/Notification";

import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { GrLanguage } from "react-icons/gr";
import LanguageChoice from "@/components/LanguageChoice";
import { IoNotifications } from "react-icons/io5";
import Heading from "../Heading";

function UserMenu({ currentUser }) {
  const router = useRouter();
  const registerModel = useRegisterModal();
  const loginModel = useLoginModel();
  const rentModel = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const toggleNotification = useCallback(() => {
    setIsOpenNotification((value) => !value);
  }, []);

  const menuItemSelect = (item) => {
    router.push(item);
    if (isOpen) toggleOpen();
    if (isOpenNotification) toggleNotification();
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-4">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Paradise your Home
        </div>
        <div
          // onClick={}
          className="p-4 flex flex-row items-center gap-3 cursor-pointer transition relative"
        >
          <GrLanguage size={20} />
        </div>
        <div
          onClick={toggleNotification}
          className="p-4 flex flex-row items-center gap-3 cursor-pointer transition relative"
        >
          <IoNotifications size={20} />
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {currentUser ? (
              <Avatar src={currentUser.image} userName={currentUser.name} />
            ) : (
              <Image
                className="rounded-full"
                height="30"
                width="30"
                alt="Avatar"
                src="/assets/avatar.png"
              />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {/* {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                />
                <MenuItem onClick={onRent} label="Airbnb your home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModel.onOpen} label="Login" />
                <MenuItem onClick={registerModel.onOpen} label="Sign up" />
              </>
            )} */}
            <>
              <MenuItem onClick={loginModel.onOpen} label="Login" />
              <MenuItem onClick={registerModel.onOpen} label="Sign up" />
              <MenuItem
                onClick={() => menuItemSelect("/trips")}
                label="My trips"
              />
              <MenuItem
                onClick={() => menuItemSelect("/favorites")}
                label="My favorites"
              />
              <MenuItem
                onClick={() => menuItemSelect("/reservations")}
                label="My reservations"
              />
              <MenuItem
                onClick={() => menuItemSelect("/properties")}
                label="My properties"
              />
              <MenuItem onClick={onRent} label="Airbnb your home" />
              <MenuItem
                onClick={() => menuItemSelect("/profile")}
                label="My profile"
              />
              <MenuItem
                onClick={() => menuItemSelect("/change-password")}
                label="Change Password"
              />
              <hr />
              <MenuItem onClick={() => signOut()} label="Logout" />
            </>
          </div>
        </div>
      )}
      {isOpenNotification && (
        <div className="absolute rounded-xl shadow-md w-[24vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="col-span-12 space-p-4 p-4 pr-2">
            <h1 className="text-2xl font-bold my-3">Notifications</h1>
            <hr />
            <div className="flex justify-between items-center my-3">
              <span className="text-lg font-bold truncate ">Before</span>
              <span
                className="text-md text-rose-500 cursor-pointer"
                onClick={() => {
                  menuItemSelect("/notifications");
                }}
              >
                View all
              </span>
            </div>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF5A5F]">
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
              <Notification
                id={1}
                content={"Thông báo từ Lê Minh Tường mới nhất"}
                avatar={""}
                date={"11/11/2011"}
                closeIcon={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
