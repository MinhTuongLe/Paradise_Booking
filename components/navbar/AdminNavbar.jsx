"use client";
import { MdManageAccounts } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Accounts",
    icon: MdManageAccounts,
  },
];

function AdminNavbar({}) {
  return (
    <Container>
      <div
        className="overflow-x-auto w-full scrollbar-none gap-6"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {categories.map((items, index) => (
          <CategoryBox
            key={index}
            icon={items.icon}
            label={items.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default AdminNavbar;
