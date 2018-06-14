import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-rows: repeat(${props => props.rows || 25}, ${props => props.size || '8px'});
  grid-template-columns: repeat(${props => props.cols || 25}, ${props => props.size || '8px'});
  margin: 0 auto;
  background-color: #eee;
  border: 1px solid #bbb;
  margin: 1rem 0;
`;

export default Grid;
