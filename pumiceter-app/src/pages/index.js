import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { MdOutlineArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import FeedbackForm from "@/components/Feedback"
import { BsMouse } from "react-icons/bs";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
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

  const [scrollDirection, setScrollDirection] = useState("down");



  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(scrollTop > lastScrollTop ? "down" : "up");
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  // Function to add elements to the refs array
  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // Use useLayoutEffect to trigger GSAP animations
  useLayoutEffect(() => {
    revealRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -100 }, // Initial state
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'sine.easeOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%', // Adjust as needed
            markers: false, // For debugging, remove in production
          },
        }
      );
    });
  }, []);
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

      <section
        ref={LandingSection}
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
            <div className="rounded-lg p-4">
              <h1
                className="h1_first whitespace-nowrap text-[32px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[100px] font-bold text-white font-playfair"
                style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)' }}
              >
                Pumice Products
              </h1>
              <div className="flex items-center lg:mt-[-55px]">
                <span
                  className="by whitespace-nowrap text-[32px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[100px] italic text-white font-opensans"
                  style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)' }}
                >
                  by
                </span>
                <h1
                  className="h1_second whitespace-nowrap text-[32px] sm:text-[40px] md:text-[48px] lg:text-[80px] xl:text-[100px] font-bold ml-5 text-black font-playfair"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
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
                <h2 ref={addToRefs} className="plans_h2 text-[45px] sm:text-[40px] md:text-[50px] lg:text-[80px] font-bold font-playfair leading-none">
                  PRODUCTS
                </h2>

                {/* {you}{WANT} on the same line with little space */}
                <div className="flex items-center">
                  <span ref={addToRefs} className="plans_span2 text-[45px] sm:text-[40px] md:text-[50px] lg:text-[80px] font-zenmaru leading-none">you</span>
                  <h2 ref={addToRefs} className="plans_h2_second text-[45px] sm:text-[40px] md:text-[50px] lg:text-[80px] font-bold font-playfair leading-none ml-2">
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
                    <button className="-ml-10 border-b-2 border-black text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold flex items-center">
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
            <div className="relative w-full max-w-[450px]">
              {/* NEW Label */}
              <div className="absolute top-4 right-4 bg-transparent border border-white text-white px-2 py-2 text-xs font-bold z-10">
                NEW
              </div>
              {/* Main Div */}
              <div className="bg-black shadow-md w-full h-[400px] lg:h-[600px] overflow-hidden hover:scale-95 transform transition duration-500 ease-in-out flex items-center justify-center"
                style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
              >
                <img src="/assets/pumices-stone.png" alt="Product 1" className="w-full h-full lg:w-96 lg:h-[600px] object-cover" />
              </div>
              {/* Heading outside the black div */}
              <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left">
                Pumice stone
              </h3>
            </div>

            {/* Second Item */}
            <div className="relative w-full max-w-[450px] lg:-mt-[520px]">
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
              <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left">
                Pumice Powder
              </h3>
            </div>

            {/* Third Item */}
            <div className="relative w-full max-w-[450px] mt-20">
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
              <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left">
                Pumice stone
              </h3>
            </div>

            {/* Fourth Item */}
            <div className="relative w-full max-w-[450px] mt-20 lg:-mt-96">
              {/* HOT Label */}
              <div className="absolute top-4 right-4 bg-transparent border border-white text-white px-2 py-2 text-xs font-bold z-10">
                HOT
              </div>
              {/* Main Div */}
              <div className="bg-black shadow-md w-full h-[400px] lg:h-[600px] overflow-hidden hover:scale-95 transform transition duration-500 ease-in-out flex items-center justify-center"
                style={{ cursor: "url('/assets/arrow.svg'), auto", color: "white" }}
              >
                <img src="/assets/pumice-150-mesh-powder.png" alt="Product 1" className="sm:w-60 sm:h-[270px] lg:w-96 lg:h-[400px] md:w-80 md:h-[320px] object-cover" />
              </div>
              {/* Heading */}
              <h3 className="text-black text-[24px] sm:text-[30px] lg:text-[35px] font-bold font-playfair mt-2 text-left">
                Pumice stone
              </h3>
            </div>
          
          </div>
        </div>

      </section>

      <section id="About Us" className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600">At Pumiceter, we understand that sourcing the best pumice is not just a process—it's an art. Our success begins at the very origin, where we carefully select only the finest raw pumice from renowned volcanic regions as Chenab border and areas from Balochistan Pakistan. Our rigorous sourcing strategy ensures that every product we deliver meets the highest standards of purity and performance, empowering our clients with materials they can rely on.
          </p>
          <article className="rounded-lg shadow-md p-4 mb-5 bg-black">
            <h3 className="text-lg font-medium text-white mb-2">Sourcing strategy</h3>
            <p className="text-gray-300 ">
              Our sourcing process is the backbone of our brand. With meticulous attention to detail, we identify and collaborate with top-tier suppliers to secure the finest grade of pumice. We partner with environmentally responsible mines that prioritize sustainable extraction methods, ensuring both the quality of our product..
              Once sourced, the raw pumice undergoes a rigorous refinement process, where it is carefully processed, graded, and tested to meet the strict demands of chemical applications and textile processing. This dedication to precision guarantees that our pumice powder offers unparalleled consistency, ideal for industries such as paints, coatings, filtration, and abrasives, while our pumice stones bring durable performance for stone-washing in textile mills.
              Our Commitment to You
            </p>
          </article>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-6">
            <article className="rounded-lg shadow-md p-4 mb-5 bg-black">
              <h3 className="text-lg font-medium text-white mb-2">Our Commitment to You</h3>
              <ul>
                <li className="text-white font-bold text-left">Quality from the Source</li>
                <p className="text-gray-300 ">Our entire process, from sourcing to final product delivery, is rooted in a commitment to excellence.
                  By selecting the best raw materials and processing them with precision, we ensure our clients receive nothing but the highest-grade pumice
                </p>
                <li className="text-white font-bold text-left">Sustainability at Heart</li>
                <p className="text-gray-300 ">Responsible sourcing is not just a priority but a guiding principle at Pumiceter.
                  We strive to partner with Eco-conscious suppliers to minimize the environmental footprint of our operations.
                </p>
                <li className="text-white font-bold text-left">Reliability</li>
                <p className="text-gray-300 ">We understand the importance of consistency in industrial applications,
                  which is why we focus on ensuring that every batch of our pumice powder and stones meets exact specifications.
                </p>
              </ul>
            </article>

            <article className="rounded-lg shadow-md p-4 mb-5 bg-black">
              <h3 className="text-lg font-medium text-white mb-2">Who We Serve</h3>
              <p className="text-gray-300 ">
                Our premium pumice products are trusted by chemical industries looking for high-performance materials and by textile manufacturers seeking reliable solutions for fabric finishing. From fine-grade pumice powder used in chemical processes to durable pumice stones for stone-washing denim, Pumiceter is the partner you can trust for quality and expertise.
                At Pumiceter, sourcing is our strength. We go the extra mile to ensure that the materials you receive meet the highest standards of purity and effectiveness. With us, you’re not just getting a product—you’re getting a solution built on a foundation of excellence.
              </p>
            </article>
          </div>
        </div>
      </section>

      <FeedbackForm />

      <section id="Contact Us" ></section>

    </>
  )
}