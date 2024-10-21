import React, { useState, useEffect } from 'react';

const Minesweeper = ({ size }) => {
  const [grid, setGrid] = useState([]);
  const [mineCount, setMineCount] = useState(10);
  const [gridSize, setGridSize] = useState({ rows: 9, cols: 9 });
  const [gameOver, setGameOver] = useState(false);
  const [flags, setFlags] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    let newGrid = [];
    for (let row = 0; row < gridSize.rows; row++) {
      let newRow = [];
      for (let col = 0; col < gridSize.cols; col++) {
        newRow.push({
          row,
          col,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        });
      }
      newGrid.push(newRow);
    }

    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      let randomRow = Math.floor(Math.random() * gridSize.rows);
      let randomCol = Math.floor(Math.random() * gridSize.cols);
      if (!newGrid[randomRow][randomCol].isMine) {
        newGrid[randomRow][randomCol].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        if (!newGrid[row][col].isMine) {
          let mines = getNeighborMines(newGrid, row, col);
          newGrid[row][col].neighborMines = mines;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setFlags(0);
  };

  const getNeighborMines = (grid, row, col) => {
    let mines = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue;
        let newRow = row + r;
        let newCol = col + c;
        if (
          newRow >= 0 &&
          newRow < gridSize.rows &&
          newCol >= 0 &&
          newCol < gridSize.cols
        ) {
          if (grid[newRow][newCol].isMine) {
            mines++;
          }
        }
      }
    }
    return mines;
  };

  const revealCell = (row, col) => {
    if (grid[row][col].isRevealed || grid[row][col].isFlagged || gameOver)
      return;
    let newGrid = grid.slice();
    newGrid[row][col].isRevealed = true;

    if (newGrid[row][col].isMine) {
      setGameOver(true);
      for (let r = 0; r < gridSize.rows; r++) {
        for (let c = 0; c < gridSize.cols; c++) {
          if (newGrid[r][c].isMine) {
            newGrid[r][c].isRevealed = true;
          }
        }
      }
      setGrid(newGrid);
      return;
    }

    if (newGrid[row][col].neighborMines === 0) {
      revealEmptyCells(newGrid, row, col);
    }

    setGrid(newGrid);
    checkWin(newGrid);
  };

  const revealEmptyCells = (grid, row, col) => {
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        let newRow = row + r;
        let newCol = col + c;
        if (
          newRow >= 0 &&
          newRow < gridSize.rows &&
          newCol >= 0 &&
          newCol < gridSize.cols
        ) {
          if (
            !grid[newRow][newCol].isRevealed &&
            !grid[newRow][newCol].isMine
          ) {
            grid[newRow][newCol].isRevealed = true;
            if (grid[newRow][newCol].neighborMines === 0) {
              revealEmptyCells(grid, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    if (gameOver || gameWon) return;
    let newGrid = grid.slice();
    if (!newGrid[row][col].isRevealed) {
      newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
      setFlags(flags + (newGrid[row][col].isFlagged ? 1 : -1));
    }
    setGrid(newGrid);
    checkWin(newGrid);
  };

  const checkWin = (newGrid) => {
    let unrevealedCells = 0;
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        if (!newGrid[row][col].isRevealed) {
          unrevealedCells++;
        }
      }
    }
    if (unrevealedCells === mineCount) {
      setGameWon(true);
      setGameOver(true);
      // Reveal all mines
      for (let r = 0; r < gridSize.rows; r++) {
        for (let c = 0; c < gridSize.cols; c++) {
          if (newGrid[r][c].isMine) {
            newGrid[r][c].isFlagged = true;
          }
        }
      }
      setGrid(newGrid);
    }
  };

  return (
    <>
      <div className="menu-bar flex gap-2 mt-1 ml-1">
        <ul className="menu flex gap-2">
          <li className="cursor-default">Jeu</li>
          <li className="cursor-default">Aide</li>
        </ul>
      </div>

      <div className="flex flex-col items-center" style={{ padding: '0' }}>
        <div className="flex justify-between items-center bg-gray-300 border border-gray-500 px-2 py-1 mt-2 w-64">
          <div className="flex items-center">
            <span className="mr-2"><img src="/icons/mine.png" /></span>
            <span>{mineCount - flags}</span>
          </div>
          <button
            className="border border-gray-500 px-2 py-1 bg-gray-200"
            onClick={() => {
              initializeGrid();
            }}
          >
            {gameOver ? (gameWon ? '😎' : '😵') : '😊'}
          </button>
          <div className="flex items-center">
            <span className="mr-2">⏱️</span>
            <span>0</span>
          </div>
        </div>
        <div
          className="grid border border-gray-500 mt-2"
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
            width: `${size.width - 20}px`,
            height: `${size.height - 130}px`,
          }}
        >
          {grid.map((row) =>
            row.map((cell) => (
              <div
                key={`${cell.row}-${cell.col}`}
                className={`flex items-center justify-center text-sm font-bold cursor-pointer bg-[#bdbdbd] ${
                  cell.isRevealed ? 'bg-gray-300' : ''
                }`}
                onClick={() => revealCell(cell.row, cell.col)}
                onContextMenu={(e) => handleRightClick(e, cell.row, cell.col)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: cell.isRevealed ? "1px solid #7b7b7b": "2px inset #e6e6e6",
                  color: cell.neighborMines === 1 ? 'blue' : cell.neighborMines === 2 ? 'green' : cell.neighborMines === 3 ? 'red' : cell.neighborMines === 4 ? 'purple' : cell.neighborMines === 5 ? 'maroon' : cell.neighborMines === 6 ? 'turquoise' : cell.neighborMines === 7 ? 'black' : cell.neighborMines === 8 ? 'gray' : 'black',
                }}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? <img src="/icons/mine.png" />
                    : cell.neighborMines > 0
                    ? cell.neighborMines
                    : ''
                  : cell.isFlagged
                  ? '🚩'
                  : ''}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Minesweeper;
