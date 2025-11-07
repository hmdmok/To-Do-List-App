import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Paper,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface TaskListProps {
  tasks: any[];
  loading: boolean;
  selectedTasks: number[];
  onTaskSelect: (id: number) => void;
  onEditTask: (task: any) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  selectedTasks,
  onTaskSelect,
  onEditTask,
  onDeleteTask
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={8}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper 
        sx={{ 
          textAlign: 'center', 
          py: 8, 
          bgcolor: 'background.paper',
          boxShadow: 1 
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first task to get started!
        </Typography>
      </Paper>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <List sx={{ bgcolor: 'background.paper', p: 0 }}>
        {tasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <ListItem
              sx={{
                px: 3,
                py: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                borderBottom: index !== tasks.length - 1 ? 1 : 0,
                borderColor: 'divider'
              }}
            >
              {/* Checkbox for selection */}
              <ListItemIcon sx={{ minWidth: 48 }}>
                <Checkbox
                  edge="start"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => onTaskSelect(task.id)}
                  color="primary"
                />
              </ListItemIcon>

              {/* Task content */}
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        ...(task.is_completed && {
                          textDecoration: 'line-through',
                          color: 'text.disabled'
                        })
                      }}
                    >
                      {task.title}
                    </Typography>
                    {task.is_completed && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Completed"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    {task.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {task.description}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      <Typography variant="caption" color="text.secondary">
                        Created: {formatDate(task.created_at)}
                      </Typography>
                      {task.updated_at && task.updated_at !== task.created_at && (
                        <Typography variant="caption" color="text.secondary">
                          Updated: {formatDate(task.updated_at)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                }
              />

              {/* Action buttons */}
              <ListItemSecondaryAction sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Edit task">
                  <IconButton
                    onClick={() => onEditTask(task)}
                    color="primary"
                    size="medium"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete task">
                  <IconButton
                    onClick={() => onDeleteTask(task.id)}
                    color="error"
                    size="medium"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            {index !== tasks.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;