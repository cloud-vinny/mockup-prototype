import type { NextConfig } from "next";

/** Static frontend-only mockup: no API routes; `out/` is plain static files for Vercel or any CDN. */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
