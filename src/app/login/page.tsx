import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Login — Fish AI",
  description: "Basic login mockup for the Fish AI prototype.",
};

export default function LoginPage() {
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

      <header className={styles.header}>
        <Link href="/home" className={styles.brand}>
          Fish AI
        </Link>
      </header>

      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>Log in</h1>

          <form className={styles.form} action="#" method="post">
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="username">
                Email
              </label>
              <input
                className={styles.input}
                id="username"
                name="username"
                type="text"
                placeholder="Username or email address"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <label className={styles.rememberRow}>
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>

            <Link href="/home" className={styles.primaryBtn}>
              Sign in
            </Link>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <Link href="/home" className={styles.ghostBtn}>
            Create an account
          </Link>

          <Link href="/home" className={styles.googleBtn} aria-label="Sign in with Google">
            <span className={styles.googleG} aria-hidden>G</span>
            Sign in with Google
          </Link>
        </section>

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
