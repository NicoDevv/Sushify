import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import OrdersPage from './pages/OrdersPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by looking for the cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/orders" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrdersPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;