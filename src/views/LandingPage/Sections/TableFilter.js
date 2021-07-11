import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.js";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: "100%",
  },
  filterContainer: {
    marginBottom: 32,
  },
}));

export default function TableFilter(parent) {
  const classes = useStyles();
  const [needProvinsi, setNeedProvinsi] = useState("");
  const [needKota, setNeedKota] = useState("");
  const [needBloodType, setNeedBloodType] = useState("");
  const [needRhesus, setNeedRhesus] = useState("");
  const [listProvinsi, setListProvinsi] = useState([]);
  const [listNeedKota, setListNeedKota] = useState([]);
  const [listBloodType] = useState(["A", "B", "AB", "O"]);
  const [listRhesus] = useState(["Positif", "Negatif"]);
  const { setFilter } = parent;

  const handleSubmit = (e) => {
    e.preventDefault();
    let kotaArray = [];
    if (needKota.length > 0) {
      kotaArray = needKota.map((kota) => kota.nama);
    }
    const filter = {
      provinsi: needProvinsi?.nama || "",
      kota: kotaArray,
      bloodType: needBloodType || "",
      rhesus: needRhesus || "",
    };

    setFilter(filter);
  };

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

  return (
    <div className={classes.filterContainer}>
      <form onSubmit={handleSubmit}>
        <Grid justify="space-between" container spacing={3}>
          <Grid item xs={3}>
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
          </Grid>
          {needProvinsi && (
            <Grid item xs={3}>
              <Autocomplete
                multiple
                id="combo-box-demo"
                options={listNeedKota}
                getOptionLabel={(option) => option.nama}
                style={{ width: "100%" }}
                onChange={(e, newValue) => setNeedKota(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Kota/Kab" />
                )}
              />
            </Grid>
          )}
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-native-select">
                Golongan Darah
              </InputLabel>
              <Select
                native
                defaultValue=""
                value={needBloodType}
                onChange={(e) => setNeedBloodType(e.target.value)}
                id="grouped-native-select"
              >
                <option aria-label="None" value="" />
                {listBloodType.map((type, idx) => (
                  <option value={type} key={idx}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-select">Rhesus</InputLabel>
              <Select
                native
                defaultValue=""
                id="grouped-native-select"
                value={needRhesus}
                onChange={(e) => setNeedRhesus(e.target.value)}
              >
                <option aria-label="None" value="" />
                {listRhesus.map((rhesus, idx) => (
                  <option value={rhesus} key={idx}>
                    {rhesus}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              type="submit"
              style={{
                width: "100%",
                background: "#DA251C",
                color: "white",
                borderRadius: "10px",
              }}
            >
              CARI
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
