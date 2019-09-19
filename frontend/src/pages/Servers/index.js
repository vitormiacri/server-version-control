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

export default function Servers() {
  const [servers, setServers] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(true);

  // States delete dialog
  const [deleteMessage, setDeleteMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [idServer, setIdServer] = useState(0);

  // States form dialog
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [serverEdit, setServerEdit] = useState({});
  const [titleDialog, setTitleDialog] = useState('');

  // States for pagination
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);

  async function loadServers() {
    const response = await api.get('/servers', {
      params: {
        name: name || null,
        ip: ip || null,
        version: version || null,
        page,
        perPage,
      },
    });

    const { rows, count } = response.data;

    setServers(rows);
    setTotalRows(count);
    setLoading(false);
  }

  useEffect(() => {
    loadServers();
  }, []);

  useEffect(() => {
    loadServers();
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
    const server = servers.find(item => id === item.id);

    setDeleteMessage(
      `Você confirma a exclusão do servidor ${server.name} com o IP ${server.ip}?`
    );
    setIdServer(id);
    setOpenDialog(true);
  }

  function handleChange(e) {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'version') {
      setVersion(e.target.value);
    } else {
      setIp(e.target.value);
    }
  }

  function handleFilter() {
    setLoading(true);
    loadServers();
  }

  function handleCancelDialog() {
    setOpenDialog(false);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setOpenFormDialog(false);
  }

  function handleEdit(id) {
    const server = servers.find(item => id === item.id);

    setServerEdit(server);
    setTitleDialog(`Editando o servidor: ${server.name}`);
    setOpenFormDialog(true);
  }

  function handleAdd() {
    setServerEdit({});
    setTitleDialog(`Novo servidor`);
    setOpenFormDialog(true);
  }

  async function handleConfirmDialog() {
    try {
      setLoading(true);
      setOpenDialog(false);
      await api.delete(`/servers/${idServer}`);

      toast.success(`Servidor excluído com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao excluir.');
    } finally {
      loadServers();
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
                label="Nome do servidor"
                value={name}
                onChange={e => handleChange(e)}
              />
              <TextField
                name="ip"
                label="Ip do servidor"
                value={ip}
                onChange={e => handleChange(e)}
              />
              <TextField
                name="version"
                label="Versão"
                value={version}
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
              Novo Servidor
            </AddButton>
          </div>
        </CustomCard>
        {!loading ? (
          <ResultTable
            data={servers}
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
        values={serverEdit}
        loadData={loadServers}
        onClose={() => handleCloseDialog()}
      />
    </Container>
  );
}
