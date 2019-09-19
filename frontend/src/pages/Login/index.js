/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdInput } from 'react-icons/md';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import { Container } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Login() {
  const dispatch = useDispatch();

  async function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="Version Control " />

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
