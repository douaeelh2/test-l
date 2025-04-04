import React from "react";
import PropTypes from "prop-types";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import useTheme from "@mui/material/styles/useTheme";

export const CustomPagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  onNext,
  onPrevious,
  rowsPerPageOptions = [5, 10, 25],
}) => {
  const t = useTranslations();
  const totalPages = Math.ceil(count / rowsPerPage);
  const hidePageNumbers = totalPages === 1;
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-between"
      gap={{ xs: 2, md: 0 }}
      sx={{ my: 3 }}
    >
      <Box display="flex" alignItems="center">
        <Typography
          variant="body2"
          color={theme.palette.primary.main}
          sx={{ mr: 1 }}
        >
          {t("common.pagination.rowsPerPage")} :
        </Typography>
        <FormControl size="small">
          <Select
            value={rowsPerPage}
            onChange={event =>
              onRowsPerPageChange(parseInt(event.target.value, 10))
            }
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.info.indigo,
                borderRadius: "8px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
              },
              fontSize: "14px",
              color: theme.palette.primary.main,
            }}
          >
            {rowsPerPageOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        {!hidePageNumbers && (
          <Button
            size="small"
            disabled={page === 0}
            onClick={() => onPrevious(page)}
            sx={{ textTransform: "none", mx: 1 }}
          >
            {t("common.actions.previousPage")}
          </Button>
        )}

        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, newPage) => onPageChange(event, newPage - 1)}
          color="primary"
          hideNextButton
          hidePrevButton
          sx={{
            "& .MuiPaginationItem-page": {
              borderRadius: "8px",
              margin: "0 4px",
              shape: "square",
            },
          }}
        />

        {!hidePageNumbers && (
          <Button
            size="small"
            disabled={page + 1 === totalPages}
            onClick={() => onNext(page)}
            sx={{ textTransform: "none", mx: 1 }}
          >
            {t("common.actions.nextPage")}
          </Button>
        )}
      </Box>

      <Typography
        variant="body2"
        color={theme.palette.primary.main}
        sx={{ mt: { xs: 1, md: 0 } }}
      >
        {t("common.pagination.rowsPerPage")}:{" "}
        {count === 0 ? 0 : page * rowsPerPage + 1} -{" "}
        {Math.min((page + 1) * rowsPerPage, count)} {t("common.pagination.of")}{" "}
        {count}
      </Typography>
    </Box>
  );
};

CustomPagination.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
