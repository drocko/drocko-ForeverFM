// src/app/page.js (ForeverFM Landing Page)
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg" // replace with your logo if you have one
          alt="ForeverFM logo"
          width={180}
          height={38}
          priority
        />
        <h1 className={styles.title}>ForeverFM</h1>
        <p className={styles.description}>
          Welcome to ForeverFM — your 24/7 AI-generated podcast station.
          Listen to endless conversations designed to inform, entertain, and
          inspire. No hosts, no limits — just pure streamable thoughts.
        </p>

        <div className={styles.ctas}>
          <Link href="/live" className={styles.primary}>
            Start Listening
          </Link>
          <Link href="/about" className={styles.secondary}>
            Learn More
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 ForeverFM 🎙️</p>
      </footer>
    </div>
  );
}
