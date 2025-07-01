import { redirect } from "next/navigation";

export default function ProtectedPage() {
  redirect("/whatsapp_bot");
}
