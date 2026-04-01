import { motion } from 'framer-motion';
import type { Ride } from '../types';
import { Calendar, Star } from 'lucide-react';

interface RideHistoryCardProps {
  ride: Ride;
}

export function RideHistoryCard({ ride }: RideHistoryCardProps) {
  const rideTypeIcons: Record<string, string> = {
    economy: '🚗',
    premium: '🚙',
    suv: '🚐',
    bike: '🏍️'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-4"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
            {rideTypeIcons[ride.rideType] || '🚗'}
          </div>
          <div>
            <p className="text-white font-medium">{ride.rideType.charAt(0).toUpperCase() + ride.rideType.slice(1)}</p>
            <div className="flex items-center gap-1 text-slate-500 text-sm">
              <Calendar size={14} />
              <span>{new Date(ride.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-violet-400">${ride.fare.toFixed(2)}</p>
          {ride.rating && (
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <Star size={14} fill="currentColor" />
              <span>{ride.rating}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
          <div>
            <p className="text-slate-500 text-xs">Pickup</p>
            <p className="text-white text-sm">{ride.pickup.name || ride.pickup.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
          <div>
            <p className="text-slate-500 text-xs">Drop-off</p>
            <p className="text-white text-sm">{ride.dropoff.name || ride.dropoff.address}</p>
          </div>
        </div>
      </div>
      
      {ride.driver && (
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-3">
          <img
            src={ride.driver.profileImage}
            alt={ride.driver.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="text-slate-400 text-sm">{ride.driver.name}</p>
        </div>
      )}
    </motion.div>
  );
}
