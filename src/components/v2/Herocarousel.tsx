"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  TouchEvent,
} from "react";
import { SanityVideo } from "../../types/sanity";

interface HeroCarouselProps {
  videos: Pick<SanityVideo, "_id" | "title" | "loopClipUrl" | "loopClipPoster">[];
}

/** How far apart (translateX) the inactive cards sit from centre */
const SIDE_OFFSET_X = 320;
const SIDE_OFFSET_Y = -28;
const SIDE_SCALE = 0.88;
const SIDE_ROTATE = 8; // degrees

function getCardStyle(
  index: number,
  active: number,
): React.CSSProperties {
  const diff = index - active;

  if (diff === 0) {
    return {
      transform: "translate(-50%, -50%) rotate(0deg) scale(1)",
      zIndex: 10,
      opacity: 1,
      pointerEvents: "auto",
    };
  }

  const direction = diff > 0 ? 1 : -1;
  const absDiff = Math.abs(diff);

  // Cards beyond immediate neighbours are hidden behind
  if (absDiff > 1) {
    return {
      transform: `translate(-50%, -50%) translateX(${direction * SIDE_OFFSET_X * 1.4}px) translateY(${SIDE_OFFSET_Y * 1.5}px) scale(${SIDE_SCALE * 0.92}) rotate(${direction * SIDE_ROTATE * 1.2}deg)`,
      zIndex: 5,
      opacity: 0,
      pointerEvents: "none",
    };
  }

  return {
    transform: `translate(-50%, -50%) translateX(${direction * SIDE_OFFSET_X}px) translateY(${SIDE_OFFSET_Y}px) scale(${SIDE_SCALE}) rotate(${direction * SIDE_ROTATE}deg)`,
    zIndex: 6,
    opacity: 0.7,
    pointerEvents: "none",
  };
}

export function HeroCarousel({ videos }: HeroCarouselProps) {
  const [active, setActive] = useState(1); // default to middle card like original
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Drag state
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Play only the active video
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === active) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [active]);

  const prev = useCallback(() =>
    setActive((a) => (a - 1 + videos.length) % videos.length), [videos.length]);
  const next = useCallback(() =>
    setActive((a) => (a + 1) % videos.length), [videos.length]);

  // ── Mouse drag ──────────────────────────────────────────────────────────────
  const onMouseDown = (e: MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };
  const onMouseMove = (e: MouseEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) isDragging.current = true;
  };
  const onMouseUp = (e: MouseEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    dragStartX.current = null;
  };

  // ── Touch drag ──────────────────────────────────────────────────────────────
  const onTouchStart = (e: TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    dragStartX.current = null;
  };

  if (!videos.length) return null;

  return (
    <div className="relative z-[1] min-h-[690px] flex-1">
      {/* Card stack */}
      <div
        className="relative mx-auto mt-0 h-[580px] max-w-[1000px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:mt-[88px] sm:h-[clamp(580px,58vw,840px)]"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { dragStartX.current = null; }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {videos.map((video, i) => (
          <div
            key={video._id}
            className="absolute top-1/2 left-1/2 w-[min(580px,82vw)] overflow-hidden rounded-[24px] will-change-transform"
            style={{
              height: "clamp(580px, 58vw, 840px)",
              transition: "transform 0.5s cubic-bezier(0.32,0.72,0,1), opacity 0.4s ease",
              ...getCardStyle(i, active),
            }}
            onClick={() => {
              if (!isDragging.current && i !== active) setActive(i);
            }}
          >
            {/* Muted loop video */}
            {video.loopClipUrl && (
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                className="pointer-events-none block size-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                poster={video.loopClipPoster ?? undefined}
              >
                <source src={video.loopClipUrl} type="video/mp4" />
              </video>
            )}

            {/* Fallback poster if no video */}
            {!video.loopClipUrl && video.loopClipPoster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={video.loopClipPoster}
                alt={video.title}
                className="size-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Dot pagination */}
      <div className="-mt-[35px] flex justify-center gap-2 sm:mt-[50px]">
        {videos.map((video, i) => (
          <button
            key={video._id}
            aria-label={`Show card ${i + 1}`}
            type="button"
            onClick={() => setActive(i)}
            className={`size-2 cursor-pointer rounded-full border-none p-0 transition-[transform,background] duration-300 ${
              i === active
                ? "scale-125 bg-[#191919]"
                : "bg-[#d4d4d4]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}