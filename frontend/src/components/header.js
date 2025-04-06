// // src/app/components/Header.js
// export default function Header() {
//     return (
//       <header style={{ padding: "1rem", textAlign: "center", fontSize: "1.5rem" }}>
//         🎙️ ForeverFM — AI Radio, 24/7
//       </header>
//     );
//   }


import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    }}>
      <Link href="/">
        <Image
          src="/ForeverFM Brand Logo Resized.png"
          alt="ForeverFM logo"
          width={200}
          height={48}
          style={{ objectFit: "contain" }}
        />
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/">Home</Link>
        <Link href="/live">Live</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
