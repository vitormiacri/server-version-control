import React from 'react';
import { TextField, FormControl, Button, Typography } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

import { InputClass, SwitchClass } from './styles';

export default function Form({
  values: { id, name, email, oldPassword, password, confirmPassword },
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
        label="Nome do usuário"
        value={name}
        error={Boolean(errors.name)}
        helperText={errors.name ? errors.name : ''}
        onChange={handleChange}
        fullWidth
        classes={inputStyles}
      />
      <TextField
        name="email"
        label="E-mail do Usuário"
        value={email}
        error={Boolean(errors.email)}
        helperText={errors.email ? errors.email : ''}
        type="email"
        onChange={handleChange}
        fullWidth
        classes={inputStyles}
      />

      {id ? (
        <>
          <TextField
            name="oldPassword"
            label="Senha atual"
            type="password"
            value={oldPassword}
            error={Boolean(errors.oldPassword)}
            helperText={errors.oldPassword ? errors.oldPassword : ''}
            onChange={handleChange}
            fullWidth
            classes={inputStyles}
          />
          <TextField
            name="password"
            label="Nova senha"
            value={password}
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password : ''}
            type="password"
            onChange={handleChange}
            fullWidth
            classes={inputStyles}
          />
          <TextField
            name="confirmPassword"
            label="Confirmação de senha"
            value={confirmPassword}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword ? errors.confirmPassword : ''}
            type="password"
            onChange={handleChange}
            fullWidth
            classes={inputStyles}
          />
        </>
      ) : (
        <TextField
          name="password"
          label="Senha do usuário"
          value={password}
          type="password"
          onChange={handleChange}
          fullWidth
          classes={inputStyles}
        />
      )}
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
    </form>
  );
}

Form.propTypes = {
  values: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    oldPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    oldPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
