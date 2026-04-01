import { motion } from 'framer-motion';
import type { Ride } from '../types';
import { 
  Navigation, Phone, MessageCircle, Star,
  Car, Clock
} from 'lucide-react';
import { useState } from 'react';

interface RideTrackingProps {
  ride: Ride;
  onCancel?: () => void;
  onRate?: (rating: number) => void;
}

export function RideTracking({ ride, onCancel, onRate }: RideTrackingProps) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  
  if (!ride.driver) return null;
  
  const statusSteps = [
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'arriving', label: 'Arriving' },
    { key: 'started', label: 'In Transit' },
    { key: 'completed', label: 'Completed' }
  ];
  
  const currentStepIndex = statusSteps.findIndex(step => step.key === ride.status);
  
  const handleRating = (stars: number) => {
    setRating(stars);
    onRate?.(stars);
    setShowRating(false);
  };
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/95 backdrop-blur-xl rounded-t-3xl border-t border-slate-800 p-6"
    >
      {/* Status Progress */}
      <div className="flex items-center justify-between mb-6">
        {statusSteps.map((step, idx) => {
          const isActive = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          return (
            <div key={step.key} className="flex-1 flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-violet-500' : 'bg-slate-800'
                } ${isCurrent ? 'ring-4 ring-violet-500/30' : ''}`}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Car size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
              </motion.div>
              <p className={`text-xs mt-2 ${isActive ? 'text-violet-400' : 'text-slate-500'}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* Driver Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={ride.driver.profileImage}
            alt={ride.driver.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-violet-500"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
            <Star size={12} className="text-white fill-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{ride.driver.name}</h3>
          <p className="text-slate-400 text-sm">
            {ride.driver.vehicle.color} {ride.driver.vehicle.make} {ride.driver.vehicle.model}
          </p>
          <p className="text-slate-500 text-xs">{ride.driver.vehicle.plateNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-violet-400 font-bold">{ride.driver.rating} ★</p>
          <p className="text-slate-500 text-xs">{ride.driver.completedRides} rides</p>
        </div>
      </div>
      
      {/* Route Info */}
      <div className="bg-slate-800/50 rounded-2xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center pt-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="w-0.5 h-8 bg-slate-700" />
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-xs text-slate-500">Pickup</p>
              <p className="text-white font-medium">{ride.pickup.name || ride.pickup.address}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Drop-off</p>
              <p className="text-white font-medium">{ride.dropoff.name || ride.dropoff.address}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-violet-400 font-bold">${ride.fare.toFixed(2)}</p>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <Clock size={14} />
              <span>{ride.duration} min</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      {ride.status === 'completed' ? (
        !showRating ? (
          <motion.button
            onClick={() => setShowRating(true)}
            className="w-full py-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl text-white font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Rate Your Ride
          </motion.button>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-white font-medium">Rate your experience</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  onClick={() => handleRating(star)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    size={32}
                    className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="flex gap-3">
          <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-white font-medium transition-colors flex items-center justify-center gap-2">
            <Phone size={20} />
            Call
          </button>
          <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-white font-medium transition-colors flex items-center justify-center gap-2">
            <MessageCircle size={20} />
            Message
          </button>
          <button className="flex-1 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl text-white font-medium flex items-center justify-center gap-2">
            <Navigation size={20} />
            Navigate
          </button>
        </div>
      )}
      
      {ride.status !== 'completed' && onCancel && (
        <button
          onClick={onCancel}
          className="w-full mt-3 py-3 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
        >
          Cancel Ride
        </button>
      )}
    </motion.div>
  );
}
