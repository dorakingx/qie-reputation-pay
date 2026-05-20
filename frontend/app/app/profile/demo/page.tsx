import { redirect } from "next/navigation";
import { DEMO_PROFILE_ADDRESS } from "@/lib/demoData";

export default function DemoProfilePage() {
  redirect(`/app/profile/${DEMO_PROFILE_ADDRESS}`);
}
