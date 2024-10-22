import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { getTotalEarningsByDay } from "../../config/axios";

const initialBarChartOptions = {
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

  const { secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([{ data: [0, 0, 0, 0, 0, 0, 0] }]);
  const [options, setOptions] = useState(initialBarChartOptions);

  useEffect(() => {
    const fetchEarningsByDay = async () => {
      try {
        const response = await getTotalEarningsByDay();
        const earningsData = response.data;

        // Create a map for quick lookup
        const earningsMap = new Map(
          earningsData.map((item) => [item.dayOfWeek, item.amount])
        );

        // Define the order of days
        const orderedDays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        // Create the ordered earnings array
        const orderedEarnings = orderedDays.map(
          (day) => earningsMap.get(day) || 0
        );

        setSeries([{ data: orderedEarnings }]);

        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: orderedDays.map((day) => day.substring(0, 2)),
          },
        }));
      } catch (error) {
        console.error("Error fetching earnings by day:", error);
      }
    };

    fetchEarningsByDay();
  }, []);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      colors: [info],
      xaxis: {
        ...prevOptions.xaxis,
        labels: {
          style: {
            colors: Array(7).fill(secondary),
          },
        },
      },
    }));
  }, [info, secondary]);

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
