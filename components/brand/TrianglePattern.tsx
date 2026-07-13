export default function TrianglePattern({
  variant = "dark",
  opacity = 0.08,
  className = "",
}: {
  variant?: "dark" | "light";
  opacity?: number;
  className?: string;
}) {
  const stroke = variant === "dark" ? "#ffffff" : "#1a2332";

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id={`triangles-${variant}`}
          width="64"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0,44 L 16,9 L 32,44 Z"
            fill="none"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="miter"
            opacity={opacity}
          />
          <path
            d="M 32,44 L 48,20 L 64,44 Z"
            fill="none"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="miter"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#triangles-${variant})`} />
    </svg>
  );
}
