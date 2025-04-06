// src/app/live/page.js (ForeverFM Live Stream Page)
import Link from "next/link";
import styles from "../styles/page.module.css";

export default function Stream() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>ForeverFM Live Stream</h1>
        <p className={styles.description}>
          Tune in to a continuous, AI-generated stream of engaging podcast
          conversations. ForeverFM blends voices, topics, and personalities to
          create a never-ending flow of thought-provoking content—available
          24/7, right here.
        </p>
        <p className={styles.description}>
          Whether you're working, relaxing, or commuting, ForeverFM keeps your
          mind active with unique dialogue every time you listen.
        </p>
        <div className={styles.ctas}>
          <Link href="/" className={styles.primary}>
            ← Back to Home
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 ForeverFM🎙️</p>
      </footer>
    </div>
  );
}
