import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function HeroBackground({ children, className = "" }: Props) {
  return (
    <div
      className={`hero-bg-layer ${className}`}
      aria-hidden="true"
    >
      {/* Base warm cream */}
      <div className="absolute inset-0 bg-[#FAFAF7] -z-10" />

      {/* Primary green glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 120% 35% at 50% 100%, rgba(74,180,90,0.1) 0%, rgba(74,180,90,0.03) 40%, transparent 70%)",
        }}
      />

      {/* Secondary warm glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 25% at 50% 100%, rgba(120,210,120,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Horizon blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30vh] -z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(250,250,247,0.15) 30%, transparent 60%)",
        }}
      />

      {/* Top soft bloom */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      {/* Grass foreground */}
      <div className="absolute bottom-0 left-0 right-0 h-[45vh] -z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,247,0.7) 0%, transparent 25%, transparent 70%, rgba(250,250,247,0.08) 100%)",
          }}
        />
        <img
          src="/images/grass.png"
          alt=""
          className="fixed inset-0 w-full h-full object-cover object-bottom"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 12%, black 30%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 12%, black 30%, black 88%, transparent 100%)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* Horizon bloom */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 12% at 50% 80%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />

      {children}
    </div>
  );
}
