import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronUpDownIcon,
  XMarkIcon,
  CheckCircleIcon,
  BoltIcon,
  CameraIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ArrowsPointingOutIcon,
  SparklesIcon,
  MapPinIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { Device } from "../types";
import { supabase } from "../utils/supabase";

/* ─── helpers ─── */
const getIcon = (label: string) => {
  const l = label.toLowerCase();
  const cls = "size-4";
  if (l.includes("battery")) return <BoltIcon className={cls} />;
  if (l.includes("camera")) return <CameraIcon className={cls} />;
  if (l.includes("chipset") || l.includes("processor") || l.includes("performance")) return <CpuChipIcon className={cls} />;
  if (l.includes("display") || l.includes("screen")) return <DevicePhoneMobileIcon className={cls} />;
  if (l.includes("dimension") || l.includes("weight") || l.includes("design")) return <ArrowsPointingOutIcon className={cls} />;
  if (l.includes("storage") || l.includes("memory")) return <CircleStackIcon className={cls} />;
  if (l.includes("ai") || l.includes("intelligence")) return <SparklesIcon className={cls} />;
  if (l.includes("connect")) return <MapPinIcon className={cls} />;
  if (l.includes("resist") || l.includes("shield")) return <ShieldCheckIcon className={cls} />;
  return <BoltIcon className={cls} />;
};

const price = (d: Device) => {
  const base = 499 + d.id.length * 15 + d.name.charCodeAt(0) * 5;
  return {
    usd: base,
    ngn: base * 1500,
    inr: base * 83.5,
  };
};

const fmt = (v: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(v);

const mapSupabasePhoneToDevice = (dbPhone: any): Device => {
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

  return {
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
      { label: 'Released', value: dbPhone.raw_specs?.launchAnnouncedRaw || 'Unknown' },
      { label: 'OS', value: dbPhone.raw_specs?.platformOSRaw?.split(',')[0] || 'Unknown' },
      { label: 'Storage', value: dbPhone.storage_gb_max ? `${dbPhone.storage_gb_max} GB` : 'Unknown' },
      { label: 'Thickness', value: (dbPhone.raw_specs?.bodyDimensionsRaw?.match(/x ([\d.]+)\s*mm/) || [])[1] ? `${dbPhone.raw_specs.bodyDimensionsRaw.match(/x ([\d.]+)\s*mm/)[1]} mm` : 'Unknown' },
    ]
  };
};

