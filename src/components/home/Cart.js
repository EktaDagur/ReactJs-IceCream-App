import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Toolbar, Divider, Button, Typography, Radio, RadioGroup, List, ListItem, ListItemText, ListItemButton,
    ListItemIcon, FormControl, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import WaffleConeLogo from "../../assets/waffle-cone.png";
import SugerConeLogo from "../../assets/sugar-cone.png";
import CupLogo from "../../assets/cup.png";
import AlertDialog from '../../common/AlertDialog';
import { getToppings, getSauces } from '../../api';
import Slide from '@mui/material/Slide';
import RemoveIcon from '@mui/icons-material/Remove';
import {MockSaurce, MockToppings} from '../../data/flavours'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const Cart = ({ scoopCountMap = new Map(), nextStep }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [toppingsState, setToppingsState] = useState([{}]);
    const [sauceState, setSauceState] = useState([{}]);
    const [selectedDialogObj, setselectedDialogObj] = useState({ toppingValue: "", sauceValue: "" });


    const handleRadioChange = (event) => {
        setselectedDialogObj(
            {
                ...selectedDialogObj,
                toppingValue: event.target.name === "radio-topping" ? event.target.value : selectedDialogObj.toppingValue,
                sauceValue: event.target.name === "radio-sauce" ? event.target.value : selectedDialogObj.sauceValue
            }
        );
    };

    const handleClickOpen = (e) => {
        setAlertOpen(e.target.textContent);
    }

    const handleDialogClose = (event) => {
        setselectedDialogObj(
            {
                toppingValue: event === "Topping" ? "" : selectedDialogObj.toppingValue,
                sauceValue: event === "Sauce" ? "" : selectedDialogObj.sauceValue
            }
        )
        setAlertOpen(false);
    }
    const handleDialogAdd = () => {
        setAlertOpen(false);
    }

    const handleClickMinus = (event) => {
        setselectedDialogObj(
            {
                toppingValue: event === "Topping" ? "" : selectedDialogObj.toppingValue,
                sauceValue: event === "Sauce" ? "" : selectedDialogObj.sauceValue
            }
        )
    }

    const fetchTopings = async () => {
        // const toppingsObj = await getToppings();
        // if (!toppingsObj) {
        //     const message = `An error has occured while fetching toppings`;
        //     throw new Error(message);
        // }
        // setToppingsState(toppingsObj);
        setToppingsState(MockToppings);
    }

    const fetchSauce = async () => {
        // const sauceObj = await getSauces();
        // if (!sauceObj) {
        //     const message = `An error has occured while fetching sauce`;
        //     throw new Error(message);
        // }
        // setSauceState(sauceObj)
        setSauceState(MockSaurce);
    }

    // OnInit()
    useEffect(() => {
        fetchTopings();
        fetchSauce();
    }, [])

    const getTotalAmount = () => {
        let sum = 0.5;
        [...scoopCountMap?.keys()].map(k => sum += scoopCountMap?.get(k)?.count)
        return `$${sum*2}.00`;
    }

    const getFlavorsStr = () => {
        return (scoopCountMap?.size > 1 ?
            [...scoopCountMap.keys()]
                .filter(a => a != "No flavours selected")
                .filter(d => scoopCountMap.get(d).count > 0)
                .map((name, v) => {
                    return <>{name} x {scoopCountMap.get(name).count}<br /></>
                }) :
            "No flavours selected"
        )
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Typography variant="h5" align="left">
                Your Order
            </Typography>
            <StyledPaper sx={{ my: 1, mx: 'auto', pt: 1, }}>
                <List aria-label="cart">
                    <ListItem disablePadding>
                        {selectedDialogObj.toppingValue ?
                            <>
                                <Typography sx={{ pl: 2.5 }} variant='caption'>{selectedDialogObj.toppingValue}</Typography>
                                <ListItemButton onClick={(e) => handleClickMinus("Topping")} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                    <ListItemIcon>
                                        <RemoveIcon fontSize="small" />
                                    </ListItemIcon>
                                </ListItemButton>
                            </>
                            :
                            <ListItemButton onClick={(e) => handleClickOpen(e)}>
                                <ListItemIcon>
                                    <AddIcon color="secondary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText sx={{ ml: -2 }} primary={<Typography variant="" color="secondary">Add a Topping</Typography>} />
                            </ListItemButton>
                        }
                    </ListItem>
                    <Dialog
                        key={1}
                        open={alertOpen === "Add a Topping"}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => handleDialogClose("Topping")}
                        aria-describedby="alert-dialog-slide-topping"
                    >
                        <DialogTitle>Add a Topping?</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-topping">
                                <div>Add a topping to your ice cream for an addition $0.27</div>
                                {toppingsState.map((data, i) => {
                                    return <ListItem key={data.name}>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="radio-topping"
                                                name="radio-topping"
                                                value={selectedDialogObj.toppingValue}
                                                onChange={handleRadioChange}
                                            >
                                                <FormControlLabel
                                                    value={data.name}
                                                    control={<Radio />}
                                                    label={data.name}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </ListItem>
                                })}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleDialogClose("Topping")}>CANCEL</Button>
                            <Button onClick={handleDialogAdd}>ADD</Button>
                        </DialogActions>
                    </Dialog>
                    {/* <ListItem disablePadding>
                        <ListItemButton onClick={(e) => handleClickOpen(e)}>
                            <ListItemIcon>
                                <AddIcon color="secondary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText sx={{ ml: -2 }} primary={<Typography variant="" color="secondary">Add a Sauce</Typography>} />
                        </ListItemButton>
                    </ListItem> */}
                    <ListItem disablePadding>
                        {selectedDialogObj.sauceValue ?
                            <>
                                <Typography sx={{ pl: 2.5 }} variant='caption'>{selectedDialogObj.sauceValue}</Typography>
                                <ListItemButton onClick={(e) => handleClickMinus("Sauce")} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                    <ListItemIcon>
                                        <RemoveIcon fontSize="small" />
                                    </ListItemIcon>
                                </ListItemButton>
                            </>
                            :
                            <ListItemButton onClick={(e) => handleClickOpen(e)}>
                                <ListItemIcon>
                                    <AddIcon color="secondary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText sx={{ ml: -2 }} primary={<Typography variant="" color="secondary">Add a Sauce</Typography>} />
                            </ListItemButton>
                        }
                    </ListItem>
                    <Dialog
                        key={2}
                        open={alertOpen === "Add a Sauce"}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => handleDialogClose("Sauce")}
                        aria-describedby="alert-dialog-slide-topping"
                    >
                        <DialogTitle>Add a Sauce?</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-sauce">
                                <div>Add a sauce to your ice cream for an addition $0.50</div>
                                {sauceState.map((data, i) => {
                                    return <ListItem key={data.name}>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="radio-sauce"
                                                name="radio-sauce"
                                                value={selectedDialogObj.sauceValue}
                                                onChange={handleRadioChange}
                                            >
                                                <FormControlLabel
                                                    value={data.name}
                                                    control={<Radio />}
                                                    label={data.name}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </ListItem>
                                })}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleDialogClose("Sauce")}>CANCEL</Button>
                            <Button onClick={handleDialogAdd}>ADD</Button>
                        </DialogActions>
                    </Dialog>
                    <ListItem disablePadding>
                        <Toolbar disableGutters sx={{ ml: 2 }}>
                            <Box sx={{ height: 46, border: true === true && 2, borderColor: "secondary.main", borderRadius: 2 }}
                                component="img" alt="cup" src={WaffleConeLogo} />
                        </Toolbar>
                        <Toolbar disableGutters sx={{ ml: 2 }}>
                            <Box sx={{ height: 46, border: true === false && 2, borderColor: "secondary.main", borderRadius: 2 }}
                                component="img" alt="cup" src={SugerConeLogo} />
                        </Toolbar>
                        <Toolbar disableGutters sx={{ ml: 2 }}>
                            <Box sx={{ height: 46, border: true === false && 2, borderColor: "secondary.main", borderRadius: 2 }}
                                component="img" alt="cup" src={CupLogo} />
                        </Toolbar>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <Toolbar sx={{ mr: 2 }}>
                            <ListItemText secondary="Flavors" />
                        </Toolbar>
                        <ListItemText sx={{ pt: 0, mb:1}} secondary={getFlavorsStr().length === 0 ? "No flavours selected" : getFlavorsStr()}  />
                    </ListItem>
                    <ListItem disablePadding>
                        <Toolbar sx={{ pl: 1 }}>
                            <ListItemText primaryTypographyProps={{ fontSize: '15px' }} primary="Total" />
                        </Toolbar>
                        <Toolbar sx={{ ml: 1 }}>
                            <ListItemText primaryTypographyProps={{ fontSize: '18px' }} primary={getTotalAmount()} />
                        </Toolbar>
                    </ListItem>
                    <ListItem >
                        <Button sx={{ mt: -2 }} variant="contained" fullWidth color="secondary" size="large" onClick={nextStep}>BUY ICE CREAM</Button>
                    </ListItem>
                </List>

            </StyledPaper>
        </Box>
    );
}

export default Cart;