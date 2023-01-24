import {AppBar, Box, Button, CssBaseline, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';
import { useNavigate } from "react-router-dom";
import useStateContext from '../hooks/useStateContext';
import {createAPIEndpoint, ENDPOINTS} from "../api";

export default function Layout() {
    const {resetUser} = useStateContext();
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/home")
    }
    const logout = () => {
        resetUser();
        createAPIEndpoint(ENDPOINTS.user.get.logout)
            .fetch()
            .then(res => {
                navigate("/login");
            })
            .catch(err => console.log(err));
    }

  return (
      <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position='fixed'
                  sx={{ zIndex: (theme) => theme.zIndex.drawer + 3 }}
          >
              <Toolbar sx={{width: 640, m: "auto"}}>
                  <Typography
                    variant='h4'
                    align='center'
                    sx={{flexGrow: 2}}>
                      C.W.M. System
                  </Typography>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={goHome}
                    >
                        Home
                    </Button>
                  <Button sx={{color: "red"}} onClick={logout}>Logout</Button>
              </Toolbar>
          </AppBar>
          <Outlet />
      </Box>
      
      
  )
}
