import '../Styles/SmallBoard.css'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const changeColor = (playerColor) => {
    console.log('changing color' );
    sxs[0] = playerColor;
}

const length = 9;
const initialValue = {backgroundColor: '#primary'};
const sxs = new Array(length).fill(initialValue);

const SmallBoard = (props) => 
{
    const {onClickFunction} = props

    return (
        's'
    );
}

export default SmallBoard; 