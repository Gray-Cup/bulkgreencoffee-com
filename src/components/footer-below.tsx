import Link from "next/link";

export default function FooterBelow() {
  const mainLinks = [
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://x.com/TheGrayCup", label: "Twitter" },
    { href: "https://github.com/Gray-Cup", label: "GitHub" },
    { href: "https://discord.gg/gpRxmW63JW", label: "Discord" },
    { href: "https://instagram.com/thegraycup", label: "Instagram" },
  ];

  const policyLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/refunds", label: "Refunds & Cancellations" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const resourceLinks = [
    { href: "https://graycup.org", label: "Company Site" },
    { href: "https://bulkgreencoffee.com/", label: "B2B Store" },
    { href: "https://graycup.in/", label: "Consumer Store" },
    { href: "https://status.graycup.org/", label: "Status" },
    { href: "/sitemap.xml", label: "Sitemap" },
  ];

  return (
    <footer className="bg-teal-600">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-8">

        {/* Policy links */}
        <div className="pt-6 flex flex-wrap gap-x-6 gap-y-2">
          {policyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 hover:text-white hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-md text-white font-medium border-t border-white/20 mt-4">
          <p>
            © {new Date().getFullYear()} Gray Cup Enterprises Pvt. Ltd. All
            rights reserved.
          </p>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md">
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
