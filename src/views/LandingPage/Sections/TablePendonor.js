import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TablePagination from "@material-ui/core/TablePagination";
import qoreContext from "qoreContext";
import TableFilter from "./TableFilter";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TablePendonor() {
  const classes = useStyles();
  const [filterProps, setFilterProps] = useState({
    provinsi: "",
    kota: "",
    bloodType: "",
    rhesus: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const { data: listPendonor, status } = qoreContext
    .view("allMenjadi")
    .useListRow({
      limit: rowsPerPage,
      offset,
      ...filterProps,
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  React.useMemo(async () => {
    const {
      data: { totalCount },
    } = await qoreContext.client.project.axios.get(`/allMenjadi/rows/count`);
    setTotalCount(totalCount);
  }, []);

  const regenerateTotalCount = async (filter) => {
    const {
      data: { totalCount },
    } = await qoreContext.client.project.axios.get(`/allMenjadi/rows/count`, {
      params: {
        ...filter,
      },
    });
    setTotalCount(totalCount);
  };

  useEffect(() => {
    const test = page * rowsPerPage;
    setOffset(test);
  }, [page, rowsPerPage]);

  useEffect(() => {
    regenerateTotalCount(filterProps);
  }, [filterProps]);

  return (
    <>
      <h4 style={{ color: "#3c4858", fontSize: "18px", fontWeight: "bold" }}>
        Tabel Calon Pendonor
      </h4>
      <TableFilter setFilter={setFilterProps} />
      {status !== "success" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Kota</StyledTableCell>
                <StyledTableCell align="center">Nama</StyledTableCell>
                <StyledTableCell align="center">Golonga Darah</StyledTableCell>
                <StyledTableCell align="center">Berat Badan</StyledTableCell>
                <StyledTableCell align="center">Tanggal Sembuh</StyledTableCell>
                <StyledTableCell align="center">Kontak</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listPendonor.map((pendonor) => (
                <StyledTableRow key={pendonor.id}>
                  <StyledTableCell component="th" scope="row">
                    {pendonor?.kota}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {pendonor?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`${pendonor?.bloodType} ${
                      pendonor?.rhesus === "Positif" ? "+" : "-"
                    }`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {pendonor?.beratBadan}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {pendonor?.tanggalSembuh}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {pendonor.phone && (
                      <IconButton
                        href={`https://api.whatsapp.com/send?phone=${pendonor.phone}`}
                        target="_blank"
                      >
                        <WhatsAppIcon />
                      </IconButton>
                    )}
                    {pendonor.socialMedia && (
                      <IconButton
                        href={`https://www.instagram.com/${pendonor?.socialMedia}`}
                        target="_blank"
                      >
                        <InstagramIcon />
                      </IconButton>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
}
