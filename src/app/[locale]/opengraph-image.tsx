import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide social card. Case studies and articles override this per route. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090a",
          color: "#eeece6",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "4px solid #ff4a1c",
              borderTop: "none",
              borderRadius: "0 0 20px 20px",
            }}
          />
          <div style={{ fontSize: 34, letterSpacing: -1, fontWeight: 600 }}>{site.name}</div>
          <div style={{ fontSize: 20, color: "#8b9199", letterSpacing: 2, textTransform: "uppercase" }}>
            {site.descriptor}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -3, maxWidth: 900, display: "flex" }}>
            We build digital products businesses run on.
          </div>
          <div style={{ fontSize: 26, color: "#8b9199", maxWidth: 820, display: "flex" }}>
            Web · Mobile · SaaS · CRM · ERP · Automation · AI · Backend
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, color: "#ff4a1c" }}>{site.tagline}</div>
          <div style={{ fontSize: 22, color: "#565d64" }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
