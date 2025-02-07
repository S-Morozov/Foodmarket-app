const ENV = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '',
  },
  staging: {
    apiUrl: 'https://staging-api.foodmarket.app/api',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '',
  },
  production: {
    apiUrl: 'https://api.foodmarket.app/api',
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '',
  },
};

type Environment = 'development' | 'staging' | 'production';

const getEnvironment = (): Environment => {
  if (__DEV__) return 'development';
  return (process.env.EXPO_PUBLIC_ENV as Environment) || 'production';
};

const config = {
  ...ENV[getEnvironment()],
  fees: {
    service: 2.99,
    delivery: 5.99,
  },
  defaultLocation: {
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  },
  pagination: {
    defaultLimit: 20,
  },
};

export default config;
