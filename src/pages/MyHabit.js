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
} from "@mui/material";
import { GiHobbitDwelling } from "react-icons/gi";
import { Container, Row, Col } from "react-bootstrap";

const HabitPage = () => {
  const [habits, setHabits] = useState([
    {
      name: "Exercise",
      completed: false,
      weeklyRecord: [true, false, true, true, false, true, false],
    },
    {
      name: "Meditation",
      completed: false,
      weeklyRecord: [true, true, false, true, true, true, false],
    },
  ]);
  const [openHabitDialog, setOpenHabitDialog] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [openProgressDialog, setOpenProgressDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Check for any missed habits and alert the user
    setTimeout(() => {
      const missedHabits = habits.filter((habit) => !habit.completed);
      if (missedHabits.length > 0) {
        setShowAlert(true);
      }
    }, 1000);
  }, [habits]);

  const handleToggleHabit = (index) => {
    const updatedHabits = [...habits];
    updatedHabits[index].completed = !updatedHabits[index].completed;
    setHabits(updatedHabits);
  };

  const handleAddHabit = () => {
    setHabits([
      ...habits,
      { name: newHabit, completed: false, weeklyRecord: Array(7).fill(false) },
    ]);
    setNewHabit("");
    setOpenHabitDialog(false);
  };

  const handleOpenHabitDialog = () => {
    setOpenHabitDialog(true);
  };

  const handleCloseHabitDialog = () => {
    setOpenHabitDialog(false);
  };

  const handleOpenProgressDialog = () => {
    setOpenProgressDialog(true);
  };

  const handleCloseProgressDialog = () => {
    setOpenProgressDialog(false);
  };

  return (
    <Container className="mt-4">
      <Card
        className="p-4"
        style={{ backgroundColor: "#e3f2fd", color: "#1565c0", width: "100%" }}
      >
        <Typography
          variant="h4"
          className="mb-4 d-flex align-items-center"
          sx={{ lineHeight: 5.235 }}
        >
          <GiHobbitDwelling className="me-2" /> Habit Tracker
        </Typography>
        <Row>
          <Col md={6}>
            <Typography variant="h6">Today&apos;s Habits</Typography>
            <ul className="list-unstyled">
              {habits.map((habit, index) => (
                <li key={index} className="d-flex align-items-center">
                  <Checkbox
                    checked={habit.completed}
                    onChange={() => handleToggleHabit(index)}
                    color="primary"
                  />
                  {habit.name} -{" "}
                  {habit.completed ? "Completed" : "Not Completed"}
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenHabitDialog}
            >
              Add New Habit
            </Button>
          </Col>
          <Col md={6}>
            <Typography variant="h6">Weekly Progress</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenProgressDialog}
            >
              View Progress
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Dialog to add a new habit */}
      <Dialog open={openHabitDialog} onClose={handleCloseHabitDialog}>
        <DialogTitle>Add a New Habit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Habit Name"
            type="text"
            fullWidth
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHabitDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddHabit} color="primary">
            Add Habit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog to view progress */}
      <Dialog open={openProgressDialog} onClose={handleCloseProgressDialog}>
        <DialogTitle>Weekly Progress</DialogTitle>
        <DialogContent>
          {habits.map((habit, index) => (
            <div key={index}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2">
                {habit.weeklyRecord.map((day, dayIndex) => (
                  <span key={dayIndex} style={{ marginRight: "8px" }}>
                    {day ? "✔️" : "❌"} {/* ✔️ for completed, ❌ for missed */}
                  </span>
                ))}
              </Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProgressDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showAlert}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity="info"
          variant="filled"
          sx={{ width: 500 }}
        >
          Reminder: You have missed some habits today. Keep up wit your goals!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HabitPage;
