import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import "./auth.css"

const Login = () => {
  const navigate=useNavigate()
  const toast = useToast();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookies] = useCookies(['access_token']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  
  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     navigate("/")
  //   }
  // }, []);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://chatapp-backend1-md5b.onrender.com/user/login', {
        email: user.email,
        password: user.password,
      });

      if (response.status === 200) {
        // Login was successful
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        
        window.localStorage.setItem('userId', response.data.id);
        navigate("/"); // Redirect to main page after successful login
      }
    } catch (error) {
      // Handle error cases
      if (error.response) {
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Login Failed',
          description: 'An error occurred. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler} className="main-form">
        <p>
          <b>Email:</b>
        </p>
        <input
          type="text"
          placeholder="Enter Your Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <p>
          <b>Password:</b>
        </p>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Your Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <div type="button" onClick={handleClick}>
          {showPassword ? 'Hide' : 'Show'}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
