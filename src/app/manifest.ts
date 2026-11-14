import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Infinite Soft Tech",
    short_name: "Infinite Soft Tech",
    description: "Software, ERP, CRM, web & mobile app development company in Ahmedabad.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2b44ff",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
