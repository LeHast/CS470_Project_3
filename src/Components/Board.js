import '../Styles/Board.css'
import '../Styles/SmallBoard.css'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Button from '@mui/material/Button';

const sxBoxStyle = {
    display: 'flex',
}

function rotateMatrix(matrix) {
    const n = matrix.length;
  
    // Transpose the matrix
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        // Swap matrix[i][j] and matrix[j][i]
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
  
    // Reverse each row
    for (let i = 0; i < n; i++) {
      matrix[i].reverse();
    }
}
  
//   // Example 3x3 matrix
//   const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
//   ];
//   rotateMatrix(matrix); 
//   // Print the rotated matrix
//   for (let row of matrix) {
//     console.log(row);
//   }


const Board = (props) => 
{
    const playerColorState = [{backgroundColor: '#ffffff'}, {backgroundColor: '#000000'}];
    const sxColorInitialState = new Array(6).fill(new Array(6).fill({ backgroundColor: '#primary' }));
    const [sxColor, setSxColor] = useState(sxColorInitialState);
    const [playerState, setPlayerState] = useState(0); // 0 white, 1 black
    const [activateRotate, setActivateRotate] = useState('true');

    const ChangeColor = (row, col) => {
        const c = sxColor.map(innerArray => innerArray.map(obj => ({ ...obj })));
        c[row][col] = playerColorState[playerState];
        setSxColor(c);
        if (playerState === 0){
            setPlayerState(1);
        }
        if (playerState === 1){
            setPlayerState(0);
        }
        setActivateRotate('false');
        console.log(activateRotate);
        
    }    

    return(
        <Box>
            <Box className='GridBoard'> 
                <Box>
                    <Button variant="contained" className='btDirection' disabled={activateRotate} >Left</Button>
                    <Button variant="contained" className='btDirection' disabled={activateRotate}>Right</Button>
                    <Grid className="GridBox" >
                        {
                            sxColor.slice(0,3).map((row, rowIdx) =>
                            row.slice(0,3).map((cell, colIndex) => ( 
                                <Box key={colIndex} item='true' sx={sxColor[rowIdx][colIndex]} className='CellBoard' onClick={() => ChangeColor(rowIdx, colIndex)} > {rowIdx} {colIndex}</Box>

                            ))
                        )}
                    </Grid>
                </Box>
                <Box className="GridBox" >
                    {
                        sxColor.slice(0,3).map((row, rowIdx) =>
                        row.slice(3,6).map((cell, colIndex) => ( 
                            <Box key={colIndex} item='true' sx={sxColor[rowIdx][colIndex + 3]} className='CellBoard' onClick={() => ChangeColor(rowIdx, colIndex + 3)}> {rowIdx} {colIndex + 3}</Box>

                        ))
                    )}
                </Box>
            </Box>

            <Box className='GridBoard'>  
                <Grid className="GridBox" >
                    {
                        sxColor.slice(3,6).map((row, rowIdx) =>
                        row.slice(0,3).map((cell, colIndex) => ( 
                            <Box key={colIndex} item='true' sx={sxColor[rowIdx+3][colIndex]} className='CellBoard' onClick={() => ChangeColor(rowIdx + 3, colIndex)}> {rowIdx+3} {colIndex}</Box>

                        ))
                    )}
                </Grid>
                <Box className="GridBox" >
                    {
                        sxColor.slice(3,6).map((row, rowIdx) =>
                        row.slice(3,6).map((cell, colIndex) => ( 
                            <Box key={colIndex} item='true' sx={sxColor[rowIdx+3][colIndex + 3]} className='CellBoard' onClick={() => ChangeColor(rowIdx + 3, colIndex + 3)}> {rowIdx+3} {colIndex + 3}</Box>

                        ))
                    )}
                </Box>
            </Box>
        </Box> //Itial Box
    );
}

export default Board;
