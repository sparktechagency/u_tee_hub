import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Spin } from 'antd';

const ClientGrowth = ({ clientGrowth = [], vendorGrowth = [], isLoading, selectedYear }) => {
  
  // Transform client growth data for the chart
  const clientData = clientGrowth.map(item => ({
    name: item.name,
    count: item.count || 0
  }));

  // Transform vendor growth data for the chart
  // If vendorGrowth has data, use it; otherwise create empty data
  const vendorData = vendorGrowth.length > 0 
    ? vendorGrowth.map(item => ({
        name: item.year?.toString() || item._id?.toString(),
        count: item.count || 0
      }))
    : [];

  // Calculate max value for Y-axis domain (client)
  const maxClientCount = Math.max(...clientData.map(d => d.count), 10);
  const clientYMax = Math.ceil(maxClientCount / 10) * 10 + 10;

  // Calculate max value for Y-axis domain (vendor)
  const maxVendorCount = Math.max(...vendorData.map(d => d.count), 10);
  const vendorYMax = Math.ceil(maxVendorCount / 10) * 10 + 10;

  // Custom tooltip for client growth
  const ClientTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-[#35BEBD]">
            Clients: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for vendor growth
  const VendorTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">Year: {label}</p>
          <p className="text-[#35BEBD]">
            Vendors: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-5 h-[280px] flex items-center justify-center">
          <Spin size="large" />
        </div>
        <div className="bg-white rounded-xl p-5 h-[280px] flex items-center justify-center">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Client Growth Chart */}
      <div className="text-black p-5 bg-white rounded-xl" style={{ height: "280px" }}>
        <div className="flex justify-between items-center mb-2">
          <p className="font-title text-lg font-bold tracking-wide">Client Growth</p>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {selectedYear}
          </span>
        </div>
        
        {clientData.length > 0 ? (
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart
              data={clientData}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="clientGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#35BEBD" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#35BEBD" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                domain={[0, clientYMax]} 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <Tooltip content={<ClientTooltip />} />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#35BEBD" 
                strokeWidth={2}
                fill="url(#clientGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[85%] flex items-center justify-center text-gray-400">
            No data available for {selectedYear}
          </div>
        )}
      </div>

      {/* Vendor Growth Chart */}
      <div className="text-black p-5 bg-white rounded-xl" style={{ height: "280px" }}>
        <p className="font-title text-lg font-bold tracking-wide mb-2">Vendor Growth</p>
        
        {vendorData.length > 0 ? (
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              data={vendorData}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="vendorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#35BEBD" stopOpacity={1}/>
                  <stop offset="95%" stopColor="#35BEBD" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <YAxis 
                domain={[0, vendorYMax]}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
              />
              <Tooltip content={<VendorTooltip />} />
              <Bar 
                dataKey="count" 
                fill="url(#vendorGradient)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[85%] flex items-center justify-center text-gray-400">
            No vendor data available
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientGrowth;