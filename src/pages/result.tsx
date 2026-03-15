import { useEffect, useState } from "react";
import Header from "../Components/header";
import { Link } from "react-router-dom";

export default function Result() {
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const storedTraits = JSON.parse(localStorage.getItem("traits") || "[]");

    const counts: Record<string, number> = {};
    for (const trait of storedTraits) {
      counts[trait] = (counts[trait] || 0) + 1;
    }

    function getRecommendedPhone(counts: Record<string, number>) {
      if ((counts.apple || 0) >= 2) return "iPhone 15 Pro Max";
      if ((counts.performance || 0) >= 2) return "ASUS ROG Phone 7";
      if ((counts.camera || 0) >= 2) return "Google Pixel 8 Pro";
      return "Samsung Galaxy A14 (Basic & Affordable)";
    }

    const result = getRecommendedPhone(counts);
    setPhone(result);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <Header />
      <div className="max-w-xl mx-auto mt-10 text-center p-8 bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-none mx-4">
        <h1 className="text-3xl font-black mb-6 tracking-tight">We Recommend:</h1>
        <p className="text-2xl font-bold bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 p-6 rounded-2xl border border-green-200 dark:border-green-800/50">
          {phone}
        </p>
        <Link to="/" className="mt-8 inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95">
          Back to browsing
        </Link>
      </div>
    </div>
  );
}