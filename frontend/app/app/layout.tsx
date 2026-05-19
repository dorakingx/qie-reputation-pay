import { Navbar } from "@/components/Navbar";
import { DemoModeBanner } from "@/components/DemoModeBanner";
import { WrongChainBanner } from "@/components/WrongChainBanner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 space-y-3">
          <DemoModeBanner />
          <WrongChainBanner />
        </div>
        {children}
      </main>
    </div>
  );
}
