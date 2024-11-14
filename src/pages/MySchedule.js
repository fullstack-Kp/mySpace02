import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  Fab,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { MdEventNote } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddIcon from "@mui/icons-material/Add"; // Import default styles for the calendar
import Loader from "../components/loader/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { getExpiredItems, getUpcomingItems } from "../utils/myScheduleUtils";

const style = {
  py: 0,
  width: "60%",
  borderRadius: 2,
  // border: "1px solid",
  // backgroundColor: "#b1c1fb ",
};

const SchedulePage = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to toggle calendar visibility
  const [showLoader, setShowLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date
  const [tasks, setTasks] = useState({}); // State to store tasks by date
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [taskInput, setTaskInput] = useState(""); // State for new task input
  const [taskTime, setTaskTime] = useState(""); // State for task time input
  const [editingTaskIndex, setEditingTaskIndex] = useState(null); // State for editing task

  const toggleCalendar = () => {
    setIsCalendarOpen((prevState) => !prevState); // Toggle calendar visibility
  };

  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setTasks({
        "10/11/2024": [
          {
            text: "Complete My Space project",
            time: "15:08",
          },
          {
            text: "Review code",
            time: "15:18",
          },
        ],
        "12/11/2024": [
          {
            text: "Perform end to end testing",
            time: "15:16",
          },
        ],
      });
    }, 900);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpenDialog(true); // Open dialog when date is selected
    setTaskInput(""); // Clear input when changing date
    setTaskTime(""); // Clear time input when changing date
    setEditingTaskIndex(null); // Reset editing state
  };

  const handleAddTask = () => {
    const dateString = selectedDate.toLocaleDateString();
    if (!tasks[dateString]) {
      tasks[dateString] = [];
    }
    setOpenDialog(false);
    const taskDetails = { text: taskInput, time: taskTime };

    if (editingTaskIndex !== null) {
      // Update existing task
      tasks[dateString][editingTaskIndex] = taskDetails;
    } else {
      // Add new task
      tasks[dateString].push(taskDetails);
      scheduleReminder(dateString, taskDetails);
    }
    setShowLoader(true);
    setTimeout(() => {
      setTasks({ ...tasks });
      setShowLoader(false);
      setTaskInput(""); // Clear input after adding/updating task
      setTaskTime("");
    }, 1100);
  };

  const scheduleReminder = (dateString, task) => {
    const taskDateTime = new Date(`${dateString} ${task.time}`);
    const reminderTime = taskDateTime.getTime() - 15 * 60 * 1000; // Reminder 15 minutes before

    if (reminderTime > Date.now()) {
      setTimeout(() => {
        alert(
          `Reminder: You have a task "${task.text}" scheduled at ${task.time}`
        );
      }, reminderTime - Date.now());
    }
  };

  const pendingTasks = getExpiredItems(tasks);
  const upcomingTasks = getUpcomingItems(tasks);

  const handleDeleteTask = (index) => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      const dateString = selectedDate.toLocaleDateString();
      tasks[dateString].splice(index, 1); // Remove task by index
      if (tasks[dateString].length === 0) {
        delete tasks[dateString]; // Remove date entry if no tasks left
      }
      setTasks({ ...tasks });
    }, 800);
  };

  return (
    <>
      <Container className="mt-4">
        <Card
          className="p-4"
          style={{
            backgroundColor: "#e0f7fa",
            color: "#00796b",
            width: "100%",
          }}
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
              <MdEventNote className="me-2" /> My Schedule
            </Typography>

            <Fab
              onClick={toggleCalendar}
              size="medium"
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </div>
          <Row>
            <List sx={style}>
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "h6",
                  }}
                  primary="Pending Tasks"
                />
              </ListItem>
              <Divider component="li" />
              {Object.keys(pendingTasks).length > 0 ? (
                Object.entries(pendingTasks).map(([dateKey, dateTasks]) =>
                  dateTasks.map((task, index) => (
                    <>
                      <ListItem
                        secondaryAction={
                          <>
                            <IconButton
                              onClick={() => {
                                setTaskInput(task.text);
                                setTaskTime(task.time);
                                setEditingTaskIndex(index);
                                setOpenDialog(true);
                              }}
                              edge="end"
                              aria-label="edit"
                              sx={{ marginRight: 2 }}
                            >
                              <Edit color="info" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteTask(index)}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemText
                          primary={`${task.text} at ${task.time} on ${dateKey}`}
                        />
                      </ListItem>
                      <Divider variant="middle" component="li" />
                    </>
                  ))
                )
              ) : (
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h7",
                    }}
                    primary="No tasks scheduled."
                  />
                </ListItem>
              )}
            </List>
          </Row>
          <Row
            style={{
              marginTop: 30,
            }}
          >
            <List sx={style}>
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "h6",
                  }}
                  primary="Upcoming Tasks"
                />
              </ListItem>
              <Divider component="li" />
              {Object.keys(upcomingTasks).length > 0 ? (
                Object.entries(upcomingTasks).map(([dateKey, dateTasks]) =>
                  dateTasks.map((task, index) => (
                    <>
                      <ListItem
                        secondaryAction={
                          <>
                            <IconButton
                              onClick={() => {
                                setTaskInput(task.text);
                                setTaskTime(task.time);
                                setEditingTaskIndex(index);
                                setOpenDialog(true);
                              }}
                              edge="end"
                              aria-label="edit"
                              sx={{ marginRight: 2 }}
                            >
                              <Edit color="info" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteTask(index)}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemText
                          primary={`${task.text} at ${task.time} on ${dateKey}`}
                        />
                      </ListItem>
                      <Divider variant="middle" component="li" />
                    </>
                  ))
                )
              ) : (
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h7",
                    }}
                    primary="No tasks scheduled."
                  />
                </ListItem>
              )}
            </List>
          </Row>

          {/* Dialog for adding/updating tasks */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
              {editingTaskIndex !== null ? "Edit Task" : "Add Task"}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Task"
                type="text"
                fullWidth
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <TextField
                margin="dense"
                type="time"
                fullWidth
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddTask} color="primary">
                {editingTaskIndex !== null ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
        <Backdrop
          open={isCalendarOpen}
          onClick={() => setIsCalendarOpen(false)}
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        >
          {/* Conditionally render the calendar */}
          <div>
            <Calendar
              minDate={new Date()}
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
        </Backdrop>
      </Container>
      <Loader open={showLoader} />
    </>
  );
};

export default SchedulePage;
