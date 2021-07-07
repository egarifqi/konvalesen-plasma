import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import cari from "assets/img/cari.jpg";
import daftar from "assets/img/daftar.jpg";
import hubungi from "assets/img/hubungi.jpg";
import infokan from "assets/img/infokan.jpg";
import bantu from "assets/img/bantu.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const [showed, setShowed] = useState("mencari");
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <div style={{ marginBottom: "64px" }}>
        <Button
          style={
            showed === "mencari"
              ? { background: "#DA251C", color: "white" }
              : { background: "rgba(196, 196, 196, 0.5)", color: "#DA251C" }
          }
          onClick={() => setShowed("mencari")}
        >
          Saya ingin mencari pendonor
        </Button>
        <Button
          style={
            showed === "menjadi"
              ? { background: "#DA251C", color: "white" }
              : { background: "rgba(196, 196, 196, 0.5)", color: "#DA251C" }
          }
          onClick={() => setShowed("menjadi")}
        >
          Saya ingin menjadi pendonor
        </Button>
      </div>
      {showed === "mencari" ? (
        <>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img src={cari} alt="..." className={imageClasses} />
                  </GridItem>
                  <h4 className={classes.cardTitle}>Cari</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      style={{ color: "black" }}
                    >
                      Cari profil pendonor yang dapat membantu Anda / kerabat
                      Anda melalui tabel dibawah ini
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img src={daftar} alt="..." className={imageClasses} />
                  </GridItem>
                  <h4 className={classes.cardTitle}>Daftar</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      style={{ color: "black" }}
                    >
                      Daftarkan diri Anda melalui form dibawah apabila Anda
                      masih belum menemui pendonor yang tepat
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img src={hubungi} alt="..." className={imageClasses} />
                  </GridItem>
                  <h4 className={classes.cardTitle}>Hubungi</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      style={{ color: "black" }}
                    >
                      Hubungi pendonor untuk memastikan ketersediaan menjadi
                      pendonor dan komunikasikan prosedur pendonoran plasma
                      konvalesen
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </>
      ) : (
        <>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img src={cari} alt="..." className={imageClasses} />
                  </GridItem>
                  <h4 className={classes.cardTitle}>Cari</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      style={{ color: "black" }}
                    >
                      Daftarkan diri Anda menjadi pendonor. Pastikan bahwa
                      kondisi diri Anda cukup baik untuk menjadi pendonor
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img
                      src={infokan}
                      width="320px"
                      height="320px"
                      alt="..."
                      className={imageClasses}
                    />
                  </GridItem>
                  <h4 className={classes.cardTitle}>Informasikan</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      style={{ color: "black" }}
                    >
                      Informasikan ketersediaan Anda menjadi pendonor
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card plain>
                  <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                    <img src={bantu} alt="..." className={imageClasses} />
                  </GridItem>
                  <h4 className={classes.cardTitle}>Bantu</h4>
                  <CardBody>
                    <p
                      className={classes.description}
                      style={{ color: "black" }}
                    >
                      Bantu donorkan plasma kovalesen Anda apabila ada yang
                      menghubungi Anda untuk meminta bantuan
                    </p>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </>
      )}
    </div>
  );
}
