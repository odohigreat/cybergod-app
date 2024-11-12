import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function SearchBar() {
  return (
    <>
      <div className='hidden lg:flex items-center text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-neutral-900 border-2 border-gray-400 dark:border-neutral-700 shadow-sm hover:shadow-md hover:brightness-95 focus:shadow-md'>
        <MagnifyingGlassIcon className='size-5 mx-2' />
        <input
          type='text'
          placeholder='Search...'
          className='rounded-xl text-sm p-2 bg-neutral-100 dark:bg-neutral-900 focus:outline-none'
        />
      </div>
      <div className='py-2 text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-neutral-900 bdr'>
        <MagnifyingGlassIcon className='size-5 mx-2' />
      </div>
    </>
  )
}

export default SearchBar;