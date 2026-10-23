import Image from "next/image";
import Link from "next/link";
import { bookPriceLabel } from "@/config/site";
import { CheckoutButton } from "@/components/billing/checkout-button";
import { billingGaps } from "@/lib/billing/stripe";

export function BookSection({ nested = false }: { nested?: boolean }) {
  const price = bookPriceLabel();
  const gaps = billingGaps();

  return (
    <section
      id="book"
      className={nested ? "scroll-mt-24 border-t border-line py-16" : "scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24"}
    >
      <div className={`${nested ? "" : "mx-auto max-w-7xl"} grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <Image
            src="/images/9-book.jpg"
            alt="Black hardcover 9EMA Trading Playbook with a green candlestick chart on the cover"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-neon">THE BOOK</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
            9EMA Trading Playbook.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            The pattern pages on this site stay free. This is the playbook book.
          </p>
          <p className="mt-8 font-display text-5xl font-bold text-neon">{price}</p>
          <p className="mt-2 text-sm text-muted">One-time price.</p>
          <div className="mt-6">
            <CheckoutButton product="book" label="Get the book" />
          </div>
          {gaps.length > 0 ? (
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Card checkout is not connected yet.{" "}
              <Link href="/indicator" className="text-neon underline-offset-2 hover:underline">
                See what is missing
              </Link>
            </p>
          ) : null}
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            A finished Stripe payment is not the same as delivery. This site does not ship or download the book
            automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
