import React from 'react';

const PremiumSubscription = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-800 to-teal-200 py-12 flex flex-col items-center font-serif">
            {/* Big Title */}
            <h1 className="text-5xl font-extrabold text-white mb-12">
                Without The High Costs
            </h1>
            <p className="text-lg font-medium text-white mb-16">
                Access the best tools you need to succeed with no added fees, top-rated support, and a 15-day money-back guarantee.
            </p>

            {/* Forms Container */}
            <div className="flex flex-row justify-center gap-8">
                {/* Large Annual Plan */}
                <div className="flex-1 max-w-xs p-4">
                    <div className="bg-gradient-to-r from-[#8B4513] to-[#CD853F] p-6 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold text-white mb-4">Large Annual</h2>
                        <p className="text-white text-xl font-bold mb-6">Ks.735000/year</p>
                        <p className="text-gray-200 mb-4">Great for Agencies who are searching for large local book market to invest.</p>
                        <button 
                            type="button" 
                            className="w-full bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition-colors"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Medium Annual Plan */}
                <div className="flex-1 max-w-xs p-4">
                    <div className="bg-gradient-to-r from-[#C0C0C0] to-[#D3D3D3] p-6 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Medium Annual</h2>
                        <p className="text-gray-900 text-xl font-bold mb-6">Ks.420000/year</p>
                        <p className="text-gray-800 mb-4">Great for Writers and Freelancers finding a place to show or their work.</p>
                        <button 
                            type="button" 
                            className="w-full bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition-colors"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>

                {/* Small Annual Plan */}
                <div className="flex-1 max-w-xs p-4">
                    <div className="bg-gradient-to-r from-[#d4af37] to-[#f1c40f] p-6 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Small Annual</h2>
                        <p className="text-gray-900 text-xl font-bold mb-6">Ks.215000/year</p>
                        <p className="text-gray-800 mb-4">Great for Writers who don't want to use much. It contains Key Features except Indicators and Premium Tools.</p>
                        <button 
                            type="button" 
                            className="w-full bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700 transition-colors"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <p className="text-white mt-8">
                *Prices exclude VAT/Taxes.
            </p>
        </div>
    );
};

export default PremiumSubscription;