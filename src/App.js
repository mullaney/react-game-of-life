import React from 'react';
import './App.css';
import Grid from './components/Grid';
import Cell from './components/Cell';

const defaultCells = (size = 25) => {
  let data = new Array(size * size);
  data.fill(0);
  data = data.map(() => Math.floor(Math.random() * 2));
  return data;
};

const App = ({rows, cols, cells, size}) => {
  let counter = 0;
  return (
    <div>
      <h1>Game of Life</h1>
      <p>Using react, redux & css grid!</p>
      <p>See code at <a href="https://github.com/mullaney/react-game-of-life">github</a>.</p>
      <Grid cols={cols} rows={rows} size={size}>
        {cells && cells.map(cell => {
          console.log('cell: ', !!cell);
          return <Cell alive={!!cell} key={counter++} />;
        })}
      </Grid>
    </div>
  );
};

App.defaultProps = {
  rows: 40,
  cols: 40,
  cells: defaultCells(40),
  size: '8px'
};

export default App;
