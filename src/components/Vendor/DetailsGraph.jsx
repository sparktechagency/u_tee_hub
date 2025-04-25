import { Select } from "antd";
import React from "react";
import Chart from "react-apexcharts";

const DetailsGraph = () => {
  // X-axis: 5k to 60k with gap of 5k
  const xCategories = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);
  const monthOptions = [
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' },
  ];
  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#FFFFFF"], // Ending color
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.4,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#4379EE", // Start with the blue
            opacity: 1
          },
          {
            offset: 100,
            color: "#FFFFFF", // End at white
            opacity: 1
          }
        ]
      }
    },
    tooltip: { enabled: true },
    xaxis: {
      categories: xCategories.map((x) => `${x}k`),
      labels: {
        style: {
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (val) => `${val}%`
      }
    },
    markers: {
      size: 4,
      shape: "circle"
    },
    grid: {
      strokeDashArray: 4
    }
  };

  const chartSeries = [
    {
      name: "Earnings",
      data: [20, 35, 40, 55, 80, 60, 50, 30, 70, 45, 65, 85]
    }
  ];

  return (
    <div className="bg-white rounded-xl px-4 py-5 shadow-sm mt-3">
   <div className="flex justify-between">
   <p className="font-bold text-lg mb-2 text-black font-title">Sales Details</p>
   <Select
  style={{ width: 160 }}
  allowClear
  placeholder="Select a month"
  options={monthOptions}
/>
   </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={200}
      />
    </div>
  );
};

export default DetailsGraph;
