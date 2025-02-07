import { create } from 'zustand';

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

const useSearchStore = create<SearchState>()((set) => ({
  query: '',

  setQuery: (query: string) => {
    set({ query });
  },

  clearQuery: () => {
    set({ query: '' });
  },
}));

export default useSearchStore;
