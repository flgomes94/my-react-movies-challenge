import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: rgba(256, 0, 0, 0.8);
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;

    img {
      width: 25%;
      height: 50%;
      float: left;
      margin-right: 10px;
    }

    div {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      text-align: justify;
    }

    a {
      background-color: rgba(0, 0, 0, 0.5);
      padding: 10px 5px;
      margin: auto 0 0 auto;
      border-radius: 4px;
      width: 50%;
      color: rgba(256, 0, 0, 0.9);
      text-decoration: none;
      svg {
        margin-right: 10px;
      }
    }
  }
`;
