import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import HowToMenjadiSection from "./Sections/HowToMenjadiSection.js";
import HowToMencariSection from "./Sections/HowToMencariSection.js";
import FormMencariSection from "./Sections/FormMencariSection.js";
import FormMenjadiSection from "./Sections/FormMenjadiSection.js";
import ListParticipantMobile from "./Sections/ListParticipantMobile.js";
import Button from "components/CustomButtons/Button.js";
import TablePendonor from "./Sections/TablePendonor.js";
import TablePenerima from "./Sections/TablePenerima.js";
import { useMediaQuery } from "react-responsive";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const [showed, setShowed] = useState("mencari");
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="LIFELINE"
        rightLinks={<HeaderLinks setShowed={setShowed} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        image={
          isMobile
            ? require("assets/img/mobilehomebanner.jpg").default
            : require("assets/img/hombanner.jpg").default
        }
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}></GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <ProductSection />
          <div
            className={classes.section}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={isMobile ? null : { marginBottom: "64px" }}>
              <Button
                style={
                  showed === "mencari"
                    ? {
                        background: "#DA251C",
                        color: "white",
                        width: `${isMobile ? "100%" : "45%"}`,
                      }
                    : {
                        background: "rgba(196, 196, 196, 0.5)",
                        color: "#DA251C",
                        width: `${isMobile ? "100%" : "45%"}`,
                      }
                }
                onClick={() => setShowed("mencari")}
              >
                Cari Plasma
              </Button>
              <Button
                style={
                  showed === "menjadi"
                    ? {
                        background: "#DA251C",
                        color: "white",
                        width: `${isMobile ? "100%" : "45%"}`,
                      }
                    : {
                        background: "rgba(196, 196, 196, 0.5)",
                        color: "#DA251C",
                        width: `${isMobile ? "100%" : "45%"}`,
                      }
                }
                onClick={() => setShowed("menjadi")}
              >
                Donor Plasma
              </Button>
            </div>
          </div>
          {showed === "menjadi" ? (
            <>
              <HowToMenjadiSection />
              {isMobile ? (
                <ListParticipantMobile type={showed} />
              ) : (
                <TablePenerima />
              )}
              <FormMenjadiSection />
            </>
          ) : (
            <>
              <HowToMencariSection />
              {isMobile ? (
                <ListParticipantMobile type={showed} />
              ) : (
                <TablePendonor />
              )}
              <FormMencariSection />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
