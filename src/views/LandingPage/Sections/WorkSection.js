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

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const newLocal = null;
  const [needName, setNeedName] = useState(newLocal);
  const [needPhone, setNeedPhone] = useState(newLocal);
  const [needSocialMedia, setNeedSocialMedia] = useState(newLocal);
  const [needBloodType, setNeedBloodType] = useState("");
  const [needRhesus, setNeedRhesus] = useState("");
  const [needProvinsi, setNeedProvinsi] = useState("");
  const [needKota, setNeedKota] = useState("");
  const [listNeedKota, setListNeedKota] = useState([]);
  const [needLoading, setNeedLoading] = useState(false);
  const [needMessage, setNeedMessage] = useState("");
  const [needMessageType, setNeedMessageType] = useState("");

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

  const [listBloodType] = useState(["A", "B", "AB", "0"]);
  const [listRhesus] = useState(["Positif", "Negatif"]);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const classes = useStyles();

  const { insertRow: insertNeedRow } = qoreContext
    .view("allMencari")
    .useInsertRow();

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
    if (needProvinsi) {
      await axios
        .get(
          "https://training-api.pti-cosmetics.com/kabupaten_kota?id_prov=eq." +
            needProvinsi.id
        )
        .then((result) => {
          tempListKota = result.data;
        });
    }

    setListNeedKota(tempListKota);
  }, [needProvinsi]);

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

  async function submitPencariDonor() {
    setNeedLoading(true);

    if (
      needName === "" ||
      needName === null ||
      needBloodType === "" ||
      needBloodType === null ||
      needRhesus === "" ||
      needProvinsi === "" ||
      needKota === ""
    ) {
      setNeedLoading(false);
      setNeedMessageType("warning");
      setNeedMessage("Mohon isi kolom data diri dengan lengkap");
    } else if (
      (needPhone === null || needPhone === "") &&
      (needSocialMedia === null || needSocialMedia === "")
    ) {
      setNeedLoading(false);
      setNeedMessageType("warning");
      setNeedMessage("Mohon isi setidaknya nomor HP atau link social media");
    } else {
      var item = {
        name: needName,
        bloodType: needBloodType,
        rhesus: needRhesus,
        provinsi: needProvinsi.nama,
        kota: needKota.nama,
        phone: needPhone,
        socialMedia: needSocialMedia,
      };

      await insertNeedRow(item);
      setNeedLoading(false);
      setNeedMessage("Data berhasil disubmit");
      setNeedMessageType("success");
      setNeedName("");
      setNeedBloodType("");
      setNeedRhesus("");
      setNeedProvinsi("");
      setNeedKota("");
      setNeedPhone("");
      setNeedSocialMedia("");
      setTimeout(() => {
        setNeedMessage("");
        window.location.reload();
      }, 5000);
    }
  }

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
      setBecomeMessage("Mohon isi setidaknya nomor HP atau link social media");
    } else if (
      jedaCovid < 14 ||
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
      } else if (jedaCovid < 14) {
        warningMessage =
          warningMessage +
          "Jeda setelah sembuh dari Covid-19 harus lebih dari 14 hari";
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
    } else {
      var item = {
        name: becomeName,
        bloodType: becomeBloodType,
        rhesus: becomeRhesus,
        provinsi: becomeProvinsi.nama,
        kota: becomeKota.nama,
        phone: becomePhone,
        socialMedia: becomeSocialMedia,
      };

      await insertBecomeRow(item);
      setBecomeLoading(false);
      setBecomeMessage("Data berhasil disubmit");
      setBecomeMessageType("success");

      setTimeout(() => {
        setBecomeMessage("");
        window.location.reload();
      }, 5000);
    }
  }

  const handleDateChange = (date) => {
    console.log(date);
    setBecomeDate(date);
    console.log(Math.floor((new Date() - date) / (3600 * 24 * 1000)));
  };

  return (
    <div className={classes.section}>
      <Accordion
        expanded={expanded === "mencari"}
        onChange={() => {
          if (expanded === "mencari") {
            setExpanded(null);
          } else {
            setExpanded("mencari");
          }
        }}
        style={{ borderRadius: "10px", marginBottom: "32px" }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={
                expanded === "mencari"
                  ? { color: "white" }
                  : { color: "#DA251C" }
              }
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={
            expanded === "mencari"
              ? { background: "#DA251C", borderRadius: "10px" }
              : { background: "rgba(196, 196, 196, 0.5)", borderRadius: "10px" }
          }
        >
          <Typography
            className={classes.heading}
            style={
              expanded === "mencari"
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
            Saya ingin mencari pendonor
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer justify="center">
            <GridItem cs={12} sm={12} md={8}>
              <h2 className={classes.title}>Form data pencari donor</h2>
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
                        value={needName}
                        onChange={(e) => setNeedName(e.target.value)}
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
                        value={needBloodType}
                        onChange={(e) => setNeedBloodType(e.target.value)}
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
                        value={needRhesus}
                        onChange={(e) => setNeedRhesus(e.target.value)}
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
                      onChange={(e, newValue) => setNeedProvinsi(newValue)}
                      value={needProvinsi}
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
                    {needProvinsi ? (
                      <Autocomplete
                        id="combo-box-demo"
                        options={listNeedKota}
                        getOptionLabel={(option) => option.nama}
                        style={{ width: "100%" }}
                        onChange={(e, newValue) => setNeedKota(newValue)}
                        value={needKota}
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
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={needPhone}
                        onChange={(e) => setNeedPhone(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Nomor HP"
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
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={needSocialMedia}
                        onChange={(e) => setNeedSocialMedia(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Link Social Media"
                        id="name"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Button
                      color="primary"
                      style={{
                        width: "100%",
                        background: "#DA251C",
                        color: "white",
                        marginTop: "32px",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        !needLoading ? submitPencariDonor() : null;
                      }}
                    >
                      {needLoading ? "Loading..." : "Submit Data"}
                    </Button>
                    {needMessage !== "" ? (
                      <p
                        style={
                          needMessageType === "warning"
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
                        {needMessage}
                      </p>
                    ) : null}
                  </GridItem>
                </GridContainer>
              </form>
            </GridItem>
          </GridContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "menjadi"}
        onChange={() => {
          if (expanded === "menjadi") {
            setExpanded(null);
          } else {
            setExpanded("menjadi");
          }
        }}
        style={{ borderRadius: "10px" }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={
                expanded === "menjadi"
                  ? { color: "white" }
                  : { color: "#DA251C" }
              }
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={
            expanded === "menjadi"
              ? { background: "#DA251C", borderRadius: "10px" }
              : { background: "rgba(196, 196, 196, 0.5)", borderRadius: "10px" }
          }
        >
          <Typography
            className={classes.heading}
            style={
              expanded === "menjadi"
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
            Saya ingin menjadi pendonor
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer justify="center">
            <GridItem cs={12} sm={12} md={8}>
              <h2 className={classes.title}>Form data menjadi pendonor</h2>
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
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ margin: "16px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={becomePhone}
                        onChange={(e) => setBecomePhone(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Nomor HP"
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
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={becomeSocialMedia}
                        onChange={(e) => setBecomeSocialMedia(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Link Social Media"
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
                    <h3>
                      Silahkan isikan kondisi di bawah ini sesuai dengan kondisi
                      asli Anda
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
                      label="Sehat tanpa ada komorbid"
                    />
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
                      label="Bersedia mengikuti screening darah"
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
    </div>
  );
}
