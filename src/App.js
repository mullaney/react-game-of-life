import React from 'react';
import './App.css';
import Grid from './components/Grid';
import Cell from './components/Cell';
import RowContainer from './components/RowContainer';
import ColContainer from './components/ColContainer';
import H1 from './components/H1';
import Text from './components/Text';
import Button from './components/Button';

const defaultCells = (size = 25) => {
  let data = new Array(size * size);
  data.fill(0);
  data = data.map(() => Math.floor(Math.random() * 2));
  return data;
};

const App = ({rows, cols, cells, size}) => {
  let counter = 0;
  return (
    <RowContainer>
      <ColContainer>
        <H1>Game of Life</H1>
        <Text>Using react, redux & css grid! See code at <a href="https://github.com/mullaney/react-game-of-life">github</a>.</Text>
        <Grid cols={cols} rows={rows} size={size}>
          {cells && cells.map(cell => {
            console.log('cell: ', !!cell);
            return <Cell alive={!!cell} key={counter++} />;
          })}
        </Grid>
        <RowContainer>
          <Button>></Button>
          <Button>Play</Button>
          <Button>Clear</Button>
          <Button>Random</Button>
        </RowContainer>
      </ColContainer>
    </RowContainer>
  );
};

App.defaultProps = {
  rows: 40,
  cols: 40,
  cells: defaultCells(40),
  size: '8px'
};

export default App;
