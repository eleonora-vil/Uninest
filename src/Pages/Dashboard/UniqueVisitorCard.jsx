import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainCard from "../../components/MainCard";
import IncomeAreaChart from "./IncomeAreaChart";
import useUniqueVisitorTracker from "../../hooks/useVisitorTracking";

export default function UniqueVisitorCard() {
  const [slot, setSlot] = useState("week");
  const uniqueVisitors = useUniqueVisitorTracker();

  const totalVisitors =
    slot === "week"
      ? uniqueVisitors.daily.reduce((sum, day) => sum + day.y, 0)
      : uniqueVisitors.monthly;

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5" color="white">
            Unique Visitor
          </Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot("month")}
              color={slot === "month" ? "primary" : "secondary"}
              variant={slot === "month" ? "outlined" : "text"}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setSlot("week")}
              color={slot === "week" ? "primary" : "secondary"}
              variant={slot === "week" ? "outlined" : "text"}
            >
              Week
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <Typography variant="h6" color="textSecondary">
            {slot === "week" ? "Weekly" : "Monthly"} Unique Visitors:{" "}
            {totalVisitors}
          </Typography>
          <IncomeAreaChart slot={slot} uniqueVisitors={uniqueVisitors} />
        </Box>
      </MainCard>
    </>
  );
}
