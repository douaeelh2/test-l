"use client";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import { CustomButton } from "@components/tables/CustomButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import React from "react";
import TableButton from "../TableButton";
import PropTypes from "prop-types";
import { useTranslations } from "next-intl";

export const LicenseRow = ({
  licence,
  isExpanded,
  onToggleExpand,
  onEdit,
  onExtend,
  onDelete,
  onHistory,
}) => {
  const theme = useTheme();
  const t = useTranslations("licenses.form");

  return (
    <TableRow
      sx={{
        borderRadius: "10px",
        bgcolor: isExpanded ? theme.palette.info.light : "white",
        boxShadow: isExpanded
          ? `0px 4px 10px ${theme.palette.info.lightblue2}`
          : "1px 1px 1px rgba(0, 0, 0, 0.05)",
        border: isExpanded
          ? `1px solid ${theme.palette.primary.light}`
          : "none",
        transition: "all 0.3s ease-in-out",
        "&:hover": { bgcolor: theme.palette.info.light },
        "& td:first-of-type": {
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: isExpanded ? "0px" : "10px",
        },
        "& td:last-of-type": {
          borderTopRightRadius: "10px",
          borderBottomRightRadius: isExpanded ? "0px" : "10px",
        },
        height: "65px",
      }}
    >
      <TableCell>
        <TableButton
          onClick={onToggleExpand}
          icon={
            isExpanded ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )
          }
          bgColor={theme.palette.info.main}
          color="white"
        />
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        <strong>{licence.name}</strong>
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {licence.type}
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {licence.params}
      </TableCell>
      <TableCell sx={{ color: theme.palette.primary.main }}>
        {licence.creationDate}
      </TableCell>
      <TableCell align="right">
        {!licence.disabled && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <CustomButton
              buttonMsg={t("extendButton")}
              onClick={onExtend}
              variant="secondary"
            />
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
            <TableButton
              icon={<HistoryIcon fontSize="small" />}
              color={theme.palette.primary.main}
              bgColor={theme.palette.info.light}
              onClick={onHistory}
            />
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};

LicenseRow.propTypes = {
  licence: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    params: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onExtend: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onHistory: PropTypes.func.isRequired,
};
