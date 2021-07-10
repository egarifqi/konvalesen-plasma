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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import qoreContext from "qoreContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { useMediaQuery } from "react-responsive";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function FormMencariSection() {
  const newLocal = null;
  const [needName, setNeedName] = useState(newLocal);
  const [needHospital, setNeedHospital] = useState(newLocal);
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
  const [isNeedAgree, setIsNeedAgree] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidWhatsapp, setIsValidWhatsapp] = useState(true);
  const [isValidInstagram, setIsValidInstagram] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [listBloodType] = useState(["A", "B", "AB", "O"]);
  const [listRhesus] = useState(["Positif", "Negatif"]);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [pencariExpanded, setPencariExpanded] = useState(true);
  const classes = useStyles();

  const { insertRow: insertNeedRow } = qoreContext
    .view("allMencari")
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

  async function submitPencariDonor() {
    setNeedLoading(true);

    if (
      needName === "" ||
      needName === null ||
      needBloodType === "" ||
      needBloodType === null ||
      needRhesus === "" ||
      needProvinsi === "" ||
      needKota === "" ||
      needHospital === "" ||
      needHospital === null
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
      setNeedMessage("Mohon isi setidaknya nomor Whatsapp atau username IG");
    } else if (needName.length < 5) {
      setNeedLoading(false);
      setNeedMessageType("warning");
      setNeedMessage("Mohon isi dengan nama lengkap Anda");
    } else if (
      needPhone !== null &&
      needPhone !== "" &&
      needPhone.length < 10
    ) {
      setNeedLoading(false);
      setNeedMessageType("warning");
      setNeedMessage("Mohon isi nomor Whatsapp Anda dengan benar");
    } else if (needPhone.substring(0, 3) !== "+62") {
      setNeedLoading(false);
      setNeedMessageType("warning");
      setNeedMessage("Nomor Whatsapp tidak valid. Mohon awali dengan +62");
    } else if (needSocialMedia[0] === "@") {
      setNeedLoading(false);
      setNeedMessageType("warning");
      setNeedMessage(
        "Username Intagram tidak valid. Tidak perlu diawali dengan @"
      );
    } else if (!isNeedAgree) {
      setNeedLoading(false);
      setNeedMessageType("warning");
      setNeedMessage(
        "Mohon setujui ketersediaan Anda dalam mensubmit data Anda"
      );
    } else {
      var item = {
        name: needName,
        bloodType: needBloodType,
        rhesus: needRhesus,
        provinsi: needProvinsi.nama,
        kota: needKota.nama,
        phone: needPhone,
        socialMedia: needSocialMedia,
        rumahSakit: needHospital,
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
      setIsSubmitted(true);
    }
  }

  return (
    <div className={classes.section}>
      <Accordion
        id="pencari"
        expanded={pencariExpanded}
        onChange={() => setPencariExpanded(!pencariExpanded)}
        style={{ borderRadius: "10px", marginBottom: "32px" }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={
                pencariExpanded ? { color: "white" } : { color: "#DA251C" }
              }
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={
            pencariExpanded
              ? { background: "#DA251C", borderRadius: "10px" }
              : { background: "rgba(196, 196, 196, 0.5)", borderRadius: "10px" }
          }
        >
          <Typography
            className={classes.heading}
            style={
              pencariExpanded
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
              Form data pencari donor
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
                        value={needName}
                        onChange={(e) => setNeedName(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Nama Lengkap Anda"
                        label="Nama Lengkap"
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
                    md={12}
                    style={{ margin: "16px 0px" }}
                  >
                    <FormControl
                      className={classes.formControl}
                      style={{ width: "100%", height: "48px" }}
                    >
                      <TextField
                        value={needHospital}
                        onChange={(e) => setNeedHospital(e.target.value)}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="Rumah Sakit rujukan"
                        label="Rumah Sakit"
                        id="hospital"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <h4>
                      <strong>Mohon isi setidaknya satu kontak Anda</strong>
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
                        value={needPhone}
                        onChange={(e) => {
                          setNeedPhone(e.target.value);
                          if (
                            e.target.value[0] !== "+" ||
                            e.target.value.length === 0
                          ) {
                            setIsValidWhatsapp(false);
                          } else {
                            setIsValidWhatsapp(true);
                          }
                        }}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="+628xxxxxx"
                        label="Nomor Whatsapp"
                        id="name"
                      />
                    </FormControl>
                    {!isValidWhatsapp ? (
                      <p
                        style={{
                          color: "#DA251C",
                          marginTop: "32px",
                        }}
                      >
                        Nomor whatsapp tidak valid. Mohon awali dengan +62
                      </p>
                    ) : null}
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
                        value={needSocialMedia}
                        onChange={(e) => {
                          setNeedSocialMedia(e.target.value);
                          if (
                            e.target.value[0] === "@" ||
                            e.target.value.length === 0
                          ) {
                            setIsValidInstagram(false);
                          } else {
                            setIsValidInstagram(true);
                          }
                        }}
                        style={{ width: "100%", paddingTop: "16px" }}
                        placeholder="username"
                        label="Username IG"
                        id="name"
                      />
                    </FormControl>
                    {!isValidInstagram ? (
                      <p
                        style={{
                          color: "#DA251C",
                          marginTop: "32px",
                        }}
                      >
                        Username Instagram tidak valid. Tidak perlu menggunakan
                        @
                      </p>
                    ) : null}
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
                          checked={isNeedAgree}
                          onChange={() => setIsNeedAgree(!isNeedAgree)}
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
              Pendaftaran diri Anda sebagai pencari donor berhasil.
            </strong>
            <br />
            <br />
            Semoga Anda / kerabat Anda lekas sembuh dari Covid19.
          </DialogContentText>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={() => window.location.reload()}
              style={{ background: "#DA251C", color: "white" }}
              autoFocus
            >
              Tutup
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
