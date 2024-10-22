// material-ui
import React, { useState, useEffect } from "react";

// import AvatarGroup from "@mui/material/AvatarGroup";
// import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project import
import MainCard from "../../components/MainCard";
import AnalyticEcommerce from "../../components/cards/statistics/AnalyticEcommerce";
import MonthlyBarChart from "./MonthlyBarChart";
// import ReportAreaChart from "./ReportAreaChart";
import UniqueVisitorCard from "./UniqueVisitorCard";
// import SaleReportCard from "./SaleReportCard";
import OrdersTable from "./OrdersTable";
import FooterComponent from "../../components/Footer/Footer";
import AppHeader from "../../components/Header/Header";
import {
  getTotalUsersCount,
  getTotalPostsCount,
  getTotalEarnings,
  getTotalTransactions,
} from "../../config/axios";
import NewUserList from "./NewUser";
// assets

const drawerWidth = 0; // Add this at the top of your file or component

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalEarnings: 0,
    totalTransactions: 0,
  });

  // Fetch Total Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          usersResponse,
          postsResponse,
          earningsResponse,
          transationsResponse,
        ] = await Promise.all([
          getTotalUsersCount(),
          getTotalPostsCount(),
          getTotalEarnings(),
          getTotalTransactions(),
        ]);

        setDashboardData({
          totalUsers: usersResponse.data.totalUsers,
          totalPosts: postsResponse.data.totalPosts,
          totalEarnings: earningsResponse.data.totalEarnings,
          totalTransactions: transationsResponse.data.totalTransactions,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#14335c",
      }}
    >
      <AppHeader />
      <Box sx={{ display: "flex", flex: 1, paddingTop: "64px" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: `${drawerWidth}px`,
            marginBottom: "64px", // Height of the FooterComponent
            overflowY: "auto",
          }}
        >
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
              <Typography variant="h5" color="white">
                Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticEcommerce
                title="Total Users"
                count={dashboardData.totalUsers.toString()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticEcommerce
                title="Total Posts"
                count={dashboardData.totalPosts.toString()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticEcommerce
                title="Total Transcations"
                count={dashboardData.totalTransactions.toString()}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AnalyticEcommerce
                title="Total Earnings"
                count={`${dashboardData.totalEarnings.toFixed(2)} VNĐ`}
              />
            </Grid>

            <Grid
              item
              md={8}
              sx={{ display: { sm: "none", md: "block", lg: "none" } }}
            />

            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
              <UniqueVisitorCard />
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5" color="white">
                    Income Overview
                  </Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <Box sx={{ p: 3, pb: 0 }}>
                  <Stack spacing={2}>
                    <Typography variant="h6" color="text.secondary">
                      This Week Statistics
                    </Typography>
                    {/* <Typography variant="h3">$7,650</Typography> */}
                  </Stack>
                </Box>
                <MonthlyBarChart />
              </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={12} md={7} lg={8}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5" color="white">
                    Recent Transaction
                  </Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <OrdersTable />
              </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h5" color="white">
                    New Users
                  </Typography>
                </Grid>
                <Grid item />
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <NewUserList />
              </MainCard>
            </Grid>

            {/* row 4 */}
            {/* <Grid item xs={12} md={7} lg={8}>
              <SaleReportCard />
            </Grid> */}
          </Grid>
        </Box>
      </Box>
      <FooterComponent />
    </Box>
  );
}
