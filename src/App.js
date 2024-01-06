import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import Login from './auth/Login';
import Register from './auth/Register';




const App = () => {



  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/Main' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
