'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

interface Cell {
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborBombs: number;
}

interface PatchMinesweeperProps {
  onGameComplete: (won: boolean) => void;
}

export function PatchMinesweeper({ onGameComplete }: PatchMinesweeperProps) {
  const ROWS = 9;
  const COLS = 9;
  const BOMBS = 10;

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>(
    'playing'
  );
  const [flagCount, setFlagCount] = useState(BOMBS);
  const [firstClick, setFirstClick] = useState(true);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Patch commentary based on game state
  const patchCommentary = useMemo(() => {
    if (gameState === 'won') {
      return "🎉 Incredible! You've defused all the bombs! The system is safe thanks to you!";
    }
    if (gameState === 'lost') {
      return "💥 Oops! That was a bomb! Don't worry, it happens to the best of us. Want to try again?";
    }
    if (flagCount <= 3) {
      return "🎯 You're getting close! Just a few more bombs to flag!";
    }
    if (flagCount <= 5) {
      return '🤔 Good progress! Remember: right-click to flag suspicious files!';
    }
    return '🚨 Careful now! Left-click to scan files, right-click to flag bombs!';
  }, [gameState, flagCount]);

  // Initialize empty grid
  const initializeGrid = useCallback((): Cell[][] => {
    return Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS)
          .fill(null)
          .map(() => ({
            isBomb: false,
            isRevealed: false,
            isFlagged: false,
            neighborBombs: 0,
          }))
      );
  }, []);

  // Place bombs randomly, avoiding first click position
  const placeBombs = useCallback(
    (grid: Cell[][], firstRow: number, firstCol: number): Cell[][] => {
      const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
      let bombsPlaced = 0;

      while (bombsPlaced < BOMBS) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);

        // Don't place bomb on first click or if already has bomb
        if (
          (row === firstRow && col === firstCol) ||
          newGrid[row][col].isBomb
        ) {
          continue;
        }

        newGrid[row][col].isBomb = true;
        bombsPlaced++;
      }

      // Calculate neighbor bomb counts
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (!newGrid[row][col].isBomb) {
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nr = row + dr;
                const nc = col + dc;
                if (
                  nr >= 0 &&
                  nr < ROWS &&
                  nc >= 0 &&
                  nc < COLS &&
                  newGrid[nr][nc].isBomb
                ) {
                  count++;
                }
              }
            }
            newGrid[row][col].neighborBombs = count;
          }
        }
      }

      return newGrid;
    },
    [BOMBS, ROWS, COLS]
  );

  // Initialize game
  useEffect(() => {
    setGrid(initializeGrid());
    setGameState('playing');
    setFlagCount(BOMBS);
    setFirstClick(true);
    setTimer(0);
    setGameStarted(false);
  }, [initializeGrid, BOMBS]);

  // Timer effect
  useEffect(() => {
    if (gameStarted && gameState === 'playing') {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameState]);

  // Check win condition
  useEffect(() => {
    if (grid.length === 0) return;

    const revealedCells = grid.flat().filter(cell => cell.isRevealed).length;
    const totalSafeCells = ROWS * COLS - BOMBS;

    if (revealedCells === totalSafeCells && gameState === 'playing') {
      setGameState('won');
      onGameComplete(true);
    }
  }, [grid, gameState, BOMBS, ROWS, COLS, onGameComplete]);

  // Reveal cell and adjacent empty cells
  const revealCell = useCallback(
    (row: number, col: number) => {
      if (gameState !== 'playing') return;

      setGrid(prevGrid => {
        const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));

        if (firstClick) {
          const gridWithBombs = placeBombs(newGrid, row, col);
          setFirstClick(false);
          setGameStarted(true);
          return revealCellRecursive(gridWithBombs, row, col);
        }

        return revealCellRecursive(newGrid, row, col);
      });
    },
    [gameState, firstClick, placeBombs]
  );

  const revealCellRecursive = (
    grid: Cell[][],
    row: number,
    col: number
  ): Cell[][] => {
    if (
      row < 0 ||
      row >= ROWS ||
      col < 0 ||
      col >= COLS ||
      grid[row][col].isRevealed ||
      grid[row][col].isFlagged
    ) {
      return grid;
    }

    grid[row][col].isRevealed = true;

    if (grid[row][col].isBomb) {
      setGameState('lost');
      onGameComplete(false);
      // Reveal all bombs on game over
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (grid[r][c].isBomb) {
            grid[r][c].isRevealed = true;
          }
        }
      }
      return grid;
    }

    // If no neighboring bombs, reveal adjacent cells
    if (grid[row][col].neighborBombs === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealCellRecursive(grid, row + dr, col + dc);
        }
      }
    }

    return grid;
  };

  // Toggle flag on cell
  const toggleFlag = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if (gameState !== 'playing' || grid[row][col].isRevealed) return;

      setGrid(prevGrid => {
        const newGrid = prevGrid.map(r => r.map(c => ({ ...c })));
        newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
        return newGrid;
      });

      setFlagCount(prev => (grid[row][col].isFlagged ? prev + 1 : prev - 1));
    },
    [gameState, grid]
  );

  // Reset game
  const resetGame = () => {
    setGrid(initializeGrid());
    setGameState('playing');
    setFlagCount(BOMBS);
    setFirstClick(true);
    setTimer(0);
    setGameStarted(false);
  };

  // Get cell display content
  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isBomb) return '💣';
    if (cell.neighborBombs > 0) return cell.neighborBombs.toString();
    return '';
  };

  // Get cell styling
  const getCellClassName = (cell: Cell) => {
    let baseClass =
      'w-8 h-8 border border-red-400/30 flex items-center justify-center text-sm font-mono font-bold cursor-pointer transition-all duration-150';

    if (cell.isRevealed) {
      if (cell.isBomb) {
        baseClass += ' bg-red-600 text-white';
      } else {
        baseClass += ' bg-red-900/20 text-red-100';
        if (cell.neighborBombs > 0) {
          const colors = [
            '',
            'text-blue-400',
            'text-green-400',
            'text-red-400',
            'text-purple-400',
            'text-yellow-400',
            'text-pink-400',
            'text-orange-400',
            'text-cyan-400',
          ];
          baseClass += ` ${colors[cell.neighborBombs]}`;
        }
      }
    } else {
      baseClass += ' bg-red-800/30 hover:bg-red-700/40';
      if (cell.isFlagged) {
        baseClass += ' bg-yellow-600/30';
      }
    }

    return baseClass;
  };

  return (
    <div className="space-y-4">
      {/* Game Header */}
      <div className="flex items-center justify-between border-b border-red-500/30 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-red-400 font-bold text-lg">
            💣 DEFUSE THE SYSTEM
          </span>
          <Image
            src="/images/avatars/patch-smiling.png"
            alt="Patch"
            width={40}
            height={40}
            className="drop-shadow-md"
          />
        </div>
        <button
          onClick={resetGame}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm font-semibold transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Game Stats */}
      <div className="flex justify-between text-sm font-mono">
        <div className="text-red-400">
          💣 Bombs: <span className="text-red-100">{flagCount}</span>
        </div>
        <div className="text-red-400">
          ⏱️ Time: <span className="text-red-100">{timer}s</span>
        </div>
      </div>

      {/* Patch Commentary */}
      <div className="p-3 rounded border-l-4 border-red-400 bg-red-900/10">
        <div className="flex items-start gap-3">
          <Image
            src="/images/avatars/patch-winking.png"
            alt="Patch"
            width={32}
            height={32}
            className="drop-shadow-md flex-shrink-0"
          />
          <div>
            <div className="text-xs text-red-400 font-semibold mb-1">Patch</div>
            <div className="text-red-100 text-sm">{patchCommentary}</div>
          </div>
        </div>
      </div>

      {/* Minesweeper Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-9 gap-0 border-2 border-red-500/50 bg-black/50 p-2 rounded">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={getCellClassName(cell)}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={e => toggleFlag(e, rowIndex, colIndex)}
                disabled={gameState !== 'playing'}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Game Over Actions */}
      {gameState !== 'playing' && (
        <div className="text-center space-y-2">
          <div
            className={`font-bold text-lg ${gameState === 'won' ? 'text-green-400' : 'text-red-400'}`}
          >
            {gameState === 'won'
              ? '🎉 SYSTEM SECURED!'
              : '💥 SYSTEM COMPROMISED!'}
          </div>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-semibold transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-red-300/70 text-center space-y-1">
        <div>Left-click to scan files • Right-click to flag bombs</div>
        <div>Find all safe files without triggering any bombs!</div>
      </div>
    </div>
  );
}
