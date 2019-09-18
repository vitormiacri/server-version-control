import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function CustomDialog({
  title,
  children,
  open,
  onClose,
  ...rest
}) {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...rest}>
      <DialogTitle align="center">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
CustomDialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
