import React from 'react';
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material"
import GroupIcon from '@mui/icons-material/Group'
import SensorsIcon from '@mui/icons-material/Sensors'
import ReceiptIcon from '@mui/icons-material/Receipt'
import {useNavigate} from "react-router-dom";
import {Outlet} from "react-router";
const CustomerIcon = GroupIcon

function Home() {
    const navigate = useNavigate();
    const drawerWidth = 240
    const NavBarItems = [
        {
            text: "Customers",
            icon: <CustomerIcon />,
            path: "customers"
        },
        {
            text: "Devices",
            icon: <SensorsIcon />,
            path: "devices"
        },
        {
            text: "Bills",
            icon: <ReceiptIcon />,
            path: "bills"
        }
    ]

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
              >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                  <List>
                    {NavBarItems.map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Box>
          </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </>
    );
}

export default Home;