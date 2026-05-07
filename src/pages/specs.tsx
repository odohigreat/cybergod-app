import { useSearchParams, Link, useNavigate } from "react-router-dom";
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
  ScaleIcon,
  CalendarIcon,
  ArrowsUpDownIcon,
  CogIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { devices } from "../data/devices";
import { Device } from "../types";
import { supabase } from "../utils/supabase";

const getIcon = (label: string, customClass?: string) => {
  const l = label.toLowerCase();
  const iconClass = customClass || "size-5";
  if (l.includes("battery")) return <BoltIcon className={iconClass} />;
  if (l.includes("camera")) return <CameraIcon className={iconClass} />;
  if (l.includes("chipset") || l.includes("processor") || l.includes("performance")) return <CpuChipIcon className={iconClass} />;
  if (l.includes("display") || l.includes("screen")) return <DevicePhoneMobileIcon className={iconClass} />;
  if (l.includes("dimension") || l.includes("design")) return <ArrowsPointingOutIcon className={iconClass} />;
  if (l.includes("thickness")) return <ArrowsUpDownIcon className={iconClass} />;
  if (l.includes("weight")) return <ScaleIcon className={iconClass} />;
  if (l.includes("storage") || l.includes("memory")) return <CircleStackIcon className={iconClass} />;
  if (l.includes("os")) return <CogIcon className={iconClass} />;
  if (l.includes("release")) return <CalendarIcon className={iconClass} />;
  if (l.includes("ai") || l.includes("intelligence")) return <SparklesIcon className={iconClass} />;
  if (l.includes("connect")) return <MapPinIcon className={iconClass} />;
  if (l.includes("resist") || l.includes("shield")) return <ShieldCheckIcon className={iconClass} />;
  return <BoltIcon className={iconClass} />;
};

