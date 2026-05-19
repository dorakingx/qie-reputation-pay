"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhatLocal, qieTestnet } from "./chains";

export const wagmiConfig = getDefaultConfig({
  appName: "QIE Reputation Pay",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "demo-project-id",
  chains: [qieTestnet, hardhatLocal],
  ssr: true,
});
