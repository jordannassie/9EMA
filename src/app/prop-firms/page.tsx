import type { Metadata } from "next";
import { FirmTable } from "@/components/site/firm-table";

export const metadata: Metadata = {
  title: "Prop firms",
  description: "Prop trading firms compared by rating, accounts, platforms, and discount.",
};

export default function PropFirmsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold leading-none text-white">The Best Firms In The Industry</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Compare account limits, platforms, and the discount shown for each firm.
      </p>
      <div className="mt-10">
        <FirmTable />
      </div>
    </main>
  );
}
