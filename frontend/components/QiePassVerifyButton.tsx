"use client";

import { QiePassBadge } from "./QiePassBadge";

interface QiePassVerifyButtonProps {
  verified: boolean;
  isOwnProfile: boolean;
  onVerify?: () => void;
}

export function QiePassVerifyButton({
  verified,
  isOwnProfile,
  onVerify,
}: QiePassVerifyButtonProps) {
  if (verified) {
    return <QiePassBadge verified={true} />;
  }

  if (isOwnProfile && onVerify) {
    return (
      <button
        onClick={onVerify}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        title="Demo: simulates QIE Pass identity verification"
      >
        Verify with QIE Pass
      </button>
    );
  }

  return (
    <button
      disabled
      title="Demo integration placeholder — production will use QIE Pass API"
      className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400"
    >
      Verify with QIE Pass (demo)
    </button>
  );
}
