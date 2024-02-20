import React from 'react';
import LoginLayout from '../../layouts/LoginLayout';

const NotFound: React.FC = () => {
    return (
        <LoginLayout>
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title}`}>404 - Page Not Found</h1>
            <p className={`${styles.subtitle}`}>Sorry, the page you are looking for does not exist.</p>
        </div>
        </LoginLayout>
    );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default NotFound;
