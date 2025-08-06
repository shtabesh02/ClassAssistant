import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadallquizzes } from '../../store/quiz';
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import QuizIcon from '@mui/icons-material/Quiz';


function Quiz() {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quiz.quiz);

  useEffect(() => {
    dispatch(loadallquizzes());
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ fontFamily:"DM Mono",fontWeight: 'bold', color: 'success.main',   display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    mb: 4,
          marginTop:2
 }}
      >
          <QuizIcon sx={{ fontSize: '1em', mr:1 }} />
        Quizzes
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <Paper
            key={quiz.id}
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              borderLeft: '6px solid',
              borderColor: 'warning.main',
              transition: '0.3s',
              borderRadius:2,
              backgroundColor: '#fdfdfd',
              '&:hover': {
                boxShadow: 6,
                  
              },
            }}
          >
            <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 500 }}>
              {quiz.title}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'primary.main', mt: 1 }}>
              Due: {dayjs(quiz.due_date).format('MMMM D, YYYY [at] h:mm A')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'success.main' }}>
              {quiz.description}
            </Typography>
          </Paper>
        ))
      ) : (
        <Box
          sx={{
            mt: 4,
            textAlign: 'center',
            color: 'success.main',
            fontStyle: 'italic',
          }}
        >
          <Typography variant="body1">There is no quiz.</Typography>
        </Box>
      )}
    </Container>
  );
}

export default Quiz;
