import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';

function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredDevices, setFilteredDevices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) setQuery('');
  };

  useEffect(() => {
    if (query.trim() !== '') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setFilteredDevices([]);
      return;
    }

    const fetchResults = async () => {
      const { data, error } = await supabase
        .from('phones')
        .select('*')
        .or(`brand.ilike.%${query}%,model.ilike.%${query}%`)
        .limit(10);

      if (!error && data) {
        setFilteredDevices(data.map(p => ({
          id: p.slug,
          name: p.model,
          brand: p.brand,
          imageSrc: p.image_url || 'https://via.placeholder.com/150'
        })));
      }
      setIsLoading(false);
    };

    // Add a 300ms debounce to avoid spamming the database
    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const SearchResults = () => {
    if (query.trim() === '') return null;
    return (
      <div className="absolute top-12 left-0 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden z-[110] max-h-72 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <svg className='size-8' fill="#3670FBFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" /><path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></path></svg>
          </div>
        ) : filteredDevices.length > 0 ? (
          <ul className="flex flex-col py-2">
            {filteredDevices.map((device) => (
              <li key={device.id}>
                <Link
                  to={`/specs?device=${device.id}`}
                  onClick={() => {
                    setIsModalOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <img src={device.imageSrc} alt={device.name} className="h-10 w-10 object-contain rounded-sm bg-neutral-50 dark:bg-black" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{device.name}</span>
                    <span className="text-xs text-neutral-500">{device.brand}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-6 text-center text-sm text-neutral-500">
            No devices found for "{query}"
          </div>
        )}
      </div>
    );
  };


  return (
    <>
      <div className='relative hidden lg:flex items-center text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-black border-2 border-gray-400 dark:border-neutral-800 shadow-sm focus-within:shadow-md focus-within:border-blue-500 transition-all'>
        <MagnifyingGlassIcon className='size-5 mx-2 text-neutral-500' />
        <input
          type='text'
          placeholder='Search devices...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='rounded-xl text-sm p-2 bg-transparent focus:outline-none w-48'
        />
        <SearchResults />
      </div>

      {/* mobile screen search bar */}
      <div className="flex items-center">
        <button
          onClick={toggleModal}
          className='py-2 flex lg:hidden text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-black border-darkmode'>
          <MagnifyingGlassIcon className='size-5 mx-2' />
        </button>

        {/* Modal */}
        {isModalOpen && createPortal(
          <div className="fixed inset-0 z-[100] flex items-start pt-28 justify-center bg-black/60 backdrop-blur-md">
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
              <div className='relative flex items-center text-black dark:text-white rounded-xl bg-neutral-100 dark:bg-[#0a0a0a] border-2 border-gray-400 dark:border-neutral-800 shadow-sm focus-within:shadow-md focus-within:border-blue-500 transition-all'>
                <MagnifyingGlassIcon className='size-5 mx-2 text-neutral-500' />
                <input
                  type='text'
                  placeholder='Search devices...'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className='rounded-xl text-sm p-2 bg-transparent focus:outline-none w-full'
                />
                <SearchResults />
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </>
  )
}

export default SearchBar;