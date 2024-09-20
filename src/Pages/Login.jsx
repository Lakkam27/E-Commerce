import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/login', {
        email,
        password,
      });
      console.log(response.data);

      localStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success('You have successfully logged in!', { position: 'top-center' });

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed! Please try again.', { position: 'top-center' });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup Attempt:", { name, email, password });
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/signup', {
        username: name,
        password,
        email,
      });
      console.log(response.data);

      localStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success('Signup successful!', { position: 'top-right' });
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed! Please try again.', { position: 'top-right' });
    }
  };


  return (
    <div>
      {isLogin ? (
        <form onSubmit={handleLogin} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">Login</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot your password?</p>
            <p className="cursor-pointer" onClick={() => setIsLogin(false)}>
              Create account
            </p>
          </div>

          <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
            Sign In
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">Sign Up</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot your password?</p>
            <p className="cursor-pointer" onClick={() => setIsLogin(true)}>
              Login Here
            </p>
          </div>

          <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
            Sign Up
          </button>
        </form>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Login;
