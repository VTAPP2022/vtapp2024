import { fetchAdminDetails } from "@vtapp/lib/auth";
import Scanner from "@vtapp/components/Scanner";

export default async function QRScan() {
  const adminDetails = await fetchAdminDetails();

  return (
    <>
      <Scanner admin={adminDetails} />
    </>
  );
}
