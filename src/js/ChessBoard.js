import React from 'react';
import Pieces from './Pieces'
import '../less/ChessBoard.less';

//棋盘
class GameContainer extends React.Component{
    constructor(){
        super();
    }
    render(){
        const board = this.props.board;  //初始化的棋盘
        return(
            <div className="game-container">
                <div className="grid-row">
                    <Pieces value={board[0][0]}/>
                    <Pieces value={board[0][1]}/>
                    <Pieces value={board[0][2]}/>
                    <Pieces value={board[0][3]}/>
                </div>
                <div className="grid-row">
                    <Pieces value={board[1][0]}/>
                    <Pieces value={board[1][1]}/>
                    <Pieces value={board[1][2]}/>
                    <Pieces value={board[1][3]}/>
                </div>
                <div className="grid-row">
                    <Pieces value={board[2][0]}/>
                    <Pieces value={board[2][1]}/>
                    <Pieces value={board[2][2]}/>
                    <Pieces value={board[2][3]}/>
                </div>
                <div className="grid-row">
                    <Pieces value={board[3][0]} />
                    <Pieces value={board[3][1]} />
                    <Pieces value={board[3][2]} />
                    <Pieces value={board[3][3]} />
                </div>
            </div>
        );
    }
}

export default GameContainer;



