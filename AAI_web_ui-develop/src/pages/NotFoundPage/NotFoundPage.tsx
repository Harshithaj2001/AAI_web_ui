import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/atoms';
import layoutStyles from '@styles/layout.module.css';

export const NotFoundPage = memo(function NotFoundPage() {
  return (
    <div
      className={layoutStyles.container}
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        <h1>404</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
});
