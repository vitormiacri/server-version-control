import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

import { InputClass, SwitchClass } from './styles';

import api from '~/services/api';

export default function FormDialog({
  title,
  user,
  open,
  onClose,
  loadUsers,
  ...rest
}) {
  // Fields for form create and edit dialog
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'oldPassword') {
      setOldPassword(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  }

  useEffect(() => {
    setName(user.name || '');
    setEmail(user.email || '');
  }, [user.email, user.id, user.name]);

  const inputStyles = InputClass();
  const switchStyles = SwitchClass();

  async function handleSubmit() {
    try {
      setLoading(true);

      if (user.id) {
        await api.put(`/users/${user.id}`, {
          name,
          email,
          password: password || null,
          oldPassword: oldPassword || null,
          confirmPassword: confirmPassword || null,
        });
      } else {
        await api.post(`/users`, {
          name,
          email,
          password: password || null,
        });
      }

      toast.success(`Usuário salvo com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro. Verifique os dados.');
    } finally {
      setPassword('');
      setOldPassword('');
      setConfirmPassword('');
      loadUsers();
      setLoading(false);
      onClose();
    }
  }

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open} {...rest}>
      <DialogTitle align="center">{title}</DialogTitle>
      <DialogContent>
        <Form onSubmit={e => handleSubmit(e)}>
          <TextField
            name="name"
            label="Nome do usuário"
            value={name}
            onChange={e => handleChange(e)}
            fullWidth
            classes={inputStyles}
          />
          <TextField
            name="email"
            label="E-mail do Usuário"
            value={email}
            type="email"
            onChange={e => handleChange(e)}
            fullWidth
            classes={inputStyles}
          />

          {user.id ? (
            <>
              <TextField
                name="oldPassword"
                label="Senha atual"
                type="password"
                value={oldPassword}
                onChange={e => handleChange(e)}
                fullWidth
                classes={inputStyles}
              />
              <TextField
                name="password"
                label="Nova senha"
                value={password}
                type="password"
                onChange={e => handleChange(e)}
                fullWidth
                classes={inputStyles}
              />
              <TextField
                name="confirmPassword"
                label="Confirmação de senha"
                value={confirmPassword}
                type="password"
                onChange={e => handleChange(e)}
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
              onChange={e => handleChange(e)}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}

FormDialog.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
};
