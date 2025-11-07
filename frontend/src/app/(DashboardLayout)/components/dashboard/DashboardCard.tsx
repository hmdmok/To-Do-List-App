import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: number;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, color }) => {
  return (
    <Card 
      sx={{ 
        minWidth: 200,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
      elevation={2}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <Chip 
            label={value}
            sx={{
              backgroundColor: color,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              height: 32,
              '& .MuiChip-label': {
                px: 1.5,
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;