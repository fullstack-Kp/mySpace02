import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MdAttachMoney } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";

const FinancePage = () => {
  const [dailyBudget, setDailyBudget] = useState(500); // Default daily budget
  const [weeklyBudget, setWeeklyBudget] = useState(3500); // Default weekly budget
  const [monthlyBudget, setMonthlyBudget] = useState(15000); // Default monthly budget
  const [expenses, setExpenses] = useState([
    { name: "Groceries", amount: 50 },
    { name: "Transport", amount: 20 },
  ]);
  const [openBudgetDialog, setOpenBudgetDialog] = useState(false);
  const [budgetType, setBudgetType] = useState("daily");

  const totalDailyExpense = expenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalWeeklyExpense = totalDailyExpense * 7; // Approximation for demo purposes
  const totalMonthlyExpense = totalDailyExpense * 30; // Approximation for demo purposes

  useEffect(() => {
    // Check if any target is exceeded and alert the user
    if (totalDailyExpense > dailyBudget) {
      alert("You've exceeded your daily budget!");
    }
    if (totalWeeklyExpense > weeklyBudget) {
      alert("You've exceeded your weekly budget!");
    }
    if (totalMonthlyExpense > monthlyBudget) {
      alert("You've exceeded your monthly budget!");
    }
  }, [
    totalDailyExpense,
    totalWeeklyExpense,
    totalMonthlyExpense,
    dailyBudget,
    weeklyBudget,
    monthlyBudget,
  ]);

  const handleBudgetChange = (type, value) => {
    if (type === "daily") setDailyBudget(value);
    else if (type === "weekly") setWeeklyBudget(value);
    else if (type === "monthly") setMonthlyBudget(value);
  };

  const handleOpenBudgetDialog = (type) => {
    setBudgetType(type);
    setOpenBudgetDialog(true);
  };

  const handleCloseBudgetDialog = () => {
    setOpenBudgetDialog(false);
  };

  return (
    <Container className="mt-4">
      <Card
        className="p-4"
        style={{ backgroundColor: "#fbe9e7", color: "#b71c1c", width: "100%" }}
      >
        <Typography
          variant="h4"
          className="mb-4 d-flex align-items-center"
          sx={{ lineHeight: 5.235 }}
        >
          <MdAttachMoney className="me-2" /> Finance Tracker
        </Typography>
        <Row>
          <Col md={6}>
            <Typography variant="h6">Recent Expenses</Typography>
            <ul className="list-unstyled">
              {expenses.map((expense, index) => (
                <li key={index}>
                  {expense.name} - ₹{expense.amount}
                </li>
              ))}
            </ul>
          </Col>
          <Col md={6}>
            <Typography variant="h6">Budget Settings</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOpenBudgetDialog("daily")}
            >
              Set Daily Budget
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOpenBudgetDialog("weekly")}
            >
              Set Weekly Budget
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOpenBudgetDialog("monthly")}
            >
              Set Monthly Budget
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Typography variant="h6">Expense Summary</Typography>
            <p>
              Daily Expense: ₹{totalDailyExpense} / ₹{dailyBudget}
            </p>
            <p>
              Weekly Expense (Approx): ₹{totalWeeklyExpense} / ₹{weeklyBudget}
            </p>
            <p>
              Monthly Expense (Approx): ₹{totalMonthlyExpense} / ₹
              {monthlyBudget}
            </p>
          </Col>
        </Row>
      </Card>

      <Dialog open={openBudgetDialog} onClose={handleCloseBudgetDialog}>
        <DialogTitle>
          Set {budgetType.charAt(0).toUpperCase() + budgetType.slice(1)} Budget
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={`Enter ${budgetType} budget in ₹`}
            type="number"
            fullWidth
            onChange={(e) =>
              handleBudgetChange(budgetType, parseInt(e.target.value))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBudgetDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseBudgetDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FinancePage;
