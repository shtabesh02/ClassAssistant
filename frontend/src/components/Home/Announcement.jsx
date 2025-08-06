import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadannouncements } from "../../store/announcement";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  // CircularProgress,
} from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';


function Announcement() {
  const dispatch = useDispatch();
  const announcements = useSelector((state) => state.announcement.announcement);

  useEffect(() => {
    dispatch(loadannouncements());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        fontFamily="DM Mono"
        
        sx={{fontFamily:"DM Mono",  fontWeight: "bold", color: "success.main"  ,display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', gap:1,
          mb: 4,
          marginTop:2
  }}
      >
       <CampaignIcon sx={{ fontSize: '1.3em', mr:1 }} />
        Announcements
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {announcements.length > 0 ? (
        announcements.map((anmnt) => (
          <Paper
            key={anmnt.id}
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
            <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 500 }}>
              {anmnt.subject}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'success.main' }}>
              {anmnt.msg}
            </Typography>
          </Paper>
        ))
      ) : (
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            color: 'success.main',
            fontStyle: "italic",
          }}
        >
          <Typography variant="body1">There is no announcement.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default Announcement;
