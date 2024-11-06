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
  Pagination,
} from "@mui/material";
import { getRecentUsers } from "../../config/axios"; // Ensure this function exists in your API file

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust the number of items per page

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await getRecentUsers(); // Fetch all users initially
        setRecentUsers(response.data);
      } catch (error) {
        console.error("Error fetching recent users:", error);
      }
    };

    fetchRecentUsers();
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(recentUsers.length / itemsPerPage);

  // Get the users for the current page
  const currentUsers = recentUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
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
        {currentUsers.map((user, index) => {
          const color = getRandomColor();
          return (
            <ListItemButton
              key={index}
              divider={index !== currentUsers.length - 1}
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
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
}

export default NewUserList;
