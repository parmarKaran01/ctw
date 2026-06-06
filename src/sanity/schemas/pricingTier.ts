/* eslint-disable @typescript-eslint/no-explicit-any */
const pricingTier = {
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    { name: "label",       type: "string", title: "Tab label (e.g. Starter)" },
    { name: "name",        type: "string", title: "Full name (e.g. CTW Essentials)" },
    { name: "turnaround",  type: "string", title: "Turnaround (e.g. 24–48hr)" },
    {
      name: "quarterlyPrice",
      type: "string",
      title: "Quarterly price (e.g. ₹41,299)",
    },
    {
      name: "quarterlyPeriod",
      type: "string",
      title: "Quarterly period (e.g. / quarter)",
      initialValue: "/ quarter",
    },
    {
      name: "quarterlyBadge",
      type: "string",
      title: "Quarterly badge (e.g. Billed every 3 months)",
    },
    {
      name: "monthlyPrice",
      type: "string",
      title: "Monthly price (e.g. ₹16,999)",
    },
    {
      name: "monthlyPeriod",
      type: "string",
      title: "Monthly period (e.g. / month)",
      initialValue: "/ month",
    },
    {
      name: "monthlyBadge",
      type: "string",
      title: "Monthly badge",
    },
    { name: "description", type: "string", title: "Short description" },
    {
      name: "features",
      type: "array",
      title: "Feature list",
      of: [{ type: "string" }],
    },
    { name: "ctaLabel", type: "string", title: "CTA button label" },
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
    select: { title: "name" },
  },
};

export default pricingTier;
