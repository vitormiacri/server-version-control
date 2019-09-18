import React, { useState } from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import Form from './form';
import Dialog from '~/components/CustomDialog';
import api from '~/services/api';

export default function FormDialog({ title, open, onClose, values, loadData }) {
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    ip: Yup.string()
      .required('O IP é obrigatório')
      .matches(
        /^(?=.*[^.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).?){4}$/,
        'Insira um IP válido'
      ),
    version: Yup.string(),
  });

  async function handleSubmit(data) {
    const { name, ip, version } = data;
    try {
      setLoading(true);

      if (values.id) {
        await api.put(`/servers/${values.id}`, {
          name,
          ip,
          version,
        });
      } else {
        await api.post(`/servers`, {
          name,
          ip: ip || '',
          version: version || '',
        });
      }

      toast.success(`Servidor salvo com sucesso`);
      onClose();
    } catch (err) {
      toast.error('Ocorreu um erro ao enviar dados.');
    } finally {
      loadData();
      setLoading(false);
    }
  }

  return (
    <Dialog title={title} open={open} onClose={onClose}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        render={props => <Form {...props} loading={loading} />}
        initialValues={values}
      />
    </Dialog>
  );
}

FormDialog.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    version: PropTypes.string,
    ip: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};
