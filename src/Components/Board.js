// Add black to the win condition
import '../Styles/Board.css'
import '../Styles/SmallBoard.css'

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Button from '@mui/material/Button';

import BasicModal from './BasicModal'

let stopGame = false;
let wonPlayer = '';

function MakeArrayCopy (sx, row, col) {
  const copiedArray = [];

  for (let i = row; i <= row + 2; i++) {
    const row = [];
    for (let j = col; j <= col + 2; j++) {
      row.push({ ...sx[i][j] }); 
    }
    copiedArray.push(row);
  }
  return copiedArray
}

function checkForFiveIdenticalValues(arr, player = 0) {
  
  function checkHorizontal() {
    const players = ['#ffffff', '#000000'];
    let inArrow = 0;

    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
      for (let colIdx = 0; colIdx < 6; colIdx ++) {
        if (arr[rowIdx][colIdx].backgroundColor !== players[player]){
          inArrow = 0;
        }
        else
        {
          inArrow++;
        }
        if (inArrow >= 5)
        {
          return true;
        }
      }
      inArrow = 0;
    }
    return false;
  }

  function checkVertical() {
    const players = ['#ffffff', '#000000'];
    let inArrow = 0;

    for (let colIdx = 0; colIdx < 6; colIdx ++) {
      for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
        if (arr[rowIdx][colIdx].backgroundColor !== players[player]){
          inArrow = 0;
        }
        else
        {
          inArrow++;
        }
        if (inArrow >= 5)
        {
          return true;
        }
      }
      inArrow = 0;
    }
    return false;
  }

  function checkDiagonal() {
    const players = ['#ffffff', '#000000'];
    let inArrow = 0;
  
    // Check diagonal from top-left to bottom-right
    for (let offset = 0; offset < 2; offset++)
      for (let i = 0; i < 6 - offset; i++) {
        if (arr[i][i + offset].backgroundColor !== players[player]) {
          inArrow = 0;
        } else {
          inArrow++;
        }
        if (inArrow >= 5) {
          return true;
        }
      }
    inArrow = 0;
    for (let offset = 0; offset < 2; offset++)
      for (let i = 0; i < 6 - offset; i++) {
        if (arr[i + offset][i].backgroundColor !== players[player]) {
          inArrow = 0;
        } else {
          inArrow++;
        }
        if (inArrow >= 5) {
          return true;
        }
      }
    inArrow = 0;

    // Check diagonal from top-right to bottom-left
    for (let offset = 0; offset < 2; offset++)
      for (let i = 0; i < 6 - offset; i++) {
        if (arr[i][5 - i - offset].backgroundColor !== players[player]) {
          inArrow = 0;
        } else {
          inArrow++;
        }
        if (inArrow >= 5) {
          return true;
        }
      }
      inArrow = 0;

      for (let offset = 0; offset < 2; offset++)
        for (let i = 0; i < 6 - offset; i++) {
          if (arr[i + offset][5 - i].backgroundColor !== players[player]) {
            inArrow = 0;
          } else {
            inArrow++;
          }
          if (inArrow >= 5) {
            return true;
          }
        }
    return false;
  }
  
  if (checkHorizontal() || checkVertical() || checkDiagonal())
  {
    if(player === 0)
      wonPlayer = 'White';
    else
      wonPlayer = 'Black';
    return true;
  }
  return false;
}

