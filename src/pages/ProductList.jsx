import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';

export default function ProductList() { //display the list of products with search and category filtering functionality
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';

  const fetchFn = useCallback((signal) => fetchProducts(signal), []);
  const { loading, error, data: products } = useFetch(fetchFn, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (e) => { //allows users to filter products by category
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('category', value);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

//checking the loading and error states
  if (loading) {
    return <div className="loading-spinner">Loading products...</div>;
  }
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const allProducts = products || [];
  const categories = Array.from(new Set(allProducts.map((p) => p.category)));


  const filteredProducts = allProducts.filter((product) => { //Derived filter computation directly during render (No useEffect or local state)
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-list-page">
      <h2>Product Catalogue</h2>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />

        <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">No matching products found.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}