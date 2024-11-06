import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../services/api'; 
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await apiLogin(values);
        if (response.data) {
          login({ token: response.data.token }); 
          navigate('/');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message; 
          if (errorMessage.includes('password')) {
            setLoginError('Your password or email is incorrect');
          } else if (errorMessage.includes('email')) {
            setLoginError('Your email is incorrect');
          } else {
            setLoginError('Email or password is incorrect');
          }
        } else {
          setLoginError('An error occurred. Please try again');
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#FF4081', '&:hover': { backgroundColor: '#FF80AB' } }}
          >
            Sign In
          </Button>
        </Grid>

        {loginError && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {loginError}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link
          to="/register"
          style={{ fontWeight: 'bold', color: '#FF80AB', textDecoration: 'none' }}
        >
          Register
        </Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
