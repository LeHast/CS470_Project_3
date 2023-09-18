import '../Styles/Board.css'

import SmallBoard from "./SmallBoard";

import { Box } from '@mui/material';

const sxBoxStyle = {
    display: 'flex',
}

const Board = (props) => 
{
    
    return(
        <Box>
            <Box sx={sxBoxStyle}>
                <SmallBoard onClickFunction={props.onClickFunction} playerColor={props.playerColor}/>
                <SmallBoard onClickFunction={props.onClickFunction} playerColor={props.playerColor}/>
            </Box>        
            <Box sx={sxBoxStyle}>
                <SmallBoard onClickFunction={props.onClickFunction}/>
                <SmallBoard onClickFunction={props.onClickFunction}/>
            </Box>
        </Box>        
    );
}

export default Board;