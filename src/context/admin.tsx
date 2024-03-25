import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { API_KEY, API_URL } from "@/config/api";
import { ReactNode } from "react";

export default async function Admin({ children }: { children: ReactNode }) {
  const session = await auth();

  const res = await fetch(`${API_URL}/admin`, {
    method: "POST",
    headers: {
      "api-key": API_KEY,
    },
    body: JSON.stringify({ session }),
  });

  if (!res.ok) {
    return (
      <>
        <div>You have no access to view this page</div>
        <div>Unauthorized 401</div>
      </>
    );
  }

  return <>{children}</>;
}
