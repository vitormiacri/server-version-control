import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #00366d;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;

  border-bottom: 2px solid #ccc;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;

  width: 1060px;
  margin: 0 auto;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin-right: 3rem;

      a {
        color: #eee;
        font-size: 1.1rem;
        margin-left: 1.1rem;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }

  div {
    display: flex;
    align-items: center;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;

  strong {
    font-size: 1rem;
    color: #eee;
  }

  button {
    background: none;
    border: 0;
    align-self: flex-end;
    font-size: 0.9rem;
    color: #eee;
    margin-top: 0.2rem;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #fff;
  background: ${lighten(0.3, '#00366d')};
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`;
