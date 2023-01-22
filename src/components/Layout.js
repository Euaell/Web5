import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';
import { useNavigate } from "react-router-dom";
import useStateContext from '../hooks/useStateContext';
import {createAPIEndpoint, ENDPOINTS} from "../api";

export default function Layout() {
    const {resetUser} = useStateContext();
    const navigate = useNavigate();

    const logout = () => {
        resetUser();
        createAPIEndpoint(ENDPOINTS.user.get.logout)
            .fetch()
            .then(res => {
                console.log(res.data);
                navigate("/login");
            })
            .catch(err => console.log(err));
    }

  return (
      <>
      <AppBar position='sticky'>
          <Toolbar sx={{width: 640, m: "auto"}}>
              <Typography
                variant='h4'
                align='center'
                sx={{flexGrow: 1}}>
                  Central Water Management System
              </Typography>
              <Button sx={{color: "red"}} onClick={logout}>Logout</Button>
          </Toolbar>
      </AppBar>
      <Outlet />
      </>
      
      
  )
}
