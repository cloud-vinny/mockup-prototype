import type { Metadata } from "next";
import {
  DetectionIllustration,
  DisclaimerIllustration,
  SegmentationIllustration,
} from "../analyze/AnalyzeIllustrations";
import { MockPageShell } from "@/components/MockPageShell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About us — Fish AI",
  description: "Fish AI capstone project — underwater species analysis mockup.",
};
//test
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

      <hr className={styles.featuresDivider} />

      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.featuresHeading}>
          About FishAI
        </h2>
        <p className={styles.featuresIntro}>

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
