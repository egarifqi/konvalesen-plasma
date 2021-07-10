import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import cari from "assets/img/cari.jpg";
import infokan from "assets/img/infokan.jpg";
import bantu from "assets/img/bantu.jpg";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles(styles);

export default function HowToMenjadiSection() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div
      className={classes.section}
      style={isMobile ? { paddingBottom: "0px" } : null}
    >
      <>
        <div style={isMobile ? { overflowX: "auto" } : null}>
          <GridContainer
            style={
              isMobile
                ? { flexWrap: "nowrap", flexDirection: "row", width: "220vw" }
                : null
            }
          >
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={6} sm={6} md={6} className={classes.itemGrid}>
                  <img src={cari} alt="..." className={imageClasses} />
                </GridItem>
                <h4
                  className={classes.cardTitle}
                  style={
                    isMobile
                      ? {
                          marginTop: "32px",
                          marginBottom: "0px",
                          fontSize: "24px",
                        }
                      : null
                  }
                >
                  Cari
                </h4>
                <CardBody>
                  <p className={classes.description} style={{ color: "black" }}>
                    Daftarkan diri Anda menjadi pendonor. Pastikan bahwa kondisi
                    diri Anda cukup baik untuk menjadi pendonor
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={6} sm={6} md={6} className={classes.itemGrid}>
                  <img
                    src={infokan}
                    width="320px"
                    height="320px"
                    alt="..."
                    className={imageClasses}
                  />
                </GridItem>
                <h4
                  className={classes.cardTitle}
                  style={
                    isMobile
                      ? {
                          marginTop: "32px",
                          marginBottom: "0px",
                          fontSize: "24px",
                        }
                      : null
                  }
                >
                  Informasikan
                </h4>
                <CardBody>
                  <p className={classes.description} style={{ color: "black" }}>
                    Informasikan ketersediaan Anda menjadi pendonor
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={6} sm={6} md={6} className={classes.itemGrid}>
                  <img src={bantu} alt="..." className={imageClasses} />
                </GridItem>
                <h4
                  className={classes.cardTitle}
                  style={
                    isMobile
                      ? {
                          marginTop: "32px",
                          marginBottom: "0px",
                          fontSize: "24px",
                        }
                      : null
                  }
                >
                  Bantu
                </h4>
                <CardBody>
                  <p className={classes.description} style={{ color: "black" }}>
                    Bantu donorkan plasma kovalesen Anda apabila ada yang
                    menghubungi Anda untuk meminta bantuan
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </>
    </div>
  );
}
