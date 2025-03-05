/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../config/firebase";

const LoginPage = () => {
 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (formData.username.trim().length > 50) {
      newErrors.username = "Username must not exceed 50 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 0) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, 
   
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    try {
      console.log("Sending request with data:", {
        email: formData.username,
        password: formData.password,
      });
  
      const response = await fetch("https://localhost:7217/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Account: formData.username,
          password: formData.password,
        }),
      });
  
   
      const data = await response.json();
      console.log("Response data:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      console.log("✅ Login successful:", data);
      localStorage.setItem("token", data.result.accessToken); // Lưu token đúng vị trí
  
      // 🛠 Fix: Lấy role từ `data.result.role`
      const role = data.result.role; 
  
      if (!role) {
        console.error("❌ Lỗi: Không nhận được role từ backend!");
        setErrors({ general: "Cannot retrieve role. Contact support!" });
        setIsLoading(false);
        return;
      }
  
      console.log("🔍 Role nhận được:", role); // Debug
  
      // 🌟 Điều hướng theo role
      switch (role.trim()) {
        case "Business Partner":
        case "BusinessPartner":
          window.location.href = "/businesspartner";
          break;
        case "Security Guard":
        case "SecurityGuard":
          window.location.href = "/securityguard";
          break;
        case "Admin":
          window.location.href = "/dashboard";
          break;
        case "Security Manager":
        case "SecurityManager":
          window.location.href = "/securitymanager";
          break;
        default:
          console.error("❌ Unknown role:", role);
          setErrors({ general: "Unknown role: " + role + ". Please contact support." });
      }
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginGoogle = async () => {
    console.log("🔹 Login with Google...");
  
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Lấy idToken từ Firebase
  
      console.log("✅ User:", result.user);
      console.log("🔑 ID Token:", idToken);
  
      // Gửi idToken lên backend để xác thực
      const response = await fetch("https://localhost:7217/api/sign-in-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
  
      const data = await response.json();
      console.log("🖥 Server response:", data);
  
      // Kiểm tra phản hồi từ backend
      if (!response.ok || !data.result) {
        console.error("❌ Server error:", data.message);
        setErrors({ general: data.message || "Login failed. Please try again!" });
        setIsLoading(false);
        return;
      }
  
      const { AccessToken, RefreshToken, Email, FullName, role } = data.result;
  
      if (!role) {
        console.error("❌ Lỗi: Không nhận được role từ backend!");
        setErrors({ general: "Cannot retrieve role. Contact support!" });
        setIsLoading(false);
        return;
      }
  
      console.log("🔍 Role nhận được:", role);
  
      // Lưu thông tin vào localStorage (hoặc context API)
      localStorage.setItem("accessToken", AccessToken);
      localStorage.setItem("refreshToken", RefreshToken);
      localStorage.setItem("userEmail", Email);
      localStorage.setItem("userFullName", FullName);
      localStorage.setItem("userRole", role);
  
      // 🌟 Điều hướng theo role
      const roleRoutes = {
        "Business Partner": "/businesspartner",
        "BusinessPartner": "/businesspartner",
        "Security Guard": "/securityguard",
        "SecurityGuard": "/securityguard",
        "Admin": "/dashboard",
        "Security Manager": "/securitymanager",
        "SecurityManager": "/securitymanager",
      };
  
      const redirectUrl = roleRoutes[role.trim()] || null;
  
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("❌ Unknown role:", role);
        setErrors({ general: `Unknown role: ${role}. Please contact support.` });
      }
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  
  



 
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src=".vite/hau.jpg"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border ${
                    errors.username ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  aria-invalid={errors.username ? "true" : "false"}
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-lg relative block w-full pl-10 pr-10 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

           
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleLoginGoogle}
            >
              <FcGoogle className="h-5 w-5" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
