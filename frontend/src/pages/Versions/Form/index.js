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
    version: Yup.string().required('Informe um número para esta versão'),
    desciption: Yup.string(),
  });

  async function handleSubmit(data) {
    const { version, description } = data;
    try {
      setLoading(true);

      if (values.id) {
        await api.put(`/versions/${values.id}`, {
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
      onClose();
    } catch (err) {
      toast.error('Ocorreu um erro ao enviar os dados.');
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
    email: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};
