/* eslint-disable @typescript-eslint/no-explicit-any */
const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    { name: "brandName", type: "string", title: "Brand name (e.g. CTW)" },
    {
      name: "taglineHighlight",
      type: "string",
      title: "Tagline — italic / highlighted part (shown first)",
    },
    { name: "tagline", type: "string", title: "Tagline — normal part (shown after)" },
    {
      name: "bookCallUrl",
      type: "url",
      title: "Book-a-call link (Calendly / Cal.com)",
    },
    {
      name: "whatsappUrl",
      type: "url",
      title: "WhatsApp link",
    },
    {
      name: "statsLine",
      type: "string",
      title: "Stats line (bottom of home page)",
    },
    {
      name: "trustedBy",
      type: "array",
      title: "Trusted-by brands",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Brand name" },
            {
              name: "logo",
              type: "image",
              title: "Logo",
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    {
      name: "heroHeadline",
      type: "string",
      title: "Hero headline",
    },
    {
      name: "trustedByHighlightText",
      type: "string",
      title: "Trusted-by highlight text (e.g. Trusted by 500+ creators)",
    },
    {
      name: "pricingFootnote1",
      type: "string",
      title: "Pricing section — footnote line 1",
    },
    {
      name: "pricingFootnote2",
      type: "string",
      title: "Pricing section — footnote line 2",
    },
    {
      name: "socialXUrl",
      type: "url",
      title: "X (Twitter) URL",
    },
    {
      name: "socialInstagramUrl",
      type: "url",
      title: "Instagram URL",
    },
    {
      name: "whoAreWeLink",
      type: "url",
      title: "\"Who are we\" button link",
    },
  ],
};

export default siteSettings;
