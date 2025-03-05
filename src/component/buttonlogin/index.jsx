import { FaSpinner } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi"; // Import FiLogIn icon

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <FaSpinner className="animate-spin text-blue-500 text-2xl" />
  </div>
);

export const AuthButtonLogin = ({ isLoading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 text-white h-[50px] mr-[30px] px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 disabled:opacity-50"
      aria-label="Login to account"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FiLogIn /> Login
        </>
      )}
    </button>
  );
};
