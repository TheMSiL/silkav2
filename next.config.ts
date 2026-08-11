import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portfolio pages are image-heavy; modern formats are the whole budget.
    formats: ["image/avif", "image/webp"],
    // 90 for portfolio screenshots: interface detail survives, 75 does not.
    qualities: [75, 90],
    deviceSizes: [390, 640, 828, 1080, 1280, 1440, 1920, 2560],
    imageSizes: [128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Captured screenshots are content-addressed by path and never change
        // in place — a re-capture is a new commit.
        source: "/work/:slug/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
