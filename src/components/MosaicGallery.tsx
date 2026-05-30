"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import VideoLightbox from "./VideoLightbox";
import type { Video } from "@/types/sanity";
import styles from "./MosaicGallery.module.css";

const ASPECT_RATIOS = [
  "3/4", "4/5", "1/1", "2/3", "3/4", "16/9",
  "4/5", "3/4", "1/1", "2/3", "3/4", "4/5",
];
const BATCH = 12;

interface Props {
  videos: Video[];
}

export default function MosaicGallery({ videos }: Props) {
  const allTags = ["All", ...Array.from(new Set(videos.map((v) => v.tag)))];
  const [activeTag, setActiveTag] = useState("All");
  const [displayed, setDisplayed] = useState<Video[]>([]);
  const [cursor, setCursor] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeTag === "All" ? videos : videos.filter((v) => v.tag === activeTag);

  const loadMore = useCallback(() => {
    const slice = filtered.slice(cursor, cursor + BATCH);
    if (!slice.length) return;
    setDisplayed((prev) => [...prev, ...slice]);
    setCursor((prev) => prev + slice.length);
  }, [filtered, cursor]);

  useEffect(() => {
    setDisplayed([]);
    setCursor(0);
  }, [activeTag]);

  useEffect(() => {
    if (displayed.length === 0 && cursor === 0) loadMore();
  }, [displayed.length, cursor, loadMore]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [loadMore]);

  return (
    <>
      <div className={styles.filterRow} style={{ padding: "0 28px" }}>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`${styles.filterBtn} ${activeTag === tag ? styles.filterActive : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className={styles.mosaic} style={{ marginTop: 20 }}>
        {displayed.map((v, i) => (
          <div
            key={`${v._id}-${i}`}
            className={`${styles.item} ${styles.visible}`}
            style={{
              aspectRatio: ASPECT_RATIOS[i % ASPECT_RATIOS.length],
            }}
            onClick={() => setLightboxSrc(v.embedUrl)}
          >
            <img src={v.thumbUrl} alt={v.title} loading="lazy" />
            <div className={styles.overlay} />
            <div className={styles.hoverOverlay} />
            <div className={styles.playBtn}>
              <svg viewBox="0 0 24 24" fill="#111" width="18" height="18">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className={styles.meta}>
              <span className={styles.tag}>{v.tag}</span>
              <p className={styles.title}>{v.title}</p>
              <p className={styles.duration}>{v.duration}</p>
            </div>
          </div>
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 80 }} />

      {lightboxSrc && (
        <VideoLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </>
  );
}
