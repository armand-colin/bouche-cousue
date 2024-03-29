import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Motus from './views/motus/Motus';
import Sudoku from './views/sudoku/Sudoku';
import Minesweeper from './views/minesweeper/Minesweeper';
import MinesweeperLevel from './views/minesweeper/MinesweeperLevel';
import HanabiLobby from './views/hanabi/HanabiLobby';
import HanabiGame from './views/hanabi/HanabiGame';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/motus" element={<Motus />} />
        
        <Route path="/sudoku" element={<Sudoku />} />

        <Route path="/minesweeper" element={<MinesweeperLevel />} />
        <Route path="/minesweeper/:difficulty" element={<Minesweeper />} />

        <Route path="/hanabi" element={<HanabiLobby />} />
        <Route path="/hanabi/:playerId/:roomId" element={<HanabiGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