/* ─── device picker dropdown ─── */
function DevicePicker({
  selected,
  onSelect,
  excludeId,
  label,
}: {
  selected: Device | null;
  onSelect: (d: Device) => void;
  excludeId?: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchResults = async () => {
      setIsLoading(true);
      let supabaseQuery = supabase.from('phones').select('*');

      if (query.trim() !== '') {
        supabaseQuery = supabaseQuery.or(`brand.ilike.%${query}%,model.ilike.%${query}%`);
      } else {
        // Default list when opened empty
        supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
      }

      const { data, error } = await supabaseQuery.limit(15);

      if (!error && data) {
        setResults(data.map(mapSupabasePhoneToDevice).filter(d => d.id !== excludeId));
      }
      setIsLoading(false);
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, open, excludeId]);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          {selected ? (
            <>
              <img src={selected.imageSrc} alt={selected.name} className="size-10 object-contain rounded-lg shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold truncate text-neutral-900 dark:text-white">{selected.name}</p>
                <p className="text-xs text-neutral-500">{selected.brand}</p>
              </div>
            </>
          ) : (
            <span className="text-neutral-400 text-sm font-medium">{label}</span>
          )}
        </div>
        <ChevronUpDownIcon className="size-5 text-neutral-400 shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 mt-2 w-full max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 shadow-2xl"
          >
            <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white dark:bg-[#0a0a0a] z-10">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search brand or model..."
                  className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-neutral-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-neutral-900 dark:text-white"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="p-5 text-center text-sm text-neutral-500">Searching...</div>
            ) : results.length > 0 ? (
              results.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { onSelect(d); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-left ${selected?.id === d.id ? "bg-blue-50 dark:bg-blue-950/20" : ""}`}
                >
                  <img src={d.imageSrc} alt={d.name} className="size-9 object-contain rounded-lg shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate text-neutral-900 dark:text-white">{d.name}</p>
                    <p className="text-xs text-neutral-500">{d.brand}</p>
                  </div>
                  {selected?.id === d.id && <CheckCircleIcon className="size-5 text-blue-500 ml-auto shrink-0" />}
                </button>
              ))
            ) : (
              <div className="p-5 text-center text-sm text-neutral-500">No devices found.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── main page ─── */
export default function Compare() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("device");
  const initialId2 = searchParams.get("device2");

  const [deviceA, setDeviceA] = useState<Device | null>(null);
  const [deviceB, setDeviceB] = useState<Device | null>(null);

  useEffect(() => {
    const fetchInitials = async () => {
      if (initialId) {
        const { data, error } = await supabase
          .from('phones')
          .select('*')
          .eq('slug', initialId)
          .single();
        if (!error && data) {
          setDeviceA(mapSupabasePhoneToDevice(data));
        }
      }
      if (initialId2) {
        const { data, error } = await supabase
          .from('phones')
          .select('*')
          .eq('slug', initialId2)
          .single();
        if (!error && data) {
          setDeviceB(mapSupabasePhoneToDevice(data));
        }
      }
    };
    fetchInitials();
  }, [initialId, initialId2]);

  const allLabels = useMemo(() => {
    const set = new Set<string>();
    deviceA?.specs.forEach((s) => set.add(s.label));
    deviceB?.specs.forEach((s) => set.add(s.label));
    return Array.from(set);
  }, [deviceA, deviceB]);

  const RenderSpecVal = ({ d, label }: { d: Device | null, label: string }) => {
    const spec = d?.specs.find((s) => s.label === label);
    if (!spec) return <span className="text-neutral-500">—</span>;
    if (spec.value) return <span>{spec.value}</span>;
    if (spec.subSpecs) {
      return (
        <div className="flex flex-col gap-1.5 mt-1">
          {spec.subSpecs.map(sub => (
            <div key={sub.label} className="text-xs">
              <span className="font-semibold text-neutral-500 mr-1">{sub.label}:</span>
              <span className="text-neutral-900 dark:text-neutral-100">{sub.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-neutral-500">—</span>;
  };

  const bothSelected = deviceA && deviceB;

  const priceA = deviceA ? price(deviceA) : null;
  const priceB = deviceB ? price(deviceB) : null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Back link */}
        <Link
          to={deviceA ? `/specs?device=${deviceA.id}` : "/"}
          className="inline-flex items-center btn text-md font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-white mb-8 transition-colors group"
        >
          <ChevronLeftIcon className="size-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
            <b className="text-blue-400">Compare</b> Devices
          </h1>
          <p className="mt-2 text-neutral-500 text-base max-w-xl">
            Select two devices to see a detailed side-by-side breakdown of specs, pricing, and more.
          </p>
        </motion.div>

        {/* Pickers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 pl-1">Device 1</span>
            <DevicePicker selected={deviceA} onSelect={setDeviceA} excludeId={deviceB?.id} label="Choose first device…" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 pl-1">Device 2</span>
            <DevicePicker selected={deviceB} onSelect={setDeviceB} excludeId={deviceA?.id} label="Choose second device…" />
          </div>
        </motion.div>

        {/* Comparison content */}
        <AnimatePresence mode="wait">
          {bothSelected ? (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Device images side-by-side */}
              <div className="grid grid-cols-2 gap-6">
                {[deviceA, deviceB].map((d) => (
                  <Link key={d!.id} to={`/specs?device=${d!.id}`} className="group">
                    <div className="relative aspect-[4/5] rounded-3xl bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 overflow-hidden flex items-center justify-center p-6 md:p-10 transition-all duration-300 group-hover:border-blue-400/40 group-hover:shadow-xl group-hover:shadow-blue-500/5">
                      <img
                        src={d!.imageSrc}
                        alt={d!.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      {d!.isNew && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">{d!.brand}</p>
                      <h3 className="text-lg md:text-xl font-black truncate text-neutral-900 dark:text-white">{d!.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Spec comparison table */}
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-[#0a0a0a]">
                <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800">
                  <h2 className="text-xl font-bold flex items-center gap-5">
                    Specifications
                    <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                  </h2>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {allLabels.map((label, idx) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.03 * idx }}
                      className="grid grid-cols-[1fr_1fr] md:grid-cols-[1.2fr_1fr_1fr] items-center gap-4 px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
                    >
                      {/* Label – hidden on mobile, shown on md+ */}
                      <div className="hidden md:flex items-center gap-3 text-neutral-500">
                        <div className="p-2 rounded-lg bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800">
                          {getIcon(label)}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
                      </div>

                      {/* Values */}
                      {[deviceA, deviceB].map((d) => (
                        <div key={d!.id} className="min-w-0">
                          {/* Label shown on mobile only */}
                          <p className="md:hidden text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                            {getIcon(label)} {label}
                          </p>
                          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            <RenderSpecVal d={d} label={label} />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Price comparison */}
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-[#0a0a0a] p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-5">
                  Estimated Pricing
                  <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                </h2>

                <div className="space-y-4">
                  {[
                    { label: "Nigerian Naira (NGN)", aVal: fmt(priceA!.ngn, "NGN", "en-NG"), bVal: fmt(priceB!.ngn, "NGN", "en-NG"), color: "green" },
                    { label: "US Dollar (USD)", aVal: fmt(priceA!.usd, "USD", "en-US"), bVal: fmt(priceB!.usd, "USD", "en-US"), color: "blue" },
                    { label: "Indian Rupee (INR)", aVal: fmt(priceA!.inr, "INR", "en-IN"), bVal: fmt(priceB!.inr, "INR", "en-IN"), color: "orange" },
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-[1fr_1fr] md:grid-cols-[1.2fr_1fr_1fr] gap-4 items-center py-3">
                      <span className="hidden md:block text-xs font-semibold uppercase text-neutral-500">{row.label}</span>
                      {[row.aVal, row.bVal].map((val, i) => (
                        <div key={i} className="min-w-0">
                          <p className="md:hidden text-[10px] font-semibold uppercase text-neutral-400 mb-1">{row.label}</p>
                          <p className={`text-lg md:text-xl font-black ${row.color === "green" ? "text-green-600 dark:text-green-500"
                            : row.color === "orange" ? "text-orange-600 dark:text-orange-500"
                              : "text-neutral-900 dark:text-white"
                            }`}>
                            {val}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear comparison */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => { setDeviceA(null); setDeviceB(null); }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] text-neutral-500 hover:text-red-500 hover:border-red-300 dark:hover:border-red-800 transition-all duration-300 text-sm font-semibold"
                >
                  <XMarkIcon className="size-4" />
                  Clear Comparison
                </button>
              </div>
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="p-5 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6">
                <ChevronUpDownIcon className="size-10 text-neutral-300 dark:text-neutral-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-400 mb-2">Pick Two Devices</h3>
              <p className="text-sm text-neutral-400 max-w-sm">
                Use the dropdowns above to select two devices you'd like to compare side by side.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
