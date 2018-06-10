import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-rows: repeat(${props => props.rows || 25}, ${props => props.size || '8px'});
  grid-template-columns: repeat(${props => props.cols || 25}, ${props => props.size || '8px'});
  margin: 0 auto;
`;

export default Grid;
