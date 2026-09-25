import { redirect } from "next/navigation";

// Root admin page just redirects to the dashboard
export default function AdminRoot() {
  redirect("/dashboard");
}
