import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Profile — Fish AI",
  description: "Manage your Fish AI profile and view past analysis results.",
};

const PAST_RESULTS = [
  {
    date: "27/11/2001",
    filename: "A000000019.avi",
    species: 18,
    invasive: 2,
    water: "Poor water quality",
  },
  {
    date: "19/11/2001",
    filename: "A000000019.avi",
    species: 18,
    invasive: 2,
    water: "Poor water quality",
  },
  {
    date: "18/11/2001",
    filename: "A000000019.avi",
    species: 18,
    invasive: 2,
    water: "Poor water quality",
  },
];

export default function ProfilePage() {
  return (
    <div className={styles.shell}>
      <div className={styles.bgWrap} aria-hidden>
        <Image
          className={styles.bgImage}
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          priority={false}
        />
      </div>
      <div className={styles.overlay} aria-hidden />
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.grid}>
          <section>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="username">
                User
              </label>
              <input
                id="username"
                className={styles.field}
                type="text"
                defaultValue="testuser"
                disabled
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className={styles.field}
                type="email"
                defaultValue="john.oliver1@hotmail.com"
                disabled
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className={styles.field}
                type="password"
                defaultValue="password123"
                disabled
              />
            </div>
            <button type="button" className={styles.btnReset} disabled>
              Reset password
            </button>
            <button type="button" className={styles.btnDelete} disabled>
              Delete account
            </button>
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Past results</h2>
            <div className={styles.resultList}>
              {PAST_RESULTS.map((r) => (
                <div key={`${r.date}-${r.filename}`} className={styles.resultCard}>
                  <p className={styles.resultDate}>{r.date}</p>
                  <p className={styles.resultLine}>Filename: {r.filename}</p>
                  <p className={styles.resultLine}>{r.species} species</p>
                  <p className={styles.resultLine}>{r.invasive} invasive</p>
                  <p className={styles.resultLine}>{r.water}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
