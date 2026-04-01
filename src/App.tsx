import { useStore } from './lib/store';
import { PortalSelector } from './components/PortalSelector';
import { RiderPortal } from './pages/RiderPortal';
import { DriverPortal } from './pages/DriverPortal';
import { AdminPortal } from './pages/AdminPortal';

function App() {
  const { currentPortal } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PortalSelector />
      
      {currentPortal === 'rider' && <RiderPortal />}
      {currentPortal === 'driver' && <DriverPortal />}
      {currentPortal === 'admin' && <AdminPortal />}
    </div>
  );
}

export default App;
