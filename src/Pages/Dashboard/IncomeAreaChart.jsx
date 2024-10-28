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
        type: "datetime",
        labels: {
          style: {
            colors: Array(12).fill(secondary),
          },
          format: "dd MMM",
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
        x: {
          format: "dd MMM yyyy",
        },
      },
    }));
  }, [secondary, line, theme, slot]);

  useEffect(() => {
    if (slot === "week") {
      setSeries([
        {
          name: "Unique Visitors",
          data: uniqueVisitors.daily,
        },
      ]);
    } else {
      // For monthly view, we'll simulate data as we don't have actual monthly breakdown
      const monthlyData = Array.from({ length: 30 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - 29 + index);
        return {
          x: date.toISOString().split("T")[0],
          y: Math.floor(Math.random() * uniqueVisitors.monthly),
        };
      });
      setSeries([
        {
          name: "Unique Visitors",
          data: monthlyData,
        },
      ]);
    }
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
    daily: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.string,
        y: PropTypes.number,
      })
    ),
    weekly: PropTypes.number,
    monthly: PropTypes.number,
  }),
};
