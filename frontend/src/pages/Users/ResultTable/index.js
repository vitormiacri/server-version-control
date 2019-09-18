import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
  Paper,
  TablePagination,
} from '@material-ui/core';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import PropTypes from 'prop-types';

import TablePaginationActions from '~/components/TablePaginationActions';
import {
  useStyles,
  CustomTableRow,
  CustomTableCell,
  CustomTableCellDetails,
  EditButton,
  DeleteButton,
  Empty,
} from './styles';

export default function ResultTable({
  data,
  totalRows,
  perPage,
  page,
  handlePageChange,
  handlePerPageChange,
  handleDelete,
  handleEdit,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      {totalRows > 0 ? (
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <CustomTableCell>Nome</CustomTableCell>
              <CustomTableCell>E-mail</CustomTableCell>
              <CustomTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <CustomTableRow key={row.id} hover>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <CustomTableCellDetails align="center">
                  <EditButton onClick={() => handleEdit(row.id)}>
                    <MdEdit size={20} color="#FFF" />
                  </EditButton>
                  <DeleteButton onClick={() => handleDelete(row.id)}>
                    <MdDeleteForever size={20} color="#FFF" />
                  </DeleteButton>
                </CustomTableCellDetails>
              </CustomTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                rowsPerPage={perPage}
                page={page}
                count={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerPageChange}
                labelRowsPerPage="Total por página"
                ActionsComponent={TablePaginationActions}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count}`
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <Empty variant="h4" align="center">
          Nenhum usuário encontrado
        </Empty>
      )}
    </Paper>
  );
}

ResultTable.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    ip: PropTypes.string.isRequired,
    map: PropTypes.func,
  }).isRequired,
  totalRows: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePerPageChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
