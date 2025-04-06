"use client";
import Image from "next/image";

export default function Avatars() {
  const avatars = [
    { name: "Echo", src: "/avatar1.png", role: "Tech Analyst" },
    { name: "Nova", src: "/avatar2.png", role: "Culture Curator" },
  ];

  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: "2rem"
    }}>
      {avatars.map((a) => (
        <div key={a.name} style={{ textAlign: "center" }}>
          <Image src={a.src} alt={a.name} width={80} height={80} style={{ borderRadius: "50%" }} />
          <div style={{ marginTop: "0.5rem", fontWeight: "bold" }}>{a.name}</div>
          <div style={{ fontSize: "0.85rem", color: "#888" }}>{a.role}</div>
        </div>
      ))}
    </div>
  );
}
