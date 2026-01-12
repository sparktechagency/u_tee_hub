import { FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import Overview from "../../components/Overview/Overview";
import ClientGrowth from "../../components/ClientGrowth/ClientGrowth";
import TotalEarning from "../../components/TotalEarning/TotalEarning";
import { useGetDashboardStatsQuery } from "../../redux/features/others/othersApi";

function DashboardPage() {
  const currentYear = dayjs().year();
  const startYear = 2020; // You can adjust this
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: stats, isLoading } = useGetDashboardStatsQuery(selectedYear);
  
  const vendorGrowth = stats?.data?.vendorGrowth || [];
  const clientGrowth = stats?.data?.clientYearlyGrowth || [];
  const earning = stats?.data?.stats || [];

  console.log("vendor growth--->", vendorGrowth);
  console.log("client growth--->", clientGrowth);
  console.log("earning growth--->", earning);

  // Generate years array from startYear to currentYear
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index // This will give descending order (newest first)
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center pt-0 mt-0 mb-1">
        <div>
          <p className="text-[#35BEBD] font-title text-3xl font-bold">
            Dashboard
          </p>
        </div>
        
        {/* Year Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors min-w-[120px] justify-between"
          >
            <span className="font-medium text-gray-700">{selectedYear}</span>
            <FaChevronDown 
              className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[120px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleSelect(year)}
                  className={`w-full px-4 py-2 text-left hover:bg-[#35BEBD]/10 transition-colors ${
                    selectedYear === year
                      ? "bg-[#35BEBD] text-white hover:bg-[#35BEBD]"
                      : "text-gray-700"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <Overview stats={stats} />
      <ClientGrowth 
        clientGrowth={clientGrowth} 
        vendorGrowth={vendorGrowth} 
        isLoading={isLoading}
        selectedYear={selectedYear}
      />
      <TotalEarning 
        earning={earning} 
        isLoading={isLoading} 
      />
    </div>
  );
}

export default DashboardPage;