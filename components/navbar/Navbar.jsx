/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { reset } from "../slice/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import AdminNavbar from "./AdminNavbar";

function Navbar() {
  const authState = useSelector((state) => state.authSlice.authState);
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShowed, setIsShowed] = useState(true);

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
    dispatch(reset());
    router.refresh();
  };

  return (
    // <>
    //   {loggedUser.role !== 3 ? (
    //     <div className="fixed w-full bg-white z-10 shadow-sm h-[10vh] min-h-[82px]">
    //       <div className="py-4 border-b-[1px] h-full">
    //         <Container>
    //           <div className="flex flex-row items-center justify-between gap-3 h-full">
    //             <Logo />
    //             <div className="xs:hidden sm:hidden md:hidden lg:block">
    //               <Search />
    //             </div>
    //             <UserMenu authState={authState} loggedUser={loggedUser} />
    //           </div>
    //         </Container>
    //       </div>
    //       <Categories />
    //     </div>
    //   ) : (
    //     <>
    //       <aside
    //         id="logo-sidebar"
    //         class={`${
    //           isShowed ? "translate-x-full" : "-translate-x-[80%]"
    //         } fixed top-0 left-0 z-40 w-64 h-screen transition-transform`}
    //         aria-label="Sidebar"
    //       >
    //         <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    //           <div className="mb-5">
    //             <div className="flex justify-between items-center">
    //               <Logo />
    //               <IoClose
    //                 size={24}
    //                 className="text-white cursor-pointer"
    //                 onClick={() => setIsShowed(false)}
    //               />
    //             </div>
    //           </div>
    //           <ul class="space-y-2 font-medium">
    //             <li>
    //               <a
    //                 href="/accounts"
    //                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    //               >
    //                 <MdManageAccounts size={28} />
    //                 <span class="ms-3">Accounts</span>
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="#"
    //                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    //               >
    //                 <svg
    //                   class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
    //                   aria-hidden="true"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                 >
    //                   <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
    //                 </svg>
    //                 <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
    //                 <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
    //                   3
    //                 </span>
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href={`/users/${loggedUser.id}`}
    //                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    //               >
    //                 <FaRegUser size={20} />
    //                 <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="/change-password"
    //                 class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    //               >
    //                 <RiLockPasswordLine size={24} />
    //                 <span class="flex-1 ms-3 whitespace-nowrap">
    //                   Change password
    //                 </span>
    //               </a>
    //             </li>
    //             <li>
    //               <span
    //                 onClick={handleLogout}
    //                 class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    //               >
    //                 <IoIosLogOut size={24} />
    //                 <span class="flex-1 ms-3 whitespace-nowrap">Log out</span>
    //               </span>
    //             </li>
    //           </ul>
    //         </div>
    //       </aside>
    //     </>
    //   )}
    // </>
    <div className="fixed w-full bg-white z-10 shadow-sm h-[10vh] min-h-[82px]">
      <div className="py-4 border-b-[1px] h-full">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 h-full ">
            <Logo />
            <div
              className={`${
                loggedUser.role === 3 && "w-full"
              } xs:hidden sm:hidden md:hidden lg:block`}
            >
              {loggedUser.role === 3 ? <AdminNavbar /> : <Search />}
            </div>
            <UserMenu authState={authState} loggedUser={loggedUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;
