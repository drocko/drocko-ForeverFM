"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/page.module.css";
import AudioPlayer from "../components/AudioPlayer"; // Adjust path if different

export default function Home() {
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(true);

  const handlePlayButtonClick = () => {
    console.log("Saved by the bell!")
    setIsAudioPlayerVisible(true);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Optional logo */}
        {/* <Image
          className={styles.logo}
          src="/ForeverFM Brand Logo.png"
          alt="ForeverFM logo"
          width={200}
          height={200}
          priority
        /> */}

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

        {/* 🎧 Integrate the player directly on the home page */}
        <div style={{ marginTop: "50px", width: "100%" }}>
          {!isAudioPlayerVisible && (
            <button onClick={handlePlayButtonClick} className={styles.playButton}>
              Play Audio
            </button>
          )}
          {isAudioPlayerVisible && <AudioPlayer />}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 ForeverFM🎙️</p>
        {/* <p>Sponsored by NVIDIA, Google, Groq and more!</p> */}
      </footer>
    </div>
  );
}