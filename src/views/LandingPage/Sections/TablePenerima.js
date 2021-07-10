import React from "react";
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
import qoreContext from "qoreContext";

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

export default function TablePenerima() {
  const classes = useStyles();
  const { data: listPenerima, status } = qoreContext
    .view("allMencari")
    .useListRow();

  return (
    <>
      <h4 style={{ color: "#3c4858", fontSize: "18px", fontWeight: "bold" }}>
        Tabel Calon Penerima
      </h4>
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
            {status !== "success" ? (
              <CircularProgress />
            ) : (
              <>
                {listPenerima.map((penerima) => (
                  <StyledTableRow key={penerima.id}>
                    <StyledTableCell component="th" scope="row">
                      {penerima?.kota}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {penerima?.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${penerima?.bloodType} ${
                        penerima?.rhesus === "Positif" ? "+" : "-"
                      }`}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {penerima?.beratBadan}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {penerima?.tanggalSembuh}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        href={"https://www.instagram.com"}
                        target="_blank"
                      >
                        <WhatsAppIcon />
                      </IconButton>
                      <IconButton
                        href={"https://www.instagram.com"}
                        target="_blank"
                      >
                        <InstagramIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
