import React, { useState } from "react";
import { Card, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MdEventNote } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';  // Import default styles for the calendar

const SchedulePage = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date
  const [tasks, setTasks] = useState({}); // State to store tasks by date
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [taskInput, setTaskInput] = useState(''); // State for new task input
  const [taskTime, setTaskTime] = useState(''); // State for task time input
  const [editingTaskIndex, setEditingTaskIndex] = useState(null); // State for editing task

  const toggleCalendar = () => {
    setIsCalendarOpen(prevState => !prevState); // Toggle calendar visibility
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpenDialog(true); // Open dialog when date is selected
    setTaskInput(''); // Clear input when changing date
    setTaskTime(''); // Clear time input when changing date
    setEditingTaskIndex(null); // Reset editing state
  };

  const handleAddTask = () => {
    const dateString = selectedDate.toLocaleDateString();
    if (!tasks[dateString]) {
      tasks[dateString] = [];
    }
    
    const taskDetails = { text: taskInput, time: taskTime };
    
    if (editingTaskIndex !== null) {
      // Update existing task
      tasks[dateString][editingTaskIndex] = taskDetails;
    } else {
      // Add new task
      tasks[dateString].push(taskDetails);
      scheduleReminder(dateString, taskDetails);
    }
    
    setTasks({ ...tasks });
    setOpenDialog(false);
    setTaskInput(''); // Clear input after adding/updating task
    setTaskTime('');
  };

  const scheduleReminder = (dateString, task) => {
    const taskDateTime = new Date(`${dateString} ${task.time}`);
    const reminderTime = taskDateTime.getTime() - (15 * 60 * 1000); // Reminder 15 minutes before

    if (reminderTime > Date.now()) {
      setTimeout(() => {
        alert(`Reminder: You have a task "${task.text}" scheduled at ${task.time}`);
      }, reminderTime - Date.now());
    }
  };

  const handleDeleteTask = (index) => {
    const dateString = selectedDate.toLocaleDateString();
    tasks[dateString].splice(index, 1); // Remove task by index
    if (tasks[dateString].length === 0) {
      delete tasks[dateString]; // Remove date entry if no tasks left
    }
    setTasks({ ...tasks });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4" style={{ backgroundColor: "#e0f7fa", color: "#00796b", width: '100%' }}>
        <Typography variant="h4" className="mb-4 d-flex align-items-center" sx={{ lineHeight: 5.235 }}>
          <MdEventNote className="me-2" /> My Schedule
        </Typography>
        <Row>
          <Col md={6}>
            <Typography variant="h6">Upcoming Tasks</Typography>
            {/* Display tasks for the selected date */}
            <ul className="list-unstyled">
              {Object.keys(tasks).length > 0 ? (
                Object.entries(tasks).map(([dateKey, dateTasks]) => (
                  dateTasks.map((task, index) => (
                    <li key={`${dateKey}-${index}`}>
                      {task.text} at {task.time} on {dateKey}
                      <Button variant="text" color="secondary" onClick={() => {
                        setTaskInput(task.text);
                        setTaskTime(task.time);
                        setEditingTaskIndex(index);
                        setOpenDialog(true);
                      }}>Edit</Button>
                      <Button variant="text" color="error" onClick={() => handleDeleteTask(index)}>Delete</Button>
                    </li>
                  ))
                ))
              ) : (
                <li>No tasks scheduled.</li>
              )}
            </ul>
          </Col>
          <Col md={6}>
            <Typography variant="h6">Calendar</Typography>
            {/* Button to toggle calendar visibility */}
            <Button variant="contained" color="primary" onClick={toggleCalendar}>
              {isCalendarOpen ? "Close Calendar" : "Open Calendar"}
            </Button>

            {/* Conditionally render the calendar */}
            {isCalendarOpen && (
              <div className="mt-4">
                <Calendar 
                  onChange={handleDateChange} 
                  value={selectedDate} 
                />
              </div>
            )}
          </Col>
        </Row>

        {/* Dialog for adding/updating tasks */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{editingTaskIndex !== null ? "Edit Task" : "Add Task"}</DialogTitle>
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
              label="Time (HH:mm)" 
              type="time" 
              fullWidth 
              value={taskTime} 
              onChange={(e) => setTaskTime(e.target.value)} 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
            <Button onClick={handleAddTask} color="primary">{editingTaskIndex !== null ? "Update" : "Add"}</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
};

export default SchedulePage;