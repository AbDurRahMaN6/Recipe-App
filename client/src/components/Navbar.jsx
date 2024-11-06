import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
      <Toolbar>
        <img
          src="https://cdn.dribbble.com/users/131733/screenshots/5472304/media/1ce3d40552e2079cb3b8a355f78f4d27.png?resize=768x576&vertical=center"
          alt="Recipe App Logo"
          style={{ height: '40px', marginRight: '20px', marginBottom: '10px' }}
        />

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button
            color={isActive('/') ? 'primary' : 'inherit'}
            component={Link}
            to="/"
            sx={{ fontWeight: isActive('/') ? 'bold' : 'normal', color: '#000' }}
          >
            Home
          </Button>
          <Button
            color={isActive('/favorites') ? 'primary' : 'inherit'}
            component={Link}
            to="/favorites"
            sx={{ fontWeight: isActive('/favorites') ? 'bold' : 'normal', color: '#000' }}
          >
            Favorites
          </Button>
        </Box>

        {user && (
          <Button color="inherit" onClick={logout}>
            <LogoutIcon sx={{ color: '#000' }} />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

