"use client";

import { Link2 } from "lucide-react";
import { toast } from "sonner";

export function CopyProfileLink({ address }: { address: string }) {
  const copy = () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/app/profile/${address}`
        : `/app/profile/${address}`;
    navigator.clipboard.writeText(url);
    toast.success("Profile link copied!");
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
    >
      <Link2 className="h-3.5 w-3.5" />
      Copy profile link
    </button>
  );
}
