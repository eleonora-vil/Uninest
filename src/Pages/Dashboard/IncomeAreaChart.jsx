import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";

const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

export default function IncomeAreaChart({ slot, uniqueVisitors }) {
  const theme = useTheme();

  const { secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main],
      xaxis: {
        categories:
          slot === "month"
            ? [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: {
          style: {
            colors: Array(12).fill(secondary),
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === "month" ? 11 : 7,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
    }));
  }, [secondary, line, theme, slot]);

  useEffect(() => {
    const uniqueVisitorData =
      slot === "month"
        ? Array.from({ length: 12 }, () =>
            Math.floor(
              (uniqueVisitors.monthly / 12) * (0.8 + Math.random() * 0.4)
            )
          )
        : Array.from({ length: 7 }, () =>
            Math.floor(
              (uniqueVisitors.weekly / 7) * (0.8 + Math.random() * 0.4)
            )
          );

    setSeries([
      {
        name: "Unique Visitors",
        data: uniqueVisitorData,
      },
    ]);
  }, [slot, uniqueVisitors]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  );
}

IncomeAreaChart.propTypes = {
  slot: PropTypes.string,
  uniqueVisitors: PropTypes.shape({
    daily: PropTypes.number,
    weekly: PropTypes.number,
    monthly: PropTypes.number,
  }),
};
