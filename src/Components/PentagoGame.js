import Board from "./Board";

const ClickCircleInBoardCallback = (changeColor) =>{
    console.log('Clicking')
    changeColor(playerColor);

}

const playerColor = {backgroundColor: '#ffffff'}

const PentagoGame = () => 
{


    return(
        <Board onClickFunction={ClickCircleInBoardCallback} playerColor={playerColor} ></Board>
    );
}

export default PentagoGame;