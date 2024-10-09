import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { getTotalEarningsByDay } from "../../config/axios"; // Update the import path as needed

const barChartOptions = {
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};

export default function MonthlyBarChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([{ data: [0, 0, 0, 0, 0, 0, 0] }]);
  const [options, setOptions] = useState(barChartOptions);

  useEffect(() => {
    const fetchEarningsByDay = async () => {
      try {
        const response = await getTotalEarningsByDay();
        const earningsData = response.data;

        // Sort the data to ensure it's in the correct order (Sunday to Saturday)
        const sortedData = earningsData.sort((a, b) => {
          const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          return days.indexOf(a.day) - days.indexOf(b.day);
        });

        const earnings = sortedData.map((item) => item.totalEarnings);
        setSeries([{ data: earnings }]);

        setOptions((prevState) => ({
          ...prevState,
          xaxis: {
            ...prevState.xaxis,
            categories: sortedData.map((item) => item.day.substring(0, 2)),
          },
        }));
      } catch (error) {
        console.error("Error fetching earnings by day:", error);
      }
    };

    fetchEarningsByDay();
  }, []);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        ...prevState.xaxis,
        labels: {
          style: {
            colors: Array(7).fill(secondary),
          },
        },
      },
    }));
  }, [primary, info, secondary]);

  return (
    <Box id="chart" sx={{ bgcolor: "transparent" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={365}
      />
    </Box>
  );
}
