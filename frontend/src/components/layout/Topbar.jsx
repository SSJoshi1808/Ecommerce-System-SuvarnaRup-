import React from 'react'
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
const Topbar = () => {
  return (
     <div className="bg-[#EC7FA9] text-white p-2 sm:p-4">
      <div className="container mx-auto flex justify-between items-center py-2 sm:py-3 px-4">
        <div className='hidden sm:flex item-center space-x-4'>
          <a href="#" className="hover:text-grey-300 transition-colors">
            <TbBrandMeta className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <a href="#" className="hover:text-grey-300 transition-colors">
            <IoLogoInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <a href="#" className="hover:text-grey-300 transition-colors">
            <RiTwitterXLine className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>

        <div className='text-xs sm:text-sm hidden sm:block'>
            <a href="tel:+9657236189 " className='hover:text-grey-300 transition-colors'>
                {/* 9657236189 */}
            </a>
        </div>
      </div>
    </div>
  )
}

export default Topbar