import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NumericFormat } from "react-number-format";
import Dot from "../../components/@extended/Dot";
import { getRecentTransactions } from "../../config/axios";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "transactionId",
    align: "left",
    disablePadding: false,
    label: "Transaction ID",
  },
  {
    id: "username",
    align: "left",
    disablePadding: true,
    label: "Username",
  },
  {
    id: "status",
    align: "left",
    disablePadding: false,
    label: "Status",
  },
  {
    id: "createDate",
    align: "left",
    disablePadding: false,
    label: "Create Date",
  },
  {
    id: "amount",
    align: "right",
    disablePadding: false,
    label: "Amount",
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status, isDate = false }) {
  if (isDate) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };
    return <Typography>{formatDate(status)}</Typography>;
  }
  let color;
  let title;

  switch (status.toLowerCase()) {
    case "active":
      color = "success";
      title = "PAID";
      break;
    case "pending":
      color = "warning";
      title = "PENDING";
      break;
    case "cancelled":
      color = "error";
      title = "CANCELLED";
      break;
    default:
      color = "primary";
      title = status;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("transactionId");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getRecentTransactions();
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to fetch transactions");
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(transactions, getComparator(order, orderBy)).map(
              (row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    tabIndex={-1}
                    key={row.transactionId}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      <Link color="secondary">{row.transactionId}</Link>
                    </TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>
                      <OrderStatus status={row.status} />
                    </TableCell>
                    <TableCell>
                      <OrderStatus status={row.createDate} isDate={true} />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        value={row.amount}
                        displayType="text"
                        thousandSeparator
                        suffix=" VNĐ"
                        decimalScale={0}
                        fixedDecimalScale
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };
OrderStatus.propTypes = { status: PropTypes.string };
