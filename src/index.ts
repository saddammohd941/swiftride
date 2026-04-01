export type RideStatus = 'searching' | 'confirmed' | 'arriving' | 'started' | 'completed' | 'cancelled';

export type RideType = 'economy' | 'premium' | 'suv' | 'bike';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  name?: string;
}

export interface RideOption {
  id: string;
  type: RideType;
  name: string;
  description: string;
  icon: string;
  baseFare: number;
  perKm: number;
  perMinute: number;
  capacity: number;
  estimatedTime: string;
  image: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  completedRides: number;
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
    type: RideType;
  };
  profileImage: string;
  isOnline: boolean;
  currentLocation?: Location;
}

export interface Ride {
  id: string;
  riderId: string;
  riderName: string;
  riderPhone: string;
  driverId?: string;
  driver?: Driver;
  pickup: Location;
  dropoff: Location;
  rideType: RideType;
  status: RideStatus;
  fare: number;
  distance: number;
  duration: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  rating?: number;
  paymentMethod: 'cash' | 'card' | 'wallet';
}

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  rating: number;
  totalRides: number;
  walletBalance: number;
}

export interface Earnings {
  today: number;
  week: number;
  month: number;
  total: number;
  ridesToday: number;
  ridesWeek: number;
  ridesMonth: number;
}
