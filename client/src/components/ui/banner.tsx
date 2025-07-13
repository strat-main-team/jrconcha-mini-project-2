"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const gifList = [
  "/banner1.gif",
  "/banner2.gif",
  "/banner3.gif",
  "/banner4.gif",
  "/banner5.gif",
  "/banner6.gif",
  "/banner7.gif",
];

export default function RotatingCrossfadeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % gifList.length);
        setFadeOut(false);
      }, 4000); // Only change image after the previous image has been faded out
    }, 10000); // Change image every 10 seconds.

    return () => clearInterval(interval); // Avoid multiple setintervals
  }, []);

  return (
    <div className="relative w-full h-[150px] md:h-[300px] lg:h-[400px] flex items-center justify-center mt-5">
      {/* Outer Gradient Ring */}
      <div className="absolute w-full h-[150px] md:h-[300px] lg:h-[400px] rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 blur-xl opacity-30"></div>

      {/* Inner Image Container */}
      <div className="relative w-full h-[150px] md:h-[300px] lg:h-[400px] overflow-hidden bg-black rounded-full z-0">
        <Image
          src={gifList[currentIndex]}
          alt={`GIF ${currentIndex + 1}`}
          fill
          className={`absolute object-cover transition-opacity duration-[4000ms] ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}
