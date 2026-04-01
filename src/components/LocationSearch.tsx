import { useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { savedLocations, recentLocations } from '../data/mockData';
import type { Location } from '../types';

interface LocationSearchProps {
  type: 'pickup' | 'dropoff';
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: Location) => void;
  placeholder: string;
}

export function LocationSearch({ type, value, onChange, onSelect, placeholder }: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const allLocations = [...savedLocations, ...recentLocations];
  const filteredLocations = value
    ? allLocations.filter(loc => 
        loc.address.toLowerCase().includes(value.toLowerCase()) ||
        loc.name?.toLowerCase().includes(value.toLowerCase())
      )
    : savedLocations;
  
  return (
    <div className="relative">
      <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 p-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          type === 'pickup' ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          <MapPin size={20} className={type === 'pickup' ? 'text-green-400' : 'text-red-400'} />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-white placeholder-slate-500"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="text-slate-400">✕</span>
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && filteredLocations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden z-50 max-h-64 overflow-y-auto"
          >
            {filteredLocations.map((location, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  onSelect({
                    lat: location.lat,
                    lng: location.lng,
                    address: location.address,
                    name: location.name
                  });
                  onChange(location.address);
                  setIsOpen(false);
                }}
                className="w-full p-4 flex items-center gap-3 hover:bg-slate-800/50 transition-colors text-left"
                whileHover={{ x: 4 }}
              >
                <MapPin size={18} className="text-slate-400" />
                <div className="flex-1">
                  {location.name && (
                    <p className="text-white font-medium">{location.name}</p>
                  )}
                  <p className="text-slate-400 text-sm">{location.address}</p>
                </div>
                {savedLocations.find(sl => sl.address === location.address) && (
                  <Star size={16} className="text-violet-400" fill="currentColor" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
