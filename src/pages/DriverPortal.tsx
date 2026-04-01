import { useState, useEffect } from 'react';
import { useStore } from '../lib/store';
import { drivers, driverEarnings } from '../data/mockData';
import { 
  ToggleLeft, ToggleRight, MapPin, Navigation, Phone,
  DollarSign, Star, Car, Bell, CheckCircle, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Ride } from '../types';

export function DriverPortal() {
  const {
    isDriverOnline,
    setDriverOnline,
    driverCurrentRide,
    setDriverCurrentRide,
    driverAvailableRides,
    setDriverAvailableRides,
    updateRideStatus
  } = useStore();
  
  const [showEarnings, setShowEarnings] = useState(false);
  const [timeOnline, setTimeOnline] = useState(0);
  
  // Simulate time online
  useEffect(() => {
    if (isDriverOnline) {
      const interval = setInterval(() => {
        setTimeOnline(t => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isDriverOnline]);
  
  // Simulate incoming ride requests
  useEffect(() => {
    if (isDriverOnline && !driverCurrentRide) {
      const interval = setInterval(() => {
        if (Math.random() < 0.3) {
          const newRide: Ride = {
            id: `ride-${Date.now()}`,
            riderId: `rider-${Math.floor(Math.random() * 1000)}`,
            riderName: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Brown'][Math.floor(Math.random() * 4)],
            riderPhone: '+1 (555) 000-0000',
            pickup: {
              lat: 40.7128 + (Math.random() - 0.5) * 0.1,
              lng: -74.0060 + (Math.random() - 0.5) * 0.1,
              address: `${Math.floor(Math.random() * 999)} Main St, New York, NY`
            },
            dropoff: {
              lat: 40.7128 + (Math.random() - 0.5) * 0.1,
              lng: -74.0060 + (Math.random() - 0.5) * 0.1,
              address: `${Math.floor(Math.random() * 999)} Broadway, New York, NY`
            },
            rideType: 'economy',
            status: 'searching',
            fare: 15 + Math.random() * 30,
            distance: 2 + Math.random() * 10,
            duration: 10 + Math.random() * 30,
            createdAt: new Date(),
            paymentMethod: 'card'
          } as any;
          setDriverAvailableRides([...driverAvailableRides, newRide]);
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isDriverOnline, driverCurrentRide, driverAvailableRides, setDriverAvailableRides]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  const handleAcceptRide = (ride: Ride) => {
    setDriverCurrentRide({ ...ride, status: 'confirmed', driverId: '1', driver: drivers[0] });
    setDriverAvailableRides(driverAvailableRides.filter(r => r.id !== ride.id));
  };
  
  const handleRejectRide = (rideId: string) => {
    setDriverAvailableRides(driverAvailableRides.filter(r => r.id !== rideId));
  };
  
  const handleUpdateStatus = (status: Ride['status']) => {
    if (driverCurrentRide) {
      updateRideStatus(driverCurrentRide.id, status);
      setDriverCurrentRide({ ...driverCurrentRide, status });
      if (status === 'completed') {
        setTimeout(() => {
          setDriverCurrentRide(null);
        }, 3000);
      }
    }
  };
  
  const currentDriver = drivers[0];
  
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentDriver.profileImage}
              alt={currentDriver.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-violet-500"
            />
            <div>
              <h1 className="text-lg font-bold text-white">{currentDriver.name}</h1>
              <div className="flex items-center gap-2 text-sm">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-slate-400">{currentDriver.rating} • {currentDriver.completedRides} rides</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl bg-slate-900/50 border border-slate-800">
              <Bell size={20} className="text-slate-400" />
              {driverAvailableRides.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full text-xs text-white flex items-center justify-center">
                  {driverAvailableRides.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowEarnings(true)}
              className="p-2 rounded-xl bg-slate-900/50 border border-slate-800"
            >
              <DollarSign size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-6 pb-32">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">{isDriverOnline ? 'You\'re Online' : 'You\'re Offline'}</p>
              <p className="text-slate-400 text-sm">
                {isDriverOnline ? `Time online: ${formatTime(timeOnline)}` : 'Go online to receive ride requests'}
              </p>
            </div>
            <button
              onClick={() => setDriverOnline(!isDriverOnline)}
              className={`p-3 rounded-xl transition-all ${
                isDriverOnline ? 'bg-green-500 hover:bg-green-400' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {isDriverOnline ? <ToggleRight size={28} className="text-white" /> : <ToggleLeft size={28} className="text-slate-400" />}
            </button>
          </div>
        </div>
        
        <div className="relative h-64 bg-gradient-to-br from-violet-900/20 to-cyan-900/20 rounded-3xl overflow-hidden mb-6 border border-slate-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-violet-400 mx-auto mb-2" />
              <p className="text-slate-400">Driver Map View</p>
              <p className="text-slate-500 text-sm">Your current location</p>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {driverCurrentRide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-2xl border border-violet-500/30 p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Active Ride</h2>
                <span className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm font-semibold">
                  {driverCurrentRide.status}
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5" />
                  <div>
                    <p className="text-slate-500 text-xs">Pickup</p>
                    <p className="text-white">{driverCurrentRide.pickup.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5" />
                  <div>
                    <p className="text-slate-500 text-xs">Drop-off</p>
                    <p className="text-white">{driverCurrentRide.dropoff.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6 p-4 bg-slate-900/50 rounded-xl">
                <div>
                  <p className="text-slate-400 text-sm">Rider</p>
                  <p className="text-white font-medium">{driverCurrentRide.riderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-violet-400">${driverCurrentRide.fare.toFixed(2)}</p>
                  <p className="text-slate-500 text-sm">{driverCurrentRide.duration} min • {driverCurrentRide.distance.toFixed(1)} km</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {driverCurrentRide.status === 'confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus('arriving')}
                    className="w-full py-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
                  >
                    <Navigation size={20} />
                    Navigate to Pickup
                  </button>
                )}
                {driverCurrentRide.status === 'arriving' && (
                  <button
                    onClick={() => handleUpdateStatus('started')}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Start Trip
                  </button>
                )}
                {driverCurrentRide.status === 'started' && (
                  <button
                    onClick={() => handleUpdateStatus('completed')}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Complete Trip
                  </button>
                )}
                <div className="flex gap-3">
                  <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-white font-medium flex items-center justify-center gap-2">
                    <Phone size={20} />
                    Call Rider
                  </button>
                  <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-white font-medium flex items-center justify-center gap-2">
                    <Navigation size={20} />
                    Navigate
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {isDriverOnline && !driverCurrentRide && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
              Incoming Requests
            </h2>
            {driverAvailableRides.length === 0 ? (
              <div className="text-center py-12">
                <Car size={64} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400">Waiting for ride requests...</p>
                <p className="text-slate-500 text-sm">Stay online to receive requests</p>
              </div>
            ) : (
              driverAvailableRides.map((ride) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white font-bold">{ride.riderName}</p>
                      <p className="text-slate-400 text-sm">{ride.rideType.charAt(0).toUpperCase() + ride.rideType.slice(1)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-violet-400">${ride.fare.toFixed(2)}</p>
                      <p className="text-slate-500 text-sm">{ride.duration} min • {ride.distance.toFixed(1)} km</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5" />
                      <p className="text-slate-300 text-sm">{ride.pickup.address}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5" />
                      <p className="text-slate-300 text-sm">{ride.dropoff.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleRejectRide(ride.id)}
                      className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 font-medium flex items-center justify-center gap-2"
                    >
                      <XCircle size={18} />
                      Decline
                    </button>
                    <button
                      onClick={() => handleAcceptRide(ride)}
                      className="flex-1 py-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl text-white font-bold flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Accept
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </main>
      
      <AnimatePresence>
        {showEarnings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEarnings(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto z-50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Earnings</h2>
                <button onClick={() => setShowEarnings(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Today', value: driverEarnings.today, rides: driverEarnings.ridesToday },
                  { label: 'This Week', value: driverEarnings.week, rides: driverEarnings.ridesWeek },
                  { label: 'This Month', value: driverEarnings.month, rides: driverEarnings.ridesMonth },
                  { label: 'Total', value: driverEarnings.total, rides: drivers[0].completedRides }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-400">{item.label}</p>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-violet-400">${item.value.toFixed(2)}</p>
                        <p className="text-slate-500 text-sm">{item.rides} rides</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
