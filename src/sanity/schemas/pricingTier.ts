/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: "pricingTier",
  title: "Pricing Tier",
  type: "document",
  fields: [
    { name: "label", type: "string", title: "Tab label (e.g. Essential)" },
    {
      name: "name",
      type: "string",
      title: "Full name (e.g. CTW Essentials)",
    },
    {
      name: "turnaround",
      type: "string",
      title: "Turnaround (e.g. 24–48hr)",
    },
    { name: "price", type: "string", title: "Price (e.g. $350)" },
    {
      name: "period",
      type: "string",
      title: "Period (e.g. / month)",
      initialValue: "/ month",
    },
    {
      name: "badge",
      type: "string",
      title: "Badge text (e.g. 2–3 active edits / week)",
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
};
