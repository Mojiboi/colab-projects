"use client";

import { useState, useEffect } from 'react';
import { MdOutlineArrowOutward } from "react-icons/md";
import { gsap } from "gsap";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['HOME', 'PRODUCTS', 'ABOUT US', 'FEEDBACK', 'CONTACT'];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial state for navbar items
    gsap.set("nav img, nav .items, .h1_first, .by, .h1_second, .home_button", { opacity: 0, y: -30 });

    tl.to("nav img, nav .items, .h1_first, .by, .h1_second, .home_button", {
      y: 0,
      duration: 1,
      delay: 1,
      opacity: 1,
      stagger: 0.15,
    });
  }, []);


  return (
    <>
      {/* Disable overflow to avoid scrollbars */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
        }
      `}</style>

      <section id='home'>
        <nav className="bg-black p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center ">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/assets/4.png" className="h-16 w-16 mr-2" alt="Logo" />
                <a href='#' className=''>
                  <h1 className="text-white text-2xl font-playfair items">PUMICETERS</h1>
                </a>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:block">
                <div className=" flex gap-4 space-x-4 font-zenmaru">
                  {navLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                      className="items text-white px-3 py-2 rounded-full text-sm font-bold hover:text-black hover:bg-white transition-colors duration-500 "
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white p-2 rounded-md">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className={`fixed top-0 right-0 h-full w-64 bg-black transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out z-50 duration-500`}>
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mt-10">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '')}`} className="block font-bold text-white px-3 py-2 rounded-full hover:bg-white hover:text-black duration-500">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </section>

      <section
        id="home"
        className="relative flex items-center justify-center overflow-hidden h-[calc(100vh-150px)]"
        style={{
          backgroundImage: `url('/assets/landingpage-2.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        <div className="relative z-10 text-center text-white">
          <div className="flex flex-col items-center">
            <div className="rounded-lg p-4 mb-10">
              <h1 className=" h1_first whitespace-nowrap text-[40px] lg:text-[100px] font-bold text-white font-playfair" style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)' }}>
                Pumice Products
              </h1>
              <div className="flex items-center">
                <span className="by whitespace-nowrap text-[40px] lg:text-[100px] italic text-white font-opensans" style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)' }}>
                  by
                </span>
                <h1 className="h1_second whitespace-nowrap text-[40px] lg:text-[100px] font-bold ml-5 text-black font-playfair" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                  PUMICETERS
                </h1>
              </div>
            </div>

            {/* Button Section */}
            <button className="home_button bg-white p-4 lg:px-6 lg:py-4 hover:border-white hover:text-white border hover:bg-transparent text-black font-bold text-lg rounded-full flex items-center justify-center transition-colors duration-500" style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
              Get In Touch
              <MdOutlineArrowOutward className="ml-2" size={24} />
            </button>
          </div>
        </div>

        {/* The responsive wave */}
        <div className="wave wave1"></div>
      </section>

      <section id="Products" className="pt-96">
        asdasdasdasdasdasd
        <div>asdjhgajshdgjhsg8</div>
      </section>
      <section id="About Us"></section>
      <section id="Feedback"></section>
      <section id="Contact"></section>
    </>
  );
}
