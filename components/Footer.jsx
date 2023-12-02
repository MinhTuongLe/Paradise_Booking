"use client";

import React, { useEffect, useState } from "react";
import FooterColumn from "@/components/FooterColumn";
import { useSelector } from "react-redux";

function Footer({}) {
  const [country, setCountry] = useState("United States");
  const loggedUser = useSelector((state) => state.authSlice.loggedUser);

  const itemData = [
    [
      "ABOUT",
      "Newsroom",
      "Learn about new features",
      "Letter from our founders",
      "Careers",
      "Investors",
    ],
    [
      "Support",
      "Help Center",
      "ParadiseCover",
      "Cancellation options",
      "Safety information",
      "Report a neighborhood concern",
    ],
    [
      "Community",
      "Newsroom",
      "Learn about new features",
      "Letter from our founders",
      "Careers",
      "Investors",
    ],
    [
      "Hosting",
      "Try hosting",
      "AirCover for Hosts",
      "Explore hosting resources",
      "Safety information",
      "How to host responsibly",
    ],
  ];

  useEffect(() => {
    fetch(
      `https://extreme-ip-lookup.com/json/?key=${process.env.NEXT_PUBLIC_LOOKUP_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCountry(data.country));
  }, []);

  const footerColumns = itemData.map((item, index) => (
    <FooterColumn index={index} data={item} key={index} />
  ));

  return (
    <>
      {loggedUser.role !== 3 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600 h-[30vh]">
          {footerColumns}
          <p className="text-sm">{country}</p>
        </div>
      )}
    </>
  );
}

export default Footer;
