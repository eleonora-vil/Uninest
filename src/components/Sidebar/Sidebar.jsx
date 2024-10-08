import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApprovalIcon from "@mui/icons-material/Approval";

const drawerWidth = 240;

const DashboardSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Approve Posts",
      icon: <ApprovalIcon />,
      path: "/dashboard/approve-posts",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      ></Box>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            top: 64, // Height of the AppHeader
            height: "calc(100% - 64px)", // Subtract AppHeader height
            paddingBottom: "64px", // Height of the FooterComponent
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default DashboardSidebar;
