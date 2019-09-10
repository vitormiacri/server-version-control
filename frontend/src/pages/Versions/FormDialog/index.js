import React, { useState, useEffect } from 'react';
import {
  TextField,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
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
  data,
  open,
  onClose,
  loadVersions,
  ...rest
}) {
  // Fields for form create and edit dialog
  const [id, setId] = useState('');
  const [version, setVersion] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.name === 'version') {
      setVersion(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  }

  useEffect(() => {
    setId(data.id);
    setVersion(data.version || '');
    setDescription(data.description || '');
  }, [data.id, data.description, data.version]);

  const inputStyles = InputClass();
  const switchStyles = SwitchClass();

  async function handleSubmit() {
    try {
      setLoading(true);

      if (id) {
        await api.put(`/versions/${id}`, {
          version,
          description,
        });
      } else {
        await api.post(`/versions`, {
          version,
          description,
        });
      }

      toast.success(`Versão salva com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao enviar dados.');
    } finally {
      setId(0);
      setVersion('');
      setDescription('');
      loadVersions();
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
            name="version"
            label="Versão"
            value={version}
            onChange={e => handleChange(e)}
            fullWidth
            classes={inputStyles}
          />
          <TextField
            name="description"
            label="Descrição da versão"
            value={description}
            multiline
            rows={15}
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
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    version: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  open: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  loadVersions: PropTypes.func.isRequired,
};
