import {
  ShoppingCartIcon,
  LocationMarkerIcon,
  SearchIcon,
  ChevronDownIcon,
  MenuIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

const btmheadertxt = [
  `Today's Deals`,
  'Customer Service',
  'Gift Cards',
  'Registry',
  'Sell',
];
const mblheadertxt = [
  'Best Sellers',
  'Video',
  'Home',
  'New Releases',
  'Books',
  'Pharmacy',
  'Livestreams',
  'Deals',
  'Health & Household',
  'PC',
  'GiftCards',
  'Music',
  'Amazon Basics',
  'List',
];

const Header = () => {
  return (
    <header className=' text-white bg-amazon_blue'>
      <div className='flex items-center p-1 h-14 space-x-2 justify-between'>
        {/* top */}
        <div className='flex items-center'>
          {/* left */}
          <Link href='/'>
            <div className='pt-3 hover:link flex items-center'>
              {/* image */}
              <Image
                src='https://links.papareact.com/f90'
                objectFit='contain'
                height={35}
                width={130}
                className='-mb-1'
              />
            </div>
          </Link>
          <div className='hidden md:flex items-center hover:link'>
            <LocationMarkerIcon className='h-5' />
            <div className='flex flex-col pl-1'>
              <span className='text-xs text-gray-300'>Deliver to</span>
              <span className='text-sm font-medium'>Philippines</span>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-grow items-center bg-yellow-400 rounded-sm'>
          {/* center */}
          <input
            type='text'
            className=' rounded-l-sm flex-grow p-1 focus:outline-none text-black'
          />
          <SearchIcon className='h-7 text-black p-1' />
        </div>
        <div className='flex items-center'>
          {/* right */}
          <div className='hidden md:grid p-1 hover:link'>
            <span className='text-xs text-gray-300'>Hello, sign in</span>
            <div className='flex items-center'>
              <span className='text-sm font-medium mr-1'>Account</span>
              <ChevronDownIcon className='h-3' />
            </div>
          </div>

          <div className='hidden md:grid p-1 hover:link'>
            <span className='text-xs text-gray-300'>Returns</span>
            <div className='flex items-center'>
              <span className='text-sm font-medium'>& Orders</span>
            </div>
          </div>

          <span className='text-sm p-2 hover:text-yellow-400 md:hidden  cursor-pointer'>
            Sign In
          </span>

          <div className='relative flex items-center h-[40px] w-[40px]'>
            <ShoppingCartIcon className=' h-[35px] w-[35px]' />
            <span className=' text-yellow-400 font-bold text-xs text-center h-4 w-[20px] bg-amazon_blue absolute -top-0 left-[9px] rounded-lg'>
              69
            </span>
          </div>
        </div>
      </div>
      <div className='md:hidden flex flex-grow mx-2 items-center bg-yellow-400 rounded-sm'>
        {/* mobile input */}
        <input
          type='text'
          className=' rounded-l-sm flex-grow p-1 focus:outline-none text-black'
        />
        <SearchIcon className='h-7 text-black p-1' />
      </div>

      <div className='md:hidden flex items-center space-x-4 overflow-x-scroll text-sm p-2 mx-2 no-scrollbar '>
        {mblheadertxt.map((text, index) => (
          <span key={index} className='min-w-max cursor-pointer'>
            {text}
          </span>
        ))}
      </div>

      <div className='flex items-center p-1 bg-amazon_blue-light text-sm'>
        {/* bottom */}
        <div className='hidden md:flex items-center space-x-4'>
          <div className='flex items-center cursor-pointer'>
            <MenuIcon className='h-6' />
            <span className='ml-1 font-medium'>All</span>
          </div>
          {btmheadertxt.map((text, index) => (
            <span key={index} className='cursor-pointer'>
              {text}
            </span>
          ))}
        </div>
        {/* Mobile Delivery opts */}
        <div className='md:hidden flex items-center space-x-1 p-1 cursor-pointer'>
          <LocationMarkerIcon className='h-5' />
          <span className='text-xs'>Deliver to</span>
          <span className='text-xs'>Philippines</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
