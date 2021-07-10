import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import qoreContext from "qoreContext";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { useMediaQuery } from "react-responsive";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function FormMencariSection() {
  const newLocal = null;

  const [becomeName, setBecomeName] = useState(newLocal);
  const [becomePhone, setBecomePhone] = useState(newLocal);
  const [becomeSocialMedia, setBecomeSocialMedia] = useState(newLocal);
  const [becomeBloodType, setBecomeBloodType] = useState("");
  const [becomeRhesus, setBecomeRhesus] = useState("");
  const [becomeProvinsi, setBecomeProvinsi] = useState("");
  const [becomeKota, setBecomeKota] = useState("");
  const [becomeDate, setBecomeDate] = useState(null);
  const [listBecomeKota, setListBecomeKota] = useState([]);
  const [becomeLoading, setBecomeLoading] = useState(false);
  const [becomeMessage, setBecomeMessage] = useState("");
  const [becomeMessageType, setBecomeMessageType] = useState("");
  const [becomeWeight, setBecomeWeight] = useState(newLocal);

  const [isHamil, setIsHamil] = useState(false);
  const [isTranfusi, setIsTranfusi] = useState(false);
  const [isSehatKomorbid, setIsSehatKomorbid] = useState(false);
  const [isSembuh, setIsSembuh] = useState(false);
  const [isScreening, setIsScreening] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isKomorbidOpen, setIsKomorbidOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [listBloodType] = useState(["A", "B", "AB", "O"]);
  const [listRhesus] = useState(["Positif", "Negatif"]);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [pendonorExpanded, setPendonorExpanded] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const classes = useStyles();

  const { insertRow: insertBecomeRow } = qoreContext
    .view("allMenjadi")
    .useInsertRow();

  useEffect(async () => {
    var tempListProvinsi = [];
    await axios
      .get("https://training-api.pti-cosmetics.com/provinsi")
      .then((result) => {
        tempListProvinsi = result.data;
      });

    setListProvinsi(tempListProvinsi);
  }, []);

  useEffect(async () => {
    var tempListKota = [];
    if (becomeProvinsi) {
      await axios
        .get(
          `https://training-api.pti-cosmetics.com/kabupaten_kota?id_prov=eq.${becomeProvinsi.id}`
        )
        .then((result) => {
          tempListKota = result.data;
        });
    }

    setListBecomeKota(tempListKota);
  }, [becomeProvinsi]);

  async function submitMenjadiPendonor() {
    setBecomeLoading(true);
    var jedaCovid = Math.floor((new Date() - becomeDate) / (3600 * 24 * 1000));

    if (
      becomeName === "" ||
      becomeName === null ||
      becomeBloodType === "" ||
      becomeRhesus === "" ||
      becomeProvinsi === "" ||
      becomeKota === "" ||
      becomeDate === null ||
      becomeWeight === null
    ) {
      setBecomeLoading(false);
      setBecomeMessageType("warning");
      setBecomeMessage("Mohon isi kolom data diri dengan lengkap");
    } else if (
      (becomePhone === null || becomePhone === "") &&
      (becomeSocialMedia === null || becomeSocialMedia === "")
    ) {
      setBecomeLoading(false);
      setBecomeMessageType("warning");
      setBecomeMessage("Mohon isi setidaknya nomor Whatsapp atau username IG");
    } else if (becomeName.length < 5) {
      setBecomeLoading(false);
      setBecomeMessageType("warning");
      setBecomeMessage("Mohon isi dengan nama lengkap Anda");
    } else if (
      becomePhone !== null &&
      becomePhone !== "" &&
      becomePhone.length < 10
    ) {
      setBecomeLoading(false);
      setBecomeMessageType("warning");
      setBecomeMessage("Mohon isi nomor Whatsapp Anda dengan benar");
    } else if (
      jedaCovid < 14 ||
      jedaCovid > 90 ||
      becomeWeight < 55 ||
      !isHamil ||
      !isTranfusi ||
      !isSehatKomorbid ||
      !isSembuh ||
      !isScreening
    ) {
      setBecomeLoading(false);
      setBecomeMessageType("warning");
      var warningMessage =
        "Mohon maaf, Anda tidak memenuhi kriteria sebagai pendonor. ";
      if (becomeWeight < 55) {
        warningMessage =
          warningMessage + "Berat badan Anda harus lebih dari 55 Kg.";
      } else if (jedaCovid < 14 || jedaCovid > 90) {
        warningMessage =
          warningMessage +
          "Jeda setelah sembuh dari Covid-19 harus di antara 14 - 90 hari";
      } else if (
        !isHamil ||
        !isTranfusi ||
        !isSehatKomorbid ||
        !isSembuh ||
        !isScreening
      ) {
        warningMessage =
          warningMessage +
          "Anda tidak memenuhi semua kondisi dari 5 kondisi di atas.";
      }
      setBecomeMessage(warningMessage);
    } else if (!isAgree) {
      setBecomeLoading(false);
      setBecomeMessageType("warning");
      setBecomeMessage(
        "Mohon setujui ketersediaan Anda dalam mensubmit data Anda"
      );
    } else {
      var item = {
        name: becomeName,
        bloodType: becomeBloodType,
        rhesus: becomeRhesus,
        provinsi: becomeProvinsi.nama,
        kota: becomeKota.nama,
        phone: becomePhone,
        socialMedia: becomeSocialMedia,
        beratBadan: becomeWeight,
        tanggalSembuh: becomeDate,
        createdDate: new Date(),
      };

      await insertBecomeRow(item);
      setBecomeLoading(false);
      setBecomeMessage("Data berhasil disubmit");
      setBecomeMessageType("success");
      setIsSubmitted(true);
    }
  }

  const handleDateChange = (date) => {
    setBecomeDate(date);
  };

  return (
    <div className={classes.section}>
      <Accordion
        id="pendonor"
        expanded={pendonorExpanded}
        onChange={() => setPendonorExpanded(!pendonorExpanded)}
        style={{ borderRadius: "10px" }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={
                pendonorExpanded ? { color: "white" } : { color: "#DA251C" }
              }
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={
            pendonorExpanded
              ? { background: "#DA251C", borderRadius: "10px" }
              : { background: "rgba(196, 196, 196, 0.5)", borderRadius: "10px" }
          }
        >
          <Typography
            className={classes.heading}
            style={
              pendonorExpanded
                ? {
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    width: "100%",
                  }
                : {
                    textAlign: "center",
                    color: "#DA251C",
                    fontWeight: "normal",
                    width: "100%",
                  }
            }
          >
            <h2
              className={classes.title}
              style={
                isMobile
                  ? {
                      fontSize: "16px",
                      color: "white",
                      margin: "0px",
                    }
                  : {
                      fontSize: "24px",
                      color: "white",
                      margin: "0px",
                    }
              }
            >
              Form data pendonor
            </h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer justify="center">
            <GridItem cs={12} sm={12} md={8}>
              <form>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ margin: "16px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={becomeName}
                        onChange={(e) => setBecomeName(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Nama Lengkap Anda"
                        id="name"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "16px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Golongan Darah
                      </InputLabel>
                      <Select
                        value={becomeBloodType}
                        onChange={(e) => setBecomeBloodType(e.target.value)}
                      >
                        {listBloodType.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "16px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Rhesus
                      </InputLabel>
                      <Select
                        value={becomeRhesus}
                        onChange={(e) => setBecomeRhesus(e.target.value)}
                      >
                        {listRhesus.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "16px 0px" }}
                  >
                    <Autocomplete
                      id="combo-box-demo"
                      options={listProvinsi}
                      getOptionLabel={(option) => option.nama}
                      style={{ width: "100%" }}
                      onChange={(e, newValue) => setBecomeProvinsi(newValue)}
                      value={becomeProvinsi}
                      renderInput={(params) => (
                        <TextField {...params} label="Provinsi" />
                      )}
                    />
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "16px 0px" }}
                  >
                    {becomeProvinsi ? (
                      <Autocomplete
                        id="combo-box-demo"
                        options={listBecomeKota}
                        getOptionLabel={(option) => option.nama}
                        style={{ width: "100%" }}
                        onChange={(e, newValue) => setBecomeKota(newValue)}
                        value={becomeKota}
                        renderInput={(params) => (
                          <TextField {...params} label="Kabupaten/Kota" />
                        )}
                      />
                    ) : null}
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "16px 0px" }}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        disableToolbar
                        style={{ width: "100%" }}
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Tanggal sembuh Covid 19"
                        value={becomeDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "32px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={becomeWeight}
                        onChange={(e) => setBecomeWeight(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Berat Badan"
                        type="number"
                        id="name"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <h4>
                      <strong>
                        Mohon isi setidaknya satu sebagai cara untuk menghubungi
                        Anda
                      </strong>
                    </h4>
                  </GridItem>

                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "0px 0px 16px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={becomePhone}
                        onChange={(e) => setBecomePhone(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Nomor Whatsapp"
                        id="name"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "0px 0px 16px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={becomeSocialMedia}
                        onChange={(e) => setBecomeSocialMedia(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Username IG"
                        id="name"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ marginTop: "32px" }}
                  >
                    <h3 style={{ fontSize: "24px" }}>
                      <strong>
                        Silahkan isikan kondisi di bawah sesuai dengan kondisi
                        asli Anda
                      </strong>
                    </h3>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isHamil}
                          onChange={() => setIsHamil(!isHamil)}
                          color="primary"
                        />
                      }
                      style={{ color: "black" }}
                      label="Belum pernah hamil, melahirkan atau keguguran"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isTranfusi}
                          onChange={() => setIsTranfusi(!isTranfusi)}
                          color="primary"
                        />
                      }
                      style={{ color: "black" }}
                      label="Tidak menerima transfusi darah selama 6 bulan terakhir"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSehatKomorbid}
                          onChange={() => setIsSehatKomorbid(!isSehatKomorbid)}
                          color="primary"
                        />
                      }
                      style={{ color: "black", marginRight: "0px" }}
                      label="Sehat tanpa ada komorbid"
                    />
                    <IconButton
                      aria-label="upload picture"
                      component="span"
                      onClick={() => setIsKomorbidOpen(true)}
                    >
                      <HelpIcon />
                    </IconButton>
                    <Dialog
                      open={isKomorbidOpen}
                      onClose={() => setIsKomorbidOpen(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Komorbid adalah..."}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Komorbid adalah penyakit penyerta seperti tekanan
                          darah tinggi (hipertensi), kencing manis, diabetes
                          melitus, hepatitis B, hepatitis C, sifilis, HIV/AIDS
                          dan penyakit penyerta lainnya
                        </DialogContentText>
                      </DialogContent>
                    </Dialog>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isSembuh}
                          onChange={() => setIsSembuh(!isSembuh)}
                          color="primary"
                        />
                      }
                      style={{ color: "black" }}
                      label="Ada surat keterangan sembuh dari perawat"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isScreening}
                          onChange={() => setIsScreening(!isScreening)}
                          color="primary"
                        />
                      }
                      style={{ color: "black" }}
                      label="Bersedia mengikuti screening darah"
                    />
                  </GridItem>

                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ marginTop: "64px" }}
                  >
                    <p>
                      <strong>
                        Data Anda akan ditampilkan pada platform
                        &apos;Lifeline&apos; paling lama 30 hari setelah
                        mensubmit data tersebut
                      </strong>
                    </p>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isAgree}
                          onChange={() => setIsAgree(!isAgree)}
                          color="primary"
                        />
                      }
                      style={{ color: "black" }}
                      label="Saya bersedia untuk menampilkan data Saya pada 'Lifeline' selama 30 hari"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      color="primary"
                      style={{
                        width: "100%",
                        background: "#DA251C",
                        color: "white",
                        marginTop: "32px",
                      }}
                      onClick={() => {
                        !becomeLoading ? submitMenjadiPendonor() : null;
                      }}
                    >
                      {becomeLoading ? "Loading..." : "Submit Data"}
                    </Button>
                    {becomeMessage !== "" ? (
                      <p
                        style={
                          becomeMessageType === "warning"
                            ? {
                                color: "#DA251C",
                                width: "100%",
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: "32px",
                              }
                            : {
                                color: "green",
                                width: "100%",
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: "32px",
                              }
                        }
                      >
                        {becomeMessage}
                      </p>
                    ) : null}
                  </GridItem>
                </GridContainer>
              </form>
            </GridItem>
          </GridContainer>
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={isSubmitted}
        onClose={() => {
          window.location.reload();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "black",
              textAlign: "center",
            }}
          >
            <strong>
              Terima kasih telah mendaftarakan diri Anda sebagai pendonor.
            </strong>
            <br />
            <br />
            Mari bersama kita lawan Covid19!
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={() => window.location.reload()}
            style={{ background: "#DA251C", color: "white" }}
            autoFocus
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
