import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const CancelButton = withStyles(theme => ({
  root: {
    backgroundColor: red[400],
  },
  label: {
    color: '#fff',
  },
}))(Button);
export const CButton = withStyles(theme => {})(Button);
export const CDialog = withStyles(theme => {})(Dialog);
export const CDialogTitle = withStyles(theme => {})(DialogTitle);
export const CDialogContent = withStyles(theme => {})(DialogContent);
export const CDialogActions = withStyles(theme => {})(DialogActions);
