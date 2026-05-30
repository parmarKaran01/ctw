import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function HeroBackground({ children, className = "" }: Props) {
  return (
    <section
      className={`relative min-h-screen overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[#FAFAF7] -z-10" />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 120% 40% at 50% 100%, rgba(74,180,90,0.15) 0%, rgba(74,180,90,0.05) 40%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 30% at 50% 100%, rgba(100,200,110,0.1) 0%, transparent 60%)",
        }}
      />

      {/* blend bridge: smooths the transition from white into grass */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30vh] -z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(250,250,247,0.1) 30%, transparent 60%)",
        }}
      />

      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.6) 0%, transparent 70%)",
        }}
      />

      {/* subtle vignette */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0,0,0,0.02) 100%)",
        }}
      />

      {/* grass foreground with cinematic fade-in */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] -z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,247,0.6) 0%, transparent 20%, transparent 70%, rgba(250,250,247,0.1) 100%)",
          }}
        />
        <img
          src="/images/grass.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 15%, black 35%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 15%, black 35%, black 85%, transparent 100%)",
          }}
        />
      </div>

      {/* soft bloom overlay at the horizon where grass meets white */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 15% at 50% 80%, rgba(255,255,255,0.12) 0%, transparent 60%)",
          backdropFilter: "blur(0.5px)",
        }}
      />

      {children}
    </section>
  );
}
