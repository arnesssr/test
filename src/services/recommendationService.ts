import { Product, Recommendation } from '@/types';

export class RecommendationService {
  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  getSimilarProducts(product: Product, limit: number = 4): Product[] {
    return this.products
      .filter((p) => p.id !== product.id)
      .map((p) => ({
        product: p,
        score: this.calculateSimilarity(product, p),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.product);
  }

  getBundleRecommendations(product: Product, limit: number = 3): Product[] {
    const complementaryCategories = this.getComplementaryCategories(product.category);
    
    return this.products
      .filter((p) => 
        p.id !== product.id && 
        complementaryCategories.includes(p.category)
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  getTrendingProducts(limit: number = 8): Product[] {
    return [...this.products]
      .sort((a, b) => {
        const scoreA = a.rating * a.reviewCount;
        const scoreB = b.rating * b.reviewCount;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  getPersonalizedRecommendations(
    viewedProducts: Product[],
    purchaseHistory: Product[],
    limit: number = 6
  ): Product[] {
    const viewedCategories = viewedProducts.map((p) => p.category);
    const viewedBrands = viewedProducts.map((p) => p.brand);
    const purchasedIds = new Set(purchaseHistory.map((p) => p.id));

    return this.products
      .filter((p) => !purchasedIds.has(p.id))
      .map((p) => ({
        product: p,
        score: this.calculatePersonalizationScore(p, viewedCategories, viewedBrands),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.product);
  }

  getRecommendations(product: Product): Recommendation[] {
    return [
      {
        type: 'similar',
        products: this.getSimilarProducts(product),
        reason: 'Customers who viewed this also viewed',
      },
      {
        type: 'bundle',
        products: this.getBundleRecommendations(product),
        reason: 'Frequently bought together',
      },
      {
        type: 'trending',
        products: this.getTrendingProducts(4),
        reason: 'Trending now',
      },
    ];
  }

  private calculateSimilarity(product1: Product, product2: Product): number {
    let score = 0;

    if (product1.category === product2.category) score += 3;
    if (product1.brand === product2.brand) score += 2;
    
    const priceRatio = Math.min(product1.price, product2.price) / Math.max(product1.price, product2.price);
    score += priceRatio * 2;

    const commonTags = product1.tags.filter((tag) => product2.tags.includes(tag));
    score += commonTags.length * 0.5;

    score += (product2.rating / 5) * 1.5;

    return score;
  }

  private calculatePersonalizationScore(
    product: Product,
    viewedCategories: string[],
    viewedBrands: string[]
  ): number {
    let score = product.rating * 2;

    const categoryMatches = viewedCategories.filter((c) => c === product.category).length;
    score += categoryMatches * 3;

    const brandMatches = viewedBrands.filter((b) => b === product.brand).length;
    score += brandMatches * 2;

    score += (product.reviewCount / 100) * 0.5;

    return score;
  }

  private getComplementaryCategories(category: string): string[] {
    const complementaryMap: Record<string, string[]> = {
      Electronics: ['Electronics', 'Home & Garden'],
      Fashion: ['Fashion', 'Sports'],
      'Home & Garden': ['Home & Garden', 'Electronics'],
      Sports: ['Sports', 'Fashion'],
      Books: ['Books', 'Toys'],
      Toys: ['Toys', 'Books'],
    };

    return complementaryMap[category] || [];
  }
}
