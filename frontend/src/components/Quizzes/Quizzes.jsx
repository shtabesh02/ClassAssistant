import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Quizzes.css';
import { addAQuiz } from '../../store/quiz';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack
} from '@mui/material';
// import EventIcon from '@mui/icons-material/EventNote';

function Quizzes() {
  const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const quiz = {
            title,
            dueDate,
            description
        }
        dispatch(addAQuiz(quiz))
        .then(() => {
            alert('Quiz added successfully.');
            navigate('/');
        });
    }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="div" sx={{ mr: 2 }}>
          ✍🏽 
        </Typography>
        <Typography variant="h4" sx={{ color: "secondary.main", mb: 1 }}>Quizzes</Typography>
      </Box>

      <Card>
        <CardContent sx={{ backgroundColor: 'secondary.main' }}>
          <Typography variant="h6" gutterBottom sx={{ color: "success.main" }}>
            Create New Quiz
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />

              <TextField
                label="Due Date"
                type="datetime-local"
                fullWidth
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter quiz description"
              />

              <Box sx={{ textAlign: 'right' }}>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Quizzes;
