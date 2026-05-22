import { useState } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

function TextLogo({ size }: { size: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "lg" ? "text-5xl" : size === "md" ? "text-4xl" : "text-2xl";
  return (
    <div className="text-center">
      <h1 className={`font-display ${sizeClass} tracking-tight drop-shadow-sm`}>
        <span className="text-dino-green">DINO-</span>
        <span className="text-dino-orange">MISSION</span>
      </h1>
    </div>
  );
}

export function Logo({ size = "lg" }: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) return <TextLogo size={size} />;

  return (
    <img
      src="/branding/logo.png"
      alt="Dino-Mission"
      onError={() => setImgFailed(true)}
      className="mx-auto max-w-xs h-auto drop-shadow-sm"
    />
  );
}
