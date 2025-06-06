import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  "UI Design Issues",
  "Navigation Problems",
  "Bugs & Errors",
  "Content Issues",
  "Feature Requests",
  "Other"
];

const FeedbackPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");

  const feedbackOptions = [
    { id: 1, emoji: "😵", color: "bg-red-500", text: "Terrible" },
    { id: 2, emoji: "☹️", color: "bg-orange-500", text: "Bad" },
    { id: 3, emoji: "😐", color: "bg-yellow-500", text: "Okay" },
    { id: 4, emoji: "😊", color: "bg-green-400", text: "Good" },
    { id: 5, emoji: "😍", color: "bg-green-600", text: "Great!" },
  ];

  const handleSubmit = async () => {
    if (!name || !email || !selectedCategory || !description) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const feedbackData = {
      name,
      email,
      category: selectedCategory,
      description,
      rating,
    };

    try {
      const response = await fetch("http://localhost:9010/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setTimeout(() => setSuccessMessage(""), 5000); // Hide alert after 5 seconds
        setName("");
        setEmail("");
        setSelectedCategory(null);
        setDescription("");
        setRating(5);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="flex flex-grow min-h-screen bg-gray-100 w-full">

      {/* Success Alert */}
      {successMessage && (
        <div className="fixed centerr right-130 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInOut">
          {successMessage}
        </div>
      )}

      <div className="ml-64 flex-grow flex items-center justify-center px-10 py-4 !w-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="bg-white shadow-2xl rounded-2xl p-6 w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Feedback</h2>
            <motion.p
              className="text-pink-600 text-center mt-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
            >
              We value your feedback to improve our platform.
            </motion.p>

            <div className="mt-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 border-green-400 rounded-xl focus:ring-2 mb-4"
              />

              <input 
                type="email" 
                placeholder="Your Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-green-400 rounded-xl focus:ring-2 mb-4"
              />

              <div className="flex flex-wrap gap-2  mb-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border-2  text-black transition-all duration-300 ${
                      selectedCategory === category ? '!bg-cyan-500 text-white' : 'border-green-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <textarea 
                placeholder="Describe your issue or request..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border-2 border-green-400 rounded-xl focus:ring-2 mb-4"
              />
              
              {/* Feedback Rating */}
              <div className="flex flex-col items-center justify-center px-10 py-4 bg-white-100">
                <h2 className="text-sm font-semibold mb-2 text-gray-700">We Want Your Feedback</h2>

                <div className="flex space-x-5">
                  {feedbackOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-xl cursor-pointer ${option.color} ${
                        rating === option.id ? "scale-110 ring-2 ring-gray-300" : "hover:scale-105"
                      } transition-transform`}
                      onClick={() => setRating(option.id)}
                    >
                      {option.emoji}
                    </div>
                  ))}
                </div>

                <div className="w-40 h-2 mt-3 bg-gray-300 rounded-full relative">
                  <div
                    className="absolute h-full rounded-full transition-all"
                    style={{
                      width: `${(rating / 5) * 100}%`,
                      background: `linear-gradient(to right, red, orange, yellow, green)`,
                    }}
                  ></div>
                </div>

                <p className="mt-2 text-sm font-medium text-gray-700">
                  {feedbackOptions.find((option) => option.id === rating)?.text}
                </p>
              </div>
              
              <br />
              <button 
                onClick={handleSubmit}
                className="w-full !bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage;
