import type { RideOption, Driver, Ride, Rider, Earnings } from '../types';

export const rideOptions: RideOption[] = [
  {
    id: '1',
    type: 'economy',
    name: 'Swift Economy',
    description: 'Affordable everyday rides',
    icon: '🚗',
    baseFare: 3.50,
    perKm: 1.20,
    perMinute: 0.25,
    capacity: 4,
    estimatedTime: '4 min',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
  },
  {
    id: '2',
    type: 'premium',
    name: 'Swift Premium',
    description: 'Luxury rides in style',
    icon: '🚙',
    baseFare: 6.00,
    perKm: 2.00,
    perMinute: 0.40,
    capacity: 4,
    estimatedTime: '4 min',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400'
  },
  {
    id: '3',
    type: 'suv',
    name: 'Swift XL',
    description: 'Room for 6 passengers',
    icon: '🚐',
    baseFare: 8.00,
    perKm: 2.50,
    perMinute: 0.50,
    capacity: 6,
    estimatedTime: '6 min',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400'
  },
  {
    id: '4',
    type: 'bike',
    name: 'Swift Bike',
    description: 'Quick bike rides',
    icon: '🏍️',
    baseFare: 2.00,
    perKm: 0.80,
    perMinute: 0.15,
    capacity: 1,
    estimatedTime: '2 min',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400'
  }
];

export const drivers: Driver[] = [
  {
    id: '1',
    name: 'Michael Chen',
    phone: '+1 (555) 123-4567',
    rating: 4.9,
    completedRides: 2847,
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Silver',
      plateNumber: 'ABC-1234',
      type: 'economy'
    },
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    isOnline: true,
    currentLocation: { lat: 40.7128, lng: -74.0060, address: 'Manhattan, NY' }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    rating: 4.8,
    completedRides: 1923,
    vehicle: {
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      color: 'White',
      plateNumber: 'XYZ-5678',
      type: 'premium'
    },
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    isOnline: true,
    currentLocation: { lat: 40.7580, lng: -73.9855, address: 'Times Square, NY' }
  },
  {
    id: '3',
    name: 'David Martinez',
    phone: '+1 (555) 345-6789',
    rating: 4.7,
    completedRides: 1456,
    vehicle: {
      make: 'Honda',
      model: 'CR-V',
      year: 2021,
      color: 'Black',
      plateNumber: 'DEF-9012',
      type: 'suv'
    },
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    isOnline: true,
    currentLocation: { lat: 40.7484, lng: -73.9857, address: 'Empire State Building, NY' }
  },
  {
    id: '4',
    name: 'Emily Brown',
    phone: '+1 (555) 456-7890',
    rating: 4.9,
    completedRides: 3102,
    vehicle: {
      make: 'Harley-Davidson',
      model: 'Street Glide',
      year: 2022,
      color: 'Black',
      plateNumber: 'GHI-3456',
      type: 'bike'
    },
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    isOnline: false,
    currentLocation: { lat: 40.7614, lng: -73.9776, address: 'Central Park, NY' }
  },
  {
    id: '5',
    name: 'James Wilson',
    phone: '+1 (555) 567-8901',
    rating: 4.6,
    completedRides: 892,
    vehicle: {
      make: 'Hyundai',
      model: 'Elantra',
      year: 2020,
      color: 'Blue',
      plateNumber: 'JKL-7890',
      type: 'economy'
    },
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    isOnline: true,
    currentLocation: { lat: 40.7282, lng: -73.7949, address: 'Queens, NY' }
  }
];

export const currentRider: Rider = {
  id: 'rider-1',
  name: 'Alex Thompson',
  email: 'alex.thompson@email.com',
  phone: '+1 (555) 987-6543',
  profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
  rating: 4.8,
  totalRides: 156,
  walletBalance: 45.50
};

