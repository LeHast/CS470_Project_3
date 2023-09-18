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
        <Box className="GridBox" >
            <Grid className='GridBoard'>
                <Box item='true' sx={sxs[0]} onClick={() => onClickFunction(changeColor)} className='CellBoard'></Box>
                <Box className='CellBoard'></Box>
                <Box className='CellBoard'></Box>
            </Grid>
            <Grid className='GridBoard'>
                <Box className='CellBoard'>4</Box>
                <Box className='CellBoard'>5</Box>
                <Box className='CellBoard'>6</Box>
            </Grid>
            <Grid className='GridBoard'>
                <Box className='CellBoard'>7</Box>
                <Box className='CellBoard'>8</Box>
                <Box className='CellBoard'>9</Box>
            </Grid>
        </Box>
    );
}

export default SmallBoard; 