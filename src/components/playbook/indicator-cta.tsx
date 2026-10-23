import Link from "next/link";
import { monthlyPriceLabel } from "@/config/site";
import { greenButtonClass } from "@/components/site/ui";

export function IndicatorCta() {
  return (
    <Link href="/indicator" className={greenButtonClass}>
      Get the 9EMA indicator — {monthlyPriceLabel()}/month
    </Link>
  );
}
