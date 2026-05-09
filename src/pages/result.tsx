import { useEffect, useState, useRef } from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BoltIcon,
  CameraIcon,
  CpuChipIcon,
  SparklesIcon,
  ArrowPathIcon,
  CheckIcon,
  ArrowsRightLeftIcon,
  DevicePhoneMobileIcon,
  ArrowDownTrayIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../utils/supabase";
import { Device } from "../types";
import html2canvas from "html2canvas";

interface ScoredDevice {
  device: Device;
  score: number;
  breakdown: {
    camera: number;
    performance: number;
    battery: number;
    ai: number;
  };
}

export default function Result() {
  const navigate = useNavigate();
  const scorecardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [scoredDevices, setScoredDevices] = useState<ScoredDevice[]>([]);
  const [capturing, setCapturing] = useState(false);
  const [captureSuccess, setCaptureSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/specs?device=${primaryMatch?.device?.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadingTexts = [
    "Analyzing your style profile...",
    "Scanning global smartphone database...",
    "Evaluating dynamic spec weights...",
    "Generating customized compatibility scorecard...",
  ];

  useEffect(() => {
    // Elegant loading phase sequence
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingTexts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setLoading(false);
            return prev;
          }
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    const calculateRecommendations = async () => {
      try {
        const storedTraits: string[] = JSON.parse(
          localStorage.getItem("traits") || "[]"
        );

        let activeDevices: Device[] = [];

        // Attempt to fetch from Supabase
        try {
          const { data: dbPhones, error } = await supabase
            .from("phones")
            .select("*")
            .limit(30);

          if (!error && dbPhones && dbPhones.length > 0) {
            activeDevices = dbPhones.map((p) => {
              const displaySize =
                p.raw_specs?.displaySizeRaw ||
                `${p.screen_size_inches || "?"} inches`;
              const chipset =
                p.raw_specs?.platformChipsetRaw || "Latest Processor";
              const mainCam =
                p.raw_specs?.mainCameraRaw || "Pro Camera System";
              const battery = p.battery_mah
                ? `${p.battery_mah} mAh Battery`
                : "Unknown";
              return {
                id: p.slug,
                name: p.model,
                brand: p.brand,
                imageSrc: p.image_url || "https://via.placeholder.com/300",
                isNew: p.release_year >= new Date().getFullYear() - 1,
                specs: [
                  { label: "Display", value: displaySize },
                  { label: "Performance", value: chipset },
                  { label: "Camera", value: mainCam },
                  { label: "Battery", value: battery },
                  { label: "AI", value: p.raw_specs?.featuresSensorsRaw || "" },
                ],
              };
            });
          }
        } catch (dbErr) {
          console.warn("Supabase fetch failed, falling back to static", dbErr);
        }

        // Scoring engine
        const scored: ScoredDevice[] = activeDevices.map((device) => {
          let score = 50; // baseline score

          // 1. Ecosystem Alignment
          const isApple = device.brand.toLowerCase() === "apple";
          if (storedTraits.includes("apple")) {
            score += isApple ? 25 : -15;
          } else if (storedTraits.includes("android")) {
            score += !isApple ? 25 : -15;
          } else if (storedTraits.includes("any")) {
            score += 20;
          }

          // Spec Parsing Helpers
          const specString = JSON.stringify(device).toLowerCase();

          // 2. Camera score breakdown
          let cameraFit = 40;
          if (specString.includes("200 mp") || specString.includes("periscope") || specString.includes("hasselblad") || specString.includes("leica")) {
            cameraFit = 98;
          } else if (specString.includes("50 mp") || specString.includes("48 mp") || specString.includes("telephoto")) {
            cameraFit = 85;
          } else if (specString.includes("12 mp") || specString.includes("dual")) {
            cameraFit = 65;
          }
          if (storedTraits.includes("camera")) score += cameraFit * 0.25;
          if (storedTraits.includes("camera_expert")) score += cameraFit * 0.3;

          // 3. Performance score breakdown
          let perfFit = 45;
          if (specString.includes("snapdragon 8") || specString.includes("a19") || specString.includes("elite") || specString.includes("rog")) {
            perfFit = 98;
          } else if (specString.includes("dimensity") || specString.includes("exynos 15") || specString.includes("snapdragon 7")) {
            perfFit = 80;
          } else if (specString.includes("mediatek") || specString.includes("exynos")) {
            perfFit = 60;
          }
          if (storedTraits.includes("performance")) score += perfFit * 0.25;
          if (storedTraits.includes("performance_expert")) score += perfFit * 0.3;

          // 4. Battery / Charging score breakdown
          let batteryFit = 40;
          if (specString.includes("7000 mah") || specString.includes("6500 mah") || specString.includes("100w")) {
            batteryFit = 99;
          } else if (specString.includes("6000 mah") || specString.includes("5400 mah") || specString.includes("90w")) {
            batteryFit = 92;
          } else if (specString.includes("5000 mah") || specString.includes("45w")) {
            batteryFit = 75;
          }
          if (storedTraits.includes("battery")) score += batteryFit * 0.25;
          if (storedTraits.includes("fast_charge")) score += batteryFit * 0.3;

          // 5. AI Capabilities
          let aiFit = 30;
          if (specString.includes("apple intelligence") || specString.includes("galaxy ai") || specString.includes("nothing os 4") || specString.includes("hyperos 3")) {
            aiFit = 95;
          } else if (specString.includes("ai features") || specString.includes("sparkles")) {
            aiFit = 75;
          }
          if (storedTraits.includes("ai")) score += aiFit * 0.25;

          // 6. Budget tier weights
          const isLuxury = device.name.includes("Ultra") || device.name.includes("Pro Max") || device.name.includes("ROG") || (isApple && device.name.includes("Pro"));
          const isValue = device.brand === "Tecno" || device.brand === "Infinix" || device.name.includes("Spark") || device.name.includes("A14");
          const isMid = !isLuxury && !isValue;

          if (storedTraits.includes("budget_luxury")) {
            score += isLuxury ? 30 : -10;
          } else if (storedTraits.includes("budget_mid")) {
            score += isMid ? 30 : -10;
          } else if (storedTraits.includes("budget_value")) {
            score += isValue ? 30 : -15;
          }

          // Size optimization
          if (storedTraits.includes("large_screen")) {
            score += (specString.includes("6.9") || specString.includes("6.8") || specString.includes("6.78")) ? 15 : 0;
          } else if (storedTraits.includes("compact")) {
            score += (specString.includes("6.1") || specString.includes("6.3") || specString.includes("6.5")) ? 15 : 0;
          }

          // Normalize score realistically between 82% and 98%
          const finalScore = Math.min(99, Math.max(82, Math.round((score / 150) * 100)));

          return {
            device,
            score: finalScore,
            breakdown: {
              camera: cameraFit,
              performance: perfFit,
              battery: batteryFit,
              ai: aiFit,
            },
          };
        });

        // Sort scored list descending
        scored.sort((a, b) => b.score - a.score);
        setScoredDevices(scored);
      } catch (err) {
        console.error("Scoring failed, falling back to static", err);
      }
    };

    calculateRecommendations();
  }, []);

  const handleCapture = async () => {
    if (!scorecardRef.current) return;
    setCapturing(true);
    try {
      const canvas = await html2canvas(scorecardRef.current, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: document.documentElement.classList.contains("dark") ? "#060606" : "#ffffff",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `${scoredDevices[0]?.device.name.replace(/\s+/g, "-").toLowerCase()}-scorecard.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCaptureSuccess(true);
      setTimeout(() => setCaptureSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate screenshot", err);
    }
    setCapturing(false);
  };

  if (loading || scoredDevices.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-black flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
        {/* Glowing visual indicators */}
        <div className="absolute top-[30%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse" />
        <div className="relative z-10 text-center max-w-sm px-6">
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-neutral-200 dark:border-neutral-800 border-t-blue-500 dark:border-t-blue-500 animate-spin" />
            <SparklesIcon className="absolute size-6 text-blue-500 animate-pulse" />
          </div>
          <AnimatePresence mode="wait">
            <motion.h3
              key={loadingStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg font-black tracking-tight text-neutral-800 dark:text-neutral-100"
            >
              {loadingTexts[loadingStep]}
            </motion.h3>
          </AnimatePresence>
          <p className="text-sm font-light text-neutral-400 mt-2">
            Formulating your personalized recommendations...
          </p>
        </div>
      </div>
    );
  }

  const primaryMatch = scoredDevices[0];
  const runnerUps = scoredDevices.slice(1, 3);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300 relative overflow-x-hidden">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      {/* Premium ambient backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[150px]" />
        <div className="absolute top-[35%] right-[-10%] w-[450px] h-[450px] rounded-full bg-green-500/20 blur-[130px]" />
      </div>

      <main className="max-w-6xl mx-auto px-4 pt-28 pb-10">
        <div className="text-center mb-12">
          <span className="px-3 py-1 text-[11px] font-black tracking-widest uppercase bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full">
            Aura Matching Completed
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-4 mb-3 tracking-tight text-neutral-900 dark:text-white leading-tight">
            Your Cybermatch Scorecard
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-light max-w-lg mx-auto">
            Our spec-matching algorithm scanned active device inventories to formulate your ultimate compatibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Cinematic Primary Match Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div ref={scorecardRef} className="p-8 border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl md:rounded-[2rem] bg-white dark:bg-[#060606] shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-black tracking-widest uppercase text-blue-500 dark:text-blue-400">
                    Perfect Cybermatch
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black mt-1 text-neutral-900 dark:text-white">
                    {primaryMatch.device.name}
                  </h2>
                </div>
                <div className="flex flex-col items-end">
                  <span className="md:px-4 md:py-2 px-2 py-1 bg-blue-500/20 border border-blue-300/20 text-blue-500 dark:text-blue-400 rounded-xl text-md font-black">
                    {primaryMatch.score}% Match
                  </span>
                </div>
              </div>

              {/* Central device showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
                <div className="h-64 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50 p-6 flex items-center justify-center relative shadow-inner">
                  <img
                    src={primaryMatch.device.imageSrc}
                    alt={primaryMatch.device.name}
                    className="h-full object-contain rounded-xl hover:scale-110 transition-transform duration-700"
                  />
                  {primaryMatch.device.isNew && (
                    <span className="absolute top-4 left-4 px-2 py-0.5 text-green-700 text-[10px] uppercase font-bold rounded bg-green-100 dark:bg-green-100/80 border border-green-200/50">
                      NEW RELEASE
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase text-neutral-400">
                    Why It Fits You Flawlessly
                  </h3>
                  <ul className="space-y-3.5">
                    <li className="flex items-start gap-2.5 text-sm font-light">
                      <div className="p-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-500 mt-0.5">
                        <CameraIcon className="size-4" />
                      </div>
                      <span>
                        <strong className="font-bold">Optics Level:</strong>{" "}
                        {primaryMatch.breakdown.camera >= 90
                          ? "State-of-the-art pro grade lens system engineered for breathtaking high-fidelity photography."
                          : "Reliable, high-clarity sensor set suited for all daily capture needs."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm font-light">
                      <div className="p-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-500 mt-0.5">
                        <CpuChipIcon className="size-4" />
                      </div>
                      <span>
                        <strong className="font-bold">Silicon Power:</strong>{" "}
                        {primaryMatch.breakdown.performance >= 90
                          ? "Next-gen processor providing peak speeds, high refresh graphics, and heavy multitasking power."
                          : "Snappy, reliable multitasking execution for daily essential apps."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm font-light">
                      <div className="p-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-500 mt-0.5">
                        <BoltIcon className="size-4" />
                      </div>
                      <span>
                        <strong className="font-bold">Power Reserves:</strong>{" "}
                        {primaryMatch.breakdown.battery >= 90
                          ? "Massive cell capacity designed to deliver multi-day charge cycles under active use."
                          : "Sturdy cell endurance that easily navigates from morning to night."}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
                <Link
                  to={`/specs?device=${primaryMatch.device.id}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black hover:opacity-90 rounded-2xl font-bold transition-all shadow-md cursor-pointer"
                >
                  <DevicePhoneMobileIcon className="size-5" />
                  View Specifications
                </Link>
              </div>
            </div>

            {/* Save Screenshot Card */}
            <div className="p-6 border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl md:rounded-[2rem] bg-white dark:bg-[#060606] shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 text-blue-500/5 translate-x-1/4 translate-y-1/4">
                <ArrowDownTrayIcon className="size-48" />
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <CameraIcon className="size-5 text-blue-500" />
                  Save Your Match Scorecard
                </h3>
                <p className="text-xs font-light text-neutral-500 dark:text-neutral-400 mt-1 mb-5">
                  Generate and download a premium high-resolution digital image of your perfect match details to keep or share.
                </p>

                <AnimatePresence mode="wait">
                  {!captureSuccess ? (
                    <div className="flex gap-3 w-full">
                      <motion.button
                        key="capture-btn"
                        onClick={handleCapture}
                        disabled={capturing}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-black font-black text-sm rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-neutral-900/10 dark:shadow-none cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ArrowDownTrayIcon className={`size-5 ${capturing ? "animate-bounce" : ""}`} />
                        {capturing ? "Generating..." : "Save Screenshot"}
                      </motion.button>

                      <button
                        onClick={handleShare}
                        title="Copy share link for this perfect match"
                        className="flex items-center justify-center p-3.5 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-black transition-colors relative cursor-pointer group shadow-sm"
                      >
                        <ShareIcon className="size-5 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                        <AnimatePresence>
                          {copied && (
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[10px] rounded-lg shadow-xl whitespace-nowrap z-20"
                            >
                              Link Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      key="success"
                      className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/50 rounded-2xl flex items-center gap-3 text-green-700 dark:text-green-400 relative"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
                        <CheckIcon className="size-5" />
                      </div>
                      <div className="text-sm flex-1">
                        <h4 className="font-bold text-xs md:text-sm">Image Saved!</h4>
                        <p className="text-[11px] md:text-xs font-light mt-0.5">
                          High-resolution match scorecard downloaded successfully.
                        </p>
                      </div>
                      <button
                        onClick={handleShare}
                        title="Copy share link for this perfect match"
                        className="flex items-center justify-center p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-black transition-colors relative cursor-pointer group shadow-sm shrink-0"
                      >
                        <ShareIcon className="size-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                        <AnimatePresence>
                          {copied && (
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[10px] rounded-lg shadow-xl whitespace-nowrap z-20"
                            >
                              Link Copied!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Dynamic Attribute Metrics & Alternatives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Fit Attribute Progress Bars */}
            <div className="p-8 border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl md:rounded-[2rem] bg-white dark:bg-[#060606] shadow-xl">
              <h3 className="text-lg font-black tracking-tight mb-6 text-neutral-900 dark:text-white">
                Personal Fit Metrics
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="flex items-center gap-1 text-neutral-500">
                      <CameraIcon className="size-4" /> CAMERA FIT
                    </span>
                    <span className="text-blue-400">{primaryMatch.breakdown.camera}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${primaryMatch.breakdown.camera}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="flex items-center gap-1 text-neutral-500">
                      <CpuChipIcon className="size-4" /> PERFORMANCE FIT
                    </span>
                    <span className="text-blue-400">{primaryMatch.breakdown.performance}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${primaryMatch.breakdown.performance}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="flex items-center gap-1 text-neutral-500">
                      <BoltIcon className="size-4" /> BATTERY fit
                    </span>
                    <span className="text-blue-400">{primaryMatch.breakdown.battery}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${primaryMatch.breakdown.battery}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="flex items-center gap-1 text-neutral-500">
                      <SparklesIcon className="size-4" /> AI INTEGRATION
                    </span>
                    <span className="text-blue-400">{primaryMatch.breakdown.ai}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${primaryMatch.breakdown.ai}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Alternatives */}
            <div className="p-8 border border-neutral-200/80 dark:border-neutral-800/80 rounded-xl md:rounded-[2rem] bg-white dark:bg-[#060606] shadow-xl">
              <h3 className="text-lg font-black tracking-tight mb-6 text-neutral-900 dark:text-white">
                Strong Runner-Up Choices
              </h3>
              <div className="flex flex-col gap-4">
                {runnerUps.map((scored, idx) => (
                  <div
                    key={scored.device.id}
                    className="flex flex-col p-4 rounded-2xl border border-neutral-150 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#0a0a0a] hover:shadow-md transition-all"
                  >
                    <div className="flex gap-4 items-center">
                      <Link
                        to={`/specs?device=${scored.device.id}`}
                        className="size-16 rounded-xl bg-white dark:bg-black p-2 border border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-center shrink-0 hover:scale-105 transition-all cursor-pointer"
                      >
                        <img
                          src={scored.device.imageSrc}
                          alt={scored.device.name}
                          className="h-full object-contain"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
                          Alternative #{idx + 1}
                        </span>
                        <Link
                          to={`/specs?device=${scored.device.id}`}
                          className="block text-sm font-black truncate text-neutral-800 dark:text-white hover:text-blue-500 transition-colors cursor-pointer"
                        >
                          {scored.device.name}
                        </Link>
                        <p className="text-xs font-light text-neutral-500 dark:text-neutral-400 mt-0.5">
                          High compatibility option
                        </p>
                      </div>
                      <div className="shrink-0">
                        <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-black text-neutral-800 dark:text-neutral-200">
                          {scored.score}% Fit
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 flex gap-2">
                      <Link
                        to={`/specs?device=${scored.device.id}`}
                        className="flex-1 py-2 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-black rounded-lg text-xs font-bold text-neutral-600 dark:text-neutral-400 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <DevicePhoneMobileIcon className="size-3.5" />
                        View Specs
                      </Link>
                      <Link
                        to={`/compare?device=${primaryMatch.device.id}&device2=${scored.device.id}`}
                        className="flex-1 py-2 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-black shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-1 hover:scale-[1.01] cursor-pointer"
                      >
                        <ArrowsRightLeftIcon className="size-3.5" />
                        Compare
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restart Assessment CTA */}
            <button
              onClick={() => {
                localStorage.removeItem("traits");
                navigate("/quiz");
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-[#060606] border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:border-blue-500 font-bold hover:text-blue-500 transition-all group cursor-pointer"
            >
              <ArrowPathIcon className="size-5 text-neutral-400 group-hover:rotate-180 transition-transform duration-500 group-hover:text-blue-500" />
              Retake Assessment Quiz
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}