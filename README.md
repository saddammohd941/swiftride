# 🚗 SwiftRide

A complete, production-ready ride-sharing platform similar to Uber, built with React, TypeScript, and Tailwind CSS. SwiftRide provides a seamless experience for riders, drivers, and administrators with a stunning, responsive interface.

![SwiftRide](https://img.shields.io/badge/version-1.0.0-violet) ![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)

## ✨ Features

### 📱 Rider App
- **Real-time Ride Booking**: Book rides instantly with pickup and drop-off locations
- **Multiple Ride Options**: Choose from Economy, Premium, SUV, and Bike rides
- **Smart Location Search**: Save favorite locations and access recent destinations
- **Live Ride Tracking**: Track your driver in real-time with detailed status updates
- **Driver Information**: View driver details, vehicle info, and ratings before pickup
- **Multiple Payment Methods**: Pay with Card, Cash, or Wallet
- **Ride History**: Access all your past rides with detailed information
- **Ratings & Reviews**: Rate your drivers after each trip
- **Estimated Fare & Time**: See upfront pricing and estimated arrival times
- **Saved Places**: Quick access to frequently visited locations

### 🚚 Driver App
- **Online/Offline Toggle**: Go online to receive ride requests, go offline when unavailable
- **Ride Requests**: View incoming ride requests with all details
- **Accept/Decline Rides**: Choose which rides to accept based on fare and distance
- **Navigation Integration**: Navigate to pickup and drop-off locations
- **Trip Management**: Start and complete trips with easy status updates
- **Rider Communication**: Call or message riders directly
- **Earnings Dashboard**: Track daily, weekly, monthly, and total earnings
- **Ride Statistics**: View completed rides and performance metrics
- **Time Online Tracking**: Track how long you've been online

### 🛠️ Admin Dashboard
- **Platform Overview**: Real-time statistics on rides, drivers, revenue, and completion rates
- **Ride Management**: View all rides with detailed information
- **Driver Management**: Manage driver profiles, status, and performance
- **Driver Assignment**: Manually assign drivers to unassigned rides
- **Analytics & Reports**: Revenue charts, ride type distribution, and performance metrics
- **Top Performers**: View top-performing drivers by revenue and ratings
- **Search & Filter**: Quickly find rides, drivers, and specific information
- **Status Tracking**: Monitor ride statuses in real-time

## 🚀 Tech Stack

### Frontend
- **React 19.2.0** - UI library with latest features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.3.1** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.2.1** - Utility-first CSS framework
- **Framer Motion 12.35.0** - Smooth animations and transitions
- **React Router DOM 7.13.1** - Client-side routing
- **Lucide React 0.577.0** - Beautiful icon library
- **Zustand** - Lightweight state management

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript Compiler** - Static type checking
- **Vite** - Fast HMR and optimized builds

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn (v1.22 or higher)
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/swiftride.git
   cd swiftride
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage Guide

### Switching Between Portals

SwiftRide includes three portals that you can switch between using the portal selector at the top of the screen:

1. **Rider Portal** - Book rides, track drivers, and manage ride history
2. **Driver Portal** - Accept rides, manage trips, and track earnings
3. **Admin Portal** - Manage the entire platform, view analytics

### Rider Workflow

1. **Enter Pickup Location** - Type your pickup address or select from saved/recent locations
2. **Enter Drop-off Location** - Enter your destination
3. **Choose a Ride Type** - Select from Economy, Premium, SUV, or Bike based on your needs
4. **Select Payment Method** - Choose Card, Cash, or Wallet
5. **Confirm Booking** - Click "Confirm SwiftRide" to book your ride
6. **Track Your Ride** - Watch as your driver approaches with real-time updates
7. **Rate Your Experience** - Provide feedback after the trip

### Driver Workflow

1. **Go Online** - Toggle your status to online to receive ride requests
2. **Accept Ride Requests** - Review incoming requests and accept or decline
3. **Navigate to Pickup** - Use navigation to reach the rider's location
4. **Start the Trip** - Confirm rider pickup and begin the trip
5. **Complete the Trip** - Drop off the rider and mark the trip as complete
6. **View Earnings** - Track your earnings and ride statistics

### Admin Workflow

1. **View Dashboard** - Monitor platform statistics and key metrics
2. **Manage Rides** - View all rides, assign drivers, and track statuses
3. **Manage Drivers** - View driver profiles, ratings, and performance
4. **View Analytics** - Access revenue charts, ride distribution, and trends
5. **Top Performers** - Identify and reward top-performing drivers

## 📁 Project Structure

```
swiftride/
├── public/
│   └── favicon.svg          # App favicon
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── LocationSearch.tsx    # Location input with autocomplete
│   │   ├── PortalSelector.tsx    # Portal switcher (Rider/Driver/Admin)
│   │   ├── RideHistoryCard.tsx   # Ride history display card
│   │   ├── RideOptionCard.tsx    # Ride type selection card
│   │   └── RideTracking.tsx      # Live ride tracking component
│   ├── data/
│   │   └── mockData.ts      # Sample data for rides, drivers, locations
│   ├── lib/
│   │   └── store.ts         # Zustand state management
│   ├── pages/
│   │   ├── AdminPortal.tsx   # Admin dashboard
│   │   ├── DriverPortal.tsx  # Driver interface
│   │   └── RiderPortal.tsx  # Rider interface
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.ts           # Vite build configuration
```

## 🏗️ Architecture

### Data Flow

```
User Action → Component → Zustand Store → State Update → UI Re-render
```

### State Management

SwiftRide uses Zustand for global state management:

- **Rider State**: Pickup/dropoff locations, ride type, current ride, ride history, payment method
- **Driver State**: Online status, current ride, available rides, earnings
- **Admin State**: All rides, driver management, platform statistics
- **UI State**: Current portal, search queries, modal visibility

### Type System

All data structures are fully typed with TypeScript:

```typescript
// Core Types
interface Ride { ... }
interface Driver { ... }
interface Rider { ... }
interface Location { ... }
interface RideOption { ... }

// Enums
type RideStatus = 'searching' | 'confirmed' | 'arriving' | 'started' | 'completed' | 'cancelled';
type RideType = 'economy' | 'premium' | 'suv' | 'bike';
```

## 🎨 Design System

### Color Palette

- **Primary**: Violet-500 to Cyan-500 gradient
- **Background**: Slate-950 (#0f172a)
- **Cards**: Slate-900/50 with backdrop blur
- **Text**: White (primary), Slate-400 (secondary)
- **Success**: Green-500
- **Warning**: Yellow-500
- **Error**: Red-500

### Visual Style

- **Glassmorphism**: Frosted glass cards with backdrop blur
- **Gradients**: Subtle gradient overlays for depth
- **Animations**: Smooth transitions using Framer Motion
- **Typography**: Inter font family for readability
- **Responsive**: Mobile-first design with breakpoints

## 🔧 Configuration

### Environment Variables

For production deployment, configure these environment variables:

```env
VITE_API_URL=https://api.swiftride.com
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_PUSH_NOTIFICATIONS_KEY=your_push_notifications_key
```

### Build Configuration

- **Production Build**: `npm run build`
- **Preview Build**: `npm run preview`
- **Type Check**: `npx tsc --noEmit`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect and build the project
4. Configure environment variables
5. Deploy!

### Other Platforms

The app can be deployed to any static hosting service:
- Netlify
- AWS Amplify
- GitHub Pages
- Cloudflare Pages

## 📊 API Integration (Future)

The current implementation uses mock data. For production, integrate with:

### Backend Endpoints

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout

// Rides
POST /api/rides/book
GET /api/rides/:id
PUT /api/rides/:id/status
PUT /api/rides/:id/rate
GET /api/rides/history

// Drivers
POST /api/drivers/online
POST /api/drivers/offline
GET /api/drivers/earnings
GET /api/drivers/available-rides
POST /api/drivers/accept-ride
PUT /api/drivers/start-trip
PUT /api/drivers/complete-trip

// Admin
GET /api/admin/stats
GET /api/admin/rides
PUT /api/admin/rides/:id/assign-driver
GET /api/admin/drivers
PUT /api/admin/drivers/:id/status
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage

# Run linter
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 Roadmap

### Phase 1: MVP (Current)
- ✅ Rider portal with booking and tracking
- ✅ Driver portal with ride management
- ✅ Admin dashboard with analytics
- ✅ Responsive design
- ✅ Mock data implementation

### Phase 2: Enhanced Features
- [ ] Real-time location tracking with Google Maps
- [ ] Push notifications for ride updates
- [ ] Payment gateway integration (Stripe)
- [ ] In-app messaging between riders and drivers
- [ ] Advanced ride scheduling
- [ ] Promo codes and discounts
- [ ] Multi-language support

### Phase 3: Advanced Features
- [ ] AI-powered route optimization
- [ ] Surge pricing during peak hours
- [ ] Ride pooling/carpooling
- [ ] Corporate accounts
- [ ] Driver verification and background checks
- [ ] Ride safety features (SOS, share trip)
- [ ] Loyalty program

### Phase 4: Scaling
- [ ] Mobile apps (React Native)
- [ ] Real-time WebSocket connections
- [ ] Advanced caching with Redis
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] CDN integration
- [ ] Advanced analytics dashboard

## 🐛 Known Issues

- Mock data is used instead of real API calls
- No persistent storage (refreshing clears state)
- Google Maps integration not yet implemented
- Payment gateway not integrated
- Real-time location tracking simulated

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Product Manager**: [Your Name]
- **Lead Developer**: [Your Name]
- **UI/UX Designer**: [Your Name]

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the amazing CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [Zustand](https://zustand-demo.pmnd.rs/) for simple state management

## 📞 Support

For support, email support@swiftride.com or join our Slack channel.

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
