import { ImageResponse } from "next/og";

/** Dynamic Open Graph image: /og?title=...&subtitle=... (used for social sharing previews). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Software, ERP, CRM & App Development").slice(0, 110);
  const subtitle = (searchParams.get("subtitle") || "Websites · Mobile Apps · ERP · CRM · SaaS · AI").slice(0, 120);

  const infinity =
    "M32 32C28 26 24 22 19 22c-5.5 0-10 4.5-10 10s4.5 10 10 10c5 0 9-4 13-10s8-10 13-10c5.5 0 10 4.5 10 10s-4.5 10-10 10c-5 0-9-4-13-10z";
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="${infinity}" fill="none" stroke="#ff4fb3" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0b1026 0%, #141b3d 55%, #2a1650 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(232,23,140,0.45), rgba(232,23,140,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -160,
            bottom: -200,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(43,68,255,0.5), rgba(43,68,255,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 76,
              height: 76,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "2px solid rgba(255,255,255,0.15)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`} width={62} height={62} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 2 }}>INFINITE SOFT TECH</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.65)" }}>Beyond Technology. Into Infinite</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: title.length > 60 ? 54 : 66, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
          <div
            style={{
              display: "flex",
              height: 8,
              width: 220,
              borderRadius: 999,
              background: "linear-gradient(90deg, #2b44ff, #7b3aed, #e8178c)",
            }}
          />
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)" }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
          <div>infinitesofttech.com</div>
          <div>Ahmedabad, India</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" },
    },
  );
}
