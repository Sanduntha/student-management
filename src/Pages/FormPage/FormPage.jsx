import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const FormPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Unauthorized: No token found');
          return;
        }
  
        // Log the token to ensure it's stored correctly
        console.log('Token:', token);
  
        const response = await axios.get('https://student-api.acpt.lk/api/student/getAll', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log('Students API Response:', response.data); // Debugging API response
  
        // Ensure response data is an array before setting state
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
  
        
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudents();
  }, []);
  
  const handleEdit = (studentId) => {
    console.log(`Edit student ${studentId}`);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`https://student-api.acpt.lk/api/student/${studentId}`);
        setStudents((prev) => prev.filter((student) => student.id !== studentId));
      } catch (error) {
        console.error('Error deleting student:', error);
        setError('Failed to delete student. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading students...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Typography color="error" variant="h6" sx={{ mb: 2 }}>{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ backgroundColor: 'rgba(242, 186, 29, 1)', color: 'black', fontWeight: 'bold' }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 400, mb: 3, fontFamily: 'Bebas Neue', fontSize: 40 }}>
        MY STUDENT
      </Typography>

      {/* Add Student Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faUserPlus} />}
          sx={{
            fontSize: '16px',
            padding: '10px 20px',
            backgroundColor: 'rgba(242, 186, 29, 1)',
            borderRadius: 30,
            color: 'black',
            fontWeight: 'bold'
          }}
        >
          Add Student
        </Button>
      </Box>

      {/* Student Table */}
      <Box sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        border: '4px solid black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: 4,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      }}>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="student table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'black' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {students.length > 0 ? (
    students.map((student) => (
      <TableRow key={student.id}>
        <TableCell>{student.student_name || 'N/A'}</TableCell> {/* Use student_name */}
        <TableCell>{student.student_age || 'N/A'}</TableCell>   {/* Use student_age */}
        <TableCell>{student.student_address || 'N/A'}</TableCell> {/* Use student_address */}
        <TableCell>{student.student_contact || 'N/A'}</TableCell> {/* Use student_contact */}
        <TableCell>
          <Box sx={{ display: 'flex' }}>
            <IconButton onClick={() => handleEdit(student.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(student.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} sx={{ textAlign: 'center', fontStyle: 'italic' }}>
        No students available.
      </TableCell>
    </TableRow>
  )}
</TableBody>


          </Table>
        </TableContainer>
      </Box>

      {/* Logout Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(242, 186, 29, 1)',
            borderRadius: 30,
            color: 'black',
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          LOG OUT
        </Button>
      </Box>
    </Box>
  );
};

export default FormPage;
