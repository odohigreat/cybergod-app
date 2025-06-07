import React from 'react';
import HeroButton from './Components/herobutton';
import Header from './Components/header';
import { FaArrowRight } from "react-icons/fa6";

const navigation = {
  categories: [
    {
      name: 'Discover',
      featured: [
        {
          name: 'Samsung',
          href: '#',
          imageSrc: 'https://res.cloudinary.com/dl4f30xpb/image/upload/v1731626673/galaxy-s24-ultra-highlights-color-titanium-green-back-mo_syyxhs.jpg',
          imageAlt: 'Basic samsung device aesthetic',
        },
        {
          name: 'Apple',
          href: '#',
          imageSrc: 'https://res.cloudinary.com/dl4f30xpb/image/upload/c_thumb,w_200,g_face/v1731408796/IMG_20240923_121246_722_vlbsot.jpg',
          imageAlt: 'Basic iPhone device aesthetic',
        },
        {
          name: 'Google',
          href: '#',
          imageSrc: 'https://res.cloudinary.com/dl4f30xpb/image/upload/c_thumb,w_200,g_face/v1731409149/IMG_20240815_120738_427_sxh9oq.jpg',
          imageAlt: 'Basic pixel device aesthetic',
        },
        {
          name: 'Tecno',
          href: '#',
          imageSrc: 'https://skit.ng/wp-content/uploads/2024/05/Tecno-Camon-30-3.webp',
          imageAlt: 'Basic tecno device aesthetic',
        },
        {
          name: 'Xiaomi',
          href: '#',
          imageSrc: 'https://www.cambridgemechatronics.com/media/cache/8e/78/8e782565bdc57faf70387535be120074.webp',
          imageAlt: 'Basic xiaomi device aesthetic',
        },
        {
          name: 'Infinix',
          href: '#',
          imageSrc: 'https://img.baba-blog.com/2024/10/Infinix-Hot-50-scaled-1.jpg?x-oss-process=style%2Ffull',
          imageAlt: 'Basic infinix device aesthetic',
        },
        {
          name: 'Nothing',
          href: '#',
          imageSrc: 'https://intl.nothing.tech/cdn/shop/files/Phone-2-PDP-Glyph-Header-Desktop.jpg?v=1688994873',
          imageAlt: 'Basic nothing device aesthetic',
        },
        {
          name: 'Itel',
          href: '#',
          imageSrc: 'https://i.gadgets360cdn.com/large/itel_s25_main_1731144498965.jpg',
          imageAlt: 'Basic itel device aesthetic',
        },
        {
          name: 'Realme',
          href: '#',
          imageSrc: 'https://i.gadgets360cdn.com/large/realme_gt_5_pro_realme_1717405064774.jpg',
          imageAlt: 'Basic realme device aesthetic',
        },
        {
          name: 'Oppo',
          href: '#',
          imageSrc: 'https://awsimages.detik.net.id/community/media/visual/2024/01/08/oppo-find-x7-ultra_169.webp?w=600&q=90',
          imageAlt: 'Basic oppo device aesthetic',
        },
      ],
    },
    {
      name: 'Featured',
      featured: [
        {
          name: 'Updates',
          href: '#',
          imageSrc: 'https://www.tuaw.com/wp-content/uploads/2024/08/Apple-Intelligence-scaled.jpeg',
          imageAlt: 'latest tech updates',
        },
        {
          name: 'Creators',
          href: '#',
          imageSrc: 'https://fwmedia.fandomwire.com/wp-content/uploads/2024/09/26045556/Screenshot-2024-09-26-2.25.10-PM-1024x442.png',
          imageAlt: 'latest from top tech content creators',
        },
        {
          name: 'New Devices',
          href: '#',
          imageSrc: 'https://www.techinsights.com/sites/default/files/2024-09/huawei-mate-xt-tri-fold.jpg',
          imageAlt: 'new device releases',
        },
        {
          name: 'Events',
          href: '#',
          imageSrc: 'https://io.google/2024/app/images/io24-featured-keynote-recap.webp',
          imageAlt: 'most recent tech events',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://cdn.db.io/images/dlg3xw1d/production/38c9ecbd385d3561f292efe7f31c5e81d9a6bbca-3750x1500.jpg',
          imageAlt: 'device accesories',
        },
      ],
    },
  ],
  pages: [
    { name: 'Plaza', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
  ],
}


const categories = [
  {
    name: 'Realme officially launches its operations in Nigeria.',
    href: '#',
    imageSrc: 'https://techeconomy.ng/wp-content/uploads/2024/10/realme-in-Nigeria.jpg',
  },
  {
    name: 'New Samsung Galaxy S25 mock ups leaked online',
    href: '#',
    imageSrc: 'https://www.androidheadlines.com/wp-content/uploads/2024/09/Galaxy-S25-Ultra-5K1-1420x799.webp',
  },
  {
    name: '"Gemini for iOS", better than Apple Intelligence?',
    href: '#',
    imageSrc: 'https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/02/53528020292_1ca68ef944_o.jpg',
  },
  {
    name: 'Xiaomi HyperOS 2 Updates, Availability and.. Xiaomi AI?',
    href: '#',
    imageSrc: 'https://www.gizmochina.com/wp-content/uploads/2024/11/HyperOS-2-eligible-devices-and-rollout-timeline-1024x576.png',
  },
  {
    name: 'iOS 18.2 rolls out on all Eligible iPhones worldwide',
    href: '#',
    imageSrc: 'https://www.ispazio.net/wp-content/uploads/2024/10/ios-18-2.jpg',
  },
]
const collections = [
  {
    name: 'Explore by Features',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-collection-01.jpg',
    imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
    description: 'Best cameras, fastest processors, long-lasting batteries.',
  },
  {
    name: 'Compare Top Brands',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-collection-02.jpg',
    imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
    description: 'Apple, Samsung, Google Pixel, and more.',
  },
  {
    name: 'Customized Suggestions',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-01-collection-03.jpg',
    imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
    description: 'Answer a few questions, and well do the rest!',
  },
]
const footerNavigation = {
  shop: [
    { name: 'Phones', href: '#' },
    { name: 'Cases', href: '#' },
    { name: 'Accesories', href: '#' },
    { name: 'Gadgets', href: '#' },
  ],
  product: [
    { name: 'Who we are', href: '#' },
    { name: 'Coverage', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Contact Us', href: '#' },
  ],
  account: [
    { name: 'Create Account', href: '#' },
    { name: 'Sign In', href: '#' },
  ],
  connect: [
    { name: 'Gmail', href: '#' },
    { name: 'Threads', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Linked-In', href: '#' },
  ],
}

function Home() {

  return (
    <div>
      <Header />
      {/* Hero section */}
      <div className="bg-gradient-to-bl from-neutral-100 to-neutral-200 dark:bg-neutral-900 h-fit lg:h-fit pb-10">
        <div className="relative mx-auto flex lg:flex-row flex-col-reverse lg:space-x-20 max-w-6xl items-center py-5 lg:py-10 px-5 lg:px-16">
          <div className='flex flex-col space-y-5 items-start max-w-md text-gray-900 dark:text-neutral-100'>
            <h1 className="text-4xl font-bold lg:leading-tight lg:text-5xl">Looking for the phone that's just for you?</h1>
            <p className="text-lg">
              You're just one click away from finding the perfect phone that suits your needs.
            </p>
            <HeroButton />
          </div>
          <div>
            <img
              alt='hero-pic'
              src='https://res.cloudinary.com/dl4f30xpb/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1731380066/WhatsApp_Image_2024-11-11_at_7.49.01_PM_tcv8yy.jpg'
              className='rounded-3xl mb-5 lg:mb-0 border-darkmode'
            />
          </div>
        </div>
      </div>

      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="dark:bg-neutral-800 pt-8 pb-5 md:pt-10 xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 id="category-heading" className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Updates
            </h2>
            <a href="#" className="hidden text-sm font-semibold text-neutral-400 hover:text-black dark:hover:text-white sm:block">
              more updates
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="relative flex h-80 w-56 flex-col overflow-hidden border-2 border-neutral-200 rounded-2xl p-2 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img alt="" src={category.imageSrc} className="size-fit min-h-40 object-cover hover:brightness-110 rounded-2xl p-2 object-center" />
                        <div className='px-2'>
                          <span className='relative text-slate-900 text-[10px] mt-auto dark:text-white'>12th June, 2025</span>
                        </div>
                        <h4 className='px-2'>
                          <span className="relative text-start mt-auto text-lg font-bold text-slate-900 dark:text-white">{category.name}</span>
                        </h4>
                      </span>
                      <span className='relative text-right mt-auto text-slate-900 text-xs dark:text-white'>
                        <button className='btn'>
                          View now
                        </button>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <a href="#" className="block text-sm font-semibold text-neutral-400 hover:text-black dark:hover:text-white">
              More updates
             
            </a>
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby="social-impact-heading"
          className="mx-auto dark:bg-neutral-800 max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg border-darkmode">
            <div className="absolute inset-0">
              <img
                alt=""
                src="https://res.cloudinary.com/dl4f30xpb/image/upload/v1731409171/Screenshot_2024-05-03-16-29-42-713_com.instagram.android-edit_rq7awv.jpg"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 id="social-impact-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  <span className="block sm:inline">More Features </span>
                  <span className="block sm:inline">coming soon!</span>
                </h2>
                <p className="mt-3 text-xl text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis felis et ultrices consectetur.
                  Duis sit amet rutrum nisl, quis blandit magna. Mauris aliquam odio velit, id mattis nunc mattis at.
                  Aenean nec orci quam. Suspendisse imperdiet egestas est, non condimentum turpis malesuada ullamcorper
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Lorem Ipsum
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Collection section */}
        <section
          aria-labelledby="collection-heading"
          className="mx-auto dark:bg-neutral-800 max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
        >
          <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            What we do
          </h2>
          <p className="text-base text-gray-500">
            Not sure which phone suits your needs? Use our expert recommendations to find the best smartphone for your lifestyle. Whether you're a gamer, a photographer, or a multitasker, we've got you covered!
          </p>

          <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {collections.map((collection) => (
              <a key={collection.name} href={collection.href} className="group block">
                <div
                  aria-hidden="true"
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                >
                  <img
                    alt={collection.imageAlt}
                    src={collection.imageSrc}
                    className="h-full w-full object-cover border-darkmode object-center"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{collection.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{collection.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Featured section */}
        <section aria-labelledby="comfort-heading" className="mx-auto dark:bg-neutral-800 max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative overflow-hidden border-darkmode rounded-lg">
            <div className="absolute inset-0">
              <img
                alt=""
                src="https://tailwindui.com/plus/img/ecommerce-images/home-page-01-feature-section-02.jpg"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 id="comfort-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Simplify your tech choices.
                </h2>
                <p className="mt-3 text-xl text-white">
                  Aenean nec orci quam. Suspendisse imperdiet egestas est, non condimentum turpis malesuada ullamcorper.
                  Suspendisse ac nisi tristique, dapibus tellus quis, blandit dui. Nam maximus vestibulum nunc,
                  non dictum diam gravida vehicula. Nulla volutpat mauris nulla, sed hendrerit purus feugiat vel.
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Lorem Ipsum
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby="footer-heading" className="bg-gray-900">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-white">Shop</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.shop.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Company</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.product.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-white">Account</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.account.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Connect</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-16 xl:mt-0">
              <h3 className="text-sm font-medium text-white">Sign up for our newsletter</h3>
              <p className="mt-6 text-sm text-gray-300">The latest updates and news, sent to your inbox weekly.</p>
              <form className="mt-2 flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="text"
                  required
                  autoComplete="email"
                  className="w-full min-w-0 appearance-none border-darkmode px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm outline-none"
                />
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="btn text-black dark:text-white"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 py-10">
            <p className="text-sm text-gray-400">Copyright &copy; 2024 Cybergod, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;

function useAppContext(): { sendRequest: any; } {
  throw new Error('Function not implemented.');
}
