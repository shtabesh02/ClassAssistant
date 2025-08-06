import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importStudents, loadStudents } from '../../store/students';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  // List,
  // ListItem,
  // ListItemText,
  // Divider,
  Stack,
    Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Students = () => {
  const [excelFile, setExcelFile] = useState(null);
  const dispatch = useDispatch();
  const students = useSelector((state) => Object.values(state.students));

  useEffect(() => {
    dispatch(loadStudents());
  }, [dispatch]);

  const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleExcelSubmit = (e) => {
    e.preventDefault();
    if (!excelFile) return alert('Please select the list of students.');
    const formData = new FormData();
    formData.append('file', excelFile);
    dispatch(importStudents(formData)).then(() => {
      dispatch(loadStudents());
      setExcelFile(null);
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2,  }}>
      <Typography variant="h4" gutterBottom sx={{color:"secondary.main", my:3}}>
        📚 List of Students
      </Typography>

      <Card sx={{mb: 4, backgroundColor: 'secondary.main' }}> 
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Import Students
          </Typography>
          <Box component="form" onSubmit={handleExcelSubmit}>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
              >
                Choose Excel File
                <input
                  type="file"
                  hidden
                  accept=".xlsx, .xls"
                  onChange={handleExcelChange}
                />
              </Button>

              <Button type="submit" variant="contained" color="primary">
                Upload
              </Button>

              <Typography variant="body2" color="text.secondary">
                <strong>IMPORTANT</strong>: Make sure your .xlsx file includes the columns: <em>first_name</em>, <em>last_name</em>, and <em>email</em>.
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{mb: 4, backgroundColor: 'secondary.main' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Student List
          </Typography>
          <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
          </TableRow>
        </TableHead>

        <TableBody >
          {students.map((student, index) => (
            <TableRow
              key={student.id}
              sx={{
                backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                '&:hover': {
                  backgroundColor: '#e3f2fd'
                }
              }}
            >
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Students;
