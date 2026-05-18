import Link from "next/link";

export default function BuySamplesSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-black mb-2">Order placed!</h1>
          <p className="text-muted-foreground">
            Your sample order has been received. We&apos;ll pack and ship it to you within 2–3 business days.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 text-left space-y-1">
          <p>• You&apos;ll get an SMS confirmation shortly.</p>
          <p>• Delivery usually takes 3–5 days after dispatch.</p>
          <p>• Questions? Reach us at <a href="/contact" className="underline">contact page</a>.</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors"
        >
          ← Browse all products
        </Link>
      </div>
    </div>
  );
}
