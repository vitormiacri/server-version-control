/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdInput } from 'react-icons/md';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import { Container } from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Login({ history }) {
  useEffect(() => {
    const auth = localStorage.getItem('@server_control/auth');

    if (auth) {
      const { token } = JSON.parse(auth);
      if (token) {
        history.push('/servers');
      }
    }
  }, []);

  async function handleSubmit({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password });
      const { user } = response.data;

      localStorage.setItem(
        '@server_control/auth',
        JSON.stringify(response.data)
      );

      toast.success(`Bem-vindo ${user.name}!`);
      history.push('/servers');
    } catch (err) {
      console.tron.error(err.message);
      toast.error('Dados inválidos. Verifique seu e-mail e senha.');
    }
  }

  return (
    <Container>
      <img src={logo} alt="Kingvoice" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Seu e-email" />
        <Input type="password" name="password" placeholder="Sua senha" />

        <button type="submit">
          <MdInput color="#FFF" size={20} />
          Acessar
        </button>
      </Form>
    </Container>
  );
}
