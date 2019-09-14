import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../NavBar';
import Register from '../Register';
import Login from '../Login';
import ClientDashboard from '../ClientDashboard';

axios.defaults.baseURL = process.env.SERVER_URL;

const App = () => {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem('newUser')) || ''
  );

  const setNewToken = data => {
    setToken(data);
  };

  return (
    <Router>
      <Navbar token={token} />
      <Route
        path="/register"
        render={props => <Register {...props} setToken={setNewToken} />}
      />
      <Route
        path="/login"
        render={props => <Login {...props} setToken={setNewToken} />}
      />
      <Route
        path="/client-dashboard"
        render={props => <ClientDashboard {...props} />}
      />
      {/* <Route
        path="/staff-dashboard"
        render={props => <StaffDashboard {...props} />}
      /> */}
    </Router>
  );
};

export default App;
