import Fuse from 'fuse.js';
import { Product, SearchResult } from '@/types';

export class SearchService {
  private fuse: Fuse<Product>;

  constructor(products: Product[]) {
    this.fuse = new Fuse(products, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'category', weight: 1.8 },
        { name: 'brand', weight: 1.7 },
        { name: 'tags', weight: 1.3 },
        { name: 'features', weight: 1 },
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }

  search(query: string): SearchResult[] {
    if (!query.trim()) {
      return [];
    }

    const results = this.fuse.search(query);
    
    return results.map((result) => ({
      product: result.item,
      score: 1 - (result.score || 0),
      matches: result.matches?.map((m) => m.key || '') || [],
    }));
  }

  getSuggestions(query: string, limit: number = 5): string[] {
    if (!query.trim() || query.length < 2) {
      return [];
    }

    const results = this.search(query);
    const suggestions = new Set<string>();

    results.slice(0, limit * 2).forEach((result) => {
      suggestions.add(result.product.name);
      suggestions.add(result.product.category);
      suggestions.add(result.product.brand);
    });

    return Array.from(suggestions).slice(0, limit);
  }
}
