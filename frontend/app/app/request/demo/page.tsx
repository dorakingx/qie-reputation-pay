import { redirect } from "next/navigation";
import { DEMO_REQUEST_TARGET_ID } from "@/lib/demoData";

export default function DemoRequestPage() {
  redirect(`/app/request/${DEMO_REQUEST_TARGET_ID}`);
}
