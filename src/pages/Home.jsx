import { Link } from 'react-router-dom';

export default function Home() { //homwpage component that serves as the landing page for the application
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
