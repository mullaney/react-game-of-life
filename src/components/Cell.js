import styled from 'styled-components';

const Cell = styled.div`
  background: ${props => (props.alive ? 'black' : 'white')};
  color: ${props => (props.alive ? 'white' : 'black')};
`;

export default Cell;
