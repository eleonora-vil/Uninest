import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Stack,
  Typography,
} from "@mui/material";
import { getRecentUsers } from "../../config/axios"; // Make sure to create this function in your API file

// Assuming you have these styles defined
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

function NewUserList() {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await getRecentUsers(5); // Fetch 3 recent users
        setRecentUsers(response.data);
      } catch (error) {
        console.error("Error fetching recent users:", error);
      }
    };

    fetchRecentUsers();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Function to get a random color for the avatar
  const getRandomColor = () => {
    const colors = [
      "primary",
      "secondary",
      "error",
      "warning",
      "info",
      "success",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <List
      component="nav"
      sx={{
        px: 0,
        py: 0,
        "& .MuiListItemButton-root": {
          py: 1.5,
          "& .MuiAvatar-root": avatarSX,
          "& .MuiListItemSecondaryAction-root": {
            ...actionSX,
            position: "relative",
          },
        },
      }}
    >
      {recentUsers.map((user, index) => {
        const color = getRandomColor();
        return (
          <ListItemButton
            key={index}
            divider={index !== recentUsers.length - 1}
          >
            <ListItemAvatar>
              <Avatar
                src={user.avatarUrl}
                sx={{
                  color: `${color}.main`,
                  bgcolor: `${color}.lighter`,
                }}
              >
                {user.fullName.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{user.fullName}</Typography>
              }
              secondary={formatDate(user.createDate)}
            />
            <ListItemSecondaryAction>
              <Stack alignItems="flex-end"></Stack>
            </ListItemSecondaryAction>
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default NewUserList;
