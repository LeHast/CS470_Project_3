import '../Styles/Board.css'
import '../Styles/SmallBoard.css'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Button from '@mui/material/Button';

import BasicModal from './BasicModal'

const sxBoxStyle = {
    display: 'flex',
}


let binRotate = false;

let stopGame = false;
let win = false;

function checkForFiveIdenticalValues(arr) {
  return;
  function checkHorizontal() {
    for (let row of arr) {
      for (let i = 0; i <= row.length - 5; i++) {
        if (row.slice(i, i + 5).every(val => val === row[i])) {
          return true;
        }
      }
    }
    return false;
  }

  function checkVertical() {
    for (let col = 0; col < arr[0].length; col++) {
      for (let i = 0; i <= arr.length - 5; i++) {
        if (arr.slice(i, i + 5).every(row => row[col] === arr[i][col])) {
          return true;
        }
      }
    }
    return false;
  }

  function checkDiagonal() {
    for (let row = 0; row <= arr.length - 5; row++) {
      for (let col = 0; col <= arr[0].length - 5; col++) {
        if (Array.from({ length: 5 }).every((_, i) => arr[row + i][col + i] === arr[row][col])) {
          return true;
        }
      }
    }

    for (let row = 0; row <= arr.length - 5; row++) {
      for (let col = arr[0].length - 1; col >= 4; col--) {
        if (Array.from({ length: 5 }).every((_, i) => arr[row + i][col - i] === arr[row][col])) {
          return true;
        }
      }
    }

    return false;
  }

  return checkHorizontal() || checkVertical() || checkDiagonal();
}

const Board = (props) => 
{
    const playerColorState = [{backgroundColor: '#ffffff'}, {backgroundColor: '#000000'}];
    const sxColorInitialState = new Array(6).fill(new Array(6).fill({ backgroundColor: '#primary' }));
    const [sxColor, setSxColor] = useState(sxColorInitialState); // player board
    const [playerState, setPlayerState] = useState(0); // 0 white, 1 black
    const [activateRotate, setActivateRotate] = useState(true);

    const ChangeColor = (row, col) => {
        if (binRotate)
            return;

        const c = sxColor.map(innerArray => innerArray.map(obj => ({ ...obj })));
        c[row][col] = playerColorState[playerState];
        setSxColor(c);
        if (playerState === 0){
            setPlayerState(1);
        }
        if (playerState === 1){
            setPlayerState(0);
        }
        setActivateRotate(binRotate);
        binRotate = true;
        console.log(activateRotate);
        stopGame = checkForFiveIdenticalValues(sxColor);
        win = stopGame;

    } 

    // sections: 
    // 0 top-L
    // 1 top-R
    // 2 bot-L
    // 3 bot-R
    function rotateMatrix( section, clockwise = true) {
        let sectionRow, sectionCol;
      
        switch (section) {
          case 0:
            sectionRow = 0;
            sectionCol = 0;
            break;
          case 1:
            sectionRow = 0;
            sectionCol = 3;
            break;
          case 2:
            sectionRow = 3;
            sectionCol = 0;
            break;
          case 3:
            sectionRow = 3;
            sectionCol = 3;
            break;
        }

        //const c = sxColor.map(innerArray => innerArray.map(obj => ({ ...obj })));

      // Traverse each cycle
      if (clockwise)
        for (let i = sectionRow; i < sectionRow + 2; i++) {
          for (let j = i ; j < sectionCol + 2; j++) {
            let temp = c[i][j];
            c[i][j] = c[3 - 1 - j][i];
            c[3 - 1 - j][i] = c[3 - 1 - i][3 - 1 - j];
            c[3 - 1 - i][3 - 1 - j] = c[j][3 - 1 - i];
            c[j][3 - 1 - i] = temp;
          }
        }
      else
        for (let i = 0; i < sectionRow + 2; i++) {
          for (let j = i; j < sectionCol + 2; j++) {
              let temp = c[i][j];
              c[i][j] = c[j][3 - 1 - i];
              c[j][3 - 1 - i] = c[3 - 1 - i][3 - 1 - j];
              c[3 - 1 - i][3 - 1 - j] = c[3 - 1 - j][i];
              c[3 - 1 - j][i] = temp;
          }
      }
        setSxColor(c);
        binRotate = false;
        stopGame = checkForFiveIdenticalValues(sxColor);
        win = stopGame;
    }

    return(
        <Box>
            <Box className='GridBoard'> 
                <Box>
                    <Button variant='contained' className='btDirection' disabled={activateRotate} onClick={() => rotateMatrix(0, false)}>Left</Button>
                    <Button variant='contained' className='btDirection' disabled={activateRotate} onClick={() => rotateMatrix(0, true)}>Right</Button>
                    <Grid className="GridBox" >
                        {
                            sxColor.slice(0,3).map((row, rowIdx) =>
                            row.slice(0,3).map((cell, colIndex) => ( 
                                <Box key={colIndex} item='true' sx={sxColor[rowIdx][colIndex]} className='CellBoard' onClick={() => ChangeColor(rowIdx, colIndex)} > {rowIdx} {colIndex}</Box>

                            ))
                        )}
                    </Grid>
                </Box>
                <Box>
                  <Button variant='contained' className='btDirection' disabled={activateRotate} onClick={() => rotateMatrix(1, false)}>Left</Button>
                  <Button variant='contained' className='btDirection' disabled={activateRotate} onClick={() => rotateMatrix(1, true)}>Right</Button>
                  <Grid className="GridBox" >
                    {
                      sxColor.slice(0,3).map((row, rowIdx) =>
                      row.slice(3,6).map((cell, colIndex) => ( 
                        <Box key={colIndex} item='true' sx={sxColor[rowIdx][colIndex + 3]} className='CellBoard' onClick={() => ChangeColor(rowIdx, colIndex + 3)}> {rowIdx} {colIndex + 3}</Box>
                        
                        ))
                        )}
                </Grid>
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
            <BasicModal toOpen={stopGame}/>

        </Box> //Itial Box
    );
}

export default Board;
