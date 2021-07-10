import React from "react";
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
import dateFormat from "dateformat";
import PropTypes from "prop-types";

const useStyles = makeStyles(styles);

export default function ListParticipantMobile(props) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      style={{
        margin: "16px 0px",
      }}
    >
      <CardContent style={{ padding: "16px" }}>
        <GridContainer spacing={3}>
          <GridItem xs={6} sm={6} style={{ background: "white" }}>
            <p
              style={{
                color: "black",
                textAlign: "left",
                marginBottom: "0px",
              }}
            >
              {props.item.name}
            </p>
            {props.type === "mencari" ? (
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
                    {props.item.beratBadan} Kg
                  </span>
                </Tooltip>
                <br />
                <Tooltip title="Tanggal Sembuh Covid19">
                  <span>
                    <strong>Tgl Sembuh</strong> :&nbsp;
                    {dateFormat(props.item.tanggalSembuh, "d mmm yy")}
                  </span>
                </Tooltip>
              </p>
            ) : (
              <p
                style={{
                  color: "black",
                  textAlign: "left",
                  fontSize: "12px",
                }}
              >
                <Tooltip title="Rumah Sakit RUjukan">
                  <span>
                    <strong>Rumah Sakit</strong> :&nbsp;
                    {props.item.rumahSakit ? props.item.rumahSakit : "-"}
                  </span>
                </Tooltip>
              </p>
            )}
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
              {props.item.bloodType}
              {props.item.rhesus === "Positif" ? "+" : "-"}
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
            {props.item.phone !== "" ? (
              <IconButton
                href={"https://api.whatsapp.com/send?phone=" + props.item.phone}
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
            {props.item.socialMedia !== "" ? (
              <IconButton
                href={"https://www.instagram.com/" + props.item.socialMedia}
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
  );
}

ListParticipantMobile.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};
