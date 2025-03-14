import React, { useEffect, useState } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from "@toolpad/core";
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import { TextField, InputAdornment, Button, Box, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate } from 'react-router-dom';  // Redirect ke liye
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Leads from './Leads';

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'leads', title: 'Leads', icon: <LeaderboardIcon/> },
  

  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  { 
    segment: 'reports', 
    title: 'Reports', 
    icon: <ReportIcon />, 
    children: [
      { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath);
  return React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height: height,
  content: '" "',
}));

function Dashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();  // Redirect hook

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Logout user
  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token"); // Remove token
    navigate("/Login"); // Redirect to login page
    console.log('remove token');
  };
  
    // Check if the token exists on component mount

  // Protect Route 
  
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
  // Redirect to login if no token is not found 
      navigate('/Login');
    }
  },[navigate]);
  
   // Check if the token exists on component mount
  
  const renderPageContent = () => {
    switch (router.pathname) {
        case '/leads':
          return <Leads/>;
          case '/Dashboard':
      default:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} marginBottom={10}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Skeleton height={50} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={10} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={8}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={10} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
         {/* Logout Button */}
      <Box 
          display="flex" 
          justifyContent="flex-end"
          alignItems="center"
          px={5} 
          py={1} 
          bgcolor="background.default"
          
        >

          <Button 
            variant="contained" 
            color="error" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
        {/* Logout Button */}
        

        <PageContainer>{renderPageContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default Dashboard;
