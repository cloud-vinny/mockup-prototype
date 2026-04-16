import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./FishAiLanding.module.css";

/** Static mockup landing — no data fetching or server actions. */
export function FishAiLanding() {
  return (
    <div className={styles.stage}>
      <div className={styles.bgWrap} aria-hidden>
        <Image
          className={styles.bgImage}
          src="/images/hero-bg.jpg"
          alt=""
          width={1440}
          height={699}
          priority
        />
      </div>
      <div className={styles.overlay} aria-hidden />

      <SiteHeader />

      <main className={styles.main}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            Discover the Wonders Colourful
            <br />
            Fish in the Ocean
          </h1>
          <p className={styles.subtext}>
            Scan and review underwater footage to identify fish species on
            video. Filter out species your looking for and measure length,
            weight of the fish too.
          </p>
          <Link className={styles.cta} href="/about">
            Learn More
          </Link>
        </div>

        <div className={styles.panels} aria-hidden>
          <div className={`${styles.panel} ${styles.panelA}`}>
            <Image
              className={styles.panelImage}
              src="/images/panel-mid.jpg"
              alt=""
              width={290}
              height={520}
            />
          </div>
          <div className={`${styles.panel} ${styles.panelB}`}>
            <Image
              className={styles.panelImage}
              src="/images/panel-left.jpg"
              alt=""
              width={290}
              height={520}
            />
          </div>
          <div className={`${styles.panel} ${styles.panelC}`}>
            <Image
              className={styles.panelImage}
              src="/images/panel-right.jpg"
              alt=""
              width={290}
              height={520}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
