import React, { useState, useRef, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Avatar, Typography } from '@mui/material';
import IcecreamIcon from '@mui/icons-material/Icecream';
import { pink, blue } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AlertDialog from '../../common/AlertDialog';
import { getFlavors } from '../../api';
import {MockResposne} from '../../data/flavours';

import SearchBar from './SearchBar';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: "93%",
  color: theme.palette.text.primary,
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function DataGrid({ scoopCountMap = new Map(), handleScoopCount }) {
  const valueRef = useRef('');
  const [alertOpen, setAlertOpen] = useState();
  const [flavoursData, setFlavorsData] = useState([]);

  const formSubmit = (e) => {
    e.preventDefault(); // To stop webpage reload
    console.log(valueRef.current.value)
    fetchFlavours(valueRef.current.value);
  }
  const handleClickOpen = useCallback((slectedFlavourName) => {
    setAlertOpen(slectedFlavourName);
  })

  const handleClose = () => {
    setAlertOpen(false);
  }

  useEffect(() => {
    fetchFlavours();
  }, []);

  const fetchFlavours = async (filterRequest = "") => {
    // const flavorsObj = await getFlavors(filterRequest);
    // if (!flavorsObj) {
    //   const message = `An error has occured`;
    //   throw new Error(message);
    // }
    setFlavorsData(MockResposne());
    console.log("MockResposne",MockResposne());
  }

  const handelMinusColor = (name = "") => {
    if (!scoopCountMap?.get(name)) {
      return "disabled";
    } else if (scoopCountMap?.get(name)?.count <= 0) {
      return "disabled";
    } else {
      return "secondary";
    }
  }

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <Typography variant='h5' align="left" sx={{pl:1}}>
          Flavors
      </Typography>
      <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, }} >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs={16}>
            <SearchBar valueRef={valueRef} formSubmit={formSubmit} />
          </Grid>
        </Grid>
      </StyledPaper>
      {flavoursData.map((data, i) => {
        return <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar sx={{ bgcolor: data?.color?.primary }}><IcecreamIcon style={{ color: data?.color?.secondary }} fontSize="medium" /></Avatar>
            </Grid>
            <Grid item xs>
              <List disablePadding key={i}>
                {[data.name, data.description, "Contains: " + data.allergens].map((value, index) => (
                  <ListItem
                    disablePadding
                    key={value}
                    disableGutters>
                    <ListItemText
                      sx={{ mt: 0 }}
                      primary={
                        index == 0 ? <Typography><b>{value}</b></Typography> :
                          index === 1 ? <Typography variant="subtitle2" sx={{ color: "grey" }}> {value}</Typography> :
                            <Typography variant="caption" sx={{ color: "grey", mt: -2 }}>
                              {value}
                              <IconButton aria-label="info" >
                                <InfoOutlinedIcon style={{ color: blue[300] }} fontSize="small" onClick={() => handleClickOpen(data.name)} />
                              </IconButton>
                              <AlertDialog
                                slectedFlavourName={alertOpen}
                                handleClose={handleClose}
                                ingredients={data.ingredients?.join(", ")}
                                allNames={data.name}
                              />
                            </Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item>
              <Box sx={{ mt: 2 }}>
                <IconButton aria-label="remove" disabled={scoopCountMap?.get(data.name) ? false : true}>
                  <RemoveCircleOutlineIcon color={handelMinusColor(data.name)} fontSize="large" style={{ borderColor: pink[300] }} onClick={(e) => handleScoopCount({ count: -1, name: data.name, color: data.color })} />
                </IconButton>
                <span>  {scoopCountMap.get(data.name)?.count || 0} Scoop</span>
                <IconButton aria-label="add">
                  <AddCircleOutlineOutlinedIcon color="secondary" fontSize="large" onClick={(e) => handleScoopCount({ count: 1, name: data.name, color: data.color })} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      })}
    </Box>
  );
}