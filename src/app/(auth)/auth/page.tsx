import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    redirect("/whatsapp_bot");
  } else {
    redirect("/auth/login");
  }
}
