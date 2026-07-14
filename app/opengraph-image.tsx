import { ImageResponse } from "next/og";

export const alt = "MG Digital — Création de sites internet à Kinshasa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 72% 20%, rgba(124,108,255,0.38), transparent 36%), radial-gradient(circle at 15% 80%, rgba(61,139,255,0.22), transparent 32%), #050507",
          color: "#f5f5f7",
        }}
      >
        <div style={{ display: "flex", width: 1020, flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 700 }}>
            <div style={{ display: "flex", width: 54, height: 54, alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,.18)", borderRadius: 27, background: "rgba(255,255,255,.07)", fontSize: 17 }}>MG</div>
            Digital
          </div>
          <div style={{ marginTop: 72, maxWidth: 940, fontSize: 74, fontWeight: 700, lineHeight: 1.02 }}>
            Des sites qui transforment votre présence en opportunités.
          </div>
          <div style={{ marginTop: 42, fontSize: 24, color: "rgba(245,245,247,.62)" }}>
            Création de sites internet · Kinshasa et à distance
          </div>
        </div>
      </div>
    ),
    size
  );
}
