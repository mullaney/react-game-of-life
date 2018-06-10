import React from 'react';
import './App.css';
import Grid from './components/Grid';
import Cell from './components/Cell';
import Row from './components/Row';
import Column from './components/Column';
import Header1 from './components/Header1';
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
    <Row>
      <Column>
        <Header1>Game of Life</Header1>
        <Text>Using react, redux & css grid! See code at <a href="https://github.com/mullaney/react-game-of-life">github</a>.</Text>
        <Grid cols={cols} rows={rows} size={size}>
          {cells && cells.map(cell => {
            return <Cell alive={!!cell} key={counter++} />;
          })}
        </Grid>
        <Row>
          <Button>></Button>
          <Button>Play</Button>
          <Button>Clear</Button>
          <Button>Random</Button>
        </Row>
      </Column>
    </Row>
  );
};

App.defaultProps = {
  rows: 40,
  cols: 40,
  cells: defaultCells(40),
  size: '8px'
};

export default App;
