"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

function Navbar({ currentUser }) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm h-[10vh]">
      <div className="py-4 border-b-[1px] h-full">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 h-full">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;
