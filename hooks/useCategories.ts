import { useState, useEffect, useCallback } from 'react';
import { mockApi, getCategoryImage } from '../services/mockData';
import { Category } from '../types';

interface UseCategoriesReturn {
  categories: (Category & { img: any })[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<(Category & { img: any })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.getCategories();
      const categoriesWithImages = response.data.map((c) => ({
        ...c,
        img: getCategoryImage(c.image),
      }));
      setCategories(categoriesWithImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
};

export default useCategories;
