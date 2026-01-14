'use client';

export default function PrebuiltHoldingsDashboard() {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 mt-2">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="text-sm text-gray-600 mb-1">Total Value</div>
          <div className="text-3xl font-bold text-gray-900">$2,847,392</div>
          <div className="text-sm text-green-600 mt-2">↑ 12.4% YTD</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">Total Gain</div>
          <div className="text-3xl font-bold text-green-600">+$314,829</div>
          <div className="text-sm text-gray-600 mt-2">Return: 12.4%</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600 mb-1">Holdings</div>
          <div className="text-3xl font-bold text-gray-900">47</div>
          <div className="text-sm text-gray-600 mt-2">Across 8 sectors</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="text-sm text-gray-600 mb-1">Cash</div>
          <div className="text-3xl font-bold text-gray-900">$142,890</div>
          <div className="text-sm text-gray-600 mt-2">5% of portfolio</div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Current Holdings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Symbol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Shares</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Market Value</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Gain/Loss</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Return %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { symbol: 'AAPL', name: 'Apple Inc.', shares: 1250, price: 178.45, value: 223062.50, gain: 45892.30, return: 25.8 },
                { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 850, price: 412.80, value: 350880.00, gain: 78234.50, return: 28.7 },
                { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 500, price: 142.65, value: 71325.00, gain: 12450.75, return: 21.2 },
                { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 600, price: 178.25, value: 106950.00, gain: 18765.30, return: 21.3 },
                { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 300, price: 875.28, value: 262584.00, gain: 98234.80, return: 59.8 },
                { symbol: 'TSLA', name: 'Tesla Inc.', shares: 400, price: 242.84, value: 97136.00, gain: -8450.25, return: -8.0 },
                { symbol: 'META', name: 'Meta Platforms', shares: 450, price: 512.32, value: 230544.00, gain: 56789.40, return: 32.7 },
                { symbol: 'JPM', name: 'JPMorgan Chase', shares: 800, price: 198.45, value: 158760.00, gain: 23456.80, return: 17.3 },
                { symbol: 'V', name: 'Visa Inc.', shares: 550, price: 278.90, value: 153395.00, gain: 34567.90, return: 29.1 },
                { symbol: 'JNJ', name: 'Johnson & Johnson', shares: 700, price: 158.32, value: 110824.00, gain: 15678.45, return: 16.5 }
              ].map((holding, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-blue-600">{holding.symbol}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{holding.name}</td>
                  <td className="px-6 py-4 text-right text-gray-700">{holding.shares.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-gray-700">${holding.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    ${holding.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-4 text-right font-semibold ${holding.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.gain >= 0 ? '+' : ''}${holding.gain.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${holding.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.return >= 0 ? '+' : ''}{holding.return}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sector Allocation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sector Allocation</h3>
          <div className="space-y-3">
            {[
              { sector: 'Technology', percent: 45, color: 'bg-blue-500' },
              { sector: 'Financial', percent: 18, color: 'bg-green-500' },
              { sector: 'Consumer Discretionary', percent: 15, color: 'bg-purple-500' },
              { sector: 'Healthcare', percent: 12, color: 'bg-red-500' },
              { sector: 'Communication', percent: 10, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.sector}</span>
                  <span className="text-sm font-bold text-gray-900">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">1 Year Return</span>
              <span className="text-xl font-bold text-green-600">+24.8%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">3 Year Return</span>
              <span className="text-xl font-bold text-green-600">+67.2%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-600">Volatility</span>
              <span className="text-xl font-bold text-gray-900">12.4%</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Sharpe Ratio</span>
              <span className="text-xl font-bold text-gray-900">1.82</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
