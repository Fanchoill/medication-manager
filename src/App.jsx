import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Container */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
        {/* Header Section */}
        <header className="p-6 border-b border-gray-200">
          <h1 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Medication Manager
          </h1>
          <p className="mt-2 text-slate-500">
            Secure medication tracking and management
          </p>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Dashboard Preview */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Medication
                </button>
                <button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                  View Inventory
                </button>
              </div>
            </div>

            {/* Status Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900">System Status</h2>
              <p className="mt-2 text-sm text-gray-600">
                All systems operational
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 bg-gray-50">
          <p className="text-sm text-gray-500">
            Version 0.1 - Development Build
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
