import React, { Fragment, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import states from '../data/states'
import {
    Paper,
    Box,
    Grid,
    TextField,
    Typography,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Button,
    Container,
    IconButton,
    Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { inputClasses } from "@mui/material/Input";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from '@mui/material/styles';

const MuiTextField = styled(TextField)((`
    .${inputLabelClasses.root} {
    font-size: 18px;
    }
`));

let cartTotal=1;
const OrderCheckout = ({ previousStep, nextStep, cartMap }) => {
    const [userState, setUserState] = useState("");
    const validationSchema = Yup.object().shape({
        cardNumber: Yup.string().required('Card Number is required')
            .matches(/^[0-9]+(-[0-9]+)+$/gi, 'Card number can only contain number')
            .min(19, 'Card Number should be only 16 numbers')
            .max(19, 'Card Number should be only 16 numbers'),
        expiration: Yup.string()
            .required('Exp. is required')
            .matches(/^\d+(\/\d+)*$/gi, 'Exp. can only contain number & "/"')
            .min(5, 'Exp. should be only 4 numbers')
            .max(5, 'Exp. should be only 4 numbers'),
        cvv: Yup.string()
            .required('CVV is required')
            .matches(/^([0-9\s]*)$/gi, 'CVV can only contain number')
            .min(3, 'CVV should be only 3 numbers')
            .max(3, 'CVV should be only 3 numbers'),
        username: Yup.string()
            .required('Cardholder Name is required')
            .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'Name can only contain text')
            .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Please enter your full name'),
        address: Yup.string()
            .required('Billing Address is required'),
        city: Yup.string()
            .required('City is required')
            .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi, 'City can only contain text'),
        state: Yup.string()
            .required('State is required'),
        zip: Yup.string()
            .required('Zip code is required')
            .matches(/^([0-9\s]*)$/gi, 'Zip code can only contain number')
            .min(5, 'Zip code should be only 5 numbers')
            .max(5, 'Zip code should be only 5 numbers'),
    });

    //Initital render
    useEffect(()=> {
        cartTotal = 1;
    },[])
    
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = data => {
        nextStep(3);
        console.log(JSON.stringify(data, null, 2));
    };
    const handleFlavourTotal = (flavourTotal) => {
        cartTotal += flavourTotal;
        return "$"+flavourTotal*2+".00";
    }

    return (
        <Fragment>
            <Container sx={{ width: "75%", }}>
                <Typography variant="p" align="center">
                    <span onClick={previousStep}>Create Your Order</span> &nbsp;&nbsp;{">"}&nbsp;&nbsp; <b>Checkout</b>
                </Typography>
                <Paper sx={{ mt: 2 }}>
                    <Box sx={{ px: 2 }}>
                        <Grid container justifyContent="left" spacing={0} columns={16}>
                            <Grid item lg={10}>
                                <Typography>
                                    Ice Cream Item #1
                                    <IconButton aria-label="remove">
                                        <EditIcon fontSize="samll" style={{ color: "black" }} onClick={previousStep} />
                                    </IconButton>
                                </Typography>
                            </Grid>
                            <Grid item lg={6}>
                                <List>
                                {[...cartMap.keys()]
                                    .filter(a => a != "No flavours selected")
                                    .filter(d => cartMap.get(d).count > 0)
                                    .map((name, v) => {
                                        // return <>{name} x {cartMap.get(name).count}<br /></>
                                        return (
                                            <ListItem disablePadding>
                                                <ListItemText sx={{ pl: 0, minWidth: "80%" }} primaryTypographyProps={{ fontSize: '13px' }} primary={name +'x'+ cartMap.get(name).count} />
                                                <ListItemText primaryTypographyProps={{ fontSize: '13px' }} primary={handleFlavourTotal(cartMap.get(name).count)} />
                                            </ListItem>
                                        )
                                    })}
                                    {/* <ListItem disablePadding>
                                        <ListItemText sx={{ pl: 0, minWidth: "80%" }} primaryTypographyProps={{ fontSize: '13px' }} primary="Chocolate*2" />
                                        <ListItemText primaryTypographyProps={{ fontSize: '13px' }} primary="$1.00" />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText sx={{ pl: 0, minWidth: "80%" }} primaryTypographyProps={{ fontSize: '13px' }} primary="Cookies and Cream" />
                                        <ListItemText primaryTypographyProps={{ fontSize: '13px' }} primary="$1.00" />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText sx={{ pl: 0, minWidth: "80%" }} primaryTypographyProps={{ fontSize: '13px' }} primary="Sprinkles" />
                                        <ListItemText primaryTypographyProps={{ fontSize: '13px' }} primary="$1.00" />
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText sx={{ pl: 0, minWidth: "80%" }} primaryTypographyProps={{ fontSize: '13px' }} primary="Hot Fudge" />
                                        <ListItemText primaryTypographyProps={{ fontSize: '13px' }} primary="$1.00" />
                                    </ListItem> */}
                                    <Divider />
                                    <ListItem disablePadding>
                                        <ListItemText sx={{ pl: 0, minWidth: "68%" }} primaryTypographyProps={{ fontSize: '13px' }} primary="Total" />
                                        <ListItemText primaryTypographyProps={{ fontSize: '22px' }} primary={"$"+cartTotal+".00"} />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <Box px={3} py={2}>
                        <Typography variant="subtitle1" align="left" margin="dense">
                            Payment
                        </Typography>

                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={6}>
                                <MuiTextField
                                    id="creditCard"
                                    name="creditCard"
                                    label="Card Number"
                                    placeholder="####-####-####-####"
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                    variant="standard"
                                    {...register('cardNumber')}
                                    error={errors.cardNumber ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.cardNumber?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <MuiTextField
                                    id="expiration"
                                    name="expiration"
                                    label="Expiration"
                                    placeholder="MM/YY"
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                    variant="standard"
                                    {...register('expiration')}
                                    error={errors.expiration ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.expiration?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <MuiTextField
                                    id="cvv"
                                    name="cvv"
                                    label="CVV"
                                    placeholder="###"
                                    margin="dense"
                                    variant="standard"
                                    InputLabelProps={{ shrink: true }}
                                    {...register('cvv')}
                                    error={errors.cvv ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.cvv?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <MuiTextField
                                    id="username"
                                    name="username"
                                    label="Cardholder Name"
                                    placeholder="John Doe"
                                    fullWidth
                                    margin="dense"
                                    variant="standard"
                                    InputLabelProps={{ shrink: true }}
                                    {...register('username')}
                                    error={errors.username ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.username?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <MuiTextField
                                    id="address"
                                    name="address"
                                    label="Billing Address"
                                    placeholder="Enter your street address"
                                    fullWidth
                                    margin="dense"
                                    variant="standard"
                                    InputLabelProps={{ shrink: true }}
                                    {...register('address')}
                                    error={errors.address ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.address?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <MuiTextField
                                    id="city"
                                    name="city"
                                    label="City"
                                    placeholder="Enter your city"
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                    variant="standard"
                                    {...register('city')}
                                    error={errors.city ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.city?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <FormControl variant="standard" sx={{ mt: 1 }} fullWidth>
                                    <InputLabel id="stateLabel">State</InputLabel>
                                    <Select
                                        labelId="stateLabel"
                                        id="state"
                                        name="state"
                                        value={userState}
                                        {...register("state")}
                                        onChange={(e) => setUserState(e.target.value)}
                                        label="State"
                                    >
                                        {states.map((data, i) => {
                                            return <MenuItem value={i}>{data}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                {!userState && <Typography variant="inherit" color="textSecondary">
                                    {errors.state?.message}
                                </Typography>}
                            </Grid>
                            <Grid item xs={12} lg={4} mb={3}>
                                <MuiTextField
                                    id="zip"
                                    name="zip"
                                    label="Zip"
                                    placeholder="Zip Code"
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                    variant="standard"
                                    {...register('zip')}
                                    error={errors.zip ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.zip?.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Box mt={3} display="flex" justifyContent="flex-end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                COMPLETE ORDER
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    );

}

export default OrderCheckout;