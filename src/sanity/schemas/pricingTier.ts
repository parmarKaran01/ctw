/* eslint-disable @typescript-eslint/no-explicit-any */
const pricingTier = {
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    { name: "label",       type: "string", title: "Tab label (e.g. Starter)" },
    { name: "name",        type: "string", title: "Full name (e.g. CTW Essentials)" },
    { name: "turnaround",  type: "string", title: "Turnaround (e.g. 24–48hr)" },
    { name: "price",       type: "string", title: "Price (e.g. ₹41,299)" },
    { name: "period",      type: "string", title: "Period (e.g. / month)", initialValue: "/ month" },
    { name: "badge",       type: "string", title: "Badge text (e.g. Billed every 3 months)" },
    { name: "description", type: "string", title: "Short description" },
    {
      name: "features",
      type: "array",
      title: "Feature list",
      of: [{ type: "string" }],
    },
    { name: "ctaLabel", type: "string", title: "CTA button label" },
    {
      name: "billingCycle",        // ← NEW FIELD
      type: "string",
      title: "Billing Cycle",
      options: {
        list: [
          { title: "Quarterly", value: "quarterly" },
          { title: "Monthly",   value: "monthly"   },
        ],
        layout: "radio",
      },
      initialValue: "quarterly",
      validation: (r: any) => r.required(),
    },
    { name: "order", type: "number", title: "Sort order" },
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "billingCycle" },
  },
};

export default pricingTier;