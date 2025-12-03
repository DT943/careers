"use client";

import { FaCheck } from "react-icons/fa";

const ApplicationSubmitted = () => {
  return (
    <div className="rounded-lg p-8 text-center py-24">
      <div className="w-16 h-16 border-5 border-[#1E983D] rounded-full flex items-center justify-center mx-auto mb-6">
        <FaCheck size={28} color="#1E983D" />
      </div>

      <h2 className="text-xl font-semibold text-primary-900 mb-4">
        Application Submitted Successfully!
      </h2>

      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for submitting your application. We'll review your materials
        and get back to you soon.
      </p>
      <div className="flex justify-center items-center gap-2">
        {" "}
        <button
          onClick={() => window.location.reload()}
          className={` flex justify-between items-center gap-1 px-8 py-3 rounded-lg font-semibold border border-[#D4D4D2] bg-white text-primary-900 hover:bg-[#F5F5F4]`}
        >
          See more open positions
        </button>
        <button
          onClick={() => window.location.reload()}
          className={`flex justify-between items-center gap-1 px-8 py-3 rounded-lg font-semibold bg-primary-1 text-white hover:bg-primary-700 hover:opacity-95`}
        >
          View Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
