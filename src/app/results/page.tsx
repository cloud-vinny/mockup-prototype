import type { Metadata } from "next";
import Link from "next/link";
import { MockPageShell } from "@/components/MockPageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Results — Fish AI",
  description: "Mockup detection results for Fish AI capstone.",
};

const MOCK_ROWS = [
  { species: "Clownfish", time: "0:12", confidence: "94%" },
  { species: "Blue tang", time: "0:45", confidence: "88%" },
  { species: "Hawksbill turtle", time: "1:03", confidence: "91%" },
  { species: "Unknown — reef fish", time: "1:22", confidence: "62%" },
] as const;

export default function ResultsPage() {
  return (
    <MockPageShell
      title="Results"
      lead="Sample detections for demo purposes. Replace with real model output when you wire up the product."
    >
      <div className={styles.summary}>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Frames reviewed</p>
          <p className={styles.statValue}>1,240</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Species tagged</p>
          <p className={styles.statValue}>4</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statLabel}>Clip length</p>
          <p className={styles.statValue}>2:18</p>
        </div>
      </div>

      <h2 className={styles.listTitle}>Detections</h2>
      <div className={styles.rows}>
        {MOCK_ROWS.map((row) => (
          <div key={row.species + row.time} className={styles.row}>
            <span className={styles.species}>{row.species}</span>
            <span className={styles.meta}>{row.time}</span>
            <span className={styles.confidence}>{row.confidence}</span>
          </div>
        ))}
      </div>

      <p className={styles.footer}>
        <Link href="/analyze" className={styles.back}>
          ← Back to Analyze
        </Link>
      </p>
    </MockPageShell>
  );
}
