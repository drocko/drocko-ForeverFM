import Link from "next/link";
import Image from "next/image";
import styles from "../styles/page.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero */}
        <section style={{ textAlign: "center" }}>
          <h1 className={styles.title}>Meet the Team Behind ForeverFM</h1>

          <div className={styles.imageContainer}>
            <Image
              src="/About-Photo-Styled.png"
              alt="ForeverFM Team"
              width={300}
              height={300}
              className={`${styles.teamPhoto} ${styles.primary}`}
              priority
            />
          </div>
          <p style={{ marginTop: "1rem", fontWeight: "500" }}>
            Made by 4 BeaverHackers 🦫
          </p>
        </section>

        {/* Story */}
        <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p className={styles.description}>
            ForeverFM is an ongoing experiment in AI storytelling—created live during Oregon State University's BeaverHacks.
            We're exploring the frontier of language models, voice synthesis, and the vibe of collaborative creativity.
          </p>

          <p className={styles.description}>
            No scripts. No hosts. Just continuous, real-time thoughts that talk back.
            We're blending spontaneity with structure—tuning personas, breaking pipelines, and constantly learning from it all.
          </p>

          <p className={styles.description}>
            Whether you're just tuning in or building your own systems—we see you. You’re part of the frequency too.
          </p>
        </section>

        {/* CTA */}
        <div className={styles.ctas}>
          <Link href="/" className={styles.primary}>
            ← Back to Home
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 ForeverFM 🎙️</p>
      </footer>
    </div>
  );
}
