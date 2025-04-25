import React from 'react';

const Accept = () => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6    mt-8 md:mt-64">
      <h2 className="text-lg font-semibold text-black mb-2">Dear Shuvo</h2>
      <p className="text-gray-600 mb-1">
        Welcome to U Tee Hub. You now have access to your account.
      </p>
      <p className="text-gray-600 mb-4">
        Please log in using your registered credentials.
      </p>
      <p className="text-gray-500 mb-6">Admin Team</p>
      
      <button className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg mx-auto block">
        Confirm
      </button>
    </div>
    );
};

export default Accept;