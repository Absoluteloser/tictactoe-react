import { useState } from 'react'

const TicTacToe1: React.FC = () => {
    const [board, setboard] = useState(
        [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    )
    const [winner, setwinner] = useState(null)
    const [isnext, setisnext] = useState(false)
    const [currentPlayer, setcurrentPlayer] = useState('x')
    const [draw, setdraw] = useState(false)
    const resetgame = () => {
        setboard([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ])
        setwinner(null)
        setisnext(false)
        setcurrentPlayer('x')
    }
    const handleClick = (row: number, col: number) => {
        if (board[row][col] || winner) return
        const newboard = [...board]
        newboard[row][col] = currentPlayer
        setboard(newboard)
        changePlayer()
        checkdraw()
        checkwinner()
    }
    const winninglines = [
        [[0, 0], [1, 1], [2, 2]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]]
    ]
    const checkwinner = () => {
        for (let i = 0; i < winninglines.length; ++i) {
            const [[a, b], [c, d], [e, f]] = winninglines[i]
            if (board[a][b] && board[a][b] == board[c][d] && board[c][d] == board[e][f]) {
                setwinner(board[a][b])
                return board[a][b]
            }
        }
    }
    const checkdraw = () => {
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                if (board[i][j] == null) {
                    return false
                }
            }
        }
        setdraw(true)
        return true
    }
    const changePlayer = () => {
        setisnext(!isnext)
        setcurrentPlayer(currentPlayer == 'x' ? 'o' : 'x')
    }
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((cell, cellIndex) => (
                            <button
                                key={cellIndex}
                                style={{
                                    backgroundColor: 'blueviolet',
                                    color: 'white',
                                    width: '100px',
                                    height: '100px',
                                    margin: '10px',
                                    borderRadius: '5px',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleClick(rowIndex, cellIndex)}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px', // Add margin-top for spacing
    padding: '10px', // Add padding for better layout
    backgroundColor: '#f0f0f0', // Add a background color for contrast
    borderRadius: '10px', // Add border radius for rounded corners
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
    textAlign: 'center', // Center align the text
    color: winner ? (winner === 'x' ? 'blue' : 'red') : 'black', // Change text color based on winner
    fontSize: '24px', // Increase font size for better visibility
    fontWeight: 'bold' // Make the text bold
}}>
    {winner
        ? `Winner is ${winner}`
        : draw
            ? 'Draw'
            : `Next player is ${currentPlayer}`}
    <button
        style={{
            backgroundColor: '#ff3e3e',
            color: '#fff',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px' // Add margin-top for spacing between text and button
        }}
        onClick={resetgame}
    >
        RESET
    </button>
</div>
        </>
    )
}

export default TicTacToe1

///css part taken from ai and some part where i got stuck used ai
///styling part mostly done by ai i only did the logic part of the game