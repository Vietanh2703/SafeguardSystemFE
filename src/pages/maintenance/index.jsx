import React, { useState, useEffect } from "react";
import { FiMail, FiTwitter, FiLinkedin, FiFacebook } from "react-icons/fi";
import { FaTools } from "react-icons/fa";

const MaintenancePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fade-in">
        <div className="flex justify-center mb-8">
          <FaTools className="text-6xl md:text-7xl text-blue-600 animate-pulse" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Site Under Maintenance
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          We're currently improving our website to serve you better.
          We apologize for any inconvenience caused.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
            <div className="text-sm text-gray-600">Hours</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
            <div className="text-sm text-gray-600">Seconds</div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">Get notified when we're back online:</p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Email for newsletter signup"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Notify Me
            </button>
          </form>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-600 mb-4">Need immediate assistance? Contact us:</p>
          <a
            href="mailto:support@example.com"
            className="flex items-center justify-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <FiMail className="mr-2" />
            support@example.com
          </a>

          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="Twitter">
              <FiTwitter className="text-xl" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
              <FiLinkedin className="text-xl" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors" aria-label="Facebook">
              <FiFacebook className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;