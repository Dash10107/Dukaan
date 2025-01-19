import { BarChart3, DollarSign, Users, ShoppingCart, TrendingUp, Package, Globe, AlertCircle, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$845,231.89',
      change: '+20.1%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      label: 'Active Products',
      value: '23,456',
      change: '+15.1%',
      icon: Package,
      trend: 'up'
    },
    {
      label: 'Global Markets',
      value: '45',
      change: '+5',
      icon: Globe,
      trend: 'up'
    },
    {
      label: 'Product Returns',
      value: '2.4%',
      change: '-0.8%',
      icon: AlertCircle,
      trend: 'down'
    }
  ]

  const recentProducts = [
    { id: 1, name: 'Wireless Earbuds Pro', category: 'Electronics', price: '$129.99', status: 'Active' },
    { id: 2, name: 'Smart Watch Series 5', category: 'Electronics', price: '$299.99', status: 'Pending' },
    { id: 3, name: 'Laptop Stand Premium', category: 'Accessories', price: '$49.99', status: 'Active' },
    { id: 4, name: 'HD Webcam 4K', category: 'Electronics', price: '$89.99', status: 'Active' },
    { id: 5, name: 'Mechanical Keyboard', category: 'Accessories', price: '$159.99', status: 'Draft' },
  ]

  const marketPerformance = [
    { region: 'North America', revenue: '$245,234', growth: '+24.5%', status: 'up' },
    { region: 'Europe', revenue: '$187,498', growth: '+18.2%', status: 'up' },
    { region: 'Asia Pacific', revenue: '$156,784', growth: '+15.7%', status: 'up' },
    { region: 'Latin America', revenue: '$89,245', growth: '-2.3%', status: 'down' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-800">
        <div className='px-2 py-6 text-3xl font-semibold'>
          <h1>
            Dashboard
          </h1>
        </div>
      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <h3 className="mt-1 text-2xl font-semibold">{stat.value}</h3>
              </div>
              <div className={`rounded-full p-3 ${
                stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
              <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span className="text-gray-600 dark:text-gray-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <select className="rounded-md border bg-transparent px-2 py-1 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <div className="flex h-full items-end gap-2">
              {[40, 60, 45, 90, 30, 80, 50, 70, 60, 90, 80, 60].map((height, i) => (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className="w-full rounded-t bg-blue-500 opacity-80 transition-all hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Market Performance */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Market Performance</h3>
            <Globe className="h-5 w-5 text-gray-600" />
          </div>
          <div className="space-y-4">
            {marketPerformance.map((market) => (
              <div key={market.region} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{market.region}</p>
                  <p className="text-sm text-gray-600">{market.revenue}</p>
                </div>
                <div className={`flex items-center gap-1 ${
                  market.status === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {market.status === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {market.growth}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Products</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-gray-600">Product Name</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Category</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Price</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-b-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gray-100"></div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{product.category}</td>
                    <td className="py-3 font-medium">{product.price}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        product.status === 'Active' 
                          ? 'bg-green-100 text-green-600' 
                          : product.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        2 hours ago
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

