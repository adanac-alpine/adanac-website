export default function AdanacWordmark({
  color = "#1a2332",
  incColor = "#6b7280",
  adanacWeight = 700,
  advisoryWeight = 300,
  fontSize = 32,
  showInc = true,
  className = "",
}: {
  color?: string;
  incColor?: string;
  adanacWeight?: number;
  advisoryWeight?: number;
  fontSize?: number;
  showInc?: boolean;
  className?: string;
}) {
  return (
    <div
      style={{ fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}
      className={className}
    >
      <span
        style={{
          fontSize,
          fontWeight: adanacWeight,
          letterSpacing: "0.25em",
          color,
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        ADANAC ALPINE
      </span>
      <span
        style={{
          fontSize,
          fontWeight: advisoryWeight,
          letterSpacing: "0.375em",
          color,
          textTransform: "uppercase",
          lineHeight: 1,
          marginTop: fontSize * 0.3,
        }}
      >
        ADVISORY
      </span>
      {showInc && (
        <span
          style={{
            fontSize: Math.max(9, fontSize * 0.41),
            fontWeight: 400,
            letterSpacing: "0.5em",
            color: incColor,
            textTransform: "uppercase",
            lineHeight: 1,
            marginTop: fontSize * 0.18,
          }}
        >
          INC.
        </span>
      )}
    </div>
  );
}
