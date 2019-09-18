import React from 'react';
import { TextField, FormControl, Button, Typography } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

import { InputClass, SwitchClass } from './styles';

export default function Form({
  values: { name, ip, version },
  handleSubmit,
  handleChange,
  loading,
  errors,
}) {
  const inputStyles = InputClass();
  const switchStyles = SwitchClass();
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Nome do servidor"
        value={name}
        error={Boolean(errors.name)}
        helperText={errors.name ? errors.name : ''}
        onChange={handleChange}
        fullWidth
        classes={inputStyles}
      />
      <TextField
        name="ip"
        label="Ip do servidor"
        value={ip}
        error={Boolean(errors.ip)}
        helperText={errors.ip ? errors.ip : ''}
        onChange={handleChange}
        fullWidth
        classes={inputStyles}
      />
      <TextField
        name="version"
        label="Versão"
        value={version}
        error={Boolean(errors.version)}
        helperText={errors.version ? errors.version : ''}
        onChange={handleChange}
        fullWidth
        classes={inputStyles}
      />
      <FormControl>
        <Button
          classes={switchStyles}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? (
            <Typography align="center">
              <Loader type="Oval" color="#FFF" height={18} width={18} />
            </Typography>
          ) : (
            'Salvar'
          )}
        </Button>
      </FormControl>
      <FormControl />
    </form>
  );
}

Form.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    version: PropTypes.string,
    ip: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    version: PropTypes.string,
    ip: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
