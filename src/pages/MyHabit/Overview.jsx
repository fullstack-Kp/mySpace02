import React from "react";
import CreateHabit from "./CreateHabit";
import { Row, Col, ListGroup, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import "./overview.css";
import { deleteHabit } from "../../redux/HabitSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const Overview = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const { habits } = useSelector((state) => state.allHabits);

  // deleteHabit Handler
  const deleteHandler = (name) => {
    dispatch(deleteHabit(name));
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <i className="fa-regular fa-calendar-minus"></i>
        </Col>
        <Col md={4} className="onMobile">
          <h4>Hobbies</h4>
        </Col>
      </Row>
      <ListGroup>
        {habits.map((habit, index) => (
          <ListGroup.Item
            key={index}
            className="gradient mb-1 rounded habit-container"
          >
            <Row>
              <Col md={2} className="icons">
                {" "}
                <i className="fa-solid fa-feather-pointed me-3"></i>
              </Col>
              <Col md={8} className="habit-title">
                {habit.title}
              </Col>
              <Col md={1} className="icons">
                <IconButton
                  onClick={() => deleteHandler(habit.title)}
                  aria-label="delete"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Row>
        <Col className="d-flex justify-content-end">
          <CreateHabit show={showModal} onHide={() => setShowModal(false)} />
        </Col>
      </Row>
    </>
  );
};

export default Overview;
