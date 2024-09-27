// components/FeedbackForm.js
import { useState } from 'react';

const FeedbackForm = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const message = e.target.message.value;

    setFeedbacks([...feedbacks, { name, message }]);
    e.target.reset();  // Reset form
  };

  return (
    <section id="Client Feedback" className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Client Feedback</h2>
        
        {/* Feedback Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Leave your feedback</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Feedback</label>
              <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Submit</button>
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
  );
};

export default FeedbackForm;
