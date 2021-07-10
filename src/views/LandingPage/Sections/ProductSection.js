import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import bloodImage from "assets/img/surgeon-holding-blood-test 1.jpg";
import { useMediaQuery } from "react-responsive";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem
            xs={12}
            sm={12}
            md={6}
            style={
              isMobile
                ? {
                    marginTop: "-148px",
                  }
                : null
            }
          >
            <img src={bloodImage} width="100%" />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h5
              className={classes.description}
              style={{ textAlign: "left", color: "black", fontSize: "24px" }}
            >
              Donor plasma konvalesen adalah metode pengambilan darah plasma
              dari penyintas COVID-19 yang dapat diberikan sebagai terapi untuk
              pasien COVID-19 yang sedang dirawat. Website ini hadir untuk
              membantu Anda menemukan donor plasma kovalesen untuk kebutuhan
              Anda maupun kerabat Anda. Mari bersama berjuang melawan Covid19!
            </h5>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
