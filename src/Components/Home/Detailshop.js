"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import img from "../../assets/pinkcityimg/productsmarque/1.jpg";

export default function ScrollingOffer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/50">
        <Image src={img} alt="Background" layout="fill" objectFit="cover" className="opacity-50" />
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6 text-white"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold">Exclusive Fashion Sale</h2>
        <h3 className="text-2xl mt-2">MindMatrix Care Special Collection</h3>
        <p className="mt-4 max-w-lg">
          Discover the latest trends with our premium clothing collection. Elevate your style with MindMatrix Care’s fashion-forward designs.
        </p>
        <p className="mt-6 text-lg font-semibold">
          Get 20% Off on Your Favorite Apparel, Use Code <span className="text-yellow-300">OFF20</span>
        </p>
        <button className="mt-6 px-6 py-3 font-bold rounded-lg shadow-md hover:bg-red-700 transition-all" style={{ backgroundColor: "#6c757d" }}>
          <Link href="/allproducts" style={{ color: "#fff" }}>Shop Now</Link>
        </button>
      </motion.div>
    </div>
  );
}
