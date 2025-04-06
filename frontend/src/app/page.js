'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./styles/page.module.css";
import "./styles/topics.css";

const topics = [
  {
    name: "Gaming",
    slug: "gaming",
    description: "Game dev, eSports, narrative design, and play culture.",
    bgColor: "#7B3F00",
    image: "/categories/category-gaming.svg",
  },
  {
    name: "Technology",
    slug: "technology",
    description: "AI, software, gadgets, and how it all connects.",
    bgColor: "#005F73",
    image: "/categories/category-tech.svg",
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Markets, money, investing, and economic ideas.",
    bgColor: "#264653",
    image: "/categories/category-finance.svg",
  },
  {
    name: "Health & Wellness",
    slug: "health",
    description: "Fitness, mental wellness, nutrition, and biohacking.",
    bgColor: "#2A9D8F",
    image: "/categories/category-health.svg",
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    description: "Housing, land, and future trends in living spaces.",
    bgColor: "#E76F51",
    image: "/categories/category-real-estate.svg",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>ForeverFM</h1>
        <p className={styles.description}>
          Your brain learns by listening. ForeverFM is the 24/7 AI podcast station built to make you fluent in topics you didn’t even know you were curious about.
        </p>

        <p className={styles.subdescription}>
          Our AI-powered hosts simulate deep, fluent conversations across tech, finance, wellness, creativity, and more — so you can absorb new ideas passively, like you were born to do.
        </p>

        <div className={styles.ctas}>
          <Link href="/live" className={styles.primary}>Try it out</Link>
          <Link href="/about" className={styles.secondary}>Meet the Forever team</Link>
        </div>

        {/* Scrollable card section */}
        <div className="section">
          <h2 className="sectionTitle">Featured Topics</h2>
          <div className="scrollRowWrapper">
            <div className="scrollRow">
              {topics.map((topic) => (
                <div key={topic.slug} className="card">
                  <div className="thumbnail" style={{ backgroundColor: topic.bgColor }}>
                    {topic.image && (
                      <img
                        src={topic.image}
                        alt={topic.name}
                        className="thumbImage"
                      />
                    )}
                  </div>
                  <h3>{topic.name}</h3>
                  <p>{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 ForeverFM 🎙️ Always On. Always Learning.</p>
      </footer>
    </div>
  );
}
