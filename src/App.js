import { Box } from '@mui/material';
import './App.css';


import PentagoGame from './Components/PentagoGame';

function App() {
  return (
    <Box className='App'>
      <h1 className='title'> Pentago Game</h1>
      <Box className='BGame'>
        <PentagoGame />
      </Box>
    </Box>

  );
}

export default App;
