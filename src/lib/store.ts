import { create } from 'zustand';
import type { Ride, Driver, Location, RideType } from '../types';
import { initialRides, currentRider } from '../data/mockData';

interface AppState {
  // Current portal
  currentPortal: 'rider' | 'driver' | 'admin';
  setPortal: (portal: 'rider' | 'driver' | 'admin') => void;
  
  // Rider state
  selectedRideType: RideType | null;
  setSelectedRideType: (type: RideType | null) => void;
  
  pickupLocation: Location | null;
  setPickupLocation: (location: Location | null) => void;
  
  dropoffLocation: Location | null;
  setDropoffLocation: (location: Location | null) => void;
  
  currentRide: Ride | null;
  setCurrentRide: (ride: Ride | null) => void;
  
  rideHistory: Ride[];
  setRideHistory: (rides: Ride[]) => void;
  
  paymentMethod: 'cash' | 'card' | 'wallet';
  setPaymentMethod: (method: 'cash' | 'card' | 'wallet') => void;
  
  // Driver state
  isDriverOnline: boolean;
  setDriverOnline: (online: boolean) => void;
  
  driverCurrentRide: Ride | null;
  setDriverCurrentRide: (ride: Ride | null) => void;
  
  driverAvailableRides: Ride[];
  setDriverAvailableRides: (rides: Ride[]) => void;
  
  // Admin state
  allRides: Ride[];
  setAllRides: (rides: Ride[]) => void;
  
  updateRideStatus: (rideId: string, status: Ride['status']) => void;
  assignDriver: (rideId: string, driver: Driver) => void;
  
  // UI state
  showRideOptions: boolean;
  setShowRideOptions: (show: boolean) => void;
  
  searchingForDriver: boolean;
  setSearchingForDriver: (searching: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Portal
  currentPortal: 'rider',
  setPortal: (portal) => set({ currentPortal: portal }),
  
  // Rider state
  selectedRideType: null,
  setSelectedRideType: (type) => set({ selectedRideType: type }),
  
  pickupLocation: null,
  setPickupLocation: (location) => set({ pickupLocation: location }),
  
  dropoffLocation: null,
  setDropoffLocation: (location) => set({ dropoffLocation: location }),
  
  currentRide: null,
  setCurrentRide: (ride) => set({ currentRide: ride }),
  
  rideHistory: initialRides.filter(r => r.riderId === currentRider.id),
  setRideHistory: (rides) => set({ rideHistory: rides }),
  
  paymentMethod: 'card',
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  
  // Driver state
  isDriverOnline: true,
  setDriverOnline: (online) => set({ isDriverOnline: online }),
  
  driverCurrentRide: null,
  setDriverCurrentRide: (ride) => set({ driverCurrentRide: ride }),
  
  driverAvailableRides: [],
  setDriverAvailableRides: (rides) => set({ driverAvailableRides: rides }),
  
  // Admin state
  allRides: initialRides,
  setAllRides: (rides) => set({ allRides: rides }),
  
  updateRideStatus: (rideId, status) => set((state) => ({
    allRides: state.allRides.map((ride) =>
      ride.id === rideId ? { ...ride, status } : ride
    ),
    currentRide: state.currentRide?.id === rideId
      ? { ...state.currentRide, status }
      : state.currentRide,
    driverCurrentRide: state.driverCurrentRide?.id === rideId
      ? { ...state.driverCurrentRide, status }
      : state.driverCurrentRide
  })),
  
  assignDriver: (rideId, driver) => set((state) => ({
    allRides: state.allRides.map((ride) =>
      ride.id === rideId
        ? { ...ride, driverId: driver.id, driver, status: 'confirmed' as const }
        : ride
    )
  })),
  
  // UI state
  showRideOptions: false,
  setShowRideOptions: (show) => set({ showRideOptions: show }),
  
  searchingForDriver: false,
  setSearchingForDriver: (searching) => set({ searchingForDriver: searching })
}));
