import { useNavigate } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

const Homepage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/create-invoice");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-violet-50 to-violet-100 flex items-center justify-center px-6 py-10">
      <div className="max-w-4xl w-full text-center space-y-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Free Online <span className="text-violet-600">Invoice Generator</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Quickly create and download clean, professional invoices — no login required.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStart}
            className="bg-violet-600 hover:bg-violet-700 transition text-white py-3 px-6 md:px-8 rounded-xl flex items-center gap-2 text-lg shadow-lg"
          >
            <FiFileText className="w-5 h-5" />
            Create Invoice
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          100% free. No account. No spam. Just fast invoicing.
        </div>
      </div>
    </div>
  );
};

export default Homepage;
