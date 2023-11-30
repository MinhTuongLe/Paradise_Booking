"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BsArrowLeftCircle, BsArrowRightCircle, BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { BiFilterAlt } from "react-icons/bi";
import useFiltersModal from "../../hook/useFiltersModal";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

function Categories({}) {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const filtersModal = useFiltersModal();

  const functionDelete = () => {
    console.log(123123123);
  };

  const isMainPage = pathname === "/";
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollableContainerRef = useRef(null);

  if (!isMainPage) {
    return null;
  }

  const scroll = (direction) => {
    if (scrollableContainerRef.current) {
      const container = scrollableContainerRef.current;
      const containerWidth = container.clientWidth;
      const containerScrollWidth = container.scrollWidth;
      const newPosition =
        direction === "left"
          ? Math.max(scrollPosition - containerWidth, 0)
          : Math.min(
              scrollPosition + containerWidth,
              containerScrollWidth - containerWidth
            );
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <Container>
      <div className="flex flex-row items-center justify-center z-10 bg-white gap-16">
        <div className="pt-4 flex flex-row items-center justify-between w-[992px] relative">
          <button
            className="absolute left-0 top-0 h-full p-2 mr-4 translate-x-[-100%]"
            onClick={() => scroll("left")}
          >
            <BsArrowLeftCircle size={24} />
          </button>
          <div
            ref={scrollableContainerRef}
            className="overflow-x-auto w-full scrollbar-none gap-6"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {categories.map((items, index) => (
              <CategoryBox
                key={index}
                icon={items.icon}
                label={items.label}
                selected={category === items.label}
              />
            ))}
          </div>
          <button
            className="absolute right-0 top-0 h-full p-2 ml-4 translate-x-[100%]"
            onClick={() => scroll("right")}
          >
            <BsArrowRightCircle size={24} />
          </button>
        </div>
        <button
          className="flex flex-row border border-solid border-gray-300 rounded-lg px-[16px] py-[8px] transition duration-300 hover:shadow-lg"
          onClick={filtersModal.onOpen}
        >
          <BiFilterAlt className="text-xl h-[24px]" />
          <span className="text-base font-medium ml-[8px]">Filters</span>
        </button>
      </div>
    </Container>
  );
}

export default Categories;
