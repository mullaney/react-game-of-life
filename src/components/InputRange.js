import styled from 'styled-components';

const InputRange = styled.input`
  background: transparent;
  width: 200px;
  margin: 0 1rem;
`;

InputRange.defaultProps = {
  type: 'range'
};

export default InputRange;
