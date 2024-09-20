// Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user');

    toast.success('Logout successful!', { position: 'top-center' });

    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
      <ToastContainer />
    </div>
  );
};

export default Logout;
