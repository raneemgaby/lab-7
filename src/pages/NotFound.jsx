import { Link } from 'react-router-dom';

export default function NotFound() { //display error when the user navigate to a router that doesn't exist
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="cta-button">
        Return Home
      </Link>
    </div>
  );
}