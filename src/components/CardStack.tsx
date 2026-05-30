/*
  CLOUDINARY SETUP
  ─────────────────
  1. Create a free account at cloudinary.com (free tier: 25GB storage, 25GB bandwidth/month)
  2. In your Cloudinary dashboard → Media Library → Upload your short loop clip
     - Recommended: 6–10 seconds, H.264 MP4, 720p, under 3MB
     - This is a TEASER clip only — upload the full video to YouTube separately
  3. After upload, click the asset → copy the "URL" field
     - It will look like: https://res.cloudinary.com/YOUR_CLOUD/video/upload/v123/clip-name.mp4
  4. For the poster image, use the same URL but change the extension to .jpg
     - Cloudinary auto-generates a thumbnail from the first frame
     - e.g. https://res.cloudinary.com/YOUR_CLOUD/video/upload/v123/clip-name.jpg
  5. Paste both URLs into the matching Sanity fields for each video
*/

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import VideoLightbox from "./VideoLightbox";
import type { Video } from "@/types/sanity";
import styles from "./CardStack.module.css";

interface Props {
  videos: Video[];
}

export default function CardStack({ videos }: Props) {
  const featured = videos.slice(0, 5);
  const [order, setOrder] = useState<number[]>(
    () => featured.map((_, i) => i),
  );
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const dragging = useRef(false);
  const startX = useRef(0);

  const positionCard = useCallback(
    (el: HTMLDivElement, depth: number, animate: boolean) => {
      const scale = 1 - depth * 0.04;
      const xOff = depth * 50;
      if (!animate) el.style.transition = "none";
      el.style.transform = `translateX(${xOff}px) scale(${scale})`;
      el.style.zIndex = String(featured.length - depth);
      el.style.opacity = depth > 3 ? "0" : "1";
      if (!animate)
        requestAnimationFrame(() => {
          el.style.transition = "";
        });
    },
    [featured.length],
  );

  const restack = useCallback(
    (currentOrder: number[], animate = true) => {
      currentOrder.forEach((cardIdx, stackPos) => {
        const el = cardRefs.current[cardIdx];
        if (!el) return;
        const depth = currentOrder.length - 1 - stackPos;
        positionCard(el, depth, animate);
      });
    },
    [positionCard],
  );

  const playFrontVideo = useCallback((currentOrder: number[]) => {
    const frontIdx = currentOrder[currentOrder.length - 1];

    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.pause();
      v.style.opacity = "0";
      v.style.transition = "";
      if (i !== frontIdx) v.src = "";
    });

    const frontVideo = videoRefs.current[frontIdx];
    if (!frontVideo || !featured[frontIdx]?.loopClipUrl) return;

    const onReady = () => {
      frontVideo.play().catch(() => {});
      frontVideo.style.transition = "opacity 0.3s ease";
      frontVideo.style.opacity = "1";
      frontVideo.removeEventListener("canplay", onReady);
      frontVideo.removeEventListener("loadeddata", onReady);
    };

    frontVideo.addEventListener("canplay", onReady);
    frontVideo.addEventListener("loadeddata", onReady);
    frontVideo.src = featured[frontIdx].loopClipUrl!;
  }, [featured]);

  useEffect(() => {
    if (featured.length === 0) return;
    restack(order, false);
    playFrontVideo(order);
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;
    restack(order, true);
  }, [order]);

  useEffect(() => {
    if (featured.length === 0) return;

    const onVisibility = () => {
      if (document.hidden) {
        videoRefs.current.forEach((v) => {
          if (!v) return;
          v.pause();
        });
      } else {
        playFrontVideo(order);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [order, playFrontVideo, featured.length]);

  const cycle = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev];
      const top = next.pop()!;
      next.unshift(top);
      return next;
    });
  }, []);

  const getFrontEl = useCallback(() => {
    const frontIdx = order[order.length - 1];
    return cardRefs.current[frontIdx];
  }, [order]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (featured.length < 2) return;
      dragging.current = true;
      startX.current = e.clientX;
    },
    [featured.length],
  );

  useEffect(() => {
    if (featured.length < 2) return;

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const el = getFrontEl();
      if (!el) return;
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) < 4) return;
      el.style.transition = "none";
      const clamped = Math.max(-80, Math.min(80, dx));
      el.style.transform = `translateX(${clamped}px)`;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.clientX - startX.current;
      const el = getFrontEl();
      if (!el) return;

      if (Math.abs(dx) > 30 || Math.abs(dx) < 4) {
        el.style.transition = "";
        cycle();
        setTimeout(() => {
          const nextOrder = [...order];
          const top = nextOrder.pop()!;
          nextOrder.unshift(top);
          playFrontVideo(nextOrder);
        }, 300);
      } else {
        restack(order, true);
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [order, getFrontEl, restack, cycle, playFrontVideo, featured.length]);

  if (featured.length === 0) {
    return (
      <div className={styles.stack}>
        <p className="text-sm text-[var(--ink3)] p-4">No featured videos yet</p>
      </div>
    );
  }

  console.log(">>>", featured)

  return (
    <>
      <div
        className={styles.stack}
        onPointerDown={handlePointerDown}
        style={{ touchAction: "none", cursor: "grab" }}
      >
        {featured.map((v, i) => (
          <div
            key={v._id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={styles.card}
          >
            <Image
              src={v.thumbUrl}
              alt={v.title}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className={styles.img}
              priority={i === 0}
              placeholder={v.thumbLqip ? "blur" : "empty"}
              blurDataURL={v.thumbLqip}
            />
            {v.loopClipUrl && (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                muted
                loop
                playsInline
                poster={v.loopClipPoster ?? v.thumbUrl}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            )}
            <div className={styles.overlay} />
            <div className={styles.badge}>
              <svg viewBox="0 0 24 24" fill="white" width="10" height="10">
                <path d="M8 5v14l11-7z" />
              </svg>
              {v.duration}
            </div>
            <div className={styles.meta}>
              <p className={styles.title}>{v.title}</p>
              <p className={styles.sub}>{v.subtitle}</p>
            </div>
            <button
              className={styles.expand}
              aria-label={`Play ${v.title}`}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxSrc(v.embedUrl);
              }}
            >
              ↗
            </button>
          </div>
        ))}
      </div>
      {lightboxSrc && (
        <VideoLightbox
          src={lightboxSrc}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </>
  );
}
