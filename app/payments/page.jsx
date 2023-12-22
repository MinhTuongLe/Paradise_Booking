import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import PaymentClient from "./PaymentClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getPaymentByVendorId from "@/app/actions/getPaymentByVendorId";
import PaginationComponent from "@/components/PaginationComponent";
import { LIMIT } from "@/const";

export const dynamic = "force-dynamic";

const PaymentPage = async ({ searchParams }) => {
  let unauthorized = false;
  const accessToken = cookies().get("accessToken")?.value;

  const vendor_id = cookies().get("userId")?.value;
  const user = await getUserById(vendor_id);
  if (!accessToken || !vendor_id || !user || user?.role !== 2)
    unauthorized = true;

  let obj = {
    payments: [],
    paging: {
      total: 0,
      limit: LIMIT,
      page: 1,
    },
  };
  if (unauthorized) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  } else {
    obj = await getPaymentByVendorId(
      { vendor_id, ...searchParams } || {
        vendor_id,
        page: 1,
        limit: LIMIT,
      }
    );
  }

  return (
    <ClientOnly>
      <PaymentClient payments={obj.payments} />
      {obj.paging?.total > (obj.paging?.limit || LIMIT) && (
        <PaginationComponent
          page={Number(searchParams?.page) || 1}
          total={obj.paging?.total || LIMIT}
          limit={obj.paging?.limit || LIMIT}
        />
      )}
    </ClientOnly>
  );
};

export default PaymentPage;
