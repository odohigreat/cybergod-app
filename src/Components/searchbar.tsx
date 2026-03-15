import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

function SearchBar() {

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className='hidden lg:flex items-center text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-black border-2 border-gray-400 dark:border-neutral-800 shadow-sm hover:shadow-md hover:brightness-95 focus:shadow-md'>
        <MagnifyingGlassIcon className='size-5 mx-2' />
        <input
          type='text'
          placeholder='Search...'
          className='rounded-xl text-sm p-2 bg-neutral-100 dark:bg-black focus:outline-none'
        />
      </div>

      {/* mobile screen search bar */}
      <div className="flex items-center">
        <button
          onClick={toggleModal}
          className='py-2 flex lg:hidden text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-black border-darkmode'>
          <MagnifyingGlassIcon className='size-5 mx-2' />
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-start pt-28 justify-center bg-black/60 backdrop-blur-md">
            <div className="bg-white dark:bg-black p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl max-w-md w-full mx-5">
              <div className='flex items-baseline justify-between'>
                <h2 className="text-xl font-bold mb-4 text-black dark:text-neutral-200">Search devices..</h2>
                <button
                  onClick={toggleModal}
                  className='btn p-2'>
                  <XMarkIcon className='size-4 text-black dark:text-white' />
                </button>
              </div>
              {/* Search Input */}
              <div className='flex items-center text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-[#0a0a0a] border-2 border-gray-400 dark:border-neutral-800 shadow-sm hover:shadow-md hover:brightness-95 focus:shadow-md'>
                <MagnifyingGlassIcon className='size-5 mx-2' />
                <input
                  type='text'
                  placeholder='Search...'
                  className='rounded-xl text-sm p-2 bg-neutral-100 dark:bg-[#0a0a0a] focus:outline-none'
                />
              </div>
              {/* Close button */}
              {/* <button
                onClick={toggleModal}
                className="btn mt-2"
              >
                Close
              </button> */}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchBar;