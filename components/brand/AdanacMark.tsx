const ADANAC_PATH_D = "M 100,20 L 186,188 L 148,188 L 131,130 L 69,130 L 52,188 L 14,188 Z M 100,56 L 131,130 L 69,130 Z M 131,130 L 156,130 L 168,152 L 138,152 Z";

export default function AdanacMark({
  size = 200,
  fill = "#ffffff",
  bg = "#1a2332",
  tile = true,
  tileRadius = 0.09,
  className = "",
}: {
  size?: number;
  fill?: string;
  bg?: string;
  tile?: boolean;
  tileRadius?: number;
  className?: string;
}) {
  const rx = tile ? Math.round(size * tileRadius) : 0;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {tile ? (
        <rect width="200" height="200" rx={rx} fill={bg} />
      ) : (
        <rect width="200" height="200" fill="transparent" />
      )}
      <path
        fillRule="evenodd"
        fill={fill}
        d={ADANAC_PATH_D}
      />
    </svg>
  );
}
