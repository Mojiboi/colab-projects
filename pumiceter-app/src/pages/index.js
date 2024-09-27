import FeedbackForm from "@/components/Feedback"

export default function Home() {
  return (
    <>
      <section>
        <nav></nav>
      </section>
      
      <section id="Home" ></section>
      
      <section id="Products" class="py-12 bg-gray-100">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold text-center mb-8">Our Products</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/assets/powder.png" alt="Product 1" class="w-full h-54 object-cover"/>
              <div class="p-4">
                <h3 class="text-xl font-semibold">Product 1</h3>
                <p class="text-gray-600 mt-2">Description of product 1 goes here.</p>
              </div>
            </div>
            
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/assets/powder.png" alt="Product 2" class="w-full h-54 object-cover"/>
              <div class="p-4">
                <h3 class="text-xl font-semibold">Product 2</h3>
                <p class="text-gray-600 mt-2">Description of product 2 goes here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="About Us" class="py-12 bg-white">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-4">About Us</h2>
          <p class="text-gray-600">Information about your company goes here.</p>
        </div>
      </section>
      
      <FeedbackForm/>
      
      
      <section id="Contact Us" ></section>
    </>
  );
}
