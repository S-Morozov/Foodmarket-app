import { Category, Restaurant, RestaurantDetails, Meal } from '../types';

// Image imports
const categoryImages = {
  c1: require('../assets/data/c1.png'),
  c2: require('../assets/data/c2.png'),
  c3: require('../assets/data/c3.png'),
  c4: require('../assets/data/c4.png'),
  c5: require('../assets/data/c5.png'),
  c6: require('../assets/data/c6.png'),
};

const restaurantImages = {
  r1: require('../assets/data/r1.jpeg'),
  r2: require('../assets/data/r2.jpeg'),
  r3: require('../assets/data/r3.jpeg'),
  r4: require('../assets/data/r4.jpeg'),
};

const mealImages: Record<number, any> = {
  1: require('../assets/data/1.png'),
  2: require('../assets/data/2.png'),
  3: require('../assets/data/3.png'),
  4: require('../assets/data/4.png'),
  5: require('../assets/data/5.png'),
  6: require('../assets/data/6.png'),
  7: require('../assets/data/7.png'),
  8: require('../assets/data/8.png'),
  9: require('../assets/data/9.png'),
  10: require('../assets/data/10.png'),
};

export const mockCategories: Category[] = [
  { id: '1', name: 'Ravintolat', image: 'c1' },
  { id: '2', name: 'Ruoka', image: 'c2' },
  { id: '3', name: 'Tarjoukset', image: 'c3' },
  { id: '4', name: 'Nouto', image: 'c4' },
  { id: '5', name: 'HOP', image: 'c5' },
  { id: '6', name: 'Apteekki', image: 'c6' },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Vapiano',
    image: 'r4',
    rating: 4.5,
    reviewCount: '500+',
    distance: '0.7 km',
    deliveryTime: '35-45 min',
    deliveryFee: 2.99,
    tags: ['Italialainen', 'Pizza', 'Pasta', 'Salaatit'],
    about: 'Käsintehty tuore pasta, ohuet pizzat, proteiinipitoiset salaatit.',
  },
  {
    id: '2',
    name: 'Urban Greens',
    image: 'r2',
    rating: 4.9,
    reviewCount: '500+',
    distance: '1.7 km',
    deliveryTime: '15-30 min',
    deliveryFee: 3.49,
    tags: ['Salaatit', 'Vegaani', 'Terveellinen'],
    about: 'Tuoreita salaatteja ja terveellisiä vaihtoehtoja.',
  },
  {
    id: '3',
    name: 'El Taco',
    image: 'r3',
    rating: 4.5,
    reviewCount: '500+',
    distance: '3 km',
    deliveryTime: '25-45 min',
    deliveryFee: 4.99,
    tags: ['Meksikolainen', 'Tacot', 'Burritot'],
    about: 'Autenttista meksikolaista ruokaa.',
  },
];

const mockMenu = [
  {
    category: 'Ruokatarjoukset',
    meals: [
      { id: 1, name: 'Pasta Power', price: 17, info: 'Valkosipulileipä, pasta ja virvoitusjuoma' },
      { id: 2, name: 'Vegetariano', price: 17, info: 'Valkosipulileipä, kasvispasta ja juoma' },
      { id: 3, name: 'Vaps Date', price: 40, info: 'Kaksi pizzaa ja pullo viiniä' },
      { id: 4, name: 'Best Life', price: 80, info: 'Neljä pizzaa ja kaksi pulloa viiniä' },
    ],
  },
  {
    category: 'Pasta',
    meals: [
      { id: 5, name: 'Arrabbiata', price: 9.35, info: 'Tomaattikastike, chili, valkosipuli' },
      { id: 6, name: 'Pomodoro e Mozzarella', price: 10.75, info: 'Tomaattikastike, mozzarella' },
    ],
  },
  {
    category: 'Pizza',
    meals: [
      { id: 7, name: 'Salame', price: 11.35, info: 'Mausteinen makkara, tomaatti, mozzarella' },
      { id: 8, name: 'Margherita', price: 9.75, info: 'Tomaattikastike, mozzarella' },
    ],
  },
  {
    category: 'Salaatti',
    meals: [
      { id: 9, name: 'Insalata Mista Piccola', price: 5.99, info: 'Sekasalaatti, tomaatit, porkkana' },
      { id: 10, name: 'Insalata della Casa', price: 8.95, info: 'Suuri sekasalaatti' },
    ],
  },
];

export const getRestaurantDetails = (id: string): RestaurantDetails | undefined => {
  const restaurant = mockRestaurants.find((r) => r.id === id);
  if (!restaurant) return undefined;

  return {
    ...restaurant,
    menu: mockMenu.map((cat) => ({
      category: cat.category,
      meals: cat.meals.map((meal) => ({
        ...meal,
        image: mealImages[meal.id],
      })),
    })),
  };
};

export const getCategoryImage = (key: string) => {
  return categoryImages[key as keyof typeof categoryImages];
};

export const getRestaurantImage = (key: string) => {
  return restaurantImages[key as keyof typeof restaurantImages];
};

export const getMealById = (id: number): (Meal & { image: any }) | undefined => {
  for (const category of mockMenu) {
    const meal = category.meals.find((m) => m.id === id);
    if (meal) {
      return { ...meal, image: mealImages[meal.id] };
    }
  }
  return undefined;
};

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  getCategories: async () => {
    await delay(300);
    return { data: mockCategories, success: true };
  },

  getRestaurants: async () => {
    await delay(500);
    return { data: mockRestaurants, success: true };
  },

  getRestaurantById: async (id: string) => {
    await delay(400);
    const details = getRestaurantDetails(id);
    if (!details) {
      throw new Error('Restaurant not found');
    }
    return { data: details, success: true };
  },

  getMealById: async (id: number) => {
    await delay(200);
    const meal = getMealById(id);
    if (!meal) {
      throw new Error('Meal not found');
    }
    return { data: meal, success: true };
  },
};

export default mockApi;
