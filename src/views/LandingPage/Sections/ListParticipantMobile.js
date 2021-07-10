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

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import qoreContext from "qoreContext";

import PropTypes from "prop-types";
import dateFormat from "dateformat";

const useStyles = makeStyles(styles);

export default function ListParticipantMobile(props) {
  const classes = useStyles();
  const [type, setType] = useState(null);
  const [usedData, setUsedData] = useState([]);
  const { data: dataMencari } = qoreContext.view("allMencari").useListRow();
  const { data: dataMenjadi } = qoreContext.view("allMenjadi").useListRow();

  useEffect(() => {
    if (props) {
      setType(props.type);
    }
  }, [props]);

  useEffect(() => {
    if (type) {
      if (type === "mencari") {
        dataMencari.forEach((item) => {
          if (item.socialMedia[0] === "@") {
            item.socialMedia = item.socialMedia.substring(1);
          }
        });
        setUsedData(dataMencari);
      } else {
        dataMenjadi.forEach((item) => {
          if (item.socialMedia[0] === "@") {
            item.socialMedia = item.socialMedia.substring(1);
          }
        });
        setUsedData(dataMenjadi);
      }
    }
  }, [dataMencari, dataMenjadi]);

  console.log("INSPECT DATA");
  console.log(dataMencari);
  console.log(dataMenjadi);
  console.log(usedData);
  return (
    <div className={classes.section}>
      <>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <h2 className={classes.title}>
                {type === "mencari" ? "Data Pencari Donor" : "Data Pendonor"}
              </h2>
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
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  marginBottom: "0px",
                                }}
                              >
                                {item.createdAt.substring(0, 10)}
                              </p>
                              <p
                                style={{
                                  color: "black",
                                  textAlign: "left",
                                  marginBottom: "0px",
                                }}
                              >
                                {item.name}
                              </p>
                              {type === "menjadi" ? (
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
                                      {dateFormat(item.createdAt, "dd/mm")}
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
                            </GridItem>
                            <GridItem
                              xs={2}
                              sm={2}
                              style={{
                                background: "white",
                                position: "relative",
                              }}
                            >
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
