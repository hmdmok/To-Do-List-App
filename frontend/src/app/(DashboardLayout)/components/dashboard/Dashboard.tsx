import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { taskService, DashboardStats } from '../../../../../services/taskService';
import DashboardCard from './DashboardCard';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await taskService.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of your task statistics
        </Typography>
      </Box>

      {/* Stats Cards Grid */}
      <Grid container spacing={3}>
        <Grid >
          <DashboardCard 
            title="Total Tasks" 
            value={stats?.total_tasks || 0} 
            color="#1976d2" 
          />
        </Grid>
        <Grid >
          <DashboardCard 
            title="Completed Tasks" 
            value={stats?.completed_tasks || 0} 
            color="#2e7d32" 
          />
        </Grid>
        <Grid >
          <DashboardCard 
            title="Deleted Tasks" 
            value={stats?.deleted_tasks || 0} 
            color="#d32f2f" 
          />
        </Grid>
        <Grid >
          <DashboardCard 
            title="Updated Tasks" 
            value={stats?.updated_tasks || 0} 
            color="#ed6c02" 
          />
        </Grid>
      </Grid>

      {/* Additional Dashboard Content */}
      {stats && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid >
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {stats.total_tasks > 0 
                  ? `${Math.round((stats.completed_tasks / stats.total_tasks) * 100)}%`
                  : '0%'
                }
              </Typography>
            </Paper>
          </Grid>
          <Grid >
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Active Tasks
              </Typography>
              <Typography variant="h3" color="secondary" fontWeight="bold">
                {stats.total_tasks - stats.completed_tasks}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;