import { useEffect, useState } from "react";

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
    <div className="max-w-xl mx-auto mt-10 text-center p-4">
      <h1 className="text-2xl font-bold mb-4">We Recommend:</h1>
      <p className="text-xl bg-green-100 p-4 rounded">{phone}</p>
    </div>
  );
}