"use client";

import { useState } from "react";
import TarynNav from "@/components/taryn-nav";
import TypewriterContact from "@/components/typewriter-contact";

export default function ContactPage() {
  const [soundOn, setSoundOn] = useState(true);

  return (
    <div
      style={{
        backgroundColor: "#FFFAF4",
        backgroundImage: "radial-gradient(circle, #D2C4A3 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        minHeight: "100vh",
      }}
    >
      <TarynNav soundOn={soundOn} onSoundToggle={setSoundOn} />
      <TypewriterContact soundOn={soundOn} />
    </div>
  );
}
