import Link from "next/link";
import Image from "next/image";
import styles from "../styles/page.module.css";

export default function About() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>About ForeverFM</h1>

        {/* <div className={styles.imageContainer}>
          <Image
            src="/About-Photo.png"
            alt="ForeverFM Team"
            width={300}
            height={200}
            className={styles.teamPhoto}
            priority
          />
        </div> */}

        <p>Made by 4 BeaverHackers 🦫</p>

        <p className={styles.description}>
          ForeverFM is a collaborative experiment between 4 students coming together at Oregon State University's Hackathon.
          We’re exploring the frontier of AI-driven storytelling—blending voice synthesis, language models,
          and a love for spontaneous conversation.
        </p>

        <p className={styles.description}>
          We’re 4 happy participants in the BeaverHacks Hackathon at Oregon State University, working together to bring
          this wild concept to life. From design and development to voice and vibe, we each contribute a piece of the puzzle.
        </p>

        <div className={styles.ctas}>
          <Link href="/" className={styles.primary}>
            ← Back to Home
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 ForeverFM</p>
      </footer>
    </div>
  );
}
