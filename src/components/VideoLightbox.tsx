"use client";

import { useEffect } from "react";
import styles from "./VideoLightbox.module.css";

interface Props {
  src: string;
  onClose: () => void;
}

export default function VideoLightbox({ src, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`${styles.overlay} ${styles.open}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        <iframe
          src={`${src}?autoplay=1`}
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
