/* eslint-disable @typescript-eslint/no-explicit-any */
const video = {
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (r: any) => r.required(),
    },
    { name: "subtitle", type: "string", title: "Subtitle" },
    { name: "duration", type: "string", title: "Duration (e.g. 00:28)" },
    {
      name: "tag",
      type: "string",
      title: "Tag / Category",
      options: {
        list: [
          "Brand Film",
          "Podcast Clip",
          "Social",
          "Documentary",
          "Reel",
          "Other",
        ],
      },
    },
    {
      name: "embedUrl",
      type: "url",
      title: "YouTube / Vimeo Embed URL",
      description: "e.g. https://www.youtube.com/embed/XXXXX",
      validation: (r: any) => r.required(),
    },
    {
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      options: { hotspot: true },
      validation: (r: any) => r.required(),
    },
    {
      name: "featured",
      type: "boolean",
      title: "Show on home page carousel?",
      initialValue: false,
    },
    {
      name: "order",
      type: "number",
      title: "Sort order (lower = first)",
    },
    {
      name: "loopClipUrl",
      type: "url",
      title: "Loop Clip URL (Cloudinary)",
      description:
        "Paste the Cloudinary video URL for the short card loop (6–10 sec, muted autoplay). Format: https://res.cloudinary.com/YOUR_CLOUD/video/upload/your-clip.mp4",
    },
    {
      name: "loopClipPoster",
      type: "url",
      title: "Loop Clip Poster URL (Cloudinary)",
      description:
        "Paste the Cloudinary auto-generated thumbnail URL. Format: https://res.cloudinary.com/YOUR_CLOUD/video/upload/your-clip.jpg — just change the extension to .jpg",
    },
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "tag", media: "thumbnail" },
  },
};

export default video;
