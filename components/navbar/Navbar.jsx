/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { reset } from "../slice/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import AdminNavbar from "./AdminNavbar";
import { BiFilterAlt } from "react-icons/bi";
import useFiltersModal from "@/hook/useFiltersModal";

function Navbar() {
  const authState = useSelector((state) => state.authSlice.authState);
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShowed, setIsShowed] = useState(true);
  const pathname = usePathname();
  const filtersModal = useFiltersModal();

  useEffect(() => {
    // remove cookie if expired
    const expiredAt = Number(Cookie.get("expiresAt"));
    if (expiredAt) {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp >= expiredAt) {
        handleLogout();
        localStorage.removeItem("persist:root");
        console.log("ACCESS TOKEN IS EXPIRED!!!");
      }
    } else {
      dispatch(reset());
      localStorage.removeItem("persist:root");
      console.log("ACCESS TOKEN IS EXPIRED!!!");
    }
  }, []);

  const handleLogout = () => {
    Cookie.remove("loggedUser");
    Cookie.remove("accessToken");
    Cookie.remove("expiresAt");
    Cookie.remove("userId");
    dispatch(reset());
  };

  return (
    <>
      {pathname !== "/verify" && (
        <div className="fixed w-full bg-white z-10 shadow-sm h-[10vh] min-h-[82px]">
          <div className="py-4 border-b-[1px] h-full">
            <Container>
              <div className="flex flex-row items-center justify-between gap-3 h-full ">
                <Logo />
                {loggedUser.role === 3 ? (
                  <div className={`${loggedUser.role === 3 && "w-full"}`}>
                    <AdminNavbar />
                  </div>
                ) : (
                  <div className="hidden lg:block">
                    <Search />
                  </div>
                )}
                <button
                  className="flex flex-row border border-solid border-gray-300 rounded-lg px-[16px] py-[8px] transition duration-300 hover:shadow-lg"
                  onClick={filtersModal.onOpen}
                >
                  <BiFilterAlt className="text-xl h-[24px]" />
                  <span className="text-base font-medium ml-[8px]">
                    Filters
                  </span>
                </button>
                <UserMenu authState={authState} loggedUser={loggedUser} />
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
