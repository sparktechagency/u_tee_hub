import Chart from "react-apexcharts";
import { Spin } from "antd";

const TotalEarning = ({ earning = [], isLoading }) => {
  
  const totalEarning = earning.length > 0 ? earning[0]?.earning || 0 : 0;
  const totalSales = earning.length > 0 ? parseInt(earning[0]?.sales) || 0 : 0;

  const generateEarningData = () => {
    if (earning.length === 0) return [];
    
    if (earning.length > 1) {
      return earning.map(item => item.earning || 0);
    }
    
    return [
      Math.floor(totalEarning * 0.3),
      Math.floor(totalEarning * 0.5),
      Math.floor(totalEarning * 0.4),
      Math.floor(totalEarning * 0.7),
      Math.floor(totalEarning * 0.6),
      Math.floor(totalEarning * 0.8),
      Math.floor(totalEarning * 0.5),
      Math.floor(totalEarning * 0.9),
      Math.floor(totalEarning * 0.75),
      Math.floor(totalEarning * 0.85),
      Math.floor(totalEarning * 0.95),
      totalEarning
    ];
  };

  const earningData = generateEarningData();
  const maxEarning = Math.max(...earningData, 100);
  const xCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2, colors: ['#35BEBD'] },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#FDFFFF"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        colorStops: [
          { offset: 0, color: "#35BEBD", opacity: 0.8 },
          { offset: 50, color: "#BAFFFF", opacity: 0.5 },
          { offset: 100, color: "#FDFFFF", opacity: 0.1 }
        ]
      }
    },
    tooltip: {
      enabled: true,
      y: { formatter: (val) => `$${val.toLocaleString()}` }
    },
    xaxis: {
      categories: xCategories,
      labels: { style: { fontSize: "12px", colors: '#64748b' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      min: 0,
      max: Math.ceil(maxEarning / 100) * 100 + 100,
      labels: {
        formatter: (val) => val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`,
        style: { colors: '#64748b' }
      }
    },
    markers: { size: 4, colors: ['#35BEBD'], strokeColors: '#fff', strokeWidth: 2 },
    grid: { strokeDashArray: 4, borderColor: '#f0f0f0' }
  };

  const chartSeries = [{ name: "Earnings", data: earningData }];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl px-4 py-5 shadow-sm mt-3 h-[300px] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl px-4 py-5 shadow-sm mt-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <p className="font-bold text-lg text-black font-title">Total Earning</p>
        <div className="flex gap-6 mt-2 sm:mt-0">
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Total Earnings</span>
            <span className="text-xl font-bold text-[#35BEBD]">
              ${totalEarning.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Total Sales</span>
            <span className="text-xl font-bold text-gray-800">
              {totalSales.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {earningData.length > 0 ? (
        <Chart options={chartOptions} series={chartSeries} type="area" height={200} />
      ) : (
        <div className="h-[200px] flex items-center justify-center text-gray-400">
          No earning data available
        </div>
      )}
    </div>
  );
};

export default TotalEarning;