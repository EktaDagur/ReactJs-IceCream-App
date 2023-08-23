import './App.css';
import React, { useState, useMemo } from 'react';
import Header from "./components/Header";
import { Container, createMuiTheme, Button } from '@mui/material';
import MainGrid from './components/home/MainGrid';
import { ThemeProvider } from '@mui/material/styles';
import OrderCheckout from './components/OrderCheckout';
import OrderCompleted from './components/OrderCompleted';

const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const App = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [primary, setPrimary] = useState("#283040");
    const [secondary, setSecondary] = useState("#00AEEF");
    const [cartMap, setCartMap] = useState(new Map());

    const theme = useMemo(() =>
        createMuiTheme({
            palette: {
                primary: {
                    main: primary,
                },
                secondary: {
                    main: secondary,
                }
            }
        }),
        [primary]
    );
    /**
       * Validate and proceed to next steps
       * @param {object} e
       */
    const nextStep = (e) => {
        // theme()
        if (currentStep === 3) {
            setCurrentStep(1)
            return;
        }
        setCurrentStep((prev) => prev + 1); // Increase currentStep count
    }

    // Go back previous steps
    const previousStep = () => {
        setCurrentStep((prev) => prev - 1);
    }

    const handleTheme = (color = {}) => {
        setPrimary(color.primary);
        setSecondary(color.secondary);
    }

    const handleCartData = (cartData) => {
        setCartMap(cartData);
    }
    //wizard steps
    const wizardSteps = () => {
        switch (currentStep) {
            case 1:
                return <MainGrid
                    nextStep={nextStep}
                    handleTheme={(e)=> handleTheme(e)}
                    handleCartData = {handleCartData}
                />;
            case 2:
                return <OrderCheckout
                    previousStep={previousStep}
                    nextStep={nextStep}
                    cartMap={cartMap}
                />;
            case 3:
                return <OrderCompleted
                    nextStep={nextStep}
                />;
            default:
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Header />
                <Container sx={{ mt: 10, p: "0!important" }} maxWidth="md">
                    {wizardSteps()}
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
