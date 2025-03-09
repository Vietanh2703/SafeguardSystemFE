/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {useState, useEffect, useRef} from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../config/firebase.js";
import loginBackground from "../assets/images/loginpage.jpg";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../designs/LoginPage.css';
import {jwtDecode} from "jwt-decode"; // Import the CSS file for animations

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountNotVerified, setIsAccountNotVerified] = useState(false); // New state variable
  const [isNotOtp, setIsNotOtp] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [changePasswordData, setChangePasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isAccountNotVerified) {
      toast.info("Your account is not verified. Please change your password.", {autoClose: 5000}); // 5 seconds
    }
  }, [isAccountNotVerified]);

  useEffect(() => {
    if (isNotOtp) {
      toast.info("Please check mail to input OTP and verify your account.", {autoClose: 5000}); // 5 seconds
    }
  }, [isNotOtp]);


  useEffect(() => {
    let timer;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 30;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      toast.error("Username is required.", {autoClose: 2000}); // 2 seconds
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      toast.error("Username must be at least 3 characters.", {autoClose: 2000}); // 2 seconds
    } else if (formData.username.trim().length > 50) {
      newErrors.username = "Username must not exceed 50 characters";
      toast.error("Username must not exceed 50 characters.", {autoClose: 2000}); // 2 seconds
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      toast.error("Password is required.", {autoClose: 2000}); // 2 seconds
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      toast.error("Password must be at least 8 characters.", {autoClose: 2000}); // 2 seconds
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangePasswordChange = (e) => {
    const {name, value} = e.target;
    setChangePasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    toast.info("OTP resent.");

    // Call the API to resend OTP
    const resendOtpResponse = await fetch(`https://localhost:7217/refresh-otp/${encodeURIComponent(formData.username)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resendOtpResponse.ok) {
      const errorData = await resendOtpResponse.json();
      toast.error(errorData.message || "Failed to resend OTP.");
      throw new Error(errorData.message || "Failed to resend OTP.");
    }

    toast.success("OTP has been resent to your email.");
  };

  const navigate = useNavigate();
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
        if (data.message === "Account does not exist") {
          toast.error("Account does not exist.");
        } else if (data.message === "Account is locked") {
          toast.error("Account is locked.");
        } else if (data.message === "Your account is not verified, please check your email.") {
          setIsAccountNotVerified(true); // Set the state to true
        } else if (data.message === "This account does not verify OTP.") {
          setIsNotOtp(true); // Set the state to true

          // Call the API to resend OTP
          const resendOtpResponse = await fetch(`https://localhost:7217/refresh-otp/${encodeURIComponent(formData.username)}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!resendOtpResponse.ok) {
            const errorData = await resendOtpResponse.json();
            toast.error(errorData.message || "Failed to resend OTP.");
            throw new Error(errorData.message || "Failed to resend OTP.");
          }

          toast.success("OTP has been resent to your email.");
        } else {
          toast.error(data.message || "Login failed.");
        }
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("accessToken", data.result.accessToken);
      localStorage.setItem("refreshToken", data.result.refreshToken);

      console.log("AccessToken saved:", localStorage.getItem("accessToken"));
      console.log("RefreshToken saved:", localStorage.getItem("refreshToken"));

      const decodedToken = jwtDecode(data.result.accessToken);
      const userId = decodedToken?.userId; // Ensure the key in the token is correct
      if (userId) {
        localStorage.setItem("userId", userId);
      }

      const role = data.result.role;

      if (!role) {
        toast.error("Cannot retrieve role. Contact support!");
        setErrors({ general: "Cannot retrieve role. Contact support!" });
        setIsLoading(false);
        return;
      }

      const roleRoutes = {
        "Admin": "/admin",
        "Manager": "/manager"
      };

      const redirectUrl = roleRoutes[role.trim()] || null;

      if (redirectUrl) {
        localStorage.setItem("login_success", "true");
        navigate(redirectUrl);
      } else {
        toast.error("Unknown role: " + role + ". Please contact support.");
        setErrors({ general: "Unknown role: " + role + ". Please contact support." });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
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

      const response = await fetch("https://localhost:7217/api/sign-in-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      // console.log("🖥 Server response:", data);

      if (!response.ok || !data.result) {
        console.error("❌ Server error:", data.message);
        toast.error(data.message || "Login failed. Please try again!");
        setErrors({ general: data.message || "Login failed. Please try again!" });
        setIsLoading(false);
        return;
      }

      const { AccessToken, RefreshToken, Email, FullName, role } = data.result;

      if (!role) {
        console.error("❌ Lỗi: Không nhận được role từ backend!");
        toast.error("Cannot retrieve role. Contact support!");
        setErrors({ general: "Cannot retrieve role. Contact support!" });
        setIsLoading(false);
        return;
      }

      localStorage.setItem("accessToken", AccessToken);
      localStorage.setItem("refreshToken", RefreshToken);
      localStorage.setItem("userEmail", Email);
      localStorage.setItem("userFullName", FullName);
      localStorage.setItem("userRole", role);

      const roleRoutes = {
        "Business Partner": "/businesspartner",
        "BusinessPartner": "/businesspartner",
      };

      const redirectUrl = roleRoutes[role.trim()] || null;

     if (role === "Processing") {
        console.error("Your account is currently being processed. Please wait for further updates.");
        toast.info("Your account is currently being processed. Please wait for further updates.");
        return;
      } else {
        console.error("❌ Unknown role:", role);
        toast.error(`Unknown role: ${role}. Please contact support.`);
        setErrors({ general: `Unknown role: ${role}. Please contact support.` });
      }
      localStorage.setItem("login_success", "true");
      toast.success("Login successful!");
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      toast.error(error.message);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const email = encodeURIComponent(formData.username); // Encode the email
      const requestBody = {
        password: changePasswordData.newPassword,
        confirmPassword: changePasswordData.confirmPassword,
      };

      console.log("Request body:", requestBody); // Log the request body

      const response = await fetch(`https://localhost:7217/update-password/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to change password.");
        throw new Error(errorData.message || "Failed to change password.");
      }

      const data = await response.json();
      setIsAccountNotVerified(false); // Hide change password box
      setIsNotOtp(true); // Show OTP box after animation
    } catch (error) {
      console.error("Change password failed:", error.message);
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if the current one is filled
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const email = encodeURIComponent(formData.username);
      const response = await fetch(`https://localhost:7217/verify-email/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to verify OTP.");
        throw new Error(errorData.message || "Failed to verify OTP.");
      }

      toast.success("You have successfully verified your account.");
      setIsAccountNotVerified(false);

      // Wait for the Toastify notification to close before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Adjust the delay to match the Toastify autoClose duration
    } catch (error) {
      console.error("OTP verification failed:", error.message);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loginBackground})` }}>
        <div className={`max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg ${isAccountNotVerified ? 'animate-slide-in' : ''}`}>
          {!isAccountNotVerified && !isNotOtp && (
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
              </div>
          )}

          {isAccountNotVerified && (
              <div className="change-password-box animate-slide-out">
                <h3 className="text-center text-2xl font-bold text-gray-900">Change Your Password</h3>
                <form className="mt-8 space-y-6" onSubmit={handleChangePasswordSubmit}>
                  <div className="rounded-md shadow-sm space-y-4">
                    <div>
                      <label htmlFor="new-password" className="sr-only">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="new-password"
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Enter new password"
                            value={changePasswordData.newPassword}
                            onChange={handleChangePasswordChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirm-password" className="sr-only">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm new password"
                            value={changePasswordData.confirmPassword}
                            onChange={handleChangePasswordChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
          )}

          {isNotOtp && (
              <div className="otp-verification-box animate-slide-in">
                <h3 className="text-center text-2xl font-bold text-gray-900">Verify Your Account</h3>
                <div className="mt-8 space-y-6">
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="otp-input"
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                    >
                      {isResendDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        onClick={handleVerifyOtp}
                    >
                      Verify my account
                    </button>
                  </div>
                </div>
              </div>
          )}

          {!isAccountNotVerified && !isNotOtp && (
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
                          placeholder="Enter your email"
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

                <div className="flex items-center justify-between" />

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
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
          )}
        </div>
      </div>
  );
};
export default LoginPage;