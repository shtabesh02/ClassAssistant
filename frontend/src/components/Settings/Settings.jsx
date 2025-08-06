import { NavLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';

import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';

function Settings() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom  sx={{color:"secondary.main", my:3}}>
        ⚙️ Settings
      </Typography>

      <Card sx={{ backgroundColor: 'secondary.main' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Manage Sections
          </Typography>

          <List>
            <ListItemButton component={NavLink} to="/announcements">
              <ListItemIcon>
                <CampaignIcon />
              </ListItemIcon>
              <ListItemText primary="Announcements" />
            </ListItemButton>

            <Divider />

            <ListItemButton component={NavLink} to="/students">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="List of Students" />
            </ListItemButton>

            <Divider />

            <ListItemButton component={NavLink} to="/assignments">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Assignments" />
            </ListItemButton>

            <Divider />

            <ListItemButton component={NavLink} to="/quizzes">
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary="Quizzes" />
            </ListItemButton>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Settings;
