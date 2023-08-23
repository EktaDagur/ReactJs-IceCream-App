import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DataGrid from './DataGrid';
import Cart from './Cart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MainGrid = ({nextStep, handleTheme, handleCartData}) => {
  const [scoopData, setScoopData] = useState(new Map().set("No flavours selected", { count: 0 }));

  const handleScoopCount = ({ count, name, color }) => {
    if ((scoopData?.get(name)?.count > 0 || count > 0)) {
      setScoopData(
        new Map(scoopData.set(name, 
          { 
            count: scoopData.get(name)?.count ? scoopData.get(name)?.count + count : 1,
            color: color
          }))
      );
    } else {
      setScoopData(
        new Map(scoopData.set("No flavours selected", { count: 0 }))
      );
    }
    handleTheme(color);
  }

  useEffect(() => {
    handleCartData(scoopData);
  },[scoopData])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" spacing={2} columns={16}>
        <Grid item md={11}>
          <DataGrid scoopCountMap={scoopData} handleScoopCount={handleScoopCount}/>
        </Grid>
        <Grid item md={5} wrap="nowrap" spacing={2} >
          {/* <Item>xs=8</Item> */}
          <Cart scoopCountMap={scoopData} nextStep={nextStep}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainGrid;