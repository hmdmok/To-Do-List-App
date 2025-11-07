'use client'
import { Grid, Box } from '@mui/material'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
import Dashboard2 from './components/dashboard/Dashboard'

const Dashboard = () => {
  return (
    <PageContainer title='Dashboard' description='this is Dashboard'>
      <Box>
       
          <Grid
            size={{
              xs: 16,
              lg: 12,
            }}>
            <Dashboard2 />
          </Grid>
           
        
      </Box>
    </PageContainer>
  )
}

export default Dashboard
