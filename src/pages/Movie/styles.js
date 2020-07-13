import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const MovieStyle = styled.div`
  padding: 30px 0px;
  img {
    width: 100%;
  }
  p {
    text-align: justify;
  }
`;

export const VoteAverage = styled.div`
  margin-top: 5px;
  display: flex;
  font-weight: bolder;
  strong {
    text-transform: uppercase;
    margin-right: 10px;
  }
  p {
    color: ${props => {
      if (props.vote >= 9) {
        return 'rgba(0, 256, 0)';
      }
      if (props.vote >= 7) {
        return 'rgba(256, 256, 0)';
      }
      return 'rgba(256, 0, 0)';
    }};
  }
`;

export const MovieGenre = styled.ul`
  list-style: none;
  margin-top: 5px;
  li {
    display: inline-block;
    width: auto;
    font-size: 12px;
    padding: 5px 10px;
    margin: 3px;
    font-weight: 100;
    border-radius: 4px;
    background: rgba(256, 256, 256, 0.5);
  }

  li:hover {
    background: rgba(256, 256, 256, 0.6);
    cursor: pointer;
  }
`;

export const Cast = styled.ul`
  list-style: none;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  overflow: auto;
  text-align: center;
  li {
    display: flex;
    flex-direction: column;
    margin: 5px;
    img {
      width: 100px;
      height: 150px;
      border-radius: 4px;
    }
    p {
      text-align: center;
      font-size: 10px;
      font-weight: bold;
    }
    span {
      text-align: center;
      font-size: 12px;
    }
  }

  li:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const ProductionCompany = styled.ul`
  list-style: none;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  overflow: auto;
  text-align: center;
  li {
    display: flex;
    flex-direction: column;
    margin: 5px;
    background-color: #fff;
    img {
      height: 150px;
      width: auto;
    }
  }

  li:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
