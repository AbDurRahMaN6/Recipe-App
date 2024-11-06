import React from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api'; 

const RegistrationForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string().required('Phone number is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        if (response.data) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First name"
            name="firstname"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('firstname')}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last name"
            name="lastname"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('lastname')}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </Grid>

        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Phone number"
            name="phone"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('phone')}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>

        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            margin="normal"
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Grid>

        <Grid item xs={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#FF4081', '&:hover': { backgroundColor: '#FF80AB' } }}
          >
            Create Account
          </Button>
        </Grid>
      </Grid>

      <Typography align="center" sx={{ mt: 5 }}>
        Already have an account?{' '}
        <Link 
          to="/login" 
          style={{ fontWeight: 'bold', color: '#FF80AB', textDecoration: 'none' }} 
        >
          Login
        </Link>
      </Typography>
    </form>
  );
};

export default RegistrationForm;
