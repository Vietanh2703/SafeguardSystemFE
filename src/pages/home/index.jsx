import { useState, useCallback } from "react";
import { AuthButton } from "../../component/buttonlogout";
import { useNavigate } from "react-router-dom";
import { AuthButtonLogin } from "../../component/buttonlogin";




const HomePage = () => {



  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1563396983906-b3795482a59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bG9nb3x8fHx8fDE3MDcxMzQyODc&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                alt="Company Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=Logo";
                }}
              />
              <span className="text-xl font-bold text-gray-800">CompanyName</span>
            </div>
            <div className="relative">
              <AuthButtonLogin
           
                 onClick={()=>nav("/login") }
      
              />
      
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
           
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature}
                </h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;