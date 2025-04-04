import React from "react";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import useTheme from "@mui/material/styles/useTheme";
import TableButton from "@components/tables/TableButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export const LicenseTypeRow = ({ licenseType, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <TableRow
      sx={{
        borderRadius: "10px",
        "&:hover": { bgcolor: theme.palette.info.light },
        "& td:first-of-type": {
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        },
        "& td:last-of-type": {
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        },
        transition: "all 0.3s ease-in-out",
        height: "65px",
      }}
    >
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {licenseType.name}
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {licenseType.paramCount}
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {licenseType.createdAt}
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <TableButton
            icon={<EditOutlinedIcon fontSize="small" />}
            color={theme.palette.primary.main}
            bgColor={theme.palette.info.light}
            onClick={onEdit}
          />
          <TableButton
            icon={<CloseIcon fontSize="small" />}
            color={theme.palette.secondary.main}
            bgColor={theme.palette.info.light}
            onClick={onDelete}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

LicenseTypeRow.propTypes = {
  licenseType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    paramCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
