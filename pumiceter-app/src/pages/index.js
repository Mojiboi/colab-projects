import { useEffect, useState } from "react";
import FeedbackForm from "@/components/Feedback"
import { BsMouse } from "react-icons/bs";



export default function Home() {
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
      <section>
        <nav></nav>
      </section>

      <section id="Home" ></section>
      <section id="Product">
        <div className=" mx-auto px-10">
          <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-6">
            
            <div className={`flex items-center relative py-36 px-16 `}>
              <BsMouse className={`text-6xl absolute mt-8 left-28 z-0 transform transition-transform duration-300 ${scrollDirection === "up" ? "-translate-y-10" : "translate-y-0"}`}/>
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
  );
}
