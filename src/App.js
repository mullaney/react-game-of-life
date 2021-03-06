import React, {Component} from 'react';
import './App.css';
import Grid from './components/Grid';
import Cell from './components/Cell';
import Row from './components/Row';
import Column from './components/Column';
import Header1 from './components/Header1';
import Text from './components/Text';
import Button from './components/Button';
import InputRange from './components/InputRange';
import { connect } from 'react-redux';
import { clearGrid,
  randomizeGrid,
  oneTick,
  togglePlay,
  changeGridSize,
  toggleCell,
  startBenchmarkTest} from './store';

export class App extends Component {
  constructor() {
    super();
    this.tickId = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.running !== this.props.running) {
      if (this.props.running) {
        this.tickId = setInterval(this.props.handleTick, 5);
      } else {
        window.clearInterval(this.tickId);
        this.tickId = null;
      }
    }
  }

  render() {
    const {
      rows, cols, cells, size, running,
      lastBenchmarkElapsed,
      handleClear,
      handleRandom,
      handleTick,
      handlePlayStop,
      handleChange,
      handleBenchmarkStart,
      handleToggle
    } = this.props;

    let counter = 0;


    return (
      <Row>
        <Column>
          <Header1>Game of Life</Header1>
          <Text>Using react, redux, styled components & css grid! See code at <a href="https://github.com/mullaney/react-game-of-life">github</a>.</Text>
          <Text>Current grid size: {rows} by {cols}</Text>
          <Row>
            <Button onClick={handleTick} >></Button>
            <Button onClick={handlePlayStop}>{running ? 'Stop' : 'Play'}</Button>
            <Button onClick={handleClear} >Clear</Button>
            <Button onClick={handleRandom}>Random</Button>
            <InputRange onChange={handleChange} min="20" max="100" step="10" value={rows} />
            {!running && <Button onClick={handleBenchmarkStart}>✓</Button>}
          </Row>
          <Grid cols={cols} rows={rows} size={size} onClick={handleToggle}>
            {cells && cells.map((cell, index) => {
              return <Cell alive={!!cell} key={counter++} id={`cell_${index}`} />;
            })}
          </Grid>
          <Text>{lastBenchmarkElapsed ? 'Last trial: ' + lastBenchmarkElapsed + ' ms' : ''}</Text>
        </Column>
      </Row>
    );
  }
}

const mapState = (state) => {
  return {
    rows: state.game.rows,
    cols: state.game.cols,
    cells: state.game.cells,
    running: state.game.running,
    size: state.game.size,
    lastBenchmarkElapsed: state.game.lastBenchmarkElapsed
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClear() {
      dispatch(clearGrid());
    },
    handleRandom() {
      dispatch(randomizeGrid());
    },
    handleTick() {
      dispatch(oneTick());
    },
    handlePlayStop() {
      dispatch(togglePlay());
    },
    handleChange(event) {
      dispatch(changeGridSize(+event.target.value));
    },
    handleBenchmarkStart() {
      dispatch(startBenchmarkTest());
    },
    handleToggle(event) {
      const id = event.target.id.slice(5);
      if (id !== '') {
        dispatch(toggleCell(id));
      }
    }
  };
};

export default connect(mapState, mapDispatch)(App);
