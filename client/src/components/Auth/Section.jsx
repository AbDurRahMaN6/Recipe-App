import React from 'react';
import { Box, Typography } from '@mui/material';

const Section = ({ title, children }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="40vh" 
      bgcolor="#f3f1f1"
      paddingTop="30px"  
      sx={{ minHeight: '100vh' }}
    >
      <Box 
        width={650}  
        bgcolor="#fff" 
        p={4} 
        borderRadius="8px" 
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
        alignItems="center"  
      >
        <Box display="flex" justifyContent="center" marginBottom={3}>
          <img 
            src="https://cdn.dribbble.com/users/131733/screenshots/5472304/media/1ce3d40552e2079cb3b8a355f78f4d27.png?resize=768x576&vertical=center" 
            alt="Logo" 
            style={{ height: '120px' }} 
          />
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default Section;
