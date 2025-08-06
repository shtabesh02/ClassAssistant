import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadassignments } from "../../store/assignment";
import { Container, Typography, Paper, Divider, Box } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import dayjs from "dayjs";

function Assignment() {
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignment.assignment);

  useEffect(() => {
    dispatch(loadassignments());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        fontFamily="DM Mono"
        sx={{
          fontFamily:"DM Mono",
          fontWeight: "bold",
          color: "success.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 4,
          marginTop:2
        }}
      >
        <AssignmentIcon sx={{ fontSize: "1em", mr:1 }} />
        Assignments
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {assignments.length > 0 ? (
        assignments.map((assignment) => (
          <Paper
            key={assignment.id}
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              borderLeft: "6px solid",
              borderColor: "warning.main",
              backgroundColor: "#fdfdfd",
              transition: "0.3s",
              borderRadius:2,
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "success.main", fontWeight: 500, }}
            >
              {assignment.title}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "primary.main", mt: 1 }}
            >
              Due:{" "}
              {dayjs(assignment.due_date).format("MMMM D, YYYY [at] h:mm A")}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: "success.main" }}>
              {assignment.description}
            </Typography>
          </Paper>
        ))
      ) : (
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            color: "'success.main'",
            fontStyle: "italic",
          }}
        >
          <Typography variant="body1">There is no assignment.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default Assignment;
