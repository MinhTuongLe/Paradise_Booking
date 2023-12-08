import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import VerifyClient from "./VerifyClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getPlaceByVendorId from "@/app/actions/getPlaceByVendorId";
import RoomsModal from "@/components/models/RoomsModal";
import { LIMIT } from "@/const";

export const dynamic = "force-dynamic";

const VerifyPage = async () => {
  return (
    <ClientOnly>
      <VerifyClient/>
    </ClientOnly>
  );
};

export default VerifyPage;
