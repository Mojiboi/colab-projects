'use client';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { MdOutlineArrowOutward } from "react-icons/md";
import { gsap, TweenMax, ScrollSmoother } from "gsap";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { BsMouse } from "react-icons/bs";
import ScrollTrigger from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['HOME', 'PRODUCTS', 'ABOUT US', 'FEEDBACK', 'CONTACT'];
  const LandingSection = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const section = LandingSection.current;
    gsap.fromTo(
      section,
      { backgroundPosition: '0 100px' }, // Start at y = 100px
      {
        backgroundPosition: '0 0', // End at the original position (y = 0)
        duration: 3,
        ease: 'power1.inOut', // Smooth easing
      }
    );
  }, []);

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

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const mouseSectionRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (mouseSectionRef.current) {
        const scrollPosition = window.scrollY; // Get current scroll position
        // Adjust the position of the mouse section based on scroll position
        mouseSectionRef.current.style.transform = `translateY(${scrollPosition / 6}px)`;
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    revealRefs.current.forEach((el) => {
      // Use TweenMax for animation
      TweenMax.fromTo(
        el,
        { opacity: 0, y: 50 }, // Initial state
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.easeout',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%', // Start the animation when the top of the element hits 85% of the viewport
            markers: false, // Set to true for debugging, remove in production
            toggleActions: 'play none none reverse', // Play when in view, reverse when out of view
          },
        }
      );
    });
  }, []);

  const [feedbacks, setFeedbacks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const message = e.target.message.value;

    setFeedbacks([...feedbacks, { name, message }]);
    e.target.reset();  // Reset form
  };

  return (
    <>
      {/* Disable overflow to avoid scrollbars */}
      <style jsx global>{`
    html, body {
      overflow-x: hidden;
    }`}
      </style>

      <div>

        {/* nav */}
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
                  <button
                    onClick={toggleMenu}
                    className="text-white p-2 sm:p-3 md:p-4 rounded-md transition-all"
                  >
                    <svg
                      className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
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


        {/* Landing page */}
        <section
          ref={LandingSection}
          id="home"
          className="landing_img relative flex items-center justify-center overflow-hidden h-[calc(100vh-150px)]"
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
              <div className="rounded-lg p-4">
                <h1
                  className="h1_first whitespace-nowrap text-[32px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[100px] font-bold text-white font-playfair"
                  style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)' }}
                >
                  Pumice Products
                </h1>
                <div className="flex items-center lg:mt-[-55px]">
                  <span
                    className="by font-light  whitespace-nowrap text-[32px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[100px] italic text-white font-opensans"
                    style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)' }}
                  >
                    by
                  </span>
                  <h1
                    className="h1_second whitespace-nowrap text-[32px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[100px] font-bold ml-5 text-black font-playfair"
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                  >
                    PUMICETERS
                  </h1>
                </div>
              </div>

              {/* Button Section */}
              <button
                className="home_button bg-white p-3 lg:px-6 lg:py-4 md:p-4 sm:p-2 hover:border-white hover:text-white border hover:bg-transparent text-black font-bold text-base lg:text-lg sm:text-sm rounded-full flex items-center justify-center transition-colors duration-500"
                style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
              >
                Get In Touch
                <MdOutlineArrowOutward className="ml-2 lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4" />
              </button>

            </div>
          </div>
          {/* The responsive wave */}
          <div className="wave wave1"></div>
        </section>


        {/* Product Page */}
        <section
          id="Product">
          <div className='px-6 sm:px-10  mx-auto pt-14 lg:mt-20'>

            <div className="mx-auto pt-14">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                {/* Left Text Section */}
                <div className="text-left lg:w-1/2 w-full lg:pr-10">
                  <span ref={addToRefs} className="font-opensans block font-light lg:mb-6 plans_span">
                    WE HAVE THE
                  </span>

                  {/* PRODUCTS on its own line */}
                  <h2 ref={addToRefs} className="plans_h2 text-[45px] sm:text-[40px] md:text-[50px] lg:text-[80px] font-bold font-playfair leading-none"
                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                  >
                    PRODUCTS
                  </h2>

                  {/* {you}{WANT} on the same line with little space */}
                  <div className="flex items-center">
                    <span ref={addToRefs} className="plans_span2 text-[45px] sm:text-[40px] md:text-[50px] lg:text-[80px] font-zenmaru leading-none italic font-light">you</span>
                    <h2 ref={addToRefs} className="plans_h2_second text-[45px] sm:text-[40px] md:text-[50px] lg:text-[80px] font-bold font-playfair leading-none ml-2"
                      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >
                      WANT
                    </h2>
                  </div>

                  {/* Horizontal line aligned with the top of the paragraph */}
                  <div className="lg:mt-10">
                    <div className="flex items-start">
                      <div ref={addToRefs} className="plans-line bg-black h-[1.2px] w-[82px] sm:w-[104px] md:w-[124px] lg:w-[166px] hidden md:block mt-4"></div>
                      <p ref={addToRefs} className="plans_para pl-4 text-justify lg:text-left max-w-[50ch] font-opensans font-light text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] lg:m-0 m-4">
                        Pumice powder is a natural, eco-friendly exfoliant that gently removes dead skin cells, leaving your skin smooth and rejuvenated. Its fine, porous texture also makes it ideal for polishing surfaces, providing a non-toxic, effective solution for deep cleaning.
                      </p>
                    </div>

                    {/* Button aligned below paragraph */}
                    <div className="flex justify-end mt-4 lg:mt-6">
                      <button ref={addToRefs} className="-ml-10 border-b-2 border-black text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold flex items-center"
                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                      >
                        About us
                        <MdOutlineArrowOutward className="lg:w-8 lg:h-8 md:w-5 md:h-5 sm:w-4 sm:h-4" />
                      </button>

                    </div>
                  </div>

                </div>

                {/* Right Section with Centered Mouse Icon and Spinning SVG (Hidden on Small Screens) */}
                <div ref={mouseSectionRef} className="-mt-80 mx-36 hidden lg:flex items-center justify-center relative lg:w-1/2 h-full">
                  {/* Centered Mouse Icon */}
                  <BsMouse className="mouse-icon text-5xl absolute z-10" />

                  {/* Spinning SVG */}
                  <img

                    src="/assets/Scroll-Down.svg"
                    className="scroll-svg h-34 w-34 animate-spin"
                    style={{ animationDuration: '7.5s' }}
                    alt="Scroll Down"
                  />
                </div>

              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-6 px-6 lg:px-40">

              {/* First Item */}
              <div ref={addToRefs} className="relative w-full max-w-[450px] sm:-mb-10">
                {/* NEW Label */}
                <div className="absolute top-4 right-4 bg-transparent border border-white text-white px-2 py-2 text-xs font-bold z-10">
                  NEW
                </div>
                {/* Main Div */}
                <div className="bg-black shadow-md w-full h-[400px] lg:h-[700px] overflow-hidden hover:scale-95 transform transition duration-500 ease-in-out flex items-center justify-center"
                  style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
                >
                  <img src="/assets/pumices-stone.png" alt="Product 1" className="w-full h-full lg:w-96 lg:h-[600px] object-cover" />
                </div>
                {/* Heading outside the black div */}
                <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                  Pumice Stone
                </h3>
              </div>

              {/* Second Item */}
              <div ref={addToRefs} className="relative w-full max-w-[450px] lg:-mt-[500px] sm:-mb-10">
                {/* NEW Label */}
                <div className="absolute top-3 right-4 bg-transparent border border-white text-white px-2 py-2 text-xs font-bold z-10">
                  NEW
                </div>
                {/* Main Div */}
                <div className="bg-black shadow-md w-full h-[300px] lg:h-[400px] overflow-hidden hover:scale-95 transform transition duration-500 ease-in-out flex items-center justify-center"
                  style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
                >
                  <img src="/assets/powder.png" alt="Product 1" className="sm:w-64 sm:h-[280px] md:w-80 md:h-[340px] lg:w-96 lg:h-[420px] object-cover" />
                </div>
                {/* Heading */}
                <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                  Pumice Powder
                </h3>
              </div>

              {/* Third Item */}
              <div ref={addToRefs} className="relative w-full max-w-[450px] lg:mt-20 sm:-mb-10 ">
                {/* HOT Label */}
                <div className="absolute top-3 right-4 bg-transparent border border-white text-white px-2 py-2 text-xs font-bold z-10">
                  HOT
                </div>
                {/* Main Div */}
                <div className="bg-black shadow-md w-full h-[300px] lg:h-[400px] overflow-hidden hover:scale-95 transform transition duration-500 ease-in-out flex items-center justify-center"
                  style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
                >
                  <img src="/assets/200-mesh.png" alt="Product 1" className="sm:w-60 sm:h-[200px] lg:w-96 lg:h-[320px] md:w-80 md:h-[240px] object-cover" />
                </div>
                {/* Heading */}
                <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                  Pumice 200 Mesh
                </h3>
              </div>

              {/* Fourth Item */}
              <div ref={addToRefs} className="relative w-full max-w-[450px] lg:-mt-96">
                {/* HOT Label */}
                <div className="absolute top-4 right-4 bg-transparent border border-white text-white px-2 py-2 text-xs font-bold z-10">
                  HOT
                </div>
                {/* Main Div */}
                <div className="bg-black shadow-md w-full h-[400px] lg:h-[700px] overflow-hidden hover:scale-95 transform transition duration-500 ease-in-out flex items-center justify-center"
                  style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
                >
                  <img src="/assets/pumice-150-mesh-powder.png" alt="Product 1" className="sm:w-60 sm:h-[270px] lg:w-96 lg:h-[400px] md:w-80 md:h-[320px] object-cover" />
                </div>
                {/* Heading */}
                <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >
                  Pumice 300 Mesh
                </h3>
              </div>

            </div>
          </div>

        </section>


        {/* About Us with Feedback */}
        <section id="About Us" className="mt-20 lg:mt-40 py-12 bg-white bg"
          style={{
            backgroundImage: `url('/assets/about-us-image.png')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="mx-auto px-6 z-10">
            <span ref={addToRefs} className='font-opensans font-light text-white text-left'>YOU CAN KNOW</span>
            <h2 ref={addToRefs} className="mb-10 text-[50px] md:text-[50px] lg:text-[80px] text-white font-bold font-playfair"
              style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.2)' }}
            >
              About Us
            </h2>
            <p ref={addToRefs} className="mb-32 text-black font-zenmaru font-light text-[20px] bg-white p-4">
              At Pumiceter, sourcing the finest pumice is our passion. We meticulously select premium pumice from the prestigious volcanic regions of the Chenab border and Balochistan, Pakistan. Our commitment to purity and performance means you can trust our products to deliver exceptional quality. Choose Pumiceter—where excellence meets reliability.
            </p>

            <div className="flex flex-wrap justify-center gap-x-32">

              <div className="flex flex-wrap justify-center gap-x-32">
                <div ref={addToRefs} className="shadow-md p-8 mb-5 bg-black max-w-xs transition-all duration-300 hover:bg-gray-950 relative w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"
                  style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
                >
                  <h3 ref={addToRefs} className="text-[30px] font-bold text-white mb-2 font-playfair">Sourcing Strategy</h3>
                  <ul className="text-gray-300 font-zenmaru">
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Meticulous Sourcing:</strong> We partner with top-tier suppliers for premium pumice.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Sustainable Practices:</strong> Our eco-friendly mines ensure quality and protect the environment.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Rigorous Refinement:</strong> Each batch meets the highest industry standards through strict quality checks.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Unparalleled Consistency:</strong> Our pumice powder guarantees consistent performance for critical applications.
                    </li>
                    <li ref={addToRefs}>
                      <strong className='font-opensans text-[14px]'>Durable Performance:</strong> Our pumice stones are designed for longevity in industrial uses.
                    </li>
                  </ul>
                  <div ref={addToRefs} className="absolute bottom-0 left-0 right-0 h-40 border-b-[8px] rounded-full"></div>
                </div>

                <div ref={addToRefs} className="shadow-md p-8 mb-5 bg-black max-w-xs transition-all duration-300 hover:bg-gray-950 relative w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"
                  style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
                >
                  <h3 ref={addToRefs} className="text-[30px] font-bold text-white mb-2 font-playfair">Our Commitment</h3>
                  <ul className="text-gray-300 font-zenmaru">
                    <li ref={addToRefs} className="mb-2 ">
                      <strong className='font-opensans text-[14px]'>Quality from the Source:</strong> We guarantee top quality from sourcing to delivery.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Top-Quality Raw Materials:</strong> Only the best raw materials are selected for our products.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Precision Processing:</strong> Meticulous processing preserves pumice quality throughout production.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Uncompromised Quality:</strong> We provide only the highest-grade pumice for our clients.
                    </li>
                    <li ref={addToRefs}>
                      <strong className='font-opensans text-[14px]'>Reliable Supply Chain:</strong> Our sourcing ensures consistent performance and reliability.
                    </li>
                  </ul>
                  <div ref={addToRefs} className="absolute bottom-0 left-0 right-0 h-40 border-b-[8px] rounded-full"></div>
                </div>

                <div ref={addToRefs} className="shadow-md p-6 mb-5 bg-black max-w-xs transition-all duration-300 hover:bg-gray-950 relative w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"
                  style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
                >
                  <h3 ref={addToRefs} className="text-[30px] font-bold text-white mb-2 font-playfair">Who We Serve</h3>
                  <ul className="text-gray-300 font-zenmaru">
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Industry Trust:</strong> Trusted partner for chemical and textile manufacturers, reflecting our quality reputation.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>High-Performance Products:</strong> We deliver exceptional pumice products tailored to client needs.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Versatile Applications:</strong> Our pumice serves various needs, from chemical processes to denim washing.
                    </li>
                    <li ref={addToRefs} className="mb-2">
                      <strong className='font-opensans text-[14px]'>Commitment to Purity:</strong> We uphold the highest purity standards for optimal performance.
                    </li>
                    <li ref={addToRefs}>
                      <strong className='font-opensans text-[14px]'>Solutions-Oriented Approach:</strong> Beyond products, we provide solutions that empower client success.
                    </li>
                  </ul>
                  <div ref={addToRefs} className="absolute bottom-0 left-0 right-0 h-40 border-b-[8px] rounded-full"></div>
                </div>
              </div>

            </div>
          </div>

          {/* <FeedbackForm /> */}
          <section id="Client Feedback" className='mt-20'>
            <div className=" mx-auto px-6">
              <span ref={addToRefs} className='font-opensans font-light text-white text-left text-[14px] lg:text-[20px]'>WE DO NEED YOUR</span>
              <h2 ref={addToRefs} className="mb-10 text-[30px] md:text-[50px] lg:text-[80px] text-white font-bold font-playfair"
                style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.2)' }}
              >
                FEEDBACK
              </h2>
              <div className="flex items-center -mt-14 lg:mt-[-80px]">
                <span
                  className="font-light whitespace-nowrap text-[30px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[100px] italic text-white font-opensans"
                  style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.2)' }}
                  ref={addToRefs}
                >
                  for
                </span>
                <h1
                  className="whitespace-nowrap text-[30px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[80px] font-bold ml-3 lg:ml-5 text-white font-playfair"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                  ref={addToRefs}
                >
                  IMPROVEMENT
                </h1>
              </div>

              {/* Feedback Form */}
              <div ref={addToRefs} className="bg-white p-6 shadow-md mt-24 lg:mb-32">
                <h3 ref={addToRefs} className="lg:text-[80px] text-[26px] sm:text-[40px] md:text-[48px] font-playfair font-bold mb-4 text-black"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                >Leave your feedback
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label ref={addToRefs} htmlFor="name" className="block text-lg font-medium text-black mb-3 font-opensans"
                      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >Name
                    </label>
                    <input ref={addToRefs} type="text" id="name" name="name" className="mt-1 block bg-black w-full px-4 py-2 border border-black text-white rounded-md shadow-sm sm:text-sm"
                      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                      required />
                  </div>
                  <div>
                    <label ref={addToRefs} htmlFor="message" className="block text-lg font-medium text-black font-opensans mb-3"
                      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
                    >Feedback
                    </label>
                    <textarea ref={addToRefs} id="message" name="message" rows="4" className="mt-1 block bg-black w-full px-4 py-2 border border-black text-white rounded-md mb-10 shadow-sm sm:text-sm" required></textarea>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <button type="submit" className="bg-black text-white px-10 py-4 lg:px-32 lg:py-4 rounded-full font-zenmaru font-bold duration-500 border border-black hover:border-black hover:bg-transparent hover:text-black">Submit</button>
                  </div>
                </form>
              </div>



              {/* Display Feedback */}
              <div className="space-y-6">
                {feedbacks.map((feedback, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold">{feedback.name}</h4>
                    <p className="text-gray-600">{feedback.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </section>


        {/* Contact Us */}
        <section id="Contact-Us" className="relative">
          <div className="-mt-11 lg:-mt-[55px] wave wave1 absolute top-0 left-0 right-0 bg-black"></div> {/* Positioned at the top of the section */}

          <div className=" bg-black px-6 md:px-32 py-16 text-center">
            <div className="mb-12">
              <h1
                className="lg:text-left text-center whitespace-nowrap text-[40px] sm:text-[45px] md:text-[50px] lg:text-[80px] font-bold text-white font-playfair"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
              >
                CONTACT US
              </h1>
            </div>

            <div className="mt-20 text-white flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-24 lg:space-x-40">
              <div className="text-center md:text-left">
                <h2 className="font-opensans text-[30px] font-bold mb-4">Address</h2>
                <p className="font-zenmaru text-[16px]">Faisalabad City, Faisalabad</p>
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-opensans text-[30px] font-bold mb-4">Contact</h2>
                <p className="font-zenmaru text-[16px]">pumiceter@gmail.com</p>
                <p className="font-zenmaru text-[16px]">+92 310-1742404</p>
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-opensans text-[30px] font-bold mb-4">Social</h2>
                <div className="flex space-x-4 justify-center md:justify-start">
                  <a
                    href="https://www.facebook.com/profile.php?id=61550325253910&mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 transform hover:scale-110"
                  >
                    <FaFacebookF className="text-[24px] hover:text-gray-400" />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition duration-300 transform hover:scale-110"
                  >
                    <FaInstagram className="text-[24px] hover:text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-700 pt-6">
              <p className="font-zenmaru text-[14px] text-gray-400">
                © 2024 Pumiceter. All rights reserved.
              </p>
            </div>
          </div>
        </section>


      </div>
    </>
  )
}