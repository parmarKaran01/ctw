import { unstable_cache } from "next/cache";
import { sanityFetch } from "@/sanity/client";
import { SITE_SETTINGS_QUERY, ALL_VIDEOS_QUERY } from "@/sanity/queries";
import Nav from "@/components/Nav";
import MosaicGallery from "@/components/MosaicGallery";
import type { SiteSettings, Video } from "@/types/sanity";

const getSettings = unstable_cache(
  () => sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ["settings"],
  { tags: ["siteSettings"] },
);

const getAllVideos = unstable_cache(
  () => sanityFetch<Video[]>(ALL_VIDEOS_QUERY),
  ["allVideos"],
  { tags: ["video"] },
);

export default async function Gallery() {
  const [settings, videos] = await Promise.all([getSettings(), getAllVideos()]);

  return (
    <>
      <Nav settings={settings} showBack />
      <div className="page-header">
        <h1>
          All <em>work.</em>
        </h1>
      </div>
      <MosaicGallery videos={videos} />
    </>
  );
}
