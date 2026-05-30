/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    { name: "brandName", type: "string", title: "Brand name (e.g. CTW)" },
    { name: "tagline", type: "string", title: "Tagline" },
    {
      name: "bookCallUrl",
      type: "url",
      title: "Book-a-call link (Calendly / Cal.com)",
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
      title: "Hero headline first part (e.g. Clips that)",
    },
    {
      name: "heroItalic",
      type: "string",
      title: "Hero headline italic word (e.g. work.)",
    },
  ],
};
