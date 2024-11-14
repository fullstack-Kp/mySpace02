import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../redux/HabitSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const HabitDetails = ({ habit, habit: { details } }) => {
  const dispatch = useDispatch();

  // handlers to change status on click
  const checkStatusHandler = (info) => {
    dispatch(
      changeStatus({
        title: info[0],
        details: [
          {
            day: info[1],
            status: "done",
          },
        ],
      })
    );
  };

  const doneStatusHandler = (info) => {
    dispatch(
      changeStatus({
        title: info[0],
        details: [
          {
            day: info[1],
            status: "fail",
          },
        ],
      })
    );
  };

  const failStatusHandler = (info) => {
    dispatch(
      changeStatus({
        title: info[0],
        details: [
          {
            day: info[1],
            status: "none",
          },
        ],
      })
    );
  };
  return (
    <Row>
      {details.map((detail) => (
        <Fragment key={detail.day}>
          <Col>
            <p className="day-headings">{detail.day}</p>

            {detail.status === "none" && (
              <IconButton
                onClick={() => checkStatusHandler([habit.title, detail.day])}
                edge="end"
                aria-label="delete"
              >
                <CheckCircleOutlineIcon color="action" />
              </IconButton>
            )}

            {detail.status === "done" && (
              <IconButton
                onClick={() => doneStatusHandler([habit.title, detail.day])}
                edge="end"
                aria-label="delete"
              >
                <CheckCircleIcon color="success" />
              </IconButton>
            )}

            {detail.status === "fail" && (
              <IconButton
                onClick={() => failStatusHandler([habit.title, detail.day])}
                edge="end"
                aria-label="delete"
              >
                <CancelIcon color="error" />
              </IconButton>
            )}
          </Col>
        </Fragment>
      ))}
    </Row>
  );
};

export default HabitDetails;
