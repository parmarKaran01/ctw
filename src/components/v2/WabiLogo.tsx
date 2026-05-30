import Image from "next/image";

interface WabiLogoProps {
  className?: string;
}

export function WabiLogo({ className = "" }: WabiLogoProps) {
  return (
    <Image
      src="/images/CTW-logo.png"
      alt="CTW"
      width={96}
      height={96}
      className={className}
      priority
    />
  );
}