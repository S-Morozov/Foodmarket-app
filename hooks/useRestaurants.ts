import { useState, useEffect, useCallback } from 'react';
import { mockApi, getRestaurantImage } from '../services/mockData';
import { Restaurant } from '../types';

interface UseRestaurantsReturn {
  restaurants: (Restaurant & { img: any })[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRestaurants = (): UseRestaurantsReturn => {
  const [restaurants, setRestaurants] = useState<(Restaurant & { img: any })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.getRestaurants();
      const restaurantsWithImages = response.data.map((r) => ({
        ...r,
        img: getRestaurantImage(r.image),
      }));
      setRestaurants(restaurantsWithImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return { restaurants, loading, error, refetch: fetchRestaurants };
};

export default useRestaurants;
