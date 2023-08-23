import React, { Fragment, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import states from '../data/states'
import SuccessIcon from "../common/SuccessIcon";
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    FormControl,
    Select,
    Checkbox,
    InputLabel,
    MenuItem,
    Button,
    Container,
    IconButton,
    Toolbar,
    Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';




const OrderCompleted = ({ nextStep }) => {
   
    return (
        <Fragment>
            <Container sx={{ width: "75%", }}>
                <Paper sx={{ mt: 2 }}>
                    <Box>
                        <Grid container justifyContent="center">
                            <Grid item>
                            <Container sx={{ width: "65%", }}>
                                <Toolbar sx={{mt:7}}>
                                    <SuccessIcon />
                                </Toolbar>
                             
                                <Typography style={{textAlign:'center'}} >
                                    Order Completed!
                                </Typography>
                                <Typography style={{fontSize: '14px',textAlign:'center', color:"#7c7c7c"}}>
                                    Thank you for your purchase. You will recive it in <b>10 minutes</b>.
                                </Typography>
                                <Box mt={2} mb={5} display="flex" justifyContent="center">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={nextStep}
                                >
                                    CREATE NEW ORDER
                                </Button>
                        </Box>
                        </Container>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    );

}

export default OrderCompleted;