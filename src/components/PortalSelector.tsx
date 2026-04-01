import { motion } from 'framer-motion';
import { useStore } from '../lib/store';
import { Car, UserCog, LayoutDashboard } from 'lucide-react';

export function PortalSelector() {
  const { currentPortal, setPortal } = useStore();
  
  const portals = [
    { id: 'rider' as const, label: 'Rider', icon: Car },
    { id: 'driver' as const, label: 'Driver', icon: UserCog },
    { id: 'admin' as const, label: 'Admin', icon: LayoutDashboard }
  ];
  
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-2 flex gap-2">
        {portals.map((portal) => {
          const Icon = portal.icon;
          const isActive = currentPortal === portal.id;
          return (
            <motion.button
              key={portal.id}
              onClick={() => setPortal(portal.id)}
              className={`relative px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white'
                  : 'text-slate-400 hover:text-violet-400 hover:bg-violet-500/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{portal.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
