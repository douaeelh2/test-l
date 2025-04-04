import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useTheme from "@mui/material/styles/useTheme";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import PropTypes from "prop-types";

export const PreviousLicenseRow = ({ previousLicense }) => {
  const theme = useTheme();

  return (
    <TableRow
      sx={{
        bgcolor: theme.palette.info.light,
        "& td:first-of-type": {
          borderBottomLeftRadius: "10px",
        },
        "& td:last-of-type": {
          borderBottomRightRadius: "10px",
        },
        "& .MuiTableCell-root": {
          borderTop: `1px solid transparent`,
        },
        transition: "all 0.3s ease-in-out",
        height: "65px",
        position: "relative",
        top: "-8px",
      }}
    >
      <TableCell />
      <TableCell sx={{ color: theme.palette.primary.main }}>
        <IconButton
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            width: "18px",
            height: "18px",
            padding: "10px",
            marginRight: "10px",
            marginBottom: "3px",
            "&:hover": { bgcolor: theme.palette.primary.main },
          }}
        >
          <StarIcon sx={{ fontSize: "15px" }} />
        </IconButton>
        <strong>{previousLicense.name}</strong>
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {previousLicense.type}
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {previousLicense.params}
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {previousLicense.creationDate}
      </TableCell>
      <TableCell />
    </TableRow>
  );
};

PreviousLicenseRow.propTypes = {
  previousLicense: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
  }).isRequired,
  onToggleExpand: PropTypes.func.isRequired,
};
