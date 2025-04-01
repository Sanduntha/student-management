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
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const goTo = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: '',
    age: '',
    address: '',
    contact: ''
  });
  const [currentStudentId, setCurrentStudentId] = useState(null);

  // Check authentication
  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    if (!userToken) {
      goTo('/');
    }
  }, []);

  // Load students
  useEffect(() => {
    const getStudents = async () => {
      try {
        const userToken = localStorage.getItem('authToken');
        if (!userToken) {
          setErrorMessage('Please login first');
          goTo('/');
          return;
        }

        const response = await axios.get('https://student-api.acpt.lk/api/student/getAll', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (Array.isArray(response.data)) {
          // Standardize the student data format
          const formattedStudents = response.data.map(student => ({
            id: student.id,
            student_name: student.student_name || student.name || '',
            student_age: student.student_age || student.age || '',
            student_address: student.student_address || student.address || '',
            student_contact: student.student_contact || student.contact || ''
          }));
          setStudentList(formattedStudents);
        } else {
          throw new Error('Server returned unexpected data format');
        }
      } catch (err) {
        console.error('Error loading students:', err);
        setErrorMessage('Could not load students');
      } finally {
        setIsLoading(false);
      }
    };

    getStudents();
  }, [goTo]);

  // Form dialog handlers
  const openAddStudentDialog = () => setShowAddDialog(true);
  const closeAddStudentDialog = () => {
    setShowAddDialog(false);
    setStudentForm({ name: '', age: '', address: '', contact: '' });
  };

  const closeEditStudentDialog = () => {
    setShowEditDialog(false);
    setStudentForm({ name: '', age: '', address: '', contact: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  // Add new student with proper data transformation
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem('authToken');
      if (!userToken) {
        Swal.fire('Error!', 'Please login again', 'error');
        goTo('/');
        return;
      }

      const apiFormData = {
        student_name: studentForm.name,
        student_age: studentForm.age,
        student_address: studentForm.address,
        student_contact: studentForm.contact
      };

      const response = await axios.post(
        'https://student-api.acpt.lk/api/student/save',
        apiFormData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.status === 200 || response.status === 201) {
        // Ensure we have the complete student data including ID
        const newStudent = {
          id: response.data.id,
          student_name: response.data.student_name || studentForm.name,
          student_age: response.data.student_age || studentForm.age,
          student_address: response.data.student_address || studentForm.address,
          student_contact: response.data.student_contact || studentForm.contact
        };

        setStudentList(prevStudents => [...prevStudents, newStudent]);
        Swal.fire('Success!', 'Student added successfully', 'success');
        closeAddStudentDialog();
      } else {
        throw new Error('Failed to add student');
      }
    } catch (err) {
      console.error('Error adding student:', err);
      Swal.fire('Error!', 'Failed to add student. Please try again.', 'error');
    }
  };

  // Update student with proper data transformation
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem('authToken');
      if (!userToken) {
        Swal.fire('Error!', 'Please login again', 'error');
        goTo('/');
        return;
      }

      const apiFormData = {
        student_name: studentForm.name,
        student_age: studentForm.age,
        student_address: studentForm.address,
        student_contact: studentForm.contact
      };

      const response = await axios.put(
        `https://student-api.acpt.lk/api/student/update/${currentStudentId}`,
        apiFormData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.status === 200) {
        const updatedStudent = {
          id: currentStudentId,
          student_name: response.data.student_name || studentForm.name,
          student_age: response.data.student_age || studentForm.age,
          student_address: response.data.student_address || studentForm.address,
          student_contact: response.data.student_contact || studentForm.contact
        };

        setStudentList(prevStudents => 
          prevStudents.map(student => 
            student.id === currentStudentId ? updatedStudent : student
          )
        );
        Swal.fire('Success!', 'Student updated successfully', 'success');
        closeEditStudentDialog();
      } else {
        throw new Error('Failed to update student');
      }
    } catch (err) {
      console.error('Error updating student:', err);
      Swal.fire('Error!', 'Failed to update student. Please try again.', 'error');
    }
  };

  // Prepare edit form with current student data
  const prepareEditForm = (studentId) => {
    const studentToEdit = studentList.find(student => student.id === studentId);
    if (studentToEdit) {
      setStudentForm({
        name: studentToEdit.student_name,
        age: studentToEdit.student_age,
        address: studentToEdit.student_address,
        contact: studentToEdit.student_contact
      });
      setCurrentStudentId(studentId);
      setShowEditDialog(true);
    }
  };

  // Delete student with confirmation
  const deleteStudent = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const userToken = localStorage.getItem('authToken');
          if (!userToken) {
            Swal.fire('Error!', 'Please login again', 'error');
            goTo('/');
            return;
          }

          await axios.delete(
            `https://student-api.acpt.lk/api/student/delete/${studentId}`,
            { headers: { Authorization: `Bearer ${userToken}` } }
          );

          setStudentList(prevStudents => prevStudents.filter(student => student.id !== studentId));
          Swal.fire('Deleted!', 'Student has been deleted.', 'success');
        } catch (err) {
          console.error('Error deleting student:', err);
          Swal.fire('Error!', 'Failed to delete student', 'error');
        }
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    goTo('/');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading students...</Typography>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Typography color="error" variant="h6" sx={{ mb: 2 }}>{errorMessage}</Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ backgroundColor: 'rgba(242, 186, 29, 1)', color: 'black' }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontFamily: 'Bebas Neue', fontSize: 40 }}>
        MY STUDENTS
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faUserPlus} />}
          onClick={openAddStudentDialog}
          sx={{
            backgroundColor: 'rgba(242, 186, 29, 1)',
            color: 'black',
            borderRadius: 30,
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
        padding: 4,
        width: 1200,
        marginLeft: 12,
      }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'black' }}>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Age</TableCell>
                <TableCell sx={{ color: 'white' }}>Address</TableCell>
                <TableCell sx={{ color: 'white' }}>Contact</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList.length > 0 ? (
                studentList.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.student_name}</TableCell>
                    <TableCell>{student.student_age}</TableCell>
                    <TableCell>{student.student_address}</TableCell>
                    <TableCell>{student.student_contact}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        <IconButton onClick={() => prepareEditForm(student.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteStudent(student.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center' }}>No students found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Student Dialog */}
      <Dialog open={showAddDialog} onClose={closeAddStudentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            ADD STUDENT
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={addStudent}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={studentForm.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={studentForm.age}
                  onChange={handleInputChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={studentForm.address}
                  onChange={handleInputChange}
                  required
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  value={studentForm.contact}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeAddStudentDialog} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={addStudent}
            variant="contained"
            sx={{
              backgroundColor: 'rgba(242, 186, 29, 1)',
              color: 'black',
              borderRadius: 30,
            }}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={showEditDialog} onClose={closeEditStudentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            EDIT STUDENT
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={updateStudent}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={studentForm.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={studentForm.age}
                  onChange={handleInputChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={studentForm.address}
                  onChange={handleInputChange}
                  required
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  value={studentForm.contact}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeEditStudentDialog} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={updateStudent}
            variant="contained"
            sx={{
              backgroundColor: 'rgba(242, 186, 29, 1)',
              color: 'black',
              borderRadius: 30,
            }}
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        onClick={logout}
        sx={{
          backgroundColor: 'rgba(242, 186, 29, 1)',
          color: 'black',
          borderRadius: 30,
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