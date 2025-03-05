import { FaSpinner } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <FaSpinner className="animate-spin text-blue-500 text-2xl" />
  </div>
);

export const AuthButton = ({ isLoading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-red-500 hover:bg-red-600 text-white h-[50px] mr-[30px] px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 disabled:opacity-50"
      aria-label="Logout from account"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FiLogOut /> Logout
        </>
      )}
    </button>
  );
};
