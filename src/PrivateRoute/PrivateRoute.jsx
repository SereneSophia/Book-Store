import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contects/UserContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  // Show a loading spinner or message while checking the user state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner component if you want
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If logged in, render the child component (Dashboard, etc.)
  return children;
};

export default PrivateRoute;
