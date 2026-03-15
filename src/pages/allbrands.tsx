import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Header from "../Components/header";
import Footer from "../Components/footer";

const brands = [
  {
    name: "Alcatel",
    href: "#",
    imageSrc: "https://observervoice.com/wp-content/uploads/2025/05/Alcatel-Launches-V3-Classic-5G-V3-Pro-5G-and-V3-Ultra-5G-Featuring-NXTPAPER-Technology.jpeg",
    imageAlt: "Alcatel device aesthetic",
  },
  {
    name: "Apple",
    href: "#",
    imageSrc: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/tile/Apple-iPhone-16-Pro-hero-240909-lp.jpg.landing-big_2x.jpg",
    imageAlt: "Apple device aesthetic",
  },
  {
    name: "Asus",
    href: "#",
    imageSrc: "https://fdn.gsmarena.com/imgroot/reviews/25/asus-zenfone-12-ultra/lifestyle/-1024w2/gsmarena_003.jpg",
    imageAlt: "Asus device aesthetic",
  },
  {
    name: "BlackBerry",
    href: "#",
    imageSrc: "https://www.cnet.com/a/img/resize/3ea9b0e2fcc1e67a74d45687f61542f8a4b15a70/hub/2018/08/30/e95df005-27c1-468e-a1f3-8f3bec82fc66/blackberry-key-2-two-le-4.jpg?auto=webp&width=1200",
    imageAlt: "BlackBerry device aesthetic",
  },
  {
    name: "BLU",
    href: "#",
    imageSrc: "https://www.bluproducts.com/news/images/bold-n3-1.jpg",
    imageAlt: "BLU device aesthetic",
  },
  {
    name: "Google",
    href: "#",
    imageSrc: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/2025/05/pixel-9-pro-header.jpg",
    imageAlt: "Google Pixel device aesthetic",
  },
  {
    name: "Honor",
    href: "#",
    imageSrc: "https://digital.bg/wp-content/uploads/2025/06/honor-x6c-1.jpg",
    imageAlt: "Honor device aesthetic",
  },
  {
    name: "Huawei",
    href: "#",
    imageSrc: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-pura80-ultra-3.jpg",
    imageAlt: "Huawei device aesthetic",
  },
  {
    name: "Infinix",
    href: "#",
    imageSrc: "https://img.baba-blog.com/2024/10/Infinix-Hot-50-scaled-1.jpg?x-oss-process=style%2Ffull",
    imageAlt: "Infinix device aesthetic",
  },
  {
    name: "Itel",
    href: "#",
    imageSrc: "https://i.gadgets360cdn.com/large/itel_s25_main_1731144498965.jpg",
    imageAlt: "Itel device aesthetic",
  },
  {
    name: "Nothing",
    href: "#",
    imageSrc: "https://fdn.gsmarena.com/imgroot/reviews/25/nothing-phone-3a-pro/lifestyle/-1024w2/gsmarena_004.jpg",
    imageAlt: "Nothing device aesthetic",
  },
  {
    name: "OnePlus",
    href: "#",
    imageSrc: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/2025/04/oneplus-13t.jpg",
    imageAlt: "OnePlus device aesthetic",
  },
  {
    name: "Oppo",
    href: "#",
    imageSrc: "https://awsimages.detik.net.id/community/media/visual/2024/01/08/oppo-find-x7-ultra_169.webp?w=600&q=90",
    imageAlt: "Oppo device aesthetic",
  },
  {
    name: "Realme",
    href: "#",
    imageSrc: "https://i.gadgets360cdn.com/large/realme_gt_5_pro_realme_1717405064774.jpg",
    imageAlt: "Realme device aesthetic",
  },
  {
    name: "Redmi",
    href: "#",
    imageSrc: "https://www.irishexaminer.com/cms_media/module_img/8963/4481713_11_org_Redmi_Note_14_Pro_5G_Purple_handheld_282_29_copy.jpg",
    imageAlt: "Redmi device aesthetic",
  },
  {
    name: "Samsung",
    href: "#",
    imageSrc: "https://images.samsung.com/uk/smartphones/galaxy-s25-ultra/images/galaxy-s25-ultra-share-image.jpg",
    imageAlt: "Samsung device aesthetic",
  },
  {
    name: "Tecno",
    href: "#",
    imageSrc: "https://fdn2.gsmarena.com/vv/pics/tecno/tecno-camon-50-pro-3.jpg",
    imageAlt: "Tecno device aesthetic",
  },
  {
    name: "Vivo",
    href: "#",
    imageSrc: "https://i0.wp.com/inews.zoombangla.com/wp-content/uploads/2025/05/2VUvBtkZloA-HD-249.jpg?ssl=1",
    imageAlt: "Vivo device aesthetic",
  },
  {
    name: "Xiaomi",
    href: "#",
    imageSrc: "https://www.cambridgemechatronics.com/media/cache/8e/78/8e782565bdc57faf70387535be120074.webp",
    imageAlt: "Xiaomi device aesthetic",
  },
];


function AllBrands() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800 flex flex-col transition-colors duration-300">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-2">
              All Phone Brands
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Browse our directory of leading smartphone manufacturers.
            </p>
          </div>

          <div className="relative w-full md:w-96 flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 dark:focus:ring-white/20 dark:focus:border-white/20 transition-all duration-300 text-neutral-900 dark:text-white placeholder-neutral-400"
            />
          </div>
        </motion.div>

        {filteredBrands.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
          >
            <div className="p-6 bg-neutral-50 dark:bg-black rounded-full mb-6 border border-neutral-100 dark:border-neutral-900 transition-colors duration-300">
              <MagnifyingGlassIcon className="h-10 w-10 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No brands found</h3>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm">
              We couldn't find any brands matching "{searchQuery}". Try adjusting your search.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 px-6 py-2.5 bg-neutral-200 text-neutral-700 dark:bg-white dark:text-black font-semibold rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-200 transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            <AnimatePresence>
              {filteredBrands.map((item, idx) => (
                <motion.a
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.5) }}
                  href={item.href}
                  className="group flex flex-col p-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xl hover:shadow-neutral-500/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-50 dark:bg-black mb-4 relative flex items-center justify-center transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img
                      alt={item.imageAlt}
                      src={item.imageSrc}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center justify-between px-2 pb-1">
                    <h2 className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {item.name}
                    </h2>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 dark:bg-black px-3 py-1.5 rounded-full group-hover:bg-neutral-200 group-hover:text-neutral-800 dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                      View
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AllBrands;