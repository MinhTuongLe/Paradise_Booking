/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import AdminNavBar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { reset } from "../slice/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Navbar() {
  const authState = useSelector((state) => state.authSlice.authState);
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // remove cookie if expired
    const expiredAt = Number(Cookie.get("expiresAt"));
    if (expiredAt) {
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp >= expiredAt) {
        Cookie.remove("loggedUser");
        Cookie.remove("accessToken");
        Cookie.remove("expiresAt");
        dispatch(reset());
        router.push("/");
        console.log("ACCESS TOKEN IS EXPIRED!!!");
      }
    }
  }, []);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm h-[10vh] min-h-[82px]">
      <div className="py-4 border-b-[1px] h-full">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 h-full">
            <Logo />
            {loggedUser?.role !== 3 && <Search />}
            {loggedUser?.role === 3 && <AdminNavBar />}
            <UserMenu authState={authState} loggedUser={loggedUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;
