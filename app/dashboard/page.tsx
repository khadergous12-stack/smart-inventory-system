import QuickStockModal from "./QuickStockModal";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-8 font-sans text-gray-900">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header section matching mock */}
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 bg-[#bdf0d9] text-[#1a9a62] text-xs font-extrabold tracking-widest uppercase rounded-full mb-4">
              SENIOR REGISTRAR
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Welcome back, Alex.</h1>
            <p className="text-gray-500 text-lg">Here is your morning briefing for Central Campus Inventory.</p>
          </div>
          
          <QuickStockModal />
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-emerald-600">+12% this month</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Books</p>
              <h3 className="text-4xl font-extrabold text-gray-900">12,408</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-red-600">Requires Attention</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Low Stock Items</p>
              <h3 className="text-4xl font-extrabold text-gray-900">04</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Items Added Today</p>
              <h3 className="text-4xl font-extrabold text-gray-900">34</h3>
            </div>
          </div>

          {/* Card 4 - Dark Blue */}
          <div className="bg-[#293d9b] p-6 rounded-[20px] shadow-[0_2px_15px_rgba(41,61,155,0.4)] flex flex-col justify-between h-48 text-white">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-[#3e53b2] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-200 mb-1">Total Active Users</p>
              <h3 className="text-4xl font-extrabold text-white">1,204</h3>
            </div>
          </div>

        </div>

        {/* Lower layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          
          {/* Critical Low Stock section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between xl:mr-10 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Critical Low Stock</h2>
              <a href="/inventory" className="text-sm font-bold text-indigo-700 hover:text-indigo-900 transition">View All Inventory</a>
            </div>

            <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col gap-6">
              
              {/* Item 1 */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">GMIT Record Book</h4>
                    <p className="text-sm font-medium text-gray-500">ID: PRD-001</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <p className="text-xl font-bold text-red-600">2 books left</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                       <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Engineering Drawing Kit</h4>
                    <p className="text-sm font-medium text-gray-500">ID: PRD-045</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  <p className="text-xl font-bold text-orange-600">5 kits left</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                      <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">A4 Copy Paper (Ream)</h4>
                    <p className="text-sm font-medium text-gray-500">ID: PRD-112</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  <p className="text-xl font-bold text-orange-600">8 reams left</p>
                </div>
              </div>

            </div>
          </div>

          {/* Trending Books section */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Trending This Week</h2>
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-5 h-[calc(100%-3rem)]">
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#f0f4ff] rounded-full flex items-center justify-center text-indigo-700 font-bold">1</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Advanced Mathematics</p>
                  <p className="text-xs text-gray-500">+45 requests</p>
                </div>
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#f0f4ff] rounded-full flex items-center justify-center text-indigo-700 font-bold">2</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Physics Lab Manual</p>
                  <p className="text-xs text-gray-500">+32 requests</p>
                </div>
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#f0f4ff] rounded-full flex items-center justify-center text-indigo-700 font-bold">3</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">CS Data Structures</p>
                  <p className="text-xs text-gray-500">+28 requests</p>
                </div>
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <a href="/inventory" className="text-sm font-bold text-indigo-700 hover:text-indigo-900 block text-center w-full">See full trend report</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
