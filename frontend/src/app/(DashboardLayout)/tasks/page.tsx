"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskSelection } from '../../../../store/slices/taskSlice';
import TaskForm from '../../../../components/tasks/TaskForm';
import TaskList from '../../../../components/tasks/TaskList';
import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  Snackbar,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const TasksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, selectedTasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreateTask = async (taskData: any) => {
    try {
      await dispatch(createTask(taskData)).unwrap();
      setShowForm(false);
      showSnackbar('Task created successfully!');
    } catch (error) {
      showSnackbar('Failed to create task', 'error');
    }
  };

  const handleUpdateTask = async (id: number, taskData: any) => {
    try {
      await dispatch(updateTask({ id, taskData })).unwrap();
      setEditingTask(null);
      showSnackbar('Task updated successfully!');
    } catch (error) {
      showSnackbar('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      setDeleteDialogOpen(false);
      showSnackbar('Task deleted successfully!');
    } catch (error) {
      showSnackbar('Failed to delete task', 'error');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const taskId of selectedTasks) {
        await dispatch(deleteTask(taskId)).unwrap();
      }
      setDeleteAllDialogOpen(false);
      showSnackbar(`${selectedTasks.length} tasks deleted successfully!`);
    } catch (error) {
      showSnackbar('Failed to delete tasks', 'error');
    }
  };

  const openDeleteDialog = (taskId: number) => {
    setEditingTask(tasks.find(task => task.id === taskId));
    setDeleteDialogOpen(true);
  };

  const openDeleteAllDialog = () => {
    if (selectedTasks.length > 0) {
      setDeleteAllDialogOpen(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Task Management
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Manage your tasks efficiently
            </Typography>
          </Grid>
          <Grid >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {selectedTasks.length > 0 && (
                <>
                  <Chip
                    label={`${selectedTasks.length} selected`}
                    color="primary"
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={openDeleteAllDialog}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Delete Selected
                  </Button>
                </>
              )}
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowForm(true)}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)'
                  }
                }}
              >
                Add New Task
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && tasks.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={8}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        /* Task List */
        <TaskList
          tasks={tasks}
          loading={loading}
          selectedTasks={selectedTasks}
          onTaskSelect={(id: number) => dispatch(toggleTaskSelection(id))}
          onEditTask={setEditingTask}
          onDeleteTask={openDeleteDialog}
        />
      )}

      {/* Task Forms */}
      <TaskForm
        open={showForm}
        onSubmit={handleCreateTask}
        onCancel={() => setShowForm(false)}
      />

      <TaskForm
        open={!!editingTask && !deleteDialogOpen}
        task={editingTask}
        onSubmit={(data: any) => handleUpdateTask(editingTask.id, data)}
        onCancel={() => setEditingTask(null)}
      />

      {/* Delete Single Task Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task "{editingTask?.title}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={() => editingTask && handleDeleteTask(editingTask.id)} 
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Multiple Tasks Dialog */}
      <Dialog
        open={deleteAllDialogOpen}
        onClose={() => setDeleteAllDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Multiple Tasks</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedTasks.length} selected tasks? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAllDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteSelected} 
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete {selectedTasks.length} Tasks
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TasksPage;