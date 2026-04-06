import type { ReactNode } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./MockPageShell.module.css";

type MockPageShellProps = {
  title: string;
  lead?: string;
  /** Wider content column for two-column feature layouts (e.g. Analyze). */
  wide?: boolean;
  children: ReactNode;
};

export function MockPageShell({
  title,
  lead,
  wide = false,
  children,
}: MockPageShellProps) {
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
      <main className={wide ? `${styles.main} ${styles.mainWide}` : styles.main}>
        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {children}
      </main>
    </div>
  );
}
