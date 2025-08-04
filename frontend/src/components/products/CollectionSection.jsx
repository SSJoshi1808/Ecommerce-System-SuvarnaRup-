import React from 'react'
import firstpic from "../../assets/8.jpg"
import secondpic from "../../assets/9.jpg"
import { Link } from 'react-router-dom'


const CollectionSection = () => {
  return (
    <section className='py-8 sm:py-12 lg:py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8'>
        {/* Womens  */}
        <div className="relative flex-1"> 
            <img src= { firstpic } 
            className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover' />
            <div className='absolute bottom-4 sm:bottom-6 lg:bottom-8 left-2 sm:left-4 bg-white bg-opacity-90 p-3 sm:p-4'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3'>
                     SilvaElegance Collection
                </h2>
                <Link to="collections/:collection"
                className='text-sm sm:text-base text-gray-900 underline hover:text-gray-700 transition-colors'
                >Shop Now </Link>
            </div>
        </div>
        {/* Golden Collection */}
        <div className="relative flex-1"> 
            <img src= { secondpic } 
            className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover' />
            <div className='absolute bottom-4 sm:bottom-6 lg:bottom-8 left-2 sm:left-4 bg-white bg-opacity-90 p-3 sm:p-4'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3'>
                SuvarnaLite Collection
                </h2>
                <Link to="collections/:collection"
                className='text-sm sm:text-base text-gray-900 underline hover:text-gray-700 transition-colors'
                >Shop Now </Link>
            </div>
        </div>


        </div>
    </section>
  )
}

export default CollectionSection