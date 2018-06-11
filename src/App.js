import React, {Component} from 'react';
import './App.css';
import Grid from './components/Grid';
import Cell from './components/Cell';
import Row from './components/Row';
import Column from './components/Column';
import Header1 from './components/Header1';
import Text from './components/Text';
import Button from './components/Button';
import { connect } from 'react-redux';
import { clearGrid, randomizeGrid, oneTick, togglePlay } from './store';

export class App extends Component {
  constructor() {
    super();
    this.tickId = null;
  }

  componentDidUpdate(prevProps) {
    console.log('this.props.running: ', this.props.running);
    if (prevProps.running !== this.props.running) {
      if (this.props.running) {
        this.tickId = setInterval(this.props.handleTick, 5);
        console.log('this.props.handleTick: ', this.props.handleTick);
        console.log('this.tickId: ', this.tickId);
      } else {
        window.clearInterval(this.tickId);
        this.tickId = null;
        console.log('this.tickId: ', this.tickId);
      }
    }
  }

  render() {
    const {
      rows, cols, cells, size, running,
      handleClear,
      handleRandom,
      handleTick,
      handlePlayStop,
    } = this.props;

    let counter = 0;


    return (
      <Row>
        <Column>
          <Header1>Game of Life</Header1>
          <Text>Using react, redux, styled components & css grid! See code at <a href="https://github.com/mullaney/react-game-of-life">github</a>.</Text>
          <Grid cols={cols} rows={rows} size={size}>
            {cells && cells.map(cell => {
              return <Cell alive={!!cell} key={counter++} />;
            })}
          </Grid>
          <Row>
            <Button onClick={handleTick} >></Button>
            <Button onClick={handlePlayStop}>{running ? 'Stop' : 'Play'}</Button>
            <Button onClick={handleClear} >Clear</Button>
            <Button onClick={handleRandom}>Random</Button>
          </Row>
        </Column>
      </Row>
    );
  }
}

const mapState = (state) => {
  console.log('state: ', state);
  return {
    rows: state.game.rows,
    cols: state.game.cols,
    cells: state.game.cells,
    running: state.game.running,
    size: state.game.size
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
    }
  };
};

export default connect(mapState, mapDispatch)(App);
