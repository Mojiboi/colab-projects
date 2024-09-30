import { useState, useEffect } from 'react';
import { MdOutlineArrowOutward } from "react-icons/md";
import { gsap } from "gsap";
import FeedbackForm from "@/components/Feedback"
import { BsMouse } from "react-icons/bs";

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

      <section id="Product">
        <div className=" mx-auto px-10">
          <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-6">

            <div className={`flex items-center relative py-36 px-16 `}>
              <BsMouse className={`text-6xl absolute mt-8 left-28 z-0 transform transition-transform duration-300 ${scrollDirection === "up" ? "-translate-y-10" : "translate-y-0"}`} />
              <img src="/assets/Scroll-Down.svg" className="h-34 w-34 justify-start animate-spin duration-1000 " style={{ animationDuration: '4s' }} alt="Scroll Down" />
              <p class="text-gray-400 text-right font-bold">This is a test string </p>
            </div>
            <div class="bg-black shadow-md rounded-lg w-80 overflow-hidden hover:scale-95 transform transition duration-1000 ease-in animate-slide-left">
              <img src="/assets/pumices-stone.png" alt="Product 1" class="w-2/4 h-52 object-cover mx-auto hover:scale-105 transform transition duration-300 ease-in animate-slide-left" />
              <div class="p-4">
                <h3 class="text-white text-center text-xl font-semibold">Pumice stone</h3>
                <p class="text-gray-400 text-center mt-2">Description of product 1 goes here.</p>
              </div>
            </div>

            <div class="bg-black shadow-md  w-80 rounded-lg right-10 overflow-hidden hover:scale-95 transform transition duration-1000 ease-in animate-slide-right">
              <img src="/assets/powder.png" alt="Product 1" class="w-2/4 h-52 object-cover mx-auto hover:scale-105 transform transition duration-300 ease-in animate-slide-right" />
              <div class="p-4">
                <h3 class="text-white text-center text-xl font-semibold">Pumice powder</h3>
                <p class="text-gray-400 text-center mt-2">Description of product 1 goes here.</p>
              </div>
            </div>

            <div class="bg-black shadow-md rounded-lg w-80 overflow-hidden hover:scale-95 transform transition duration-1000 ease-in animate-slide-left">
              <img src="/assets/200-mesh.png" alt="Product 1" class="w-2/5 h-52 object-cover mx-auto hover:scale-105 transform transition duration-300 ease-in" />
              <div class="p-4">
                <h3 class="text-white text-center text-xl font-semibold">pumice 200 mesh powder</h3>
                <p class="text-gray-400 text-center mt-2">Description of product 1 goes here.</p>
              </div>
            </div>

            <div class="bg-black shadow-md  w-80 rounded-lg  overflow-hidden hover:scale-95 transform transition duration-1000 ease-in animate-slide-right">
              <img src="/assets/pumice-150-mesh-powder.png" alt="Product 1" class="w-2/5 h-52 object-cover mx-auto hover:scale-105 transform transition duration-300 ease-in" />
              <div class="p-4">
                <h3 class="text-white text-center text-xl font-semibold">pumice 150 mesh powder</h3>
                <p class="text-gray-400 text-center mt-2">Description of product 1 goes here.</p>
              </div>
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