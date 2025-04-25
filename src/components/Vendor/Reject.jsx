import React from 'react';

const Reject = () => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6    mt-8 md:mt-64">
        <h2 className="text-lg font-semibold text-black mb-2">Dear Shuvo</h2>
        <p className="text-gray-600 mb-1">
        We regret to inform you that your request to join U Tee Hub has not been approved after review.
        </p>
        <p className="text-gray-600 mb-4">
        If you believe this was a mistake or need further assistance, feel free to contact our support team
        </p>
        
        
        <button className="bg-[#DD1A1D] text-white font-semibold py-2 px-6 rounded-lg mx-auto block">
          Confirm
        </button>
      </div>
    );
};

export default Reject;