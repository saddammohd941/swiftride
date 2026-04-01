import { useState } from 'react';
import { useStore } from '../lib/store';
import { drivers } from '../data/mockData';
import {
  LayoutDashboard, Car, Users, DollarSign, TrendingUp,
  Search, Filter, MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { RideStatus } from '../types';

export function AdminPortal() {
  const { allRides, assignDriver } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'rides' | 'drivers' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  const stats = [
    {
      label: 'Total Rides',
      value: allRides.length,
      icon: Car,
      color: 'from-violet-500 to-purple-500',
      change: '+12.5%'
    },
    {
      label: 'Active Drivers',
      value: drivers.filter(d => d.isOnline).length,
      icon: Users,
      color: 'from-cyan-500 to-blue-500',
      change: '+5.2%'
    },
    {
      label: 'Revenue',
      value: `$${allRides.reduce((sum, r) => sum + r.fare, 0).toFixed(0)}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+18.3%'
    },
    {
      label: 'Completion Rate',
      value: '94.2%',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      change: '+2.1%'
    }
  ];
  
  const getStatusColor = (status: RideStatus) => {
    const colors = {
      searching: 'bg-yellow-500/20 text-yellow-400',
      confirmed: 'bg-blue-500/20 text-blue-400',
      arriving: 'bg-purple-500/20 text-purple-400',
      started: 'bg-orange-500/20 text-orange-400',
      completed: 'bg-green-500/20 text-green-400',
      cancelled: 'bg-red-500/20 text-red-400'
    };
    return colors[status];
  };
  
  const filteredRides = allRides.filter(ride =>
    ride.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.riderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.driver?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'rides' as const, label: 'Rides', icon: Car },
    { id: 'drivers' as const, label: 'Drivers', icon: Users },
    { id: 'analytics' as const, label: 'Analytics', icon: TrendingUp }
  ];
  
  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your ride-sharing platform</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search rides, drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white'
                    : 'bg-slate-900/50 text-slate-400 hover:text-violet-400 hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    <p className="text-slate-400">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Recent Rides</h2>
                <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-slate-400 text-sm">
                      <th className="p-4 font-medium">Ride ID</th>
                      <th className="p-4 font-medium">Rider</th>
                      <th className="p-4 font-medium">Driver</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Fare</th>
                      <th className="p-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRides.slice(0, 5).map((ride) => (
                      <tr key={ride.id} className="border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
                        <td className="p-4 text-white font-medium">{ride.id}</td>
                        <td className="p-4 text-slate-300">{ride.riderName}</td>
                        <td className="p-4 text-slate-300">{ride.driver?.name || 'Unassigned'}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ride.status)}`}>
                            {ride.status}
                          </span>
                        </td>
                        <td className="p-4 text-violet-400 font-semibold">${ride.fare.toFixed(2)}</td>
                        <td className="p-4 text-slate-400">{new Date(ride.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'rides' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {filteredRides.map((ride) => (
              <motion.div key={ride.id} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{ride.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ride.status)}`}>
                        {ride.status}
                      </span>
                    </div>
                    <p className="text-slate-400">Rider: {ride.riderName}</p>
                    <p className="text-slate-500 text-sm">📞 {ride.riderPhone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-400">${ride.fare.toFixed(2)}</p>
                    <p className="text-slate-500 text-sm">{ride.duration} min • {ride.distance.toFixed(1)} km</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-slate-500 text-xs mb-1">Pickup</p>
                    <p className="text-white">{ride.pickup.address}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <p className="text-slate-500 text-xs mb-1">Drop-off</p>
                    <p className="text-white">{ride.dropoff.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-4">
                    {ride.driver ? (
                      <div className="flex items-center gap-3">
                        <img src={ride.driver.profileImage} alt={ride.driver.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-white font-medium">{ride.driver.name}</p>
                          <p className="text-slate-500 text-sm">{ride.driver.vehicle.make} {ride.driver.vehicle.model}</p>
                        </div>
                      </div>
                    ) : (
                      <select
                        onChange={(e) => {
                          const driver = drivers.find(d => d.id === e.target.value);
                          if (driver) assignDriver(ride.id, driver);
                        }}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-violet-500/50"
                      >
                        <option value="">Assign Driver</option>
                        {drivers.filter(d => d.isOnline).map((driver) => (
                          <option key={driver.id} value={driver.id}>{driver.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                      <MoreVertical size={18} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {activeTab === 'drivers' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drivers.map((driver) => (
                <div key={driver.id} className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img src={driver.profileImage} alt={driver.name} className="w-16 h-16 rounded-full object-cover border-2 border-violet-500" />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-900 ${driver.isOnline ? 'bg-green-500' : 'bg-slate-500'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{driver.name}</h3>
                        <p className="text-slate-400 text-sm">{driver.phone}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Rating</span>
                        <span className="text-white font-medium flex items-center gap-1">
                          <span className="text-yellow-400">★</span> {driver.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Completed Rides</span>
                        <span className="text-white font-medium">{driver.completedRides}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Vehicle</span>
                        <span className="text-white font-medium">{driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Plate</span>
                        <span className="text-white font-medium">{driver.vehicle.plateNumber}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-violet-500/20 text-violet-400 rounded-xl font-medium hover:bg-violet-500/30 transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 py-2 bg-slate-800 text-slate-400 rounded-xl font-medium hover:bg-slate-700 transition-colors">
                        {driver.isOnline ? 'Go Offline' : 'Go Online'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Revenue Overview</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                  const height = 40 + Math.random() * 60;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gradient-to-t from-violet-500 to-cyan-500 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${height}%` }} />
                      <span className="text-slate-500 text-xs">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Rides by Type</h3>
              <div className="space-y-4">
                {[
                  { type: 'Economy', count: 45, percentage: 45, color: 'from-violet-500 to-purple-500' },
                  { type: 'Premium', count: 30, percentage: 30, color: 'from-cyan-500 to-blue-500' },
                  { type: 'SUV', count: 18, percentage: 18, color: 'from-green-500 to-emerald-500' },
                  { type: 'Bike', count: 7, percentage: 7, color: 'from-orange-500 to-red-500' }
                ].map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{item.type}</span>
                      <span className="text-slate-400">{item.count} rides ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6">Top Performing Drivers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-slate-400 text-sm">
                      <th className="pb-4 font-medium">Driver</th>
                      <th className="pb-4 font-medium">Rides</th>
                      <th className="pb-4 font-medium">Rating</th>
                      <th className="pb-4 font-medium">Revenue</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.slice(0, 5).map((driver, idx) => (
                      <tr key={driver.id} className="border-t border-slate-800">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 font-bold">#{idx + 1}</span>
                            <img src={driver.profileImage} alt={driver.name} className="w-10 h-10 rounded-full object-cover" />
                            <span className="text-white font-medium">{driver.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-300">{driver.completedRides}</td>
                        <td className="py-4 text-slate-300 flex items-center gap-1">
                          <span className="text-yellow-400">★</span> {driver.rating}
                        </td>
                        <td className="py-4 text-violet-400 font-semibold">${(driver.completedRides * 15.5).toFixed(0)}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${driver.isOnline ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                            {driver.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
