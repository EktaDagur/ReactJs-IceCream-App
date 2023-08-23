import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import green from "@mui/material/colors/green";
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(() => ({
    textAlign: "center",
    color: "#65758C",
    width: "100%",
}));

const Image = styled('div')(({theme}) => ({
    width: theme.spacing(6),
    height: theme.spacing(6),
    position: 'relative',
    margin: `0 auto ${theme.spacing(4)}`,
}));

const Layer = styled('div')(({theme, position}) => ({
    width: theme.spacing(6),
    height: theme.spacing(6),
    position: 'absolute',
    borderRadius: '4px',
    border: `0.5px solid #DEE5EE`,
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 3px -1px rgba(0, 0, 0, 0.12)',
    transform: 'rotate(-10deg) translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    background: 'white',
    borderColor: 'transparent',
    ...(position === 'top' && {
        zIndex: 10,
    }),
    ...(position === 'middle' && {
        zIndex: 5,
        transform: 'rotate(-20deg) translate(-50%, -50%)',
    }),
    ...(position === 'bottom' && {
        zIndex: 0,
        background: "linear-gradient(135deg, #C4CFDD 0%, #65758C 100%)",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)",
        borderRadius: "3px",
        transform: "rotate(-30deg) translate(-50%, -50%)",
    }),
}));

export default function SuccessIcon() {
    return (
        <Wrapper>
            <Image>
                <Layer position="top">
                    <CheckIcon sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: green[500]
                    }}/>
                </Layer>
                <Layer position="middle"/>
                <Layer position="bottom"/>
            </Image>
        </Wrapper>
    );
}
