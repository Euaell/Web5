import {AppBar, Box, Button, CssBaseline, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';
import { useNavigate } from "react-router-dom";
import useStateContext from '../hooks/useStateContext';
import {createAPIEndpoint, ENDPOINTS} from "../api";

export default function Layout() {
    const { user, resetUser, resetToken } = useStateContext();
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/home")
    }
    const logout = () => {
        createAPIEndpoint(ENDPOINTS.user.get.logout)
            .fetch()
            .then(res => {
                resetToken()
                resetUser()
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
              <Toolbar sx={{m: "auto", width: "100%" }}>

                  <Typography
                    variant='h4'
                    align='left'
                    sx={{
                        flexGrow: 0,
                        m: 2,
                    }}
                  >
                      C.W.M. System
                  </Typography>
                  <Button
                        variant='contained'
                        color='secondary'
                        align='left'
                        onClick={goHome}
                    >
                        Home
                  </Button>
                  <Typography
                        align='right'
                        sx={{
                            flexGrow: 1,
                            m: 2,
                        }}
                  >
                      Hello, {user?.name}
                  </Typography>

                  <Button variant={'contained'} color={'inherit'} sx={{color: "red"}} onClick={logout}>Logout</Button>
              </Toolbar>
          </AppBar>
          <Outlet />
      </Box>
      
      
  )
}
