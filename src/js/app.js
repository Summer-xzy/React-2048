import React from 'react';
import ReactDom from 'react-dom';
import ChessBoard from './ChessBoard';  //引入棋盘
import GameManager from './GameManager';  //引入游戏规则
import '../less/app.less';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            score: 0,                        //初始状态，分数是0，
            board: GameManager.intialBoard() //初始化棋盘,有两个数在棋盘上
        };
    }
    //重新开始新游戏
    handleReStartGame() {
        this.setState({
            score: 0,
            board: GameManager.intialBoard()
        });
    }
    //键盘事件,event(键盘对象)
    handleKeyDown(e) {
        if (e.keyCode > 40 || e.keyCode < 37) {
            return false;
        }
        var canMoveup = GameManager.canMoveup(this.state.board);
        var canMovedown = GameManager.canMovedown(this.state.board);
        var canMoveleft = GameManager.canMoveleft(this.state.board);
        var canMoveright = GameManager.canMoveright(this.state.board);

        //移动棋盘(合并之前的棋盘)
        var newBoard = GameManager.moveBoard(this.state.board, e.keyCode); 
        //合并棋盘
        var result = GameManager.mergeBoard(newBoard, e.keyCode);
        //合并后的棋盘          
        newBoard = result.board;                                           
        this.setState({
            board: newBoard
        });
        //新坐标点
        var newPostion = GameManager.getRandomPostion(this.state.board);       
        if ((e.keyCode == 38 && canMoveup) || (e.keyCode == 40 && canMovedown) || (e.keyCode == 37 && canMoveleft) || (e.keyCode == 39 && canMoveright)) {
                newBoard[newPostion[0]][newPostion[1]] = GameManager.getRandom2OR4();
        }
        if (newPostion != null) {
            this.setState((preState)=>{
                var board = preState.board;
                var score = preState.score + result.score;
                return {
                    score: score,
                    board: board
                }
            });
        }
        if (GameManager.isWin(this.state.board)) {
            alert('You Win！');
        }
        if (GameManager.isLose(this.state.board)) {
            alert('Game Over！');
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this)); //键盘事件
    }

    render() {
        return (
            <div className="app">
                <div className="heading">
                    <span className="title">2048</span>
                    <span className="score-container">
                        <div className="score-tip">score</div>
                        <div className="score">{this.state.score}</div>
                    </span>
                </div>
                <div className="game-intro">
                    <span className="subtitle">Use your brain<br/>Designed by XZY</span>
                    <button className="restart-container" onClick={this.handleReStartGame.bind(this)}>New Game</button>
                </div>
                <ChessBoard board={this.state.board}/>
            </div>
        );
    }
}

ReactDom.render(
    <App />, 
    document.getElementById('app')
);