import React from "react";
import { Button } from "@/components/ui/button";

/* ---------- Page ---------- */
export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-black mb-2">
            Contact Gray Cup
          </h1>
          <p className="text-muted-foreground">
            Have a question or want to do business? There is always a way to
            reach us.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Schedule Meeting */}
          <div className="p-4 border rounded-lg flex flex-col">
            <h2 className="font-semibold text-black mb-1">
              Schedule a Meeting
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Book a Zoom call with Arjun.
            </p>
            <Button size="minor" variant="black" asChild className="mt-auto">
              <a
                href="https://cal.com/graycup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule
              </a>
            </Button>
          </div>

          {/* Phone */}
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold text-black mb-1">Phone</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Call us directly.
            </p>
            <p className="text-sm text-black underline underline-offset-4 hover:text-neutral-600">
              +91 98765 43210
            </p>
            <p className="text-sm text-black underline underline-offset-4 hover:text-neutral-600 pt-4">
              +91 98765 43240
            </p>
          </div>

          {/* Sales & Purchases */}
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold text-black mb-1">Sales & Purchases</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Response within 48 hours.
            </p>
            <a
              href="mailto:bulk@graycup.org"
              className="text-sm text-black underline underline-offset-4 hover:text-neutral-600"
            >
              bulk@graycup.org
            </a>
          </div>

          {/* General Enquiries */}
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold text-black mb-1">General Enquiries</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Response within 48 hours.
            </p>
            <a
              href="mailto:arjun@graycup.org"
              className="text-sm text-black underline underline-offset-4 hover:text-neutral-600"
            >
              arjun@graycup.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
