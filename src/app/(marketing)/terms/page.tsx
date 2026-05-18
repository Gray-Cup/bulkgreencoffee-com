import Link from "next/link";

const LAST_UPDATED = "May 18, 2026";

export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-6 py-16">
      <h1 className="text-3xl font-bold text-neutral-800 mb-2">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-neutral space-y-10 text-sm leading-relaxed text-neutral-700">

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">1. About Us</h2>
          <p>
            Bulk Green Coffee is a trading name of Graycup Enterprises, a green coffee procurement
            and distribution business operating out of India. We source specialty and commercial-grade
            green coffee beans from farms across India and supply them to roasteries, cafes, importers,
            and other buyers worldwide.
          </p>
          <p className="mt-3">
            By placing an order or using this website you agree to these Terms & Conditions in full.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">2. Products & Services</h2>
          <p className="mb-4">We offer the following green coffee products. All prices are in Indian Rupees (INR) per kilogram and represent the minimum ex-warehouse price — final pricing depends on grade, lot size, and destination:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-black">Product</th>
                  <th className="text-left px-4 py-2 font-medium text-black">Region</th>
                  <th className="text-left px-4 py-2 font-medium text-black">Price Range (INR/kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Koraput Arabica Naturals", "East India (Odisha)", "₹1,100 – ₹1,900"],
                  ["Koraput Arabica Honey Sun-Dried", "East India (Odisha)", "₹1,200 – ₹2,100"],
                  ["Koraput Arabica Washed", "East India (Odisha)", "₹1,100 – ₹1,900"],
                  ["Halflong Arabica Naturals", "North East India (Assam)", "₹1,750"],
                  ["Chirang Robusta Naturals", "North East India (Assam)", "₹750 – ₹1,100"],
                  ["Tirap Robusta Naturals", "North East India (Arunachal Pradesh)", "₹800 – ₹1,200"],
                  ["Chikmagalur Arabica", "South India (Karnataka)", "₹950 – ₹1,700"],
                  ["Coorg Arabica", "South India (Karnataka)", "₹900 – ₹1,600"],
                  ["Wayanad Arabica", "South India (Kerala)", "₹900 – ₹1,650"],
                  ["Bababudangiri Arabica", "South India (Karnataka)", "₹1,200 – ₹2,200"],
                ].map(([name, region, price]) => (
                  <tr key={name}>
                    <td className="px-4 py-2 text-black">{name}</td>
                    <td className="px-4 py-2 text-muted-foreground">{region}</td>
                    <td className="px-4 py-2 font-medium text-black">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            We also offer white-label packaging, custom blending, and product-request sourcing as additional services.
            Samples (100g, 1kg, 3kg, 5kg) are available for purchase via our{" "}
            <Link href="/buy-samples" className="underline underline-offset-4 text-black">Buy Samples</Link> page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">3. Pricing & Currency</h2>
          <p>
            All listed prices are in Indian Rupees (INR). Currency conversions shown on the site are indicative only
            and based on live exchange rates. All payments are processed in INR through our payment gateway (Cashfree Payments).
            We reserve the right to update prices without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">4. Orders & Payment</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sample orders are prepaid via the checkout on this website.</li>
            <li>Bulk orders (10kg and above) are invoiced separately; payment terms are agreed upon before dispatch.</li>
            <li>We accept payment via the Cashfree payment gateway (UPI, cards, net banking, and international cards).</li>
            <li>Orders are confirmed only after payment is received and verified.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">5. Shipping & Delivery</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Samples are typically dispatched within 2–5 business days of payment confirmation.</li>
            <li>Delivery timelines vary by destination. Domestic (India): 3–7 days. International: 7–21 days.</li>
            <li>Shipping costs, if any, are communicated before order confirmation.</li>
            <li>Risk of loss passes to the buyer upon handover to the courier.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">6. Quality & Disputes</h2>
          <p>
            We stand behind the quality of our coffee. If a product arrives damaged or materially different from what was described,
            please contact us within 7 days of delivery with photographs. We will investigate and, where applicable, offer a
            replacement or credit. See our{" "}
            <Link href="/refunds" className="underline underline-offset-4 text-black">Refunds & Cancellations</Link> policy for full details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">7. Intellectual Property</h2>
          <p>
            All content on this website — including product descriptions, images, and copy — is the property of
            Graycup Enterprises. You may not reproduce or redistribute any content without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Graycup Enterprises is not liable for any indirect, incidental,
            or consequential loss arising from your use of our products or this website. Our total liability is
            limited to the amount paid for the specific order in dispute.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">9. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any disputes shall
            be subject to the exclusive jurisdiction of the courts of New Delhi, India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-3">10. Contact</h2>
          <p>For any questions regarding these Terms, reach us at:</p>
          <ul className="mt-2 space-y-1">
            <li>Email: <a href="mailto:office@graycup.org" className="underline underline-offset-4">office@graycup.org</a></li>
            <li>Email: <a href="mailto:arjun@graycup.in" className="underline underline-offset-4">arjun@graycup.in</a></li>
            <li>Phone: <a href="tel:+918527914317" className="underline underline-offset-4">+91 8527914317</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
}
