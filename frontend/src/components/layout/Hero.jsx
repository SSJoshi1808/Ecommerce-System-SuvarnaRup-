import React from "react";
import video1 from "../../assets/homePage.mp4";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center pb-6 sm:pb-10 pt-20 sm:pt-32 md:pt-40 text-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={video1}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="relative bg-black bg-opacity-50 w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            Elegance in
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light">
              Every Detail
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-300 mt-3 sm:mt-4 max-w-2xl mx-auto">
            Bold, Beautiful, and Unforgettable.
          </p>
          <Link
            to="collections/:collection"
            className="mt-4 sm:mt-6 inline-block bg-white text-gray-900 px-6 sm:px-8 py-2 sm:py-3 rounded-md text-sm sm:text-base md:text-lg uppercase tracking-wider hover:bg-gray-200 shadow-lg transition duration-300 ease-in-out"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
