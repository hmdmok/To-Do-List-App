'use client'
import { Grid, Box } from '@mui/material'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
// components
import ProfitExpenses from '@/app/(DashboardLayout)/components/dashboard/ProfitExpenses'
import TrafficDistribution from '@/app/(DashboardLayout)/components/dashboard/TrafficDistribution'
import UpcomingSchedules from '@/app/(DashboardLayout)/components/dashboard/UpcomingSchedules'
import TopPayingClients from '@/app/(DashboardLayout)/components/dashboard/TopPayingClients'
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog'
import ProductSales from '@/app/(DashboardLayout)/components/dashboard/ProductSales'
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
