import styled from 'styled-components';
import { Card, Button, withStyles, createStyles } from '@material-ui/core';
import { green, blue } from '@material-ui/core/colors';

export const Container = styled.div`
  /* height: 100%; */
`;

export const Content = styled.div`
  width: 1060px;
  margin: 0 auto;
  height: 100%;
`;
export const CustomCard = styled(Card)`
  padding: 1rem;
  margin-top: 1rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-around;

    form {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 80%;
    }
  }
`;

export const SearchButton = withStyles(theme => ({
  root: {
    backgroundColor: green[600],
    marginLeft: '0.7rem',
    '&:hover': {
      backgroundColor: green[400],
    },
    padding: '0.6rem 1.2rem',
  },

  label: {
    color: '#fff',
  },
}))(Button);

export const AddButton = withStyles(theme => ({
  root: {
    backgroundColor: blue[600],
    marginLeft: '0.7rem',
    '&:hover': {
      backgroundColor: blue[400],
    },
    padding: '0.6rem 1.2rem',
  },
  label: {
    color: '#fff',
  },
}))(Button);

export const IconClasses = createStyles({
  root: {
    marginRight: '0.8rem',
  },
});
