import Link from "next/link";
import { FirmTable } from "@/components/site/firm-table";
import { greenButtonClass } from "@/components/site/ui";

export function PartnersSection() {
  return (
    <section id="prop-firms" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-4xl font-bold leading-none text-white sm:text-5xl">
            The Best Firms In The Industry
          </h2>
          <Link href="/prop-firms" className={`${greenButtonClass} min-h-11 px-6`}>
            View all firms
          </Link>
        </div>
        <div className="mt-8">
          <FirmTable />
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-5 text-muted">
          Firm names open each company&apos;s official website. Affiliate links are not connected yet, and no
          coupon code is published. Discount labels are the offers shown in this comparison.
        </p>
      </div>
    </section>
  );
}
