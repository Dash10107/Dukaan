import { useState } from 'react'
import { LayoutDashboard, Users, ShoppingBag, ClipboardList, Tags, FileText, MessageSquare, ChevronDown, Menu, BarChart2, Globe, Package, Truck, Settings, HelpCircle, Shield, Zap } from 'lucide-react'
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [expandedMenus, setExpandedMenus] = useState(['catalog'])

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'catalog',
      label: 'Catalog Management',
      icon: ShoppingBag,
      submenu: [
        { id: 'products', label: 'Products', icon: Package },
        { id: 'categories', label: 'Categories', icon: Tags },
        { id: 'inventory', label: 'Inventory', icon: ClipboardList }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart2,
      submenu: [
        { id: 'performance', label: 'Performance', icon: Zap },
        { id: 'reports', label: 'Reports', icon: FileText }
      ]
    },
    {
      id: 'global',
      label: 'Global Markets',
      icon: Globe,
      submenu: [
        { id: 'regions', label: 'Regions', icon: Globe },
        { id: 'shipping', label: 'Shipping', icon: Truck }
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users
    },
    {
      id: 'support',
      label: 'Support',
      icon: MessageSquare
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    }
  ]

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  return (
    <div className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Dashboard</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded p-1 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex h-[calc(100vh-5rem)] flex-col justify-between">
        <nav className="mt-6 px-2">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-2 py-1">
              <button
                onClick={() => {
                  setActiveMenu(item.id)
                  if (item.submenu) toggleSubmenu(item.id)
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 ${
                  activeMenu === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 flex-1 text-sm font-medium">{item.label}</span>
                    {item.submenu && (
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        expandedMenus.includes(item.id) ? 'rotate-180' : ''
                      }`} />
                    )}
                  </>
                )}
              </button>

              {/* Submenu */}
              {!isCollapsed && item.submenu && expandedMenus.includes(item.id) && (
                <div className="mt-2 space-y-1 pl-10">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                      {subItem.icon && <subItem.icon className="h-4 w-4" />}
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Help Section */}
        {!isCollapsed && (
          <div className="mb-4 p-4">
            <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
              <div className="mb-2 flex items-center gap-2 text-gray-700">
                <HelpCircle className="h-5 w-5" />
                <span className="font-medium">Need Help?</span>
              </div>
              <p className="mb-3 text-sm text-gray-600">
                Contact our support team for assistance
              </p>
              <button className="w-full rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900">
                Get Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

