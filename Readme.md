# FoodMarket

A modern food delivery mobile application built with React Native and Expo.

## Features

- Browse restaurants and food categories
- View restaurant details with parallax scroll effect
- Add/remove items with swipe gestures
- Real-time cart calculation with persistence
- Location search with Google Places API
- Smooth animations and haptic feedback
- Finnish localization

## Tech Stack

- **Framework**: React Native 0.76 + Expo SDK 52
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State**: Zustand with AsyncStorage persistence
- **Animations**: React Native Reanimated 3, Lottie
- **UI**: @gorhom/bottom-sheet, gesture-handler

## Architecture

```
├── app/                    # Screens (file-based routing)
├── Components/             # UI components
├── context/                # React Context (Auth)
├── hooks/                  # Custom hooks
├── services/               # API layer
├── store/                  # Zustand stores
├── types/                  # TypeScript definitions
└── config/                 # Configuration
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android
```

## Environment Variables

```env
EXPO_PUBLIC_GOOGLE_API_KEY=your_key
EXPO_PUBLIC_ENV=development
```

## API Configuration

Update `config/index.ts` for your backend:

```typescript
const ENV = {
  development: {
    apiUrl: 'http://localhost:3000/api',
  },
  production: {
    apiUrl: 'https://api.yourapp.com/api',
  },
};
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Food categories |
| GET | `/restaurants` | Restaurant list |
| GET | `/restaurants/:id` | Restaurant details |
| POST | `/orders` | Create order |
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Register |

## Testing

```bash
npm test
```
