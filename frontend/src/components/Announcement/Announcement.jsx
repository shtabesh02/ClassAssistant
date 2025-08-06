import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnnouncement } from '../../store/announcement';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  Stack
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';

const Announcement = () => {
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAttachment = (e) => {
    const newFiles = Array.from(e.target.files);
    const fileSet = new Set(attachments.map((f) => f.name));
    const mergedFiles = [...attachments];

    newFiles.forEach((file) => {
      if (!fileSet.has(file.name)) {
        mergedFiles.push(file);
      }
    });

    setAttachments(mergedFiles);
    setFileNames(mergedFiles.map((f) => f.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('msg', msg);
    for (let file of attachments) {
      formData.append('attachments', file);
    }
    await dispatch(addAnnouncement(formData)).then(() => {
      alert('Email sent successfully.');
      navigate(`/`);
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 10, px: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="div" sx={{ mr: 1 }}>
          📢
        </Typography>
        <Typography variant="h4" sx={{color:"secondary.main", }}>Announcements</Typography>
      </Box>

      <Card sx={{ backgroundColor: 'secondary.main' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{color:"success.main"}}>
            Create New Announcement
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>

              <TextField
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                placeholder="Enter announcement subject"
                required
              />

              <TextField
                label="Message"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                fullWidth
                multiline
                minRows={6}
                placeholder="Enter your announcement message"
                required
              />

              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Attach Files:
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AttachFileIcon />}
                >
                  Choose Files
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleAttachment}
                  />
                </Button>
              </Box>

              {fileNames.length > 0 && (
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2
                    }}
                  >
                    <Typography variant="subtitle1">Attached Files:</Typography>
                    <Button
                      color="error"
                      startIcon={<ClearIcon />}
                      onClick={() => {
                        setAttachments([]);
                        setFileNames([]);
                      }}
                    >
                      Clear All
                    </Button>
                  </Box>

                  <List dense>
                    {fileNames.map((name, idx) => (
                      <ListItem key={idx}>📄 {name}</ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Box sx={{ textAlign: 'right' }}>
                <Button type="submit" variant="contained" color="primary">
                  Publish Announcement
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Announcement;
