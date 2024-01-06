import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import "./auth.css"

const Register = () => {
  const navigate=useNavigate()
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState({
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast({
        title: 'Password does not match',
        description: 'Password and Confirm Password should be the same',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('https://chatapp-backend1-md5b.onrender.com/user/register', {
        firstname: user.firstname,
        email: user.email,
        password: user.password,
      });

      if (response.status === 201) {
        toast({
          title: 'User Registration Successful',
          description: 'Thank you for registering!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setUser({
          firstname: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate("/login")
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'User Already Exists',
          description: 'User with this email already exists. Please login.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Registration Failed',
          description: 'Failed to register. Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler} className="main-form">
        <p>
          <b>Username:</b>
        </p>
        <input
          type="text"
          placeholder="Enter Your Username"
          name="firstname" 
          value={user.firstname}
          onChange={handleChange}
        />
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
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        <p>
          <b>Confirm Password:</b>
        </p>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm Your Password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
        />
        <button type="button" onClick={toggleShowConfirmPassword}>
          {showConfirmPassword ? 'Hide' : 'Show'}
        </button>
        <button type="submit">Register</button> 
      </form>
    </div>
  );
};

export default Register;
