import Link from "next/link";

const LAST_UPDATED = "May 18, 2026";

export default function RefundsAndCancellations() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
      <h1 className="text-3xl font-bold text-neutral-800 mb-2">Refunds & Cancellations</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-neutral space-y-10 text-sm leading-relaxed text-neutral-700">

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">1. Sample Orders</h2>
          <p className="mb-3">
            Sample orders (100g, 1kg, 3kg, 5kg) are processed and dispatched promptly after payment.
            Because green coffee is a perishable agricultural product, we do not accept returns once
            the order has been shipped.
          </p>
          <p>
            <strong className="text-black">Eligible for refund or replacement:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Product arrived visibly damaged or contaminated.</li>
            <li>Wrong product was shipped.</li>
            <li>Package was lost in transit (confirmed by courier).</li>
          </ul>
          <p className="mt-3">
            To raise a claim, email us within <strong className="text-black">7 days</strong> of delivery with:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Your order reference / phone number used at checkout.</li>
            <li>Clear photographs of the product and packaging.</li>
            <li>A brief description of the issue.</li>
          </ul>
          <p className="mt-3">
            We will respond within 2 business days and, where the claim is valid, issue a full refund
            to your original payment method or ship a replacement — your choice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">2. Cancellations — Sample Orders</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Cancellations requested <strong className="text-black">before dispatch</strong> will receive a full refund
              within 5–7 business days.
            </li>
            <li>
              Cancellations requested <strong className="text-black">after dispatch</strong> are not eligible for refund,
              as the courier is already in transit.
            </li>
          </ul>
          <p className="mt-3">
            To cancel before dispatch, contact us immediately at{" "}
            <a href="mailto:office@graycup.org" className="underline underline-offset-4 text-black">office@graycup.org</a>{" "}
            with your order reference.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">3. Bulk Orders (10kg and above)</h2>
          <p className="mb-3">
            Bulk orders are governed by a separate purchase agreement or invoice. The cancellation and
            refund terms in that agreement take precedence. In general:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cancellations before production / lot allocation: full refund of any advance paid.</li>
            <li>Cancellations after lot allocation but before shipment: subject to a restocking fee agreed in the purchase agreement.</li>
            <li>Cancellations after shipment: not eligible for refund.</li>
            <li>Quality disputes must be raised within 14 days of delivery with a cupping report or photographic evidence.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">4. Refund Processing</h2>
          <p>
            Approved refunds are processed back to your original payment method via Cashfree Payments.
            Depending on your bank, the credit may take <strong className="text-black">5–10 business days</strong> to appear.
            We are not responsible for delays caused by your bank or card network.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">5. Non-Refundable Items</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Payment gateway convenience fees (if any) charged by Cashfree.</li>
            <li>Shipping costs once the order has been dispatched.</li>
            <li>Custom-blended or white-label lots prepared to specification.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">6. Contact Us</h2>
          <p>For any refund or cancellation requests:</p>
          <ul className="mt-2 space-y-1">
            <li>Email: <a href="mailto:office@graycup.org" className="underline underline-offset-4">office@graycup.org</a></li>
            <li>Email: <a href="mailto:arjun@graycup.in" className="underline underline-offset-4">arjun@graycup.in</a></li>
            <li>Phone: <a href="tel:+918527914317" className="underline underline-offset-4">+91 8527914317</a></li>
          </ul>
          <p className="mt-3">
            See also our <Link href="/terms" className="underline underline-offset-4 text-black">Terms & Conditions</Link>.
          </p>
        </section>

      </div>
    </div>
  );
}
