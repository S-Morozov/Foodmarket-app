import { create } from 'zustand';

interface FavoritesState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favorites: [],

  addFavorite: (id: string) => {
    set((state) => ({
      favorites: [...state.favorites, id],
    }));
  },

  removeFavorite: (id: string) => {
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== id),
    }));
  },

  isFavorite: (id: string) => {
    return get().favorites.includes(id);
  },

  toggleFavorite: (id: string) => {
    const { favorites } = get();
    if (favorites.includes(id)) {
      set({ favorites: favorites.filter((fav) => fav !== id) });
    } else {
      set({ favorites: [...favorites, id] });
    }
  },
}));

export default useFavoritesStore;
