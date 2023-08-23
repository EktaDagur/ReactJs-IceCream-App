import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IcecreamIcon from '@mui/icons-material/Icecream';

const Header = () => {

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IcecreamIcon color="secondary" fontSize="small"/>
        <Typography color="secondary" ml={1}> Ice Cream Test</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
