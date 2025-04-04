import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import PropTypes from "prop-types";

export const TableHeader = ({ columns }) => {
  const theme = useTheme();

  return (
    <TableHead>
      <TableRow
        sx={{
          "& th:first-of-type": {
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
          },
          "& th:last-of-type": {
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
          },
          "& .MuiTableCell-root": {
            fontSize: "14px !important",
            fontWeight: "bold",
          },
        }}
      >
        {columns.map(({ key, label, align }) => (
          <TableCell
            key={`table-cell-${key}`}
            sx={{
              bgcolor: theme.palette.info.light,
              color: theme.palette.primary.main,
            }}
            align={align || "left"}
          >
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "center", "right"]),
    })
  ).isRequired,
};

export default TableHeader;
