import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  TextField,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Fab,
} from "@mui/material";
import { GiHobbitDwelling } from "react-icons/gi";
import { Container, Row, Col } from "react-bootstrap";
import Overview from "./Overview";
import HabitDisplay from "./HabitDisplay";
import AddIcon from "@mui/icons-material/Add";
import Typed from "typed.js";
const HabitPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const typed = new Typed(".tag", {
      strings: [
        "...okay. Let's start by tracking a habit for next seven days.",
        "It's never too late to develop good habits.",
        "Good habits formed at youth makes all the difference - Aristotle",
        "Motivation is what gets you started. Habit is what keeps you going.",
        "Habits change into character.",
        "Habits are the compound interest of self-improvement: This quote is by James Clear.",
        "Be the designer of your world and not merely the consumer of it",
      ], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 2000,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 5000,
      loop: true,
    });

    // Destroying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Container className="mt-4">
      <Card
        className="p-4"
        style={{ backgroundColor: "#e3f2fd", color: "#1565c0", width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            className="mb-4 d-flex align-items-center"
            sx={{ lineHeight: 5.235, fontSize: 30 }}
          >
            <GiHobbitDwelling className="me-2" /> Hobbies Tracker
          </Typography>
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            color="#0A2FB6"
          >
            <h4 className="tag"></h4>
          </Snackbar>
          <Fab
            onClick={() => setModalShow(true)}
            size="medium"
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </div>
        <Row>
          <Col md={3}>
            {/* Overview component */}
            <Overview showModal={modalShow} setShowModal={setModalShow} />
          </Col>
          <Col md={9}>
            {/*  HabitDetails Component*/}
            <HabitDisplay />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default HabitPage;
