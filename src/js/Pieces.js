import React from 'react';
import '../less/Pieces.less';

//棋盘每个方块
class Pieces extends React.Component{
    constructor(){
        super();
    }
    render(){
        const value = this.props.value ? this.props.value : ''; //获取棋盘中所有位置的值，有值赋值，无值赋空
        const tile_style = value ? 'tile value' + value : 'tile valuenull';
        return(
            <div className='PiecesSize'>
                <div className={tile_style}>{value}</div>
            </div>
        );
    }
}

export default Pieces;