import { useMemo, useState, useEffect } from 'react';
import { SearchService } from '@/services/searchService';
import { useProducts } from './useProducts';
import { SearchResult } from '@/types';

export const useSearch = (query: string) => {
  const { data: products = [] } = useProducts();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);

  const searchService = useMemo(
    () => new SearchService(products),
    [products]
  );

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchService.search(query);
      const searchSuggestions = searchService.getSuggestions(query);
      setResults(searchResults);
      setSuggestions(searchSuggestions);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query, searchService]);

  return { results, suggestions };
};
