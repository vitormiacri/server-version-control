import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eee;

  img {
    width: 230px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 0.8rem;
    width: 250px;

    input {
      border-radius: 4px;
      height: 2.2rem;
      margin: 0.3rem 0;
      padding: 0.8rem;
      line-height: 1.1rem;
      border: 1px solid #999;
      outline: 0;
    }

    span {
      color: red;
    }

    button {
      background: #00366d;
      border-radius: 4px;
      margin-top: 0.5rem;
      padding: 0.7rem;
      font-size: 1.15rem;
      font-weight: bold;
      color: #fff;
      outline: 0;
      border: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 0.8rem;
      }

      &:hover {
        background: ${lighten(0.03, '#00366d')};
      }
    }
  }
`;
