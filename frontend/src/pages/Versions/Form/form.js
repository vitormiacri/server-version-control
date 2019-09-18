import React from 'react';
import { TextField, FormControl, Button, Typography } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

import { InputClass, SwitchClass } from './styles';

export default function Form({
  values: { version, description },
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
        name="version"
        label="Versão"
        value={version}
        error={Boolean(errors.version)}
        helperText={errors.version ? errors.version : ''}
        onChange={handleChange}
        fullWidth
        classes={inputStyles}
      />
      <TextField
        name="description"
        label="Descrição da versão"
        value={description}
        error={Boolean(errors.description)}
        helperText={errors.description ? errors.description : ''}
        multiline
        rows={15}
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
    version: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    version: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
