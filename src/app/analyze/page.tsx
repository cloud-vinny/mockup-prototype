import type { Metadata } from "next";
import Link from "next/link";
import {
  DetectionIllustration,
  DisclaimerIllustration,
  SegmentationIllustration,
} from "./AnalyzeIllustrations";
import { MockPageShell } from "@/components/MockPageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Analyze — Fish AI",
  description:
    "Mockup: choose underwater footage to analyze (no upload or processing).",
};

export default function AnalyzePage() {
  return (
    <MockPageShell
      wide
      title="Analyze footage"
      lead="This screen is a static mockup. Nothing is uploaded or processed — use it to show your capstone flow."
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

      <hr className={styles.featuresDivider} />

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.featuresHeading}>
          What Fish AI can do
        </h2>
        <p className={styles.featuresIntro}>
          Quick overview of the pipeline this mockup is meant to represent —
          same ideas as your FAQ page, laid out for reviewers.
        </p>

        <div className={styles.featureRow}>
          <div className={styles.featureCopy}>
            <h3>How does Fish AI work?</h3>
            <p>
              Fish AI uses an instance segmentation-style approach to separate
              each fish from the background so species and measurements can be
              estimated at a per-instance level (demo values only here).
            </p>
            <ul className={styles.featureList}>
              <li>Pixel-accurate masks per detected fish</li>
              <li>Estimated length from calibrated or relative scale</li>
              <li>Estimated weight from length–weight heuristics when trained</li>
            </ul>
          </div>
          <div className={styles.featureVisual}>
            <SegmentationIllustration />
          </div>
        </div>

        <div className={`${styles.featureRow} ${styles.featureRowReverse}`}>
          <div className={styles.featureCopy}>
            <h3>What can Fish AI do?</h3>
            <p>
              On each frame or clip, the system can highlight individual fish,
              attach a species hypothesis with confidence, and surface simple
              environmental cues to help interpret the scene.
            </p>
            <ul className={styles.featureList}>
              <li>Bounding boxes with IDs and species labels</li>
              <li>Native vs invasive flags where taxonomy is known</li>
              <li>Optional sensor-style readouts (e.g. clarity) in the UI</li>
            </ul>
          </div>
          <div className={styles.featureVisual}>
            <DetectionIllustration />
          </div>
        </div>

        <div className={styles.featureRow}>
          <div className={styles.featureCopy}>
            <h3>Research disclaimer</h3>
            <p>
              This tool is a student prototype. It is not intended for
              high-stakes research, compliance, or policy decisions without
              independent validation and appropriate expertise.
            </p>
            <p>
              Model outputs may be wrong; habitat and species lists vary by
              region. Always corroborate with field guides and local regulations.
            </p>
          </div>
          <div className={styles.featureVisual}>
            <DisclaimerIllustration />
          </div>
        </div>
      </section>
    </MockPageShell>
  );
}
