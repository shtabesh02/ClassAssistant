import { Box, Typography, Paper, Checkbox, Stack, Chip } from "@mui/material";
import "./ListView.css";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadallquizzes } from "../../store/quiz";
import { loadassignments } from "../../store/assignment";
import { loadannouncements } from "../../store/announcement";
import dayjs from "dayjs";
import TimerIcon from '@mui/icons-material/Timer'; 

// Utility function to extract "yyyy-mm-dd" from a timestamp
const formatDate = (isoString) =>
  new Date(isoString).toISOString().split("T")[0];

function ListView() {
  const dispatch = useDispatch();

  const quizzes = useSelector((state) => state.quiz.quiz || []);
  const assignments = useSelector((state) => state.assignment.assignment || []);
  const announcements = useSelector(
    (state) => state.announcement.announcement || []
  );

  useEffect(() => {
    dispatch(loadallquizzes());
    dispatch(loadassignments());
    dispatch(loadannouncements());
  }, [dispatch]);

  // Process and group items by date
  const groupedData = useMemo(() => {
    const allItems = [];

    quizzes.forEach((item) => {
      allItems.push({
        type: "Quiz",
        date: formatDate(item.due_date),
        ...item,
      });
    });

    assignments.forEach((item) => {
      allItems.push({
        type: "Assignment",
        date: formatDate(item.due_date),
        ...item,
      });
    });

    announcements.forEach((item) => {
      allItems.push({
        type: "Announcement",
        date: formatDate(item.createdAt),
        ...item,
      });
    });

    // Group by date
    const grouped = {};

    allItems.forEach((item) => {
      if (!grouped[item.date]) {
        grouped[item.date] = [];
      }
      grouped[item.date].push(item);
    });

    // Convert to array and sort by date ascending
    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, items]) => ({ date, items }));
  }, [quizzes, assignments, announcements]);
  console.log("Grouped Data:", groupedData);
  return (
    <Box>
        <Box  sx={{ display: "flex", mb:0.5 }}>
               <Typography variant="h7" gutterBottom sx={{ color: '#f46f5bff', paddingBottom:2, mr:5, mt:1, ml:4 }}>
         <TimerIcon sx={{ fontSize: 20 }} />
      </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: '#1F3B66', paddingBottom:2 }}>
        Upcoming Events
      </Typography>

        </Box>
      
      {groupedData.map((item, index) => (
        <Box key={index} sx={{ display: "flex", mb:0.5 }}>
          <Box
          
          
            sx={{
              width: 80,
              textAlign: "center",
              py: 1,
              borderRight: "2px dashed #ccc",
              /* backgroundColor: "#eee",
              borderRadius: 2, */
              
              mr: 2,
              display: "flex",              // Enable Flexbox
    flexDirection: "column",      // Stack Typography vertically
    justifyContent: "center",     // Center vertically
    alignItems: "center",         // Center horizontally
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color:
                  dayjs(item.date).diff(dayjs(), "day") < 0
                    ? "#f46f5bff"
                    : "#007BFF",
              }}
            >
              {" "}
              {dayjs(item.date).diff(dayjs(), "day")}
            </Typography>
            <Typography variant="caption" sx={{color: "#1F3B66"}}>days</Typography>
          </Box >

          <Box
            display="flex"
            
            sx={{
                borderTop: "20px solid #f9fafe",
                borderRadius:4, 
                backgroundColor: "#eee", width: "100%" }}
          >
            {/* Left Column */}
            <Box
             elevation={3}
              sx={{
                width: "auto", // adjust width as needed
                paddingRight: 2,
                /* borderRadius: 2, */
                
                 display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // ensures vertical centering within parent
              }}
            >
                
              <Typography variant="h8" fontFamily="monospace"  sx={{ color: '#1F3B66', borderLeft: "10px solid #1F3B66", paddingLeft: 1, marginBottom: 0.5 }}>
                {dayjs(item.date).format('YYYY/MM/DD')}
              </Typography>
              {/* You can put anything here */}
            </Box>

            {/* Right Column with Tasks */}
            <Paper
              elevation={1}
              sx={{
                flexGrow: 1,
                p: 2,
                borderRadius:4,
                backgroundColor: "#eee", // match the left column
                boxShadow: "none", // remove default Paper shadow
              }}
            >
              <Stack spacing={1}>
                {item.items.map((task, i) => {
                  const content =
                    task.title || task.description
                      ? `${task.title ?? ""} // ${task.description ?? ""}`
                      : `${task.subject ?? ""} // ${task.msg ?? ""}`;

                  return (
                    <Box key={i} display="flex" alignItems="center" gap={1}
                     sx={{
                width: "auto", // adjust width as needed
                padding: 2,
               
                borderBottom: "1px solid #222e40a5",
                 display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // ensures vertical centering within parent
              }}
                    >
                      <Checkbox size="small" />
                      <Typography
                        variant="body2"
                        component="span"
                        fontFamily="monospace"
                        sx={{ flexGrow: 1, color: '#1F3B66' }}
                      >
                        {content.trim()}
                      </Typography>

                      {task.type && (
                        <Chip
                          label={task.type}
                          size="small"
                          variant="outlined"
                          fontWeight="bold"
                          sx={{ fontSize: "0.7rem", color:"#1F3B66", backgroundColor:"#ffe869ff"}}
                        />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Paper>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ListView;
