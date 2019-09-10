import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import {
  CButton,
  CDialog,
  CDialogTitle,
  CDialogContent,
  CDialogActions,
  CancelButton,
} from './styles';

export default function ConfirmDeleteDialog({
  message,
  open,
  onCancel,
  onConfirm,
  onClose,
  ...rest
}) {
  return (
    <CDialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...rest}>
      <CDialogTitle align="center">Atenção</CDialogTitle>
      <CDialogContent>
        <Typography variant="body1" align="center">
          {message}
        </Typography>
      </CDialogContent>
      <CDialogActions>
        <CancelButton variant="contained" onClick={onCancel}>
          Cancelar
        </CancelButton>
        <CButton variant="contained" color="primary" onClick={onConfirm}>
          Confirmar
        </CButton>
      </CDialogActions>
    </CDialog>
  );
}

ConfirmDeleteDialog.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
