// src/components/About.jsx
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Link,
  Box,
  // useTheme
} from '@mui/material';

const teamMembers = [
  {
    name: 'Shir Hussain Tabesh',
    role: 'Software Development Engineer',
    img: '/team/Shir.png',
    email: 'shir@example.com',
  },
  {
    name: 'Henry Tam',
    role: 'UX/UI/Front-End Engineer',
    img: '/team/Henry_Avatar.png',
    email: 'henrytam@bu.edu',
  },
  {
    name: 'Hemanth Reddy',
    role: 'Front-End Developer',
    img: '/team/Hemanth_avatar.png',
    email: 'hemanth@example.com',
  },
  {
    name: 'Yitian Qian',
    role: 'Data Analyst & Front-End Developer',
    img: '/team/Yitian_Avatar.png',
    email: 'yitian@example.com',
  },
];

function About() {
  // const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: '#1F3B66', minHeight: '100vh', py: 6, color: '#fff' }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#fff' }}>
          About Our Project
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 6, color: '#cfd8dc' }}>
          Our platform simplifies classroom management for educators, enabling seamless delivery of
          quizzes, announcements, assignments, and student collaboration—all in one intuitive space.
        </Typography>

        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
          Meet the Team
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={6} key={member.name}>
              <Card
                elevation={6}
                sx={{
                  backgroundColor: '#2E4B7D',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: 3,
                  py: 3,
                  px: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <Avatar
                  src={member.img}
                  alt={member.name}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    border: '2px solid #fff',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="#B0BEC5" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2">
                    <Link
                      href={`mailto:${member.email}`}
                      underline="hover"
                      sx={{ color: '#90CAF9' }}
                    >
                      {member.email}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
