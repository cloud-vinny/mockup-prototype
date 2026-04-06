import Image from "next/image";
import ill from "./illustrations.module.css";

export function SegmentationIllustration() {
  return (
    <div className={ill.segmentPanel}>
      <svg
        className={ill.segmentSvg}
        viewBox="0 0 320 240"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="320" height="240" fill="#3d4450" />
        <path
          fill="rgba(34, 197, 94, 0.55)"
          d="M 200 118 Q 248 88 268 118 Q 248 148 200 118 Z"
        />
        <path
          fill="rgba(34, 197, 94, 0.55)"
          d="M 72 120 C 72 88 118 72 158 88 C 198 104 228 128 228 128 C 228 128 198 152 158 168 C 118 184 72 168 72 136 C 72 132 72 126 72 120 Z"
        />
        <ellipse
          cx="138"
          cy="120"
          rx="10"
          ry="10"
          fill="rgba(20, 83, 45, 0.75)"
        />
      </svg>
      <div className={ill.measurements}>
        <span>186.45 mm est.</span>
        <span>130.63 g est.</span>
      </div>
    </div>
  );
}

export function DetectionIllustration() {
  return (
    <div className={ill.detectWrap}>
      <Image
        className={ill.detectImage}
        src="/images/panel-mid.jpg"
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 480px"
      />
      <div className={ill.sensorBadge}>
        Sensor reading: Clean
        <br />
        Water clarity: Clear
      </div>
      <div
        className={ill.bbox}
        style={{ top: "28%", left: "12%", width: "32%", height: "38%" }}
      >
        <span className={ill.bboxLabel}>
          id:22 Lethrinus punctulatus 0.88
        </span>
      </div>
      <div
        className={ill.bbox}
        style={{ top: "42%", left: "48%", width: "28%", height: "30%" }}
      >
        <span className={ill.bboxLabel}>id:07 Chromis sp. 0.76</span>
      </div>
    </div>
  );
}

export function DisclaimerIllustration() {
  return (
    <div className={ill.disclaimerCard}>
      <svg
        className={ill.warningIcon}
        width="72"
        height="64"
        viewBox="0 0 72 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M36 4L68 56H4L36 4Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M36 22v14M36 42h.01"
          stroke="#78350f"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <p className={ill.disclaimerWord}>Disclaimer</p>
    </div>
  );
}
