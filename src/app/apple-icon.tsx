import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const INFINITY =
  "M32 32C28 26 24 22 19 22c-5.5 0-10 4.5-10 10s4.5 10 10 10c5 0 9-4 13-10s8-10 13-10c5.5 0 10 4.5 10 10s-4.5 10-10 10c-5 0-9-4-13-10z";

export default function AppleIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="${INFINITY}" fill="none" stroke="#ff4fb3" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1026 0%, #1c2550 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} width={150} height={150} alt="" />
      </div>
    ),
    size,
  );
}
