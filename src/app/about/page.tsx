import type { Metadata } from "next";
import { MockPageShell } from "@/components/MockPageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About us — Fish AI",
  description: "Fish AI capstone project — underwater species analysis mockup.",
};

export default function AboutPage() {
  return (
    <MockPageShell
      title="About us"
      lead="Fish AI is a capstone concept for scanning underwater video to identify fish species and support simple measurements in future builds."
    >
      <p className={styles.block}>
        This site is a front-end mockup only: there is no backend, database, or
        model service attached. It is meant to look credible for demos and
        stakeholder reviews while you implement the real pipeline.
      </p>
      <p className={styles.block}>
        Planned direction for the full product:
      </p>
      <ul className={`${styles.block} ${styles.list}`}>
        <li>Ingest short clips from divers or fixed cameras.</li>
        <li>Highlight likely species with timestamps.</li>
        <li>Let users filter by species and export summaries.</li>
        <li>Later: length or weight estimates where calibration allows.</li>
      </ul>
    </MockPageShell>
  );
}
