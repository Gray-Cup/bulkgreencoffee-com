import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const bulkgreencoffee_site = pgTable("bulkgreencoffee_site", {
  id:             serial("id").primaryKey(),
  created_at:     timestamp("created_at").defaultNow().notNull(),

  // customer
  name:           text("name").notNull(),
  phone:          text("phone").notNull(),
  email:          text("email"),
  country:        text("country").notNull().default("IN"),
  pincode:        text("pincode").notNull(),
  address:        text("address").notNull(),
  gst_or_tax_id:  text("gst_or_tax_id"),
  business_type:  text("business_type"),

  // order
  products:       text("products").notNull(),   // JSON array of slugs
  quantity_tier:  text("quantity_tier").notNull(),
  total_amount:   integer("total_amount").notNull(),

  // cashfree
  link_id:        text("link_id").notNull(),
  payment_status: text("payment_status").notNull().default("pending"),
});
