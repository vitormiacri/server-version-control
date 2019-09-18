import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TableRow, TableCell, Button, Typography } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: '2rem',
    overflowX: 'auto',
  },
  table: {
    minWidth: 800,
  },
  tableHead: {
    backgroundColor: '#00366d',
  },
}));

export const CustomTableRow = withStyles(() => ({
  root: {},
}))(TableRow);

export const CustomTableCell = withStyles(() => ({
  root: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))(TableCell);

export const CustomTableCellDetails = withStyles(() => ({
  root: {
    textAlign: 'center',
    display: 'flex',
  },
}))(TableCell);

export const EditButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))(Button);

export const DeleteButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.error.main,
    marginLeft: '0.7rem',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))(Button);

export const Empty = withStyles(() => ({
  root: {
    margin: '2rem',
  },
}))(Typography);
