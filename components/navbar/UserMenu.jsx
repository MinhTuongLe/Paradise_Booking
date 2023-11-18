"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import useRentModal from "@/hook/useRentModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Notification from "@/components/Notification";

import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { IoNotifications } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { reset } from "@/components/slice/authSlice";
import { set } from "date-fns";

function UserMenu({ currentUser, authState, loggedUser }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const registerModel = useRegisterModal();
  const loginModel = useLoginModel();
  const rentModel = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [language, setLanguage] = useState("vi");

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

  const handleChangeLanguage = () => {
    if (language === "en") setLanguage("vi");
    else setLanguage("en");
  };

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        if (isOpenNotification) setIsOpenNotification(false);
      }}
    >
      <div className="flex flex-row items-center gap-6">
        <div
          className="hidden md:block text-sm font-semibold py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Paradise your Home
        </div>
        <div
          // onClick={}
          className="flex flex-row items-center gap-3 cursor-pointer transition relative"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div
              className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:bg-rose-500 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"
              onClick={handleChangeLanguage}
            ></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 w-[8px]">
              {language.toUpperCase()}
            </span>
          </label>
        </div>
        {authState && (
          <div
            onClick={toggleNotification}
            className="flex flex-row items-center gap-3 cursor-pointer transition relative"
          >
            <IoNotifications size={20} />
          </div>
        )}
        <div
          onClick={toggleOpen}
          className="md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
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
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-20">
          <div className="flex flex-col cursor-pointer">
            {authState && loggedUser ? (
              <>
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
                <MenuItem onClick={onRent} label="Paradise your home" />
                <MenuItem
                  onClick={() => menuItemSelect(`/users/${loggedUser.id}`)}
                  label="My profile"
                />
                <MenuItem
                  onClick={() => menuItemSelect("/change-password")}
                  label="Change Password"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    if (isOpen) toggleOpen();
                    signOut();

                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("expiresAt");
                    dispatch(reset());
                    router.push("/");
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModel.onOpen();
                    if (isOpen) toggleOpen();
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModel.onOpen();
                    if (isOpen) toggleOpen();
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
      {isOpenNotification && (
        <div className="absolute rounded-xl shadow-md w-[24vw] bg-white overflow-hidden right-0 top-12 text-sm z-20">
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
