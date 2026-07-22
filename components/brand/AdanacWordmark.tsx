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
    <div style={{ fontFamily: "Inter, sans-serif" }} className={className}>
      <div style={{ display: "flex", alignItems: "baseline", gap: fontSize * 0.2 }}>
        <span
          style={{
            fontSize,
            fontWeight: adanacWeight,
            letterSpacing: "0.2em",
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
            letterSpacing: "0.32em",
            color,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          ADVISORY
        </span>
      </div>
      {showInc && (
        <div
          style={{
            fontSize: Math.max(9, fontSize * 0.28),
            fontWeight: 400,
            letterSpacing: "0.5em",
            color: incColor,
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: fontSize * 0.18,
          }}
        >
          INC.
        </div>
      )}
    </div>
  );
}
