"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./AudioStreamPlayer.module.css";

export default function AudioStreamPlayer({ audioSrc = "http://localhost:5001/audio" }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={audioSrc} autoPlay loop />

      <div className={styles.controls}>
        <button onClick={() => setIsPlaying(!isPlaying)} className={styles.button}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className={styles.slider}
        />

        <button onClick={() => setVolume(volume > 0 ? 0 : 1)} className={styles.button}>
          {volume > 0 ? "🔊" : "🔇"}
        </button>
      </div>
    </div>
  );
}
