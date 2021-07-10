import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import qoreContext from "qoreContext";

import PropTypes from "prop-types";
import dateFormat from "dateformat";

import axios from "axios";
import DateDiff from "date-diff";

const useStyles = makeStyles(styles);

export default function ListParticipantMobile(props) {
  const classes = useStyles();
  const [type, setType] = useState(null);
  const [usedData, setUsedData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listKota, setListKota] = useState([]);
  const [listBloodType] = useState(["A", "B", "AB", "0"]);
  const [listRhesus] = useState(["Positif", "Negatif"]);
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [selectedRhesus, setSelectedRhesus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState(null);
  const [message, setMessage] = useState(null);

  const { data: dataMencari } = qoreContext.view("allMencari").useListRow();
  const { data: dataMenjadi } = qoreContext.view("allMenjadi").useListRow();

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
    if (selectedProvinsi) {
      await axios
        .get(
          `https://training-api.pti-cosmetics.com/kabupaten_kota?id_prov=eq.${selectedProvinsi.id}`
        )
        .then((result) => {
          tempListKota = result.data;
        });
    }

    setListKota(tempListKota);
  }, [selectedProvinsi]);

  useEffect(() => {
    if (props) {
      setType(props.type);
    }
  }, [props]);

  useEffect(() => {
    if (type) {
      var filteredData = [];
      if (type === "menjadi") {
        dataMencari.forEach((item) => {
          if (item.socialMedia) {
            if (item.socialMedia[0] === "@") {
              item.socialMedia = item.socialMedia.substring(1);
            }
          }

          if (item.phone) {
            if (item.phone[0] === "0") {
              item.phone = "+62" + item.phone.substring(1);
            }
          }

          var diffSubmit = new DateDiff(new Date(), new Date(item.createdAt));
          let jarakSubmit = Math.ceil(diffSubmit.days());

          if (jarakSubmit <= 30) {
            filteredData.push(item);
          }
        });
        let sortedDataMencari = filteredData.sort((a, b) =>
          a.createdAt >= b.createdAt ? -1 : 1
        );

        setAllData(sortedDataMencari);
        setUsedData([]);
      } else {
        dataMenjadi.forEach((item) => {
          if (item.socialMedia) {
            if (item.socialMedia[0] === "@") {
              item.socialMedia = item.socialMedia.substring(1);
            }
          }

          if (item.phone) {
            if (item.phone[0] === "0") {
              item.phone = "+62" + item.phone.substring(1);
            }
          }

          var diffSembuh = new DateDiff(
            new Date(),
            new Date(item.tanggalSembuh)
          );
          var jarakSembuh = Math.ceil(diffSembuh.days());

          var diffSubmit = new DateDiff(new Date(), new Date(item.createdAt));
          let jarakSubmit = Math.ceil(diffSubmit.days());

          if (jarakSembuh >= 14 && jarakSembuh <= 90 && jarakSubmit <= 30) {
            filteredData.push(item);
          }
        });
        let sortedDataMenjadi = filteredData.sort((a, b) =>
          a.createdAt >= b.createdAt ? -1 : 1
        );

        setAllData(sortedDataMenjadi);
        setUsedData([]);
      }
    }
  }, [dataMencari, dataMenjadi, type]);

  useEffect(() => {
    setUsedData([]);
    setMessage("");
  }, [type]);

  const submitFilter = () => {
    setIsLoading(true);
    let filteredData = [];
    if (
      !selectedProvinsi ||
      !selectedKota ||
      !selectedBloodType ||
      !selectedRhesus
    ) {
      setMessage("Mohon lengkapi data pencarian");
      setMessageType("warning");
    } else {
      var selectedKotaNameOnly = selectedKota.map((item) => item.nama);
      allData.forEach((item) => {
        if (
          selectedKotaNameOnly.indexOf(item.kota) !== -1 &&
          item.bloodType === selectedBloodType &&
          item.rhesus === selectedRhesus
        ) {
          filteredData.push(item);
        }
      });

      let successMessage =
        "Hasil pencarian : " + filteredData.length + " hasil";
      setMessage(successMessage);
      setMessageType("filtered");
    }

    console.log(allData);
    console.log(filteredData);
    setIsLoading(false);
    setUsedData(filteredData);
  };

  return (
    <div className={classes.section}>
      <>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <h2 className={classes.title}>
                {type === "menjadi" ? "Data Pencari Donor" : "Data Pendonor"}
              </h2>
            </GridItem>

            <GridItem xs={12} sm={12} md={12} style={{ margin: "16px 0px" }}>
              <Autocomplete
                id="combo-box-demo"
                options={listProvinsi}
                getOptionLabel={(option) => option.nama}
                style={{ width: "100%" }}
                onChange={(e, newValue) => setSelectedProvinsi(newValue)}
                value={selectedProvinsi}
                renderInput={(params) => (
                  <TextField {...params} label="Provinsi" />
                )}
              />
            </GridItem>

            {selectedProvinsi ? (
              <GridItem xs={12} sm={12} md={12} style={{ margin: "16px 0px" }}>
                <Autocomplete
                  multiple
                  id="combo-box-demo"
                  options={listKota}
                  getOptionLabel={(option) => option.nama}
                  style={{ width: "100%" }}
                  onChange={(e, newValue) => setSelectedKota(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Kabupaten/Kota" />
                  )}
                />
              </GridItem>
            ) : null}
            <GridItem xs={6} sm={6} md={6} style={{ margin: "16px 0px" }}>
              <FormControl
                className={classes.formControl}
                style={{ width: "100%" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Golongan Darah
                </InputLabel>
                <Select
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                >
                  {listBloodType.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={6} sm={6} md={6} style={{ margin: "16px 0px" }}>
              <FormControl
                className={classes.formControl}
                style={{ width: "100%" }}
              >
                <InputLabel id="demo-simple-select-label">Rhesus</InputLabel>
                <Select
                  value={selectedRhesus}
                  onChange={(e) => setSelectedRhesus(e.target.value)}
                >
                  {listRhesus.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              {message !== "" ? (
                <p
                  style={
                    messageType === "warning"
                      ? {
                          color: "#DA251C",
                          width: "100%",
                          textAlign: "center",
                          fontWeight: "bold",
                          margin: "8px",
                        }
                      : {
                          color: "green",
                          width: "100%",
                          textAlign: "center",
                          fontWeight: "bold",
                          margin: "8px",
                        }
                  }
                >
                  {message}
                </p>
              ) : null}
              <Button
                color="primary"
                style={{
                  width: "100%",
                  background: "#DA251C",
                  color: "white",
                  marginTop: "8px",
                  marginBottom: "64px",
                  borderRadius: "10px",
                }}
                onClick={() => {
                  !isLoading ? submitFilter() : null;
                }}
              >
                {isLoading ? "Loading..." : "Cari Data"}
              </Button>
            </GridItem>
            <div
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                width: "100%",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              {usedData.length > 0
                ? usedData.map((item) => (
                    <GridItem key={item.id} xs={12} sm={12}>
                      <Card
                        className={classes.root}
                        style={{
                          margin: "16px 0px",
                        }}
                      >
                        <CardContent style={{ padding: "16px" }}>
                          <GridContainer spacing={3}>
                            <GridItem
                              xs={6}
                              sm={6}
                              style={{ background: "white" }}
                            >
                              <p
                                style={{
                                  color: "black",
                                  textAlign: "left",
                                  marginBottom: "0px",
                                }}
                              >
                                {item.name}
                              </p>
                              {type === "mencari" ? (
                                <p
                                  style={{
                                    color: "black",
                                    textAlign: "left",
                                    fontSize: "12px",
                                  }}
                                >
                                  <Tooltip title="Berat Badan">
                                    <span>
                                      <strong>Berat Badan</strong> :&nbsp;
                                      {item.beratBadan} Kg
                                    </span>
                                  </Tooltip>
                                  <br />
                                  <Tooltip title="Tanggal Sembuh Covid19">
                                    <span>
                                      <strong>Tgl Sembuh</strong> :&nbsp;
                                      {dateFormat(
                                        item.tanggalSembuh,
                                        "d mmm yy"
                                      )}
                                    </span>
                                  </Tooltip>
                                </p>
                              ) : null}
                            </GridItem>
                            <GridItem
                              xs={2}
                              sm={2}
                              style={{
                                background: "white",
                                position: "relative",
                              }}
                            >
                              <p
                                style={{
                                  color: "black",
                                  position: "absolute",
                                  width: "100%",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                {item.bloodType}
                                {item.rhesus === "Positif" ? "+" : "-"}
                              </p>
                            </GridItem>
                            <GridItem
                              xs={2}
                              sm={2}
                              style={{
                                background: "white",
                                position: "relative",
                              }}
                            >
                              {item.phone !== "" ? (
                                <IconButton
                                  href={
                                    "https://api.whatsapp.com/send?phone=" +
                                    item.phone
                                  }
                                  target="_blank"
                                  style={{
                                    position: "absolute",
                                    width: "100%",
                                    top: "50%",
                                    left: "0",
                                    color: "#DA251C",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  <WhatsAppIcon />
                                </IconButton>
                              ) : null}
                            </GridItem>
                            <GridItem
                              xs={2}
                              sm={2}
                              style={{
                                background: "white",
                                position: "relative",
                              }}
                            >
                              {item.socialMedia !== "" ? (
                                <IconButton
                                  href={
                                    "https://www.instagram.com/" +
                                    item.socialMedia
                                  }
                                  target="_blank"
                                  style={{
                                    position: "absolute",
                                    width: "100%",
                                    top: "50%",
                                    left: "0",
                                    color: "#DA251C",
                                    transform: "translateY(-50%)",
                                  }}
                                >
                                  <InstagramIcon />
                                </IconButton>
                              ) : null}
                            </GridItem>
                          </GridContainer>
                        </CardContent>
                      </Card>
                    </GridItem>
                  ))
                : null}
            </div>
          </GridContainer>
        </div>
      </>
    </div>
  );
}

ListParticipantMobile.propTypes = {
  type: PropTypes.string,
};
