import React, { useState, useReducer } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { userReducer, errorReducer } from '../../reducers';

const Register = withRouter((props) => {
  const [userDetails, setUserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [user, dispatchSubmit] = useReducer(userReducer, {});

  const [errors, dispatchError] = useReducer(errorReducer, {});

  const validate = (e, data) => {

    if (data) {
      for (let [key, value] of Object.entries(data)) {
        if (!value) {
          dispatchError({ type: 'ERROR', key });
        }
      }
    } else {
      if (!e.target.value) {
        dispatchError({ type: 'ERROR', key: e.target.name });
      } else if (
        e.target.name == 'email' &&
        !/.+@.+\.[A-Za-z]+$/.test(e.target.value)
      ) {
        dispatchError({ type: 'ERROR', key: email });
      } else if (
        e.target.name == 'confirmPassword' &&
        e.target.value !== password
      ) {
        dispatchError({ type: 'ERROR', key: confirmPassword });
      }
    }

  };

  const handleChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const createUser = async () => {
    try {
      validate(null, userDetails);
      if (Object.keys(errors).length) return null;
      dispatchSubmit({ type: 'SUBMITTING' });
      const { confirmPassword, ...user } = userDetails;
      const {
        data: { data }
      } = await axios.post('/users/auth/signup', user);
      dispatchSubmit({ type: 'SUCCESS', data });
      props.history.push('/dashboard')
    } catch (error) {
      dispatchSubmit({ type: 'FAILURE', error });
    }
  };

  const { firstname, lastname, email, password, confirmPassword } = userDetails;

  return (
    <div className="registration-page">
      {user.loading && <p>We are currently loading at the Niger</p>}
      <Paper elevation={6} className="paper">
        <Typography variant="h5" component="h3" className="register-heading">
          Register
        </Typography>
        {user.error && <p className="registration-error">{user.error}</p>}
        <TextField
          required
          type="text"
          label="First Name"
          name="firstname"
          value={firstname}
          onChange={handleChange}
          onBlur={validate}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.firstname && (
          <p className="registration-error">Please enter your first name</p>
        )}
        <TextField
          required
          label="Last Name"
          name="lastname"
          value={lastname}
          onChange={handleChange}
          onBlur={validate}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.lastname && (
          <p className="registration-error">Please enter your last name</p>
        )}
        <TextField
          required
          type="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={handleChange}
          onBlur={validate}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.email && (
          <p className="registration-error">
            Please enter a valid email address
          </p>
        )}
        <TextField
          required
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
          onBlur={validate}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.password && (
          <p className="registration-error">Please enter your password</p>
        )}
        <TextField
          required
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          onBlur={validate}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {errors.confirmPassword && (
          <p className="registration-error">
            Confirm password must match password
          </p>
        )}
        <Button variant="contained" onClick={createUser} style={{ margin: 15 }}>
          Sign Up
        </Button>
        <div className="login-link">
          Have an account?
          <Link to="/login" className="link">
            {' '}
            Login here
          </Link>
        </div>
      </Paper>
    </div>
  );
});

const Registration = withRouter(Register)

export default Registration;
