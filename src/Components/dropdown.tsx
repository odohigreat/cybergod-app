import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  UserPlusIcon,
  AdjustmentsVerticalIcon,
  ArrowLeftEndOnRectangleIcon,
  CurrencyPoundIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

function Dropdown() {
  return (
    <Menu as="div" className="inline-block">
      <div>
        <MenuButton className="flex items-center focus:outline-none">
          <span className="sr-only">Open options</span>
          <button className='btn text-black dark:text-white'>
            <AdjustmentsVerticalIcon className='size-5' />
          </button>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 px-1 mr-3 z-10 mt-2 w-32 lg:w-40 border-darkmode font-semibold text-darkmode origin-top-right rounded-md bg-neutral-100 dark:bg-neutral-900 shadow-lg transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <div className='flex px-4 items-center justify-between border-b border-b-gray-400 dark:border-b-neutral-700'>
              <a
                href="#"
                className="block py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Discover
              </a>
              <GlobeAltIcon className='size-4' />
            </div>
          </MenuItem>
          <MenuItem>
            <div className='flex px-4 items-center justify-between border-b border-b-gray-400 dark:border-b-neutral-700'>
              <a
                href="#"
                className="block py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Currency
              </a>
              <CurrencyPoundIcon className='size-4' />
            </div>
          </MenuItem>
          <MenuItem>
            <div className='flex px-4 items-center justify-between border-b border-b-gray-400 dark:border-b-neutral-700'>
              <a
                href="#"
                className="block py-2 text-sm  data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Sign In
              </a>
              <ArrowLeftEndOnRectangleIcon className='size-4' />
            </div>
          </MenuItem>
          <MenuItem>
            <div className='flex px-4 items-center justify-between'>
              <button
                // type=""
                className="block w-full py-2 text-left text-sm data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Sign Up
              </button>
              <UserPlusIcon className='size-5' />
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

export default Dropdown;