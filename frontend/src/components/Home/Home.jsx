import Announcement from "./Announcement"
import Assignment from "./Assignment"
import Quiz from "./Quiz"
import ListView from './ListView'; // new component
import './Home.css'
import { Button, Typography, Container,  Box,
  Tabs,
  Tab,
  Divider,
  Paper
 } from '@mui/material';
import { useState } from 'react';

function Home() {
  const [tab, setTab] = useState(0); // 0: Group View, 1: List View

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      {/* Sidebar Tabs */}
      <Box
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: 200,
          backgroundColor: '#1F3B66',
          paddingTop: 10,
          fontFamily: 'DM Mono, monospace',
        }}
      >
        <Tabs
          orientation="vertical"
          value={tab}
          onChange={handleTabChange}
          aria-label="view switch tabs"
           TabIndicatorProps={{
      sx: { backgroundColor: '#FFDE2D' }, // tab indicator (underline) color
    }}
        >
          <Tab label="Group View" 
          sx={{
        color: '#dfeefeff',
        fontFamily: 'DM Mono, monospace',
        '&.Mui-selected': {
          color: '#dfeefeff', // selected text color
          backgroundColor: '#0a2142ff', // selected tab background
        },
        '&:hover': {
          backgroundColor: '#0a2142ff', // darker blue on hover
          color: '#dfeefeff',
          
        },
      }}
          />
          <Tab label="List View" 
          sx={{
        color: '#dfeefeff',
        fontFamily: 'DM Mono, monospace',
        '&.Mui-selected': {
          color: '#dfeefeff',
          backgroundColor: '#0a2142ff',
        },
        '&:hover': {
          backgroundColor: '#0a2142ff',
          color: '#dfeefeff'
        },
      }}
          />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{
    flexGrow: 1,
    padding: 3,
    backgroundColor: "#f9fafe",
    minHeight: "100vh",
    boxSizing: "border-box"
  }}>
        {tab === 0 && (
          <Box  sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#1F3B66", fontFamily: 'DM Mono, monospace', mb: 2 }}>
        Welcome to your Class Assistant
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box
        
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 3,
          width: "100%",
           height: "100%",
        }}
      >
        {/* Each section wrapped in a Paper for better visual appeal */}
        <Paper
          elevation={1}
          sx={{
             flex: 1,
            padding: 2,
            borderRadius: 3,
            backgroundColor: "#eee",
            minHeight: "200px",
             display: "flex",
              flexDirection: "column",
              height: "100%",
          }}
        >
          <Quiz />
        </Paper>

        <Paper
          elevation={1}
          sx={{
           flex: 1,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#eee",
            minHeight: "200px",
             display: "flex",
              flexDirection: "column",
              height: "100%",
          }}
        >
          <Assignment />
        </Paper>

        <Paper
          elevation={1}
          sx={{
             flex: 1,
            padding: 2,
            borderRadius: 3,
            backgroundColor: "#eee",
            minHeight: "200px",
             display: "flex",
              flexDirection: "column",
              height: "100%",
          }}
        >
          <Announcement />
        </Paper>
      </Box>
    </Box>
        )}

        {tab === 1 && <ListView />}
      </Box>
    </Box>
  );
}

export default Home