function Specs() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const deviceId = searchParams.get("device");
  const [device, setDevice] = useState<Device | null>(null);
  const [similarDevices, setSimilarDevices] = useState<Device[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [deviceId]);

  useEffect(() => {
    const fetchDevice = async () => {
      if (deviceId) {
        const { data: dbPhone, error } = await supabase
          .from('phones')
          .select('*')
          .eq('slug', deviceId)
          .single();

        if (!error && dbPhone) {
          // const display = dbPhone.raw_specs?.displayResolutionRaw || dbPhone.raw_specs?.displaySizeRaw || `${dbPhone.screen_size_inches || '?'} inches`;
          const displaySize = dbPhone.raw_specs?.displaySizeRaw || `${dbPhone.screen_size_inches || '?'} inches`;
          const displayType = dbPhone.raw_specs?.displayTypeRaw || 'AMOLED';
          const displayRes = dbPhone.raw_specs?.displayResolutionRaw || 'Unknown';

          const chipset = dbPhone.raw_specs?.platformChipsetRaw || 'Latest Processor';
          const cpu = dbPhone.raw_specs?.platformCPURaw || 'Unknown';

          const mainCam = dbPhone.raw_specs?.mainCameraRaw || 'Pro Camera System';
          const selfieCam = dbPhone.raw_specs?.selfieCameraRaw || 'Front Camera';

          const battery = dbPhone.battery_mah ? `${dbPhone.battery_mah} mAh Battery` : 'Unknown';
          const weight = dbPhone.raw_specs?.bodyWeightRaw || (dbPhone.weight_g ? `${dbPhone.weight_g}g` : 'Unknown');
          const dimensions = dbPhone.raw_specs?.bodyDimensionsRaw || 'Unknown';
          const memory = dbPhone.raw_specs?.memoryInternalRaw || (dbPhone.ram_gb_max ? `${dbPhone.ram_gb_max} GB RAM` : 'Unknown');
          const network = dbPhone.raw_specs?.networkRaw || '5G / LTE';
          const sensors = dbPhone.raw_specs?.featuresSensorsRaw || 'Standard sensors';

          const fetchedDevice: Device = {
            id: dbPhone.slug,
            name: dbPhone.model,
            brand: dbPhone.brand,
            imageSrc: dbPhone.image_url || 'https://via.placeholder.com/300',
            isNew: dbPhone.release_year >= new Date().getFullYear() - 1,
            specs: [
              {
                label: 'Display',
                subSpecs: [
                  { label: 'Size', value: displaySize },
                  { label: 'Type', value: displayType },
                  { label: 'Resolution', value: displayRes }
                ]
              },
              {
                label: 'Performance',
                subSpecs: [
                  { label: 'Chipset', value: chipset },
                  { label: 'CPU', value: cpu }
                ]
              },
              {
                label: 'Cameras',
                subSpecs: [
                  { label: 'Main', value: mainCam },
                  { label: 'Selfie', value: selfieCam }
                ]
              },
              {
                label: 'Design',
                subSpecs: [
                  { label: 'Dimensions', value: dimensions },
                  { label: 'Weight', value: weight }
                ]
              },
              {
                label: 'Memory',
                subSpecs: [
                  { label: 'Options', value: memory }
                ]
              },
              { label: 'Battery', value: battery },
              {
                label: 'Connectivity',
                subSpecs: [
                  { label: 'Network', value: network },
                  { label: 'Sensors', value: sensors }
                ]
              },
            ],
            quickSpecs: [
              { label: 'OS', value: dbPhone.raw_specs?.platformOSRaw?.split(',')[0] || 'Unknown' },
              { label: 'Released', value: dbPhone.raw_specs?.launchAnnouncedRaw || 'Unknown' },
              { label: 'Thickness', value: (dbPhone.raw_specs?.bodyDimensionsRaw?.match(/x ([\d.]+)\s*mm/) || [])[1] ? `${dbPhone.raw_specs.bodyDimensionsRaw.match(/x ([\d.]+)\s*mm/)[1]} mm` : 'Unknown' },
              { label: 'Storage', value: dbPhone.storage_gb_max ? `${dbPhone.storage_gb_max} GB` : 'Unknown' },
            ]
          };
          setDevice(fetchedDevice);

          const { data: similar } = await supabase
            .from('phones')
            .select('*')
            .eq('brand', dbPhone.brand)
            .neq('slug', dbPhone.slug)
            .limit(3);

          if (similar && similar.length > 0) {
            setSimilarDevices(similar.map((p: any) => ({
              id: p.slug,
              name: p.model,
              brand: p.brand,
              imageSrc: p.image_url || 'https://via.placeholder.com/300',
              isNew: p.release_year >= new Date().getFullYear() - 1,
              specs: []
            })));
          } else {
            setSimilarDevices(devices.slice(0, 3));
          }
        } else {
          const found = devices.find((d) => d.id === deviceId);
          setDevice(found || devices[0]);
          setSimilarDevices(devices.filter(d => d.id !== (found?.id || devices[0].id)).slice(0, 3));
        }
      } else {
        setDevice(devices[0]);
        setSimilarDevices(devices.slice(1, 4));
      }
    };
    fetchDevice();
  }, [deviceId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!device) return null;

  // Generate consistent pseudo-random price
  const baseUsdPrice = 499 + (device.id.length * 15) + (device.name.charCodeAt(0) * 5);
  const formattedNgn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(baseUsdPrice * 1500);
  const formattedUsd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(baseUsdPrice);
  const formattedInr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(baseUsdPrice * 83.5);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Device Image & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="relative group">
              <span className="flex flex-col gap-2 justify-between items-start">
                <Link to="/" className="inline-flex md:hidden btn items-center text-md font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-white mb-2 transition-colors group">
                  <ChevronLeftIcon className="size-5 md:mr-1 group-hover:-translate-x-1 transition-transform" />
                  <p className="hidden md:block">Back</p>
                </Link>
                <h1 className="text-3xl md:text-4xl font-black mb-6 tracking-tight text-neutral-900 dark:text-white">
                  {device.name}
                </h1>
              </span>
              <div className="grid grid-cols-2 rounded-3xl p-2 bg-neutral-100/50 dark:bg-black border border-neutral-200 dark:border-neutral-800 gap-4">
                <div className="absolute opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-72 lg:h-80 w-full rounded-3xl bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm flex items-center justify-center p-6 transition-colors duration-300">
                  <img
                    src={device.imageSrc}
                    alt={device.name}
                    className={`w-full h-full object-contain transition-transform duration-700 ${device.isNew ? 'pt-6' : 'pt-0'}`}
                  />
                  {device.isNew && (
                    <div className="absolute top-4 left-4 px-2 py-0.5 text-green-700 text-xs dark:text-white self-end rounded-md border border-green-200/50 bg-green-400 bg-opacity-55 hover:bg-opacity-80">
                      New
                    </div>
                  )}

                </div>
                {/* Quick Specs Grid */}
                {device.quickSpecs && device.quickSpecs.length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    {device.quickSpecs.map((spec, idx) => (
                      <div key={idx} className="flex flex-col px-4 py-2 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-300 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-md">
                        <div className="flex items-center gap-1.5 mb-1 md:mb-2 text-neutral-500 dark:text-neutral-400">
                          {getIcon(spec.label, "size-4")}
                          <span className="text-[10px] font-bold uppercase">{spec.label}</span>
                        </div>
                        <span className="text-sm md:text-base font-light text-neutral-900 dark:text-white line-clamp-2" title={spec.value}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
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

              <button
                onClick={() => navigate(`/compare?device=${device.id}`)}
                title="Compare with another device"
                className="flex items-center justify-center p-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:bg-neutral-50 dark:hover:bg-black hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
              >
                <ScaleIcon className="size-5" />
              </button>
            </div>
          </motion.div>

          {/* Right: Info & Specs */}
          <div className="lg:col-span-7 space-y-7">
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-xs">{device.brand}</span>
                <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-neutral-500 text-xs font-medium uppercase tracking-widest">Flagship Device</span>
              </div>
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
                  className="group flex flex-col items-start gap-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] hover:bg-neutral-50 dark:hover:bg-black transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
                >
                  <span className='flex items-center gap-2'>
                    <div className="p-3 rounded-xl bg-neutral-100 dark:bg-black text-neutral-500 group-hover:text-blue-500 transition-colors duration-300 border border-neutral-200 dark:border-neutral-800">
                      {getIcon(spec.label, "size-5")}
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">{spec.label}</h3>
                  </span>
                  <div className="flex-1 min-w-0 w-full">
                    {spec.value && <p className="font-semibold text-neutral-900 dark:text-neutral-100">{spec.value}</p>}
                    {spec.subSpecs && (
                      <div className="flex flex-col gap-2 mt-2 w-full">
                        {spec.subSpecs.map(sub => (
                          <div key={sub.label} className="flex flex-col p-2 w-full bg-neutral-100/50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
                            <span className="text-[10px] font-bold uppercase text-neutral-400">{sub.label}</span>
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2" title={sub.value}>{sub.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* Pricing Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 md:p-8 rounded-3xl bg-neutral-100 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                Estimated Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-green-500/5 transition-colors group-hover:bg-green-500/10"></div>
                  <span className="text-sm md:text-xs text-neutral-500 font-semibold uppercase mb-2 z-10">Nigerian Naira (NGN)</span>
                  <span className="text-2xl font-black text-green-600 dark:text-green-500 z-10">{formattedNgn}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 transition-colors group-hover:bg-blue-500/10"></div>
                  <span className="text-sm md:text-xs text-neutral-500 font-semibold uppercase mb-2 z-10">US Dollar (USD)</span>
                  <span className="text-2xl font-black text-neutral-900 dark:text-white z-10">{formattedUsd}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-orange-500/5 transition-colors group-hover:bg-orange-500/10"></div>
                  <span className="text-sm md:text-xs text-neutral-500 font-semibold uppercase mb-2 z-10">Indian Rupee (INR)</span>
                  <span className="text-2xl font-black text-orange-600 dark:text-orange-500 z-10">{formattedInr}</span>
                </div>
              </div>
            </motion.section>

            {/* Suggested Vendors Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 p-6 md:p-8 rounded-3xl bg-neutral-100 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800"
            >
              <div className="text-left mb-8">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                  Suggested Vendors
                </h2>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Purchase your next device from our highly recommended and trusted retail partners.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  // { name: 'Amazon', rating: '4.9/5', desc: 'Global shipping and prime coverage.', color: 'from-orange-500/20 to-yellow-500/20' },
                  // { name: 'Best Buy', rating: '4.8/5', desc: 'Expert tech support and warranties.', color: 'from-blue-500/20 to-cyan-500/20' },
                  { name: 'Jumia', rating: '4.6/5', desc: 'Fast delivery across the continent.', color: 'from-orange-500/20 to-orange-400/20' },
                  { name: 'Slot Systems', rating: '4.7/5', desc: 'Premium local retail experience.', color: 'from-red-500/20 to-rose-500/20' }
                ].map((vendor, idx) => (
                  <motion.a
                    key={vendor.name}
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative flex flex-col p-5 bg-white dark:bg-black rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 overflow-hidden z-10"
                  >
                    <div className={`absolute -inset-2 bg-gradient-to-br ${vendor.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`} />

                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {vendor.name}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        ★ {vendor.rating}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 flex-grow mb-4">
                      {vendor.desc}
                    </p>
                    <div className="mt-auto flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      Shop now <span aria-hidden="true" className="ml-1">&rarr;</span>
                    </div>
                  </motion.a>
                ))}
              </div>
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
                {similarDevices.map((d) => (
                  <Link
                    key={d.id}
                    to={`/specs?device=${d.id}`}
                    className="group"
                  >
                    <div className="aspect-square rounded-2xl bg-neutral-100/60 dark:bg-[#0a0a0a] p-4 border border-neutral-200 dark:border-neutral-800 group-hover:border-blue-500/30 transition-all mb-3 overflow-hidden">
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