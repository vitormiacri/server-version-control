/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form } from '@rocketseat/unform';
import { MdAddCircleOutline, MdSearch } from 'react-icons/md';
import { TextField, Typography } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import ConfirmDeleteDialog from '~/components/ConfirmDeleteDialog';
import FormDialog from './Form';
import ResultTable from './ResultTable';
import {
  Container,
  Content,
  CustomCard,
  SearchButton,
  AddButton,
  IconClasses,
} from './styles';

import api from '~/services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // States delete dialog
  const [deleteMessage, setDeleteMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [idUser, setIdUser] = useState(0);

  // States form dialog
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [titleDialog, setTitleDialog] = useState('');

  // States for pagination
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);

  async function loadUsers() {
    const response = await api.get('/users', {
      params: {
        name: name || null,
        email: email || null,
        page,
        perPage,
      },
    });

    const { rows, count } = response.data;

    setUsers(rows);
    setTotalRows(count);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [page, perPage]);

  function handlePageChange(e, newPage) {
    setPage(newPage);
    setLoading(true);
  }

  function handlePerPageChange(e) {
    setPerPage(e.target.value, 5);
    setPage(0);
    setLoading(true);
  }

  function handleDelete(id) {
    const user = users.find(item => id === item.id);

    setDeleteMessage(
      `Você confirma a exclusão do usuário ${user.name} com e-mail: ${user.email}?`
    );
    setIdUser(id);
    setOpenDialog(true);
  }

  function handleChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  }

  function handleFilter() {
    setLoading(true);
    loadUsers();
  }

  function handleCancelDialog() {
    setOpenDialog(false);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setOpenFormDialog(false);
  }

  function handleEdit(id) {
    const user = users.find(item => id === item.id);
    setUserEdit(user);
    setTitleDialog(`Editando o usuário: ${user.name}`);
    setOpenFormDialog(true);
  }

  function handleAdd() {
    setUserEdit({});
    setTitleDialog(`Novo Usuário`);
    setOpenFormDialog(true);
  }

  async function handleConfirmDialog() {
    try {
      setLoading(true);
      setOpenDialog(false);
      await api.delete(`/users/${idUser}`);

      toast.success(`Usuário excluído com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao excluir.');
    } finally {
      loadUsers();
    }
  }

  return (
    <Container>
      <Content>
        <CustomCard>
          <div>
            <Form>
              <TextField
                name="name"
                label="Nome do Usuário"
                value={name}
                onChange={e => handleChange(e)}
              />
              <TextField
                name="email"
                label="E-mail do usuário"
                value={email}
                onChange={e => handleChange(e)}
              />
              <SearchButton type="button" onClick={() => handleFilter()}>
                <MdSearch style={IconClasses.root} size={24} color="#FFF" />
                Filtrar
              </SearchButton>
            </Form>
            <AddButton type="button" onClick={() => handleAdd()}>
              <MdAddCircleOutline
                style={IconClasses.root}
                size={24}
                color="#FFF"
              />
              Novo Usuário
            </AddButton>
          </div>
        </CustomCard>
        {!loading ? (
          <ResultTable
            data={users}
            totalRows={totalRows}
            page={page}
            perPage={perPage}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
          />
        ) : (
          <CustomCard>
            <Typography align="center">
              <Loader type="Oval" color="#00366d" height={80} width={80} />
            </Typography>
          </CustomCard>
        )}
      </Content>
      <ConfirmDeleteDialog
        message={deleteMessage}
        open={openDialog}
        onCancel={() => handleCancelDialog()}
        onClose={() => handleCloseDialog()}
        onConfirm={() => handleConfirmDialog()}
      />
      <FormDialog
        title={titleDialog}
        open={openFormDialog}
        values={userEdit}
        loadData={loadUsers}
        onClose={() => handleCloseDialog()}
      />
    </Container>
  );
}
