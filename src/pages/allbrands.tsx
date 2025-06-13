import Header from "../Components/header";
import SearchBar from '../Components/searchbar';

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
  // {
  //   name: "BQ",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "BQ device aesthetic",
  // },
  // {
  //   name: "Coolpad",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Coolpad device aesthetic",
  // },
  // {
  //   name: "Doogee",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Doogee device aesthetic",
  // },
  // {
  //   name: "Energizer",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Energizer device aesthetic",
  // },
  // {
  //   name: "Fairphone",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Fairphone device aesthetic",
  // },
  // {
  //   name: "Gionee",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Gionee device aesthetic",
  // },
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
  // {
  //   name: "HTC",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "HTC device aesthetic",
  // },
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
  // {
  //   name: "Lava",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Lava device aesthetic",
  // },
  // {
  //   name: "Lenovo",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Lenovo device aesthetic",
  // },
  // {
  //   name: "LeTV",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "LeTV device aesthetic",
  // },
  // {
  //   name: "LG",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "LG device aesthetic",
  // },
  // {
  //   name: "Meizu",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Meizu device aesthetic",
  // },
  // {
  //   name: "Micromax",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Micromax device aesthetic",
  // },
  // {
  //   name: "Motorola",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Motorola device aesthetic",
  // },
  // {
  //   name: "Nokia",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Nokia device aesthetic",
  // },
  {
    name: "Nothing",
    href: "#",
    imageSrc: "https://intl.nothing.tech/cdn/shop/files/Phone-2-PDP-Glyph-Header-Desktop.jpg?v=1688994873",
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
  // {
  //   name: "Sharp",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Sharp device aesthetic",
  // },
  // {
  //   name: "Sony",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Sony device aesthetic",
  // },
  {
    name: "Tecno",
    href: "#",
    imageSrc: "https://skit.ng/wp-content/uploads/2024/05/Tecno-Camon-30-3.webp",
    imageAlt: "Tecno device aesthetic",
  },
  // {
  //   name: "Ulefone",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Ulefone device aesthetic",
  // },
  {
    name: "Vivo",
    href: "#",
    imageSrc: "https://i0.wp.com/inews.zoombangla.com/wp-content/uploads/2025/05/2VUvBtkZloA-HD-249.jpg?ssl=1",
    imageAlt: "Vivo device aesthetic",
  },
  // {
  //   name: "Wiko",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "Wiko device aesthetic",
  // },
  {
    name: "Xiaomi",
    href: "#",
    imageSrc: "https://www.cambridgemechatronics.com/media/cache/8e/78/8e782565bdc57faf70387535be120074.webp",
    imageAlt: "Xiaomi device aesthetic",
  },
  // {
  //   name: "ZTE",
  //   href: "#",
  //   imageSrc: "",
  //   imageAlt: "ZTE device aesthetic",
  // },
]


function AllBrands() {
  return (
    <div className="">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <main className="px-4 md:px-10 pt-20">
        {/* <SearchBar /> */}
        <h2 className="pb-5 font-semibold text-3xl">All Phone Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((item) => (
            <div key={item.name} className="group relative border-[2px] bg-transparent dark:bg-neutral-800 rounded-xl border-gray-300 dark:border-neutral-500 p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100">
                <img
                  alt={item.imageAlt}
                  src={item.imageSrc}
                  className="object-cover max-h-24 md:max-h-28 w-full object-center"
                />
              </div>
              <div className='flex items-baseline justify-between'>
                <a href={item.href} className="mt-2 block font-medium text-xl text-gray-900 dark:text-white">
                  <span aria-hidden="true" className="absolute inset-0 z-10" />
                  {item.name}
                </a>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AllBrands;