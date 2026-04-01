import { motion } from 'framer-motion';
import type { RideOption } from '../types';
import { Users, Clock } from 'lucide-react';

interface RideOptionCardProps {
  option: RideOption;
  fare: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function RideOptionCard({ option, fare, isSelected, onSelect }: RideOptionCardProps) {
  return (
    <motion.div
      onClick={onSelect}
      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-violet-500 bg-violet-500/10'
          : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={option.image}
            alt={option.name}
            className="w-20 h-16 object-cover rounded-lg"
          />
          <span className="absolute -top-2 -left-2 text-2xl">{option.icon}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-white">{option.name}</h3>
            <span className="text-xl font-bold text-violet-400">${fare.toFixed(2)}</span>
          </div>
          <p className="text-sm text-slate-400 mb-2">{option.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{option.capacity} seats</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{option.estimatedTime} away</span>
            </div>
          </div>
        </div>
        
        {isSelected && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}
