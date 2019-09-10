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
  server,
  open,
  onClose,
  loadServers,
  ...rest
}) {
  // Fields for form create and edit dialog
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [version, setVersion] = useState('');

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'version') {
      setVersion(e.target.value);
    } else if (e.target.name === 'ip') {
      setIp(e.target.value);
    }
  }

  useEffect(() => {
    setId(server.id);
    setName(server.name || '');
    setIp(server.ip || '');
    setVersion(server.version || '');
  }, [server.id, server.ip, server.name, server.version]);

  const inputStyles = InputClass();
  const switchStyles = SwitchClass();

  async function handleSubmit() {
    try {
      setLoading(true);
      if (id) {
        await api.put(`/servers/${id}`, {
          name,
          ip,
          version,
        });
      } else {
        await api.post(`/servers`, {
          name,
          ip,
          version,
        });
      }

      toast.success(`Servidor salvo com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao enviar dados.');
    } finally {
      setId(0);
      setName('');
      setIp('');
      setVersion('');
      loadServers();
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
            label="Nome do servidor"
            value={name}
            onChange={e => handleChange(e)}
            fullWidth
            classes={inputStyles}
          />
          <TextField
            name="ip"
            label="Ip do servidor"
            value={ip}
            onChange={e => handleChange(e)}
            fullWidth
            classes={inputStyles}
          />
          <TextField
            name="version"
            label="Versão"
            value={version}
            onChange={e => handleChange(e)}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}

FormDialog.propTypes = {
  title: PropTypes.string.isRequired,
  server: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  loadServers: PropTypes.func.isRequired,
};
