/*游戏规则及功能管理
　　1.开始时棋盘内随机出现两个数字，出现的数字仅可能为2或4
　　2.玩家可以选择上下左右四个方向，若棋盘内的数字出现位移或合并，视为有效移动
　　3.玩家选择的方向上若有相同的数字则合并，每次有效移动可以同时合并，但不可以连续合并
　　4.合并所得的所有新生成数字想加即为该步的有效得分
　　5.玩家选择的方向行或列前方有空格则出现位移
　　6.每有效移动一步，棋盘的空位(无数字处)随机出现一个数字(依然可能为2或4)
　　7.棋盘被数字填满，无法进行有效移动，判负，游戏结束
　　8.棋盘上出现2048，判胜，游戏结束
函数功能:
1.获得随机未赋值的坐标点       2.判断棋盘是否空位
3.克隆棋盘                    4.生成2或4
5.初始化棋盘                  5-8能否上下左右移动
9.移动棋盘                    10.合并棋盘                    
11.胜利                       12.失败                       
12.判断两次移动棋盘是否相同
*/
var GameManager = {
    /*随机获得未赋值的坐标点
        输入：array-最新棋盘(包括新出现的数字)
        输出：一个坐标点 eq：[2,1]
    */
    getRandomPostion: function (array) {
        array = this.copyBoard(array);         //获取克隆棋盘,不包括新出现的点
        if (!this.judgeHasPostion(array)) {    //判断棋盘是否有空位,如果没有，返回null
            return null;
        }
        var postion = [];                      //存储未赋值的坐标点
        for (let i = 0; i < 4; ++i) {          //遍历整个棋盘，把空位坐标放进position中
            for (let j = 0; j < 4; ++j) {
                if (array[i][j] == null) {
                    postion.push([i, j]);
                }
            }
        }
        var length = postion.length;           //空位数组的长度
        var random = Math.floor(Math.random() * length);    //在0-15之间取数
        return postion[random];                 //返回获得一个坐标点
    },
    /*判断棋盘是否空位
        输入：array-最新棋盘
        输出：有空位-true，无空位-false
    */
    judgeHasPostion: function (array) {
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                if (array[i][j] == null) {   //如果有空位，返回true
                    return true;
                }
            }
        }
        return false;                  //没有，返回false
    },
    /*克隆棋盘
        输入：array-最新棋盘
        输出：ret_arr-最新棋盘
    */
    copyBoard: function (array) {
        var ret_arr = [];
        for (let i = 0; i < 4; i++) {
            var arr = [];
            for (let j = 0; j < 4; j++) { //生成每一行
                arr.push(array[i][j]);
            }
            ret_arr.push(arr);
        }
        return ret_arr;
    },
    /*生成2或4
        输入：''
        输出：2or4
    */
    getRandom2OR4: function () {
        var value = Math.random()<0.7 ?2 : 4;
        // let value = 4/Math.round(Math.random()+1); //4/(1or2)
        return value;
    },                   
    /*初始化棋盘
        输入：''
        输出：board-有两个数字的新棋盘
    */
    intialBoard: function () {
        var board = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
        //执行两次，把2or4放到空位
        var postion = this.getRandomPostion(board);
        board[postion[0]][postion[1]] = this.getRandom2OR4();
        postion = this.getRandomPostion(board);
        board[postion[0]][postion[1]] = this.getRandom2OR4();
        return board;
    },
    /*能否上移
        输入：board-棋盘
        输出：true-可以移动，false-不可移动
    */
    canMoveup: function (board) {
        //上
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i < 4; i++) {
                if (board[i][j] != null) {
                    if (board[i - 1][j] == null || board[i - 1][j] == board[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    /*能否下移
        输入：board-棋盘
        输出：true-可以移动，false-不可移动
    */
    canMovedown: function (board) {
        for (var j = 0; j < 4; j++) {
            for (var i = 2; i >= 0; i--) {
                if (board[i][j] != null) {
                    if (board[i + 1][j] == null || board[i + 1][j] == board[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    /*能否左移
        输入：board-棋盘
        输出：true-可以移动，false-不可移动
    */
    canMoveleft : function (board) {
        for(let i = 0;i < 4;i++){
            for(let j = 1;j < 4;j++){
                if (board[i][j] != null) {
                    if (board[i][j-1] == null || board[i][j-1] == board[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    /*能否右移
        输入：board-棋盘
        输出：true-可以移动，false-不可移动
    */
    canMoveright : function (board) {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j] != null) {
                    if (board[i][j + 1] == null || board[i][j] == board[i][j + 1]) {
                        return true;
                    }
                }
            }
        }
        return false
    },
    /*移动棋盘
        输入：board-最新棋盘(不包括新出现的数字)   方向：上下左右
        输出：newboard-移动后的棋盘(不包括新出现的数字、不包括合并)
    */
    moveBoard: function (board, direction) {
        var newBoard = this.copyBoard(board);
        var count = 0;
        if (direction == 38) {  //如果按上，下三行位置有数，第一行没数，就向上移动
            for (let j = 0; j < 4; j++) {
                for (let i = 1; i < 4; i++) {
                    if (newBoard[i][j] != null) {   //如果[1,0]位置有数
                        let k = i - 1;
                        while (k >= 0 && newBoard[k][j] == null) {
                            k--;
                        }
                        k++;
                        if (k != i) {
                            newBoard[k][j] = newBoard[i][j];
                            newBoard[i][j] = null;
                        }
                    }
                }
            }
        }
        if (direction == 40) {
            for (let j = 0; j < 4; j++) {
                for (let i = 2; i >= 0; i--) {
                    if (newBoard[i][j] != null) {
                        let k = i + 1;
                        while (k < 4 && newBoard[k][j] == null) {
                            k++;
                        }
                        k--;
                        if (k != i) {
                            newBoard[k][j] = newBoard[i][j];
                            newBoard[i][j] = null;
                        }
                    }
                }
            }
        }
        if (direction == 37) {
            for (let i = 0; i < 4; i++) {
                for (let j = 1; j < 4; j++) {
                    if (newBoard[i][j] != null) {
                        let k = j - 1;
                        while (k >= 0 && newBoard[i][k] == null) {
                            k--;
                        }
                        k++;
                        if (k != j) {
                            newBoard[i][k] = newBoard[i][j];
                            newBoard[i][j] = null;
                        }
                    }
                }
            }
        }
        if (direction == 39) {
            for (let i = 0; i < 4; i++) {
                for (let j = 2; j >= 0; j--) {
                    let k = j + 1;
                    while (k < 4 && newBoard[i][k] == null) {
                        k++;
                    }
                    k--;
                    if (k != j) {
                        newBoard[i][k] = newBoard[i][j];
                        newBoard[i][j] = null;
                    }
                }
            }
        }  
       return newBoard;
    },
    /*合并棋盘
        输入：board-合并之前的棋盘(包括新出现的数字)   方向：上下左右
        输出：newboard-移动后的棋盘(不包括新出现的数字、包括合并)
    */
    mergeBoard: function (board, direction) {
        var score = 0;
        var newBoard = this.copyBoard(board);
        if (direction == 38) {
            //up
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < 3; i++) {
                    //如果同一列，上下两个数相等，上面的乘2，下面的变为null，分数加上(上面的乘2)
                    if (newBoard[i][j] && newBoard[i + 1][j] && newBoard[i][j] == newBoard[i + 1][j]) {
                        newBoard[i][j] *= 2;
                        newBoard[i + 1][j] = null;
                        score += newBoard[i][j];
                    }
                }
            }
        }
        if (direction == 40) {
            //down
            for (let j = 0; j < 4; j++) {
                //如果同一列，上下两个数相等，下面的乘2，上面的变为null，分数加上(下面的乘2)
                for (let i = 3; i > 0; i--) {
                    if (newBoard[i][j] && newBoard[i - 1][j] && newBoard[i][j] == newBoard[i - 1][j]) {
                        newBoard[i][j] *= 2;
                        newBoard[i - 1][j] = null;
                        score += newBoard[i][j];
                    }
                }
            }
        }
        if (direction == 37) {
            //left
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                //如果同一行，左右两个数相等，左面的乘2，右面的变为null，分数加上(左面的乘2)
                    if (newBoard[i][j] && newBoard[i][j + 1] && newBoard[i][j] == newBoard[i][j + 1]) {
                        newBoard[i][j] *= 2;
                        newBoard[i][j + 1] = null;
                        score += newBoard[i][j];
                    }
                }
            }
        }
        if (direction == 39) {
            //right
            for (let i = 0; i < 4; i++) {
                for (let j = 3; j > 0; j--) {
                //如果同一行，左右两个数相等，右面的乘2，左面的变为null，分数加上(右面的乘2)
                    if (newBoard[i][j] && newBoard[i][j - 1] && newBoard[i][j] == newBoard[i][j - 1]) {
                        newBoard[i][j] *= 2;
                        newBoard[i][j - 1] = null;
                        score += newBoard[i][j];
                    }
                }
            }
        }
        return {
            board: newBoard,
            score: score
        }
    },
    /*胜利
        输入：arrays-最新棋盘(包括新出现的数字)
        输出：出现2048，返回true,没出现，返回false
    */
    isWin: function (arrays) {
        arrays.forEach(function (array, rindex) {  //棋盘，4个数组
            array.forEach(function (value, cindex) {  //每一行，一个数组
                if (value == 2048) {
                    return true;
                }
            });
        });
        return false;
    },
    /*失败
        输入：arrays-最新棋盘(包括新出现的数字)
        输出：新旧棋盘不一样，返回false，一样，返回true
    */
    isLose: function (array) {
        if (this.judgeHasPostion(array)) {
            return false;
        }
        var result = true;
        var self = this;
        [37, 38, 39, 40].forEach(function (direction) {
            var newBoard = self.mergeBoard(array, direction).board;   //合并后的棋盘
            if (!self.isSameBoard(newBoard, array)) {    //新旧棋盘不一样，返回false
                result = false;
            }
        });
        return result;
    },
    /*判断两次移动棋盘是否相同
        输入：
        输出：新旧棋盘不一样，返回false，一样，返回true
    */
    isSameBoard: function (arrays1, arrays2) {
        for (var i = 0; i < arrays1.length; i++) {
            for (var j = 0; j < arrays2.length; j++) {
                if (arrays1[i][j] != arrays2[i][j]) {   //新旧棋盘不一样，返回false
                    return false;
                }
            }
        }
        return true;
    },
};
export default GameManager;
