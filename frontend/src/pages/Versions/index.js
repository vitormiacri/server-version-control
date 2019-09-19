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

export default function Versions() {
  const [versions, setVersions] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [version, setVersion] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // States delete dialog
  const [deleteMessage, setDeleteMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [idVersion, setIdVersion] = useState(0);

  // States form dialog
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [versionEdit, setVersionEdit] = useState({});
  const [titleDialog, setTitleDialog] = useState('');

  // States for pagination
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(0);

  async function loadVersions() {
    const response = await api.get('/versions', {
      params: {
        version: version || null,
        description: description || null,
        page,
        perPage,
      },
    });

    const { rows, count } = response.data;

    setVersions(rows);
    setTotalRows(count);
    setLoading(false);
  }

  useEffect(() => {
    loadVersions();
  }, []);

  useEffect(() => {
    loadVersions();
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
    const ver = versions.find(item => id === item.id);

    setDeleteMessage(`Você confirma a exclusão da versão ${ver.name}?`);
    setIdVersion(id);
    setOpenDialog(true);
  }

  function handleChange(e) {
    if (e.target.name === 'name') {
      setVersion(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  }

  function handleFilter() {
    setLoading(true);
    loadVersions();
  }

  function handleCancelDialog() {
    setOpenDialog(false);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setOpenFormDialog(false);
  }

  function handleEdit(id) {
    const ver = versions.find(item => id === item.id);

    setVersionEdit(ver);
    setTitleDialog(`Editando a versão: ${ver.version}`);
    setOpenFormDialog(true);
  }

  function handleAdd() {
    setVersionEdit({});
    setTitleDialog(`Nova Versão`);
    setOpenFormDialog(true);
  }

  async function handleConfirmDialog() {
    try {
      setLoading(true);
      setOpenDialog(false);
      await api.delete(`/versions/${idVersion}`);

      toast.success(`Versão excluída com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao excluir.');
    } finally {
      loadVersions();
    }
  }

  return (
    <Container>
      <Content>
        <CustomCard>
          <div>
            <Form>
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
              Nova Versão
            </AddButton>
          </div>
        </CustomCard>
        {!loading ? (
          <ResultTable
            data={versions}
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
        values={versionEdit}
        loadData={loadVersions}
        onClose={() => handleCloseDialog()}
      />
    </Container>
  );
}
