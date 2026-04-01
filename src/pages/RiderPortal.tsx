import { useState } from 'react';
import { useStore } from '../lib/store';
import { rideOptions } from '../data/mockData';
import { RideOptionCard } from '../components/RideOptionCard';
import { LocationSearch } from '../components/LocationSearch';
import { RideTracking } from '../components/RideTracking';
import { RideHistoryCard } from '../components/RideHistoryCard';
import { 
  Menu, MapPin, Wallet, History, Settings,
  CreditCard, X, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function RiderPortal() {
  const {
    pickupLocation,
    setPickupLocation,
    dropoffLocation,
    setDropoffLocation,
    selectedRideType,
    setSelectedRideType,
    searchingForDriver,
    setSearchingForDriver,
    currentRide,
    setCurrentRide,
    rideHistory,
    paymentMethod,
    setPaymentMethod
  } = useStore();
  
  const [pickupInput, setPickupInput] = useState('');
  const [dropoffInput, setDropoffInput] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'history'>('home');
  const [showMenu, setShowMenu] = useState(false);
  
  const calculateFare = (option: typeof rideOptions[0]) => {
    const distance = 8.5;
    const duration = 25;
    return option.baseFare + (option.perKm * distance) + (option.perMinute * duration);
  };
  
  const handleBookRide = () => {
    if (!pickupLocation || !dropoffLocation || !selectedRideType) return;
    
    setSearchingForDriver(true);
    
    setTimeout(() => {
      const newRide = {
        id: `ride-${Date.now()}`,
        riderId: 'rider-1',
        riderName: 'Alex Thompson',
        riderPhone: '+1 (555) 987-6543',
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        rideType: selectedRideType,
        status: 'confirmed' as const,
        fare: calculateFare(rideOptions.find(o => o.type === selectedRideType)!),
        distance: 8.5,
        duration: 25,
        createdAt: new Date(),
        paymentMethod
      } as any;
      
      setCurrentRide(newRide);
      setSearchingForDriver(false);
    }, 3000);
  };
  
  const handleCancelRide = () => {
    setCurrentRide(null);
    setSelectedRideType(null);
    setPickupLocation(null);
    setDropoffLocation(null);
    setPickupInput('');
    setDropoffInput('');
  };
  
  const handleRateRide = (rating: number) => {
    console.log('Rated ride:', rating);
    handleCancelRide();
  };
  
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-16 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            SwiftRide
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'home' ? 'history' : 'home')}
              className={`p-2 rounded-xl transition-colors ${
                activeTab === 'history' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <History size={20} />
            </button>
            <button
              onClick={() => setShowMenu(true)}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-6 pb-32">
        {activeTab === 'home' ? (
          <>
            {!currentRide && !searchingForDriver && (
              <div className="relative h-64 bg-gradient-to-br from-violet-900/20 to-cyan-900/20 rounded-3xl overflow-hidden mb-6 border border-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-violet-400 mx-auto mb-2" />
                    <p className="text-slate-400">Map View</p>
                    <p className="text-slate-500 text-sm">Your location is visible</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button className="p-3 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-700">
                    <Navigation size={20} className="text-violet-400" />
                  </button>
                </div>
              </div>
            )}
            
            <AnimatePresence>
              {searchingForDriver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center pt-20"
                >
                  <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-4 border-violet-500/30 rounded-full" />
                    <motion.div
                      className="absolute inset-0 border-4 border-violet-500 rounded-full border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-4 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-4xl">🚗</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Finding your driver...</h2>
                  <p className="text-slate-400">This usually takes less than a minute</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {currentRide && (
              <RideTracking ride={currentRide} onCancel={handleCancelRide} onRate={handleRateRide} />
            )}
            
            {!currentRide && !searchingForDriver && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <LocationSearch
                    type="pickup"
                    value={pickupInput}
                    onChange={setPickupInput}
                    onSelect={setPickupLocation}
                    placeholder="Where to?"
                  />
                  <LocationSearch
                    type="dropoff"
                    value={dropoffInput}
                    onChange={setDropoffInput}
                    onSelect={setDropoffLocation}
                    placeholder="Drop-off location"
                  />
                </div>
                
                {pickupLocation && dropoffLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-bold text-white">Choose a ride</h3>
                    {rideOptions.map((option) => (
                      <RideOptionCard
                        key={option.id}
                        option={option}
                        fare={calculateFare(option)}
                        isSelected={selectedRideType === option.type}
                        onSelect={() => setSelectedRideType(option.type)}
                      />
                    ))}
                  </motion.div>
                )}
                
                {selectedRideType && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-4"
                  >
                    <h3 className="text-white font-bold mb-3">Payment Method</h3>
                    <div className="flex gap-2">
                      {(['card', 'cash', 'wallet'] as const).map((method) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                            paymentMethod === method
                              ? 'bg-violet-500 text-white'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {method === 'card' && <CreditCard size={18} className="inline mr-2" />}
                          {method === 'cash' && <span className="inline mr-2">💵</span>}
                          {method === 'wallet' && <Wallet size={18} className="inline mr-2" />}
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {selectedRideType && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleBookRide}
                    className="w-full py-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl text-white font-bold text-lg hover:from-violet-400 hover:to-cyan-400 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm SwiftRide
                  </motion.button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Your Rides</h2>
            {rideHistory.map((ride) => (
              <RideHistoryCard key={ride.id} ride={ride} />
            ))}
          </div>
        )}
      </main>
      
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-slate-950 border-r border-slate-800 z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-white">Menu</h2>
                  <button onClick={() => setShowMenu(false)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {[
                    { icon: History, label: 'Ride History', action: () => { setActiveTab('history'); setShowMenu(false); } },
                    { icon: Wallet, label: 'Wallet', action: () => {} },
                    { icon: MapPin, label: 'Saved Places', action: () => {} },
                    { icon: Settings, label: 'Settings', action: () => {} },
                    { icon: CreditCard, label: 'Payment Methods', action: () => {} }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 transition-colors text-left"
                      >
                        <Icon size={20} className="text-slate-400" />
                        <span className="text-white">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
