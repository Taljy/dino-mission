interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "lg" }: LogoProps) {
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