const Board = (props) => 
{
    const playerColorState = [{backgroundColor: '#ffffff'}, {backgroundColor: '#000000'}];
    const sxColorInitialState = new Array(6).fill(new Array(6).fill({ backgroundColor: '#primary' }));
    const [sxColor, setSxColor] = useState(sxColorInitialState); // player board
    const [playerState, setPlayerState] = useState(0); // 0 white, 1 black, 2 Draw
    const [disabledRontateButton, setdisabledRontateButton] = useState(true);

    const ChangeColor = (row, col) => {
        if (!disabledRontateButton || sxColor[row][col].backgroundColor !== '#primary')
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
        setdisabledRontateButton(false);
        let winWhite = false;
        let winBlack = false;
        winWhite = checkForFiveIdenticalValues(c, 0);
        winBlack = checkForFiveIdenticalValues(c, 1);

        if (winWhite && winBlack){
          wonPlayer = 'Draw'
          stopGame = true;
        }
        else if (winWhite || winBlack){
          stopGame = true;
        }    
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

        const c1 = sxColor.map(innerArray => innerArray.map(obj => ({ ...obj })));
        const c = MakeArrayCopy(sxColor, sectionRow, sectionCol);

      // Traverse each cycle
      if (clockwise)
      for (let i = 0; i < 2; i++) {
        for (let j = i ; j < 2; j++) {
          let temp = c[i][j];
          c[i][j] = c[3 - 1 - j][i];
          c[3 - 1 - j][i] = c[3 - 1 - i][3 - 1 - j];
          c[3 - 1 - i][3 - 1 - j] = c[j][3 - 1 - i];
          c[j][3 - 1 - i] = temp;
        }
      }
      else
        for (let i = 0; i < 2; i++) {
          for (let j = i; j < 2; j++) {
              let temp = c[i][j];
              c[i][j] = c[j][3 - 1 - i];
              c[j][3 - 1 - i] = c[3 - 1 - i][3 - 1 - j];
              c[3 - 1 - i][3 - 1 - j] = c[3 - 1 - j][i];
              c[3 - 1 - j][i] = temp;
          }
      }
      let x =0;          
      let y = 0;
        // Update the original array with the copied subset
        for (let i = sectionRow; i <= sectionRow + 2; i++) {
           x = 0;
          for (let j = sectionCol; j <= sectionCol + 2; j++) {
            c1[i][j] = { ...c[y][x] };
            x++;
          }
          y++
        }
        setSxColor(c1);
        
        let winWhite = false;
        let winBlack = false;
        winWhite = checkForFiveIdenticalValues(c1, 0);
        winBlack = checkForFiveIdenticalValues(c1, 1);
        
        if (winWhite && winBlack){
          wonPlayer = 'Draw'
          stopGame = true;
        }
        else if (winWhite || winBlack){
          stopGame = true;
        }
        setdisabledRontateButton(true); // Disabled, rotation finished
        return;
    }

    // Out of funcutoins
    let playerDisplay;
    if (wonPlayer === 'Draw'){
      playerDisplay = 'Draw';
    }
    else if (playerState === 0){
      playerDisplay = 'White Turn';
    }else{
      playerDisplay = 'Black Turn';
    }

    return(
        <Box className='GameBoard'>
          <h1 className='PlayerDisplay'>{playerDisplay}</h1>
            <Box className='GridBoard'> 
                <Box>
                    <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(0, false)}>Left</Button>
                    <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(0, true)}>Right</Button>
                    <Grid className="GridBox" >
                        {
                            sxColor.slice(0,3).map((row, rowIdx) =>
                            row.slice(0,3).map((cell, colIndex) => ( 
                                <Box key={colIndex} item='true' sx={sxColor[rowIdx][colIndex]} className='CellBoard' onClick={() => ChangeColor(rowIdx, colIndex)} ></Box>

                            ))
                        )}
                    </Grid>
                </Box>
                <Box>
                  <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(1, false)}>Left</Button>
                  <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(1, true)}>Right</Button>
                  <Grid className="GridBox" >
                    {
                      sxColor.slice(0,3).map((row, rowIdx) =>
                      row.slice(3,6).map((cell, colIndex) => ( 
                        <Box key={colIndex} item='true' sx={sxColor[rowIdx][colIndex + 3]} className='CellBoard' onClick={() => ChangeColor(rowIdx, colIndex + 3)}></Box>
                        
                        ))
                        )}
                </Grid>
                </Box>
            </Box>

            <Box className='GridBoard'>  
                <Box>

                <Grid className="GridBox" >
                    {
                      sxColor.slice(3,6).map((row, rowIdx) =>
                      row.slice(0,3).map((cell, colIndex) => ( 
                        <Box key={colIndex} item='true' sx={sxColor[rowIdx+3][colIndex]} className='CellBoard' onClick={() => ChangeColor(rowIdx + 3, colIndex)}></Box>
                        
                        ))
                        )}
                </Grid>
                <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(2, false)}>Left</Button>
                <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(2, true)}>Right</Button>
                </Box>
                <Box>
                <Grid className="GridBox" >
                    {
                      sxColor.slice(3,6).map((row, rowIdx) =>
                      row.slice(3,6).map((cell, colIndex) => ( 
                        <Box key={colIndex} item='true' sx={sxColor[rowIdx+3][colIndex + 3]} className='CellBoard' onClick={() => ChangeColor(rowIdx + 3, colIndex + 3)}></Box>
                        
                        ))
                        )}
                </Grid>
                <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(3, false)}>Left</Button>
                <Button variant='contained' className='btDirection' disabled={disabledRontateButton} onClick={() => rotateMatrix(3, true)}>Right</Button>
                </Box>
            </Box>
            <BasicModal toOpen={stopGame} player={wonPlayer}/>

        </Box> //Itial Box
    );
}

export default Board;