export const initialRides: Ride[] = [
  {
    id: 'ride-001',
    riderId: 'rider-1',
    riderName: 'Alex Thompson',
    riderPhone: '+1 (555) 987-6543',
    driverId: '1',
    driver: drivers[0],
    pickup: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main Street, Manhattan, NY',
      name: 'Home'
    },
    dropoff: {
      lat: 40.7580,
      lng: -73.9855,
      address: '456 Broadway, New York, NY',
      name: 'Office'
    },
    rideType: 'economy',
    status: 'completed',
    fare: 18.50,
    distance: 8.5,
    duration: 25,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
    completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 60 * 1000),
    rating: 5,
    paymentMethod: 'card'
  },
  {
    id: 'ride-002',
    riderId: 'rider-1',
    riderName: 'Alex Thompson',
    riderPhone: '+1 (555) 987-6543',
    driverId: '2',
    driver: drivers[1],
    pickup: {
      lat: 40.7484,
      lng: -73.9857,
      address: 'Empire State Building, NY',
      name: 'Empire State Building'
    },
    dropoff: {
      lat: 40.7614,
      lng: -73.9776,
      address: 'Central Park, NY',
      name: 'Central Park'
    },
    rideType: 'premium',
    status: 'completed',
    fare: 32.00,
    distance: 3.2,
    duration: 12,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 3 * 60 * 1000),
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
    rating: 4,
    paymentMethod: 'card'
  },
  {
    id: 'ride-003',
    riderId: 'rider-2',
    riderName: 'Jessica Lee',
    riderPhone: '+1 (555) 111-2222',
    pickup: {
      lat: 40.7282,
      lng: -73.7949,
      address: 'Queens Center Mall, NY',
      name: 'Shopping Mall'
    },
    dropoff: {
      lat: 40.7589,
      lng: -73.9851,
      address: 'Penn Station, NY',
      name: 'Penn Station'
    },
    rideType: 'economy',
    status: 'started',
    fare: 24.75,
    distance: 12.3,
    duration: 35,
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    startedAt: new Date(Date.now() - 10 * 60 * 1000),
    paymentMethod: 'cash'
  },
  {
    id: 'ride-004',
    riderId: 'rider-3',
    riderName: 'Robert Kim',
    riderPhone: '+1 (555) 333-4444',
    pickup: {
      lat: 40.7527,
      lng: -73.9772,
      address: 'Grand Central Terminal, NY',
      name: 'Grand Central'
    },
    dropoff: {
      lat: 40.7614,
      lng: -73.9776,
      address: 'Central Park Zoo, NY',
      name: 'Central Park Zoo'
    },
    rideType: 'suv',
    status: 'arriving',
    fare: 15.00,
    distance: 2.5,
    duration: 8,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    paymentMethod: 'card'
  }
];

export const driverEarnings: Earnings = {
  today: 187.50,
  week: 892.25,
  month: 3456.75,
  total: 45678.90,
  ridesToday: 12,
  ridesWeek: 68,
  ridesMonth: 287
};

export const savedLocations = [
  { id: '1', name: 'Home', address: '123 Main Street, Manhattan, NY', lat: 40.7128, lng: -74.0060 },
  { id: '2', name: 'Office', address: '456 Broadway, New York, NY', lat: 40.7580, lng: -73.9855 },
  { id: '3', name: 'Gym', address: '789 Fitness Ave, Brooklyn, NY', lat: 40.6782, lng: -73.9442 },
  { id: '4', name: 'Airport', address: 'JFK International Airport, NY', lat: 40.6413, lng: -73.7781 }
];

export const recentLocations = [
  { address: 'Times Square, New York, NY', lat: 40.7580, lng: -73.9855, name: 'Times Square' },
  { address: 'Central Park, New York, NY', lat: 40.7614, lng: -73.9776, name: 'Central Park' },
  { address: 'Brooklyn Bridge, New York, NY', lat: 40.7061, lng: -73.9969, name: 'Brooklyn Bridge' },
  { address: 'Statue of Liberty, NY', lat: 40.6892, lng: -74.0445, name: 'Statue of Liberty' }
];
