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

  let schema = null;

  if (values.id) {
    schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('E-mail inválido'),
      oldPassword: Yup.string()
        .nullable(true)
        .min(6),
      password: Yup.string()
        .nullable(true)
        .min(6, 'A nova senha deve conter no mínimo 6 caracteres')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('A nova senha é requerida') : field
        ),
      confirmPassword: Yup.string()
        .nullable(true)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });
  } else {
    schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O e-mail é obrigatório'),
      password: Yup.string()
        .required('A senha é obrigatória')
        .min(6, 'Senha deve conter no mínimo 6 caracteres'),
    });
  }

  async function handleSubmit(data) {
    const { name, email, password, oldPassword, confirmPassword } = data;
    try {
      setLoading(true);

      if (values.id) {
        await api.put(`/users/${values.id}`, {
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
