/* eslint-disable @typescript-eslint/no-explicit-any */
const pricingTier = {
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    { name: "label",       type: "string", title: "Tab label (e.g. Starter)" },
    { name: "name",        type: "string", title: "Full name (e.g. CTW Essentials)" },
    { name: "turnaround",  type: "string", title: "Turnaround (e.g. 24–48hr)" },
    { name: "quarterlyPriceUSD", type: "string", title: "Quarterly price — USD (e.g. $499)" },
    { name: "quarterlyPeriodUSD", type: "string", title: "Quarterly period — USD (e.g. / quarter)", initialValue: "/ quarter" },
    { name: "quarterlyBadgeUSD", type: "string", title: "Quarterly badge — USD" },
    { name: "quarterlyPriceINR", type: "string", title: "Quarterly price — INR (e.g. ₹41,299)" },
    { name: "quarterlyPeriodINR", type: "string", title: "Quarterly period — INR (e.g. / quarter)", initialValue: "/ quarter" },
    { name: "quarterlyBadgeINR", type: "string", title: "Quarterly badge — INR" },
    { name: "monthlyPriceUSD", type: "string", title: "Monthly price — USD (e.g. $199)" },
    { name: "monthlyPeriodUSD", type: "string", title: "Monthly period — USD (e.g. / month)", initialValue: "/ month" },
    { name: "monthlyBadgeUSD", type: "string", title: "Monthly badge — USD" },
    { name: "monthlyPriceINR", type: "string", title: "Monthly price — INR (e.g. ₹16,999)" },
    { name: "monthlyPeriodINR", type: "string", title: "Monthly period — INR (e.g. / month)", initialValue: "/ month" },
    { name: "monthlyBadgeINR", type: "string", title: "Monthly badge — INR" },
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
