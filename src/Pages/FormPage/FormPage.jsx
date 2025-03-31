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
  IconButton,
  TextField,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    student_name: '',
    student_age: '',
    student_address: '',
    student_contact: ''
  });
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('Unauthorized: No token found');
          navigate('/', { replace: true });
          return;
        }

        const response = await axios.get('https://student-api.acpt.lk/api/student/getAll', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [navigate]);

  const handleAddStudent = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setFormData({
      student_name: '',
      student_age: '',
      student_address: '',
      student_contact: ''
    });
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setFormData({
      student_name: '',
      student_age: '',
      student_address: '',
      student_contact: ''
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        Swal.fire('Error!', 'No token found. Please log in again.', 'error');
        navigate('/', { replace: true });
        return;
      }

      const response = await axios.post(
        'https://student-api.acpt.lk/api/student/save',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire('Success!', 'Student added successfully.', 'success');
        setStudents([...students, response.data]);
        handleCloseAddDialog();
      } else {
        throw new Error('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      Swal.fire('Error!', 'Failed to add student. Please try again.', 'error');
    }
  };

  const handleEdit = (studentId) => {
    const studentToEdit = students.find(student => student.id === studentId);
    setFormData({
      student_name: studentToEdit.student_name,
      student_age: studentToEdit.student_age,
      student_address: studentToEdit.student_address,
      student_contact: studentToEdit.student_contact
    });
    setEditingStudentId(studentId);
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        Swal.fire('Error!', 'No token found. Please log in again.', 'error');
        navigate('/', { replace: true });
        return;
      }

      const response = await axios.put(
        `https://student-api.acpt.lk/api/student/update/${editingStudentId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        Swal.fire('Success!', 'Student updated successfully.', 'success');
        setStudents(students.map(student => student.id === editingStudentId ? response.data : student));
        handleCloseEditDialog();
      } else {
        throw new Error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      Swal.fire('Error!', 'Failed to update student. Please try again.', 'error');
    }
  };

  const handleDelete = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            Swal.fire('Error!', 'No token found. Please log in again.', 'error');
            navigate('/', { replace: true });
            return;
          }

          const response = await axios.delete(
            `https://student-api.acpt.lk/api/student/delete/${studentId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.status === 200) {
            setStudents(prev => prev.filter(student => student.id !== studentId));
            Swal.fire('Deleted!', 'The student has been deleted.', 'success');
          } else {
            throw new Error('Failed to delete student.');
          }
        } catch (error) {
          console.error('Error deleting student:', error);
          Swal.fire('Error!', 'Failed to delete the student. Please try again.', 'error');
        }
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/', { replace: true });
    window.location.reload();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faUserPlus} />}
          onClick={handleAddStudent}
          sx={{
            fontSize: '16px',
            padding: '10px 20px',
            backgroundColor: 'rgba(242, 186, 29, 1)',
            borderRadius: 30,
            color: 'black',
            fontWeight: 'bold',
            marginRight: 15,
          }}
        >
          Add Student
        </Button>
      </Box>

      <Box sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        border: '4px solid black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: 4,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        width: 1200,
        marginLeft: 12,
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
                    <TableCell>{student.student_name || 'N/A'}</TableCell>
                    <TableCell>{student.student_age || 'N/A'}</TableCell>
                    <TableCell>{student.student_address || 'N/A'}</TableCell>
                    <TableCell>{student.student_contact || 'N/A'}</TableCell>
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
                  <TableCell colSpan={5} sx={{ textAlign: 'center' }}>No students available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            ADD STUDENT
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={handleAddSubmit}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="student_age"
                  type="number"
                  value={formData.student_age}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="student_address"
                  value={formData.student_address}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="student_contact"
                  value={formData.student_contact}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseAddDialog} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleAddSubmit}
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(242, 186, 29, 1)',
              borderRadius: 30,
              color: 'black',
              '&:hover': { backgroundColor: 'rgba(242, 186, 29, 1)' }
            }}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            EDIT STUDENT
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="student_age"
                  type="number"
                  value={formData.student_age}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="student_address"
                  value={formData.student_address}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="student_contact"
                  value={formData.student_contact}
                  onChange={handleFormChange}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseEditDialog} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(242, 186, 29, 1)',
              borderRadius: 30,
              color: 'black',
              '&:hover': { backgroundColor: 'rgba(242, 186, 29, 1)' }
            }}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{
          fontSize: '16px',
          padding: '10px 20px',
          backgroundColor: 'rgba(242, 186, 29, 1)',
          borderRadius: 30,
          color: 'black',
          fontWeight: 'bold',
          marginLeft: 12,
          marginTop: 5
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: 8 }} />
        Logout
      </Button>
    </Box>
  );
};

export default FormPage;