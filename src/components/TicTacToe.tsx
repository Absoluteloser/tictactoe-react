
import { useState } from 'react'
type Player=null|'x'|'o'
interface TicTacToeProps {
    
}
/**
 * A Tic Tac Toe game component.
 *
 * The component renders a 3x3 grid of buttons. When a button is clicked, it
 * changes its value to either 'x' or 'o' depending on whose turn it is. The
 * component also checks for a winner after each move and displays a message if
 * there is a winner.
 *
 * @param props - No props are expected.
 * @returns A JSX element representing the Tic Tac Toe game.
 */
const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState(
        [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ] as [null | 'x' | 'o', null | 'x' | 'o', null | 'x' | 'o'][],
    );
    const [isNext, setIsNext] = useState(true);
    const [winner, setWinner] = useState(null as null | 'x' | 'o');

    /**
     * Handles a button click event.
     *
     * @param row - The row index of the button.
     * @param col - The column index of the button.
     */
    const handleChange = (row: number, col: number) => {
        if (board[row][col] || winner) {
            return;
        }
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = isNext ? 'x' : 'o';
        setBoard(newBoard);
        changePlayer();
        findWinner();
    };

    /**
     * Changes the player.
     */
    const changePlayer = () => {
        setIsNext(!isNext);
    };

    /**
     * Finds the winner.
     *
     * @returns The winner of the game if there is one, null otherwise.
     */
    const findWinner = (): null | 'x' | 'o' => {
        for (const [[a, b], [c, d], [e, f]] of winningMoves) {
            if (board[a][b] && board[a][b] === board[c][d] && board[c][d] === board[e][f]) {
                setWinner(board[a][b]);
                return board[a][b];
            }
        }
        return null;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {board.map((row, rowIndex) => {
                return (
                    <>
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((cell, colIndex) => {
                                const buttonStyle = {
                                    backgroundColor: 'lightblue',
                                    color: 'black',
                                    padding: '20px',
                                    margin: '5px',
                                    border: '2px solid black',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '1.5em',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                };

                                return (
                                    <button key={colIndex} onClick={() => handleChange(rowIndex, colIndex)} style={buttonStyle}>
                                        {cell}
                                    </button>
                                );
                            })}
                        </div>
                        <div style={{ fontSize: '2em', margin: '20px 0' }}>{winner ? `Player ${winner} wins!` : ''}</div>
                    </>
                );
            })}
        </div>
    );
};

const winningMoves = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
] as const;

export default TicTacToe