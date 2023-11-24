import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import AccountClient from "./AccountClient";
import { cookies } from "next/headers";
import getUserById from "@/app/actions/getUserById";
import getAccounts from "@/app/actions/getAccounts";

export const dynamic = "force-dynamic";

const AccountPage = async ({}) => {
  let unauthorized = false;
  const accessToken = cookies().get("accessToken")?.value;
  // console.log(accounts_data);

  const userId = cookies().get("userId")?.value;
  const user = await getUserById(userId);
  if (!accessToken || !userId || !user || user?.role !== 3) unauthorized = true;

  let accounts = [];
  if (unauthorized) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  } else {
    accounts = await getAccounts();
    console.log(accounts);
  }

  return (
    <ClientOnly>
      <AccountClient accounts={accounts} />
    </ClientOnly>
  );
};

export default AccountPage;
