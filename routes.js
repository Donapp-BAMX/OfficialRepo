import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Home from './HomeScreen';
import Login from './LoginScreen';
import Register from './RegisterScreen';

function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Routes;
