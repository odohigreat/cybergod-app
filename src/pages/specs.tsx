import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShareIcon,
  HeartIcon as HeartIconOutline,
  ChevronLeftIcon,
  BoltIcon,
  CameraIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ArrowsPointingOutIcon,
  SparklesIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ScaleIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { devices } from "../data/devices";
import { Device } from "../types";

const getIcon = (label: string) => {
  const l = label.toLowerCase();
  const iconClass = "size-5";
  if (l.includes("battery")) return <BoltIcon className={iconClass} />;
  if (l.includes("camera")) return <CameraIcon className={iconClass} />;
  if (l.includes("chipset") || l.includes("processor")) return <CpuChipIcon className={iconClass} />;
  if (l.includes("display") || l.includes("screen")) return <DevicePhoneMobileIcon className={iconClass} />;
  if (l.includes("dimension") || l.includes("weight")) return <ArrowsPointingOutIcon className={iconClass} />;
  if (l.includes("ai") || l.includes("intelligence")) return <SparklesIcon className={iconClass} />;
  if (l.includes("connect")) return <MapPinIcon className={iconClass} />;
  if (l.includes("resist") || l.includes("shield")) return <ShieldCheckIcon className={iconClass} />;
  return <BoltIcon className={iconClass} />;
};

function Specs() {
  const [searchParams] = useSearchParams();
  const deviceId = searchParams.get("device");
  const [device, setDevice] = useState<Device | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (deviceId) {
      const found = devices.find((d) => d.id === deviceId);
      setDevice(found || devices[0]); // Default to first if not found for demo
    } else {
      setDevice(devices[0]);
    }
  }, [deviceId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!device) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-white mb-8 transition-colors group">
          <ChevronLeftIcon className="size-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to browsing
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Device Image & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[4/5] rounded-[2.5rem] bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center p-8 transition-colors duration-300">
                <img
                  src={device.imageSrc}
                  alt={device.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                />
                {device.isNew && (
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-green-500 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-lg">
                    Latest Release
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${isWishlisted
                    ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900"
                    : "bg-white text-neutral-900 dark:bg-[#0a0a0a] dark:text-white border border-neutral-200 dark:border-neutral-800 hover:border-red-200 dark:hover:border-red-900"
                  }`}
              >
                {isWishlisted ? <HeartIconSolid className="size-5" /> : <HeartIconOutline className="size-5" />}
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center p-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:bg-neutral-50 dark:hover:bg-black transition-colors relative"
              >
                <ShareIcon className="size-5" />
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[10px] rounded-lg shadow-xl whitespace-nowrap"
                    >
                      Link Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button className="flex items-center justify-center p-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:bg-neutral-50 dark:hover:bg-black transition-colors">
                <ScaleIcon className="size-5" />
              </button>
            </div>
          </motion.div>

          {/* Right: Info & Specs */}
          <div className="lg:col-span-7 space-y-12">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs">{device.brand}</span>
                <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-neutral-500 text-xs font-medium uppercase tracking-widest">Premium Device</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-neutral-900 dark:text-white">
                {device.name}
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                Experience the peak of mobile innovation. {device.name} combines cutting-edge performance with an elegant design that redefines excellence.
              </p>
            </motion.header>

            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <h2 className="col-span-1 md:col-span-2 text-xl font-bold mb-2 flex items-center gap-2">
                Technical Specifications
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
              </h2>
              {device.specs.map((spec, idx) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] hover:bg-neutral-50 dark:hover:bg-black transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                >
                  <div className="p-3 rounded-xl bg-neutral-100 dark:bg-black text-neutral-500 group-hover:text-blue-500 transition-colors duration-300 border border-neutral-200 dark:border-neutral-800">
                    {getIcon(spec.label)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">{spec.label}</h3>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{spec.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* Related Devices - Brand new feature */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-8 border-t border-neutral-200 dark:border-neutral-800"
            >
              <h2 className="text-xl font-bold mb-6">Similar Devices</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {devices.filter(d => d.id !== device.id).slice(0, 3).map((d) => (
                  <Link
                    key={d.id}
                    to={`/specs?device=${d.id}`}
                    className="group"
                  >
                    <div className="aspect-square rounded-2xl bg-neutral-100 dark:bg-[#0a0a0a] p-4 border border-transparent dark:border-neutral-800 group-hover:border-blue-500/30 transition-all mb-3 overflow-hidden">
                      <img src={d.imageSrc} alt={d.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-bold truncate group-hover:text-blue-500 transition-colors">{d.name}</h3>
                  </Link>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Specs;