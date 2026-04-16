import type { Metadata } from "next";
import Link from "next/link";
import { MockPageShell } from "@/components/MockPageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Analyse — Fish AI",
  description:
    "Mockup: choose underwater footage to analyse (no upload or processing).",
};

export default function AnalyzePage() {
  return (
    <MockPageShell
      wide
      title="Analyse footage"
      lead="This screen is a static mockup. Nothing is uploaded or processed."
    >
      <div className={styles.uploadBlock}>
        <div className={styles.dropzone}>
          <span>Drop a video file here</span>
          <span className={styles.hint}>
            or click to browse (disabled in mockup)
          </span>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.btn} disabled>
            Run analysis
          </button>
          <Link href="/results" className={styles.btnGhost}>
            View sample results
          </Link>
        </div>
      </div>

    </MockPageShell>
  );
}
