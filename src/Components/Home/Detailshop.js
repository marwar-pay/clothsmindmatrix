"use client";
import Image from "next/image";
import img from "../../assets/pinkcityimg/productsmarque/1.jpg";
import Link from "next/link";

export default function BackgroundImageText() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center text-white">
      <Image src={img} alt="Background" layout="fill" objectFit="cover" className="absolute inset-0" />
      <div className="relative z-10 text-center px-6">
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
      </div>
    </div>
  );
}
