import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Our Store</h1>
      <p>Explore our wide collection of products.</p>
      <Link to="/products" className="cta-button">
        Browse Catalogue
      </Link>
    </div>
  );
}
