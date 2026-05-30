/* eslint-disable @typescript-eslint/no-explicit-any */
const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "quote", type: "string", title: "Quote" },
    {
      name: "avatar",
      type: "image",
      title: "Avatar",
      options: { hotspot: true },
    },
    { name: "order", type: "number", title: "Sort order" },
  ],
};

export default testimonial;
