import React from 'react';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  ArrowLongRightIcon,
  UserPlusIcon,
  CogIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import SearchBar from '../Components/searchbar';
import CgLogo from '../Assets/cglogo';
import DarkCgLogo from '../Assets/darkcglogo';
import Dropdown from '../Components/dropdown';
import HeroButton from '../Components/herobutton';
import { Link } from 'react-router-dom';

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
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
    { name: 'Plaza', to: '#' },
    { name: 'About', to: '#' },
    { name: 'Blog', to: '/blog' },
    { name: 'Reviews', to: '#' },
  ],
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <section className={`${darkMode && "dark"}`}>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className={`${darkMode && "dark"} relative z-40 lg:hidden`}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs rounded-r-lg border-[2px] border-gray-300 dark:border-neutral-500 transform flex-col overflow-y-auto bg-neutral-200 dark:bg-neutral-800 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-neutral-400 data-[selected]:border-neutral-600 dark:data-[selected]:border-neutral-100 data-[selected]:text-neutral-600 dark:data-[selected]:text-neutral-100"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-6 px-4 py-6 max-h-[350px] overflow-scroll">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-5">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative bg-neutral-100 dark:bg-transparent border-[2px] rounded-xl border-gray-300 dark:border-neutral-500 p-2">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100">
                            <img alt={item.imageAlt} src={item.imageSrc} className="object-cover h-16 w-full object-center" />
                          </div>
                          <div className='flex items-baseline justify-between space-x-2'>
                            <a href={item.href} className="mt-2 block text-nowrap max-w-32 overflow-hidden font-medium text-base text-gray-900 dark:text-white">
                              <span aria-hidden="true" className="absolute inset-0 z-10" />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="text-xs hover:underline text-slate-700 dark:text-gray-400 p-1 px-2 hover:bg-gray-300 border border-gray-300 rounded-md">
                              View
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className='flex items-stretch p-2 justify-end text-slate-700 dark:text-gray-200 my-1 mx-4'>
              <button className='btn'>
                <p className=''>All Brands</p>
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link to={page.to} className="-m-2 block p-3 font-medium rounded-lg bg-neutral-300 bg-opacity-80 text-darkmode">
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex space-x-4 justify-between w-full border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="#" className="-m-2 px-6 py-2.5 block font-medium rounded-lg text-neutral-50 bg-neutral-500 active:scale-95 active:brightness-85">
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <Link to="/sign-in" className="-m-2 px-6 py-2.5 block font-medium rounded-lg bg-neutral-300 text-darkmode active:scale-95 active:brightness-85">
                  Sign in
                </Link>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {/* Currency selector */}
              {/* <form>
                <div className="inline-block">
                  <label htmlFor="mobile-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="mobile-currency"
                      name="currency"
                      className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </form> */}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Currency selector */}
          {/* <select
                        id="desktop-currency"
                        name="currency"
                        className="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                      >
                        {currencies.map((currency) => (
                          <option key={currency}>{currency}</option>
                        ))}
                      </select> */}

          {/* navigation */}
          <div className="bg-neutral-200 bg-opacity-75 backdrop-blur-md dark:bg-neutral-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:basis-1/6 lg:flex lg:items-center">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      {darkMode ? <CgLogo /> : <DarkCgLogo />}
                    </a>
                  </div>

                  <div className="hidden h-5 lg:flex lg:items-stretch lg:justify-between">
                    {/* Flyout menus */}
                    <PopoverGroup className="px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            <div className="relative flex">
                              <PopoverButton className="group relative z-10 flex items-center p-3 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 outline-none justify-center text-sm font-medium text-black dark:text-white transition-colors duration-200 ease-out">
                                {category.name}
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-x-0 -bottom-px h-0.5 transition rounded-b-md duration-200 ease-out group-data-[open]:bg-black dark:group-data-[open]:bg-white"
                                />
                              </PopoverButton>
                            </div>

                            <PopoverPanel
                              transition
                              className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                              <div className="relative bg-neutral-100 dark:bg-neutral-700">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                  <div className="grid grid-cols-5 gap-x-8 gap-y-10 pb-5 pt-10">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group relative border-[2px] bg-transparent dark:bg-neutral-800 rounded-xl border-gray-300 dark:border-neutral-500 p-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100">
                                          <img
                                            alt={item.imageAlt}
                                            src={item.imageSrc}
                                            className="object-cover lg:max-h-20 w-full object-center"
                                          />
                                        </div>
                                        <div className='flex items-baseline justify-between'>
                                          <a href={item.href} className="mt-2 block font-medium text-xl text-gray-900 dark:text-white">
                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                            {item.name}
                                          </a>
                                          <button aria-hidden="true" className="text-xs text-slate-700 dark:text-gray-400 p-1 px-2 hover:bg-gray-300 border border-gray-300 group-active:scale-75 rounded-md">
                                            View
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className='flex items-center justify-end space-x-2 pb-5 text-gray-900 dark:text-white'>
                                    <p
                                      className='cursor-pointer px-2 py-1 rounded-md inline-flex items-start hover:bg-neutral-200 hover:bg-opacity-35 hover:brightness-75 transition-all duration-200 ease-in-out'>
                                      All Brands
                                      {/* <ArrowLongRightIcon className='size-5 cursor-pointer' /> */}
                                      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                      </svg> */}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.to}
                            className="flex items-center text-sm py-3 px-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 outline-none font-medium text-black dark:text-white"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </PopoverGroup>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)} className="-ml-2 p-2 text-white">
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon aria-hidden="true" className="h-6 w-6 text-black dark:text-white" />
                    </button>
                  </div>

                  {/* Logo (lg-) */}
                  <div className='lg:hidden'>
                    {darkMode ? <CgLogo /> : <DarkCgLogo />}
                  </div>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center space-x-2">

                      {/* Search bar component */}
                      <SearchBar />

                      {/* DarkMode */}
                      <div className='flex items-center space-x-2'>
                        {/* <div className='hidden lg:flex'>
                          <button
                            className='btn'
                            onClick={toggleDarkMode}
                          >
                            {darkMode ?
                              <><SunIcon className='size-5 text-black dark:text-white' /></> :
                              <><MoonIcon className='size-5 text-black dark:text-white' /></>}
                          </button>
                        </div> */}
                        <Link to="/sign-in">
                          <button
                            title='Sign In'
                            className='btn'>
                            <UserPlusIcon className='size-5' />
                          </button>
                        </Link>
                        {/* <Dropdown /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </section>
  )
}

export default Header;