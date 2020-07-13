import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  min-width: 320px;
  width: 95%;
  background: rgba(256, 256, 256, 0.05);
  border-radius: 4px;
  color: rgba(256, 256, 256, 0.9);
  padding: 30px;
  margin: 80px auto;
  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
