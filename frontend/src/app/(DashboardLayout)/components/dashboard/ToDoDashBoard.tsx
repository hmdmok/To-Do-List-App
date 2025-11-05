'use client'
import React, { useEffect, useState } from 'react';
import { taskService, DashboardStats } from '../../../../../services/taskService';
import DashboardCard from '../shared/DashboardCard';
import { Box, Chip, TableCell, TableRow, Typography } from '@mui/material';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await taskService.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <DashboardCard title='Dashboard'>
 <TableRow key={'11'}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {'Total Tasks'}
                    </Typography>
                 
                <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: 'Highlight',
                        color: "#fff",
                      }}
                      size="small"
                      label={stats?.total_tasks || 0}
                    >

                                            
                      
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {'Completed Tasks'}
                    </Typography>
                 
                <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: 'Highlight',
                        color: "#fff",
                      }}
                      size="small"
                      label={stats?.completed_tasks || 0}
                    >

                                            
                      
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {'Deleted Tasks'}
                    </Typography>
                 
                <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: 'Highlight',
                        color: "#fff",
                      }}
                      size="small"
                      label={stats?.deleted_tasks || 0}
                    >

                                            
                      
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: "800",
                      }}
                      padding={"15px"}
                    >
                      {'Updated Tasks'}
                    </Typography>
                 
                <Chip
                      sx={{
                        px: "40px",
                        backgroundColor: 'Highlight',
                        color: "#fff",
                      }}
                      size='medium'
                      style={{fontSize:"18px"}}
                      label={stats?.deleted_tasks || 0}
                    >

                                            
                      
                    </Chip>
                  </TableCell>
                 
                </TableRow>      
      
    </DashboardCard>
  );
};

export default DashboardPage;