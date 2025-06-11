import React from 'react';
import HeroButton from './Components/herobutton';
import Header from './Components/header';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const categories = [
  {
    name: 'Apple begins public roll out for new iOS26 beta',
    href: '#',
    imageSrc: 'https://images.macrumors.com/t/GyI9rHsJegad7V1bX9ft9Ctde18=/1600x0/article-new/2025/06/iOS-26-Feature.jpg',
  },
  {
    name: 'New Samsung Galaxy S25 Edge hits the market',
    href: '#',
    imageSrc: 'https://cdn.mos.cms.futurecdn.net/cCUHDdzJUhbgLmeaUud6NK.jpg',
  },
  {
    name: '"Gemini for iOS", Better than Apple Intelligence?',
    href: '#',
    imageSrc: 'https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/02/53528020292_1ca68ef944_o.jpg',
  },
  {
    name: 'Redmi release fully speced out budget device',
    href: '#',
    imageSrc: 'https://www.revu.com.ph/wp-content/uploads/2025/05/Xiaomi-Redmi-A5-price-and-specs-via-Revu-Philippines.jpg',
  },
  {
    name: 'Indepth review of iPadOS 26 and its new features',
    href: '#',
    imageSrc: 'https://www.cnet.com/a/img/resize/7c4b701680d2e19e08084ec10e6ab9e400865804/hub/2025/06/09/1f03c914-bae8-40e6-8ec8-38940b1da3b8/screenshot-2025-06-09-at-2-17-00pm.png?auto=webp&fit=crop&height=675&width=1200',
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
      <span className=''>
        <Header />
      </span>
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

        {/* trendy device previews */}
        <div className="bg-white py-7 md:py-10 px-5">
          <motion.h2 className="font-semibold text-3xl md:text-4xl text-black pb-8 pl-2 md:pl-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            Trending Devices
          </motion.h2>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <motion.div className="grid grid-cols-2 items-center gap-x-8 gap-y-12 md:grid-cols-5 md:gap-x-10 md:gap-y-14"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              <div className='flex flex-col items-center justify-between space-y-2 p-4 min-h-60 min-w-44 rounded-2xl bg-neutral-300 bg-opacity-30 backdrop-blur-sm cursor-pointer hover:brightness-105 active:scale-110 transition-all duration-200 ease-in-out'>
                <span className='px-2 py-0.5 text-xs self-end rounded-lg border border-green-500 bg-green-400 bg-opacity-55 hover:bg-opacity-80'>New</span>
                <img src='https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-edge.jpg' alt='Samsung Galaxy S25 Edge' className='rounded-lg h-28' />
                <h3 className='text-base font-semibold text-center text-gray-900 dark:text-white '>Samsung Galaxy S25 Edge</h3>
              </div>
              <div className='flex flex-col items-center justify-between space-y-2 p-4 min-h-60 min-w-44 rounded-2xl bg-neutral-300 bg-opacity-30 backdrop-blur-sm cursor-pointer hover:brightness-105 active:scale-110 transition-all duration-200 ease-in-out'>
                <span className='px-2 py-0.5 text-xs self-end rounded-lg border border-green-500 bg-green-400 bg-opacity-55 hover:bg-opacity-80'>New</span>
                <img src='https://fdn2.gsmarena.com/vv/bigpic/oneplus-13s-.jpg' alt='One Plus 13s' className='rounded-lg h-28' />
                <h3 className='text-base font-semibold text-center text-gray-900 dark:text-white '>One Plus 13s</h3>
              </div>
              <div className='flex flex-col items-center justify-between space-y-2 p-4 min-h-60 min-w-44 rounded-2xl bg-neutral-300 bg-opacity-30 backdrop-blur-sm cursor-pointer hover:brightness-105 active:scale-110 transition-all duration-200 ease-in-out'>
                <span className='px-2 py-0.5 text-xs self-end rounded-lg border border-green-500 bg-green-400 bg-opacity-55 hover:bg-opacity-80'>New</span>
                <img src='https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16e.jpg' alt='Apple iPhone 16e' className='rounded-lg h-28' />
                <h3 className='text-base font-semibold text-center text-gray-900 dark:text-white '>Apple iPhone 16e</h3>
              </div>
              <div className='flex flex-col items-center justify-between space-y-2 p-4 min-h-60 min-w-44 rounded-2xl bg-neutral-300 bg-opacity-30 backdrop-blur-sm cursor-pointer hover:brightness-105 active:scale-110 transition-all duration-200 ease-in-out'>
                <span className='px-2 py-0.5 text-xs self-end rounded-lg border border-green-500 bg-green-400 bg-opacity-55 hover:bg-opacity-80'>New</span>
                <img src='https://fdn2.gsmarena.com/vv/bigpic/google-pixel-9-pro-.jpg' alt='Google Pixel 9 Pro' className='rounded-lg h-28' />
                <h3 className='text-base font-semibold text-center text-gray-900 dark:text-white '>Google Pixel 9 Pro</h3>
              </div>
              <div className='flex flex-col items-center justify-between space-y-2 p-4 min-h-60 min-w-44 rounded-2xl bg-neutral-300 bg-opacity-30 backdrop-blur-sm cursor-pointer hover:brightness-105 active:scale-110 transition-all duration-200 ease-in-out'>
                <span className='px-2 py-0.5 text-xs self-end rounded-lg border border-green-500 bg-green-400 bg-opacity-55 hover:bg-opacity-80'>New</span>
                <img src='https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg' alt='Apple iPhone 16 Plus' className='rounded-lg h-28' />
                <h3 className='text-base font-semibold text-center text-gray-900 dark:text-white '>Apple iPhone 16 Plus</h3>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Partnering brands section */}
        <div className="bg-white py-10 p-5">
          <motion.span className='flex flex-col pb-10 items-center justify-center text-center'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <h2 className="font-semibold text-3xl text-black">Trusted by various
              <b className='text-blue-400'> reputable</b> brands
            </h2>
          </motion.span>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg" alt="Transistor" width="158" height="48" />
              <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg" alt="Reform" width="158" height="48" />
              <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg" alt="Tuple" width="158" height="48" />
              <img className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg" alt="SavvyCal" width="158" height="48" />
              <img className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg" alt="Statamic" width="158" height="48" />
            </motion.div>
          </div>
        </div>

        <div className="relative py-12 md:py-24">
          <motion.span className='flex flex-col pb-10 items-center justify-center text-center'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <h2 className="font-semibold text-4xl text-black">Quick view
              <b className='text-blue-400'> Statistics</b>
            </h2>
          </motion.span>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-16 text-center lg:grid-cols-3">
              <motion.div className="mx-auto flex max-w-xs flex-col gap-y-4 w-full px-16 py-7 border border-blue-200 bg-opacity-15 rounded-xl bg-blue-300 backdrop-blur-sm cursor-pointer hover:scale-110 transition-all duration-300 ease-out"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <dt className="text-base/7 text-black text-nowrap">Visits every 24 hours</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-800 text-nowrap sm:text-5xl">23,000</dd>
              </motion.div>
              <motion.div className="mx-auto flex max-w-xs flex-col gap-y-4 w-full px-16 py-7 border border-blue-200 bg-opacity-15 rounded-xl bg-blue-300 backdrop-blur-sm cursor-pointer hover:scale-110 transition-all duration-300 ease-out"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <dt className="text-base/7 text-black text-nowrap">Detailed device reviews</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-800 text-nowrap sm:text-5xl">2,000+</dd>
              </motion.div>
              <motion.div className="mx-auto flex max-w-xs flex-col gap-y-4 w-full px-16 py-7 border border-blue-200 bg-opacity-15 rounded-xl bg-blue-300 backdrop-blur-sm cursor-pointer hover:scale-110 transition-all duration-300 ease-out"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <dt className="text-base/7 text-black text-nowrap">Active users currently</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-neutral-800 text-nowrap sm:text-5xl">1,000+</dd>
              </motion.div>
            </dl>
          </div>
          {/* Grid background */}
          <div className="absolute -z-10 inset-0 h-full w-full bg-[linear-gradient(to_right,#73737320_2px,transparent_2px),linear-gradient(to_bottom,#73737320_2px,transparent_2px)] bg-[size:40px_40px]" />
        </div>


        {/* Category section */}
        <section aria-labelledby="category-heading" className="dark:bg-neutral-800 pt-8 pb-16 md:pt-10 xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 id="category-heading" className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Blog Updates
            </h2>
            <Link to="/blog" className="hidden text-sm font-semibold text-neutral-400 hover:text-black dark:hover:text-white sm:block">
              More updates
              <span aria-hidden="true"> &rarr;</span>
            </Link>
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
          className="mx-auto dark:bg-neutral-800 max-w-7xl px-4"
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
                  className="mt-8 block w-full rounded-lg border border-transparent bg-blue-400 px-8 py-2 text-base font-medium text-gray-100 hover:bg-blue-300 sm:w-auto"
                >
                  Lorem Ipsum
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Collection section */}
        {/* <section
          aria-labelledby="collection-heading"
          className="mx-auto dark:bg-neutral-800 max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
        >
          <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            What we do
          </h2>
          <p className="text-base text-gray-500">
            Not sure which phone suits your needs? Use our expert recommendations to find the best smartphone for your lifestyle. Whether you're a gamer, a photographer, or a multitasker, we've got you covered!
          </p>
        </section> */}

        {/* Featured section */}
        <section aria-labelledby="comfort-heading" className="mx-auto dark:bg-neutral-800 max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative overflow-hidden border-darkmode rounded-lg">
            <div className="absolute inset-0">
              <img
                alt=""
                src="https://img.global.news.samsung.com/in/wp-content/uploads/2023/02/Gen-2-Unpacked-2023_Special-Page-KV-1000x500.jpg"
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
                  className="mt-8 block w-full rounded-lg border border-transparent bg-blue-400 px-8 py-2 text-base font-medium text-gray-100 hover:bg-blue-300 sm:w-auto"
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
            <p className="text-sm text-gray-400">2025 Cybergod, All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home;