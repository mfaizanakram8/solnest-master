"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-8  lg:px-24 py-[70px] text-white">
      {/* Background Video (Client-side only) */}
      {isClient && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="/ankr.webm" type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay for Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

      {/* Left Content */}
      <div className="relative z-10 max-w-2xl text-center lg:text-left mt-10 bg-transparent p-6 rounded-lg">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Increase Your Profits <br /> With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">Solnest</span> Advance <br /> MEV Bot
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Experience the speed and precision of ultra-fast MEV botting with
          Solnest. It fine-tunes every transaction on the Solana network,
          leveraging front-running and back-running in top liquidity pools to
          deliver peak profitability.
        </p>
        <button className="mt-6 px-6 py-3 text-lg font-semibold rounded-md bg-gradient-to-r from-purple-500 to-green-400 hover:opacity-90 transition-all">
          Launch Now
        </button>
      </div>

      {/* Right Image */}
      <div className="relative z-10 mt-20 lg:mt-0">
        <Image src="/hero.png" alt="Rocket" width={500} height={500} priority />
      </div>
    </section>
  );
}
