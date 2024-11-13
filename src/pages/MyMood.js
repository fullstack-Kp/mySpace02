import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MdMood } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";

// Sample feel-good reminders
const reminders = [
  "You're doing great!",
  "Keep smiling!",
  "Believe in yourself!",
  "Every day may not be good, but there's something good in every day.",
  "You are enough just as you are.",
];

const MoodPage = () => {
  const [moodInput, setMoodInput] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [openLogDialog, setOpenLogDialog] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("😊"); // Default emoji

  const emojis = ["😊", "😃", "😌", "😢", "😠", "😎"]; // List of emojis

  const handleLogMood = () => {
    if (moodInput) {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Format time
      const moodEntry = `${selectedEmoji} ${moodInput} on ${date} at ${time}`;
      setMoodHistory([...moodHistory, moodEntry]);
      setMoodInput("");
      setSelectedEmoji("😊"); // Reset emoji to default
      alert(getRandomReminder()); // Show a reminder
    }
  };

  const getRandomReminder = () => {
    return reminders[Math.floor(Math.random() * reminders.length)];
  };

  const handleOpenLogDialog = () => {
    setOpenLogDialog(true);
  };

  const handleCloseLogDialog = () => {
    setOpenLogDialog(false);
  };

  return (
    <Container
      className="mt-4"
      style={{
        backgroundColor: "#f0e5e5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Card
        className="p-4"
        style={{
          backgroundColor: "#fffbf0",
          color: "#e65100",
          width: "100%",
          borderRadius: "15px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          className="mb-4 d-flex align-items-center"
          sx={{ lineHeight: 5.235 }}
        >
          <MdMood className="me-2" style={{ fontSize: "40px" }} /> Mood Tracker
        </Typography>

        {/* Add an image related to positivity */}
        <img
          src="https://unsplash.com/photos/a-group-of-smiley-face-balloons-floating-in-the-air-sXqWEWCLkaA"
          alt="Happy people"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
        />

        <Row>
          <Col md={6}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Today&apos;s Mood
            </Typography>
            <input
              type="text"
              value={moodInput}
              onChange={(e) => setMoodInput(e.target.value)}
              placeholder="How are you feeling?"
              style={{
                width: "100%",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #e65100",
                outline: "none",
                fontSize: "16px",
              }}
            />
            <div style={{ marginBottom: "10px" }}>
              {emojis.map((emoji) => (
                <span
                  key={emoji}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    marginRight: "5px",
                    transition: "transform 0.2s",
                    borderRadius: selectedEmoji === emoji ? "50%" : "",
                    padding: selectedEmoji === emoji ? "5px" : "",
                    backgroundColor:
                      selectedEmoji === emoji ? "#ffe0b2" : "#fff",
                    boxShadow:
                      selectedEmoji === emoji
                        ? "0px 4px 10px rgba(0,0,0,0.2)"
                        : "",
                  }}
                  onClick={() => setSelectedEmoji(emoji)} // Set selected emoji on click
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  {emoji}
                </span>
              ))}
            </div>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogMood}
              style={{
                borderRadius: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Log Mood
            </Button>
          </Col>
          <Col md={6}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Mood History
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenLogDialog}
              style={{ borderRadius: "20px", padding: "10px 20px" }}
            >
              View Mood Log
            </Button>
          </Col>
        </Row>

        {/* Mood Log Dialog */}
        <Dialog open={openLogDialog} onClose={handleCloseLogDialog}>
          <DialogTitle>Mood Log</DialogTitle>
          <DialogContent>
            {moodHistory.length > 0 ? (
              <ul className="list-unstyled">
                {moodHistory.map((entry, index) => (
                  <li key={index}>{entry}</li>
                ))}
              </ul>
            ) : (
              <Typography>No mood entries logged yet.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
};

export default MoodPage;
