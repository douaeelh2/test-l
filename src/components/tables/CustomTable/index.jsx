import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { CustomTextField } from "@/components/forms/CustomTextField";
import { CustomButton } from "src/components/tables/CustomButton";
import { CustomPagination } from "@/components/tables/CustomPagination";
import CustomTableContainer from "@/components/tables/CustomTableContainer";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TableHeader } from "@/components/tables/TableHeader";

import PropTypes from "prop-types";
import useTheme from "@mui/material/styles/useTheme";

export const CustomTable = ({
  columns,
  data,
  renderRow,
  totalCount,
  searchQuery,
  handleSearchChange,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onCreateClick,
  createButtonLabel,
  searchPlaceholder,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: { xs: 2, sm: 0 },
          mb: 3,
        }}
      >
        <CustomTextField
          name="search"
          label=""
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: 250 },
            maxWidth: "350px",
          }}
        />
        <CustomButton
          buttonMsg={createButtonLabel}
          onClick={onCreateClick}
          showIcon={true}
        />
      </Box>

      <CustomTableContainer>
        <Box>
          <Table
            sx={{
              "& .MuiTableCell-root": {
                "&:first-of-type": {
                  borderLeft: `1px solid ${theme.palette.info.lightblue}`,
                  borderTopLeft: "10px",
                  borderBottomLeft: "10px",
                },
                "&:last-child": {
                  borderRight: `1px solid ${theme.palette.info.lightblue}`,
                  borderTopRight: "10px",
                  borderBottomRight: "10px",
                },
                borderTop: `1px solid ${theme.palette.info.lightblue}`,
                borderBottom: `1px solid ${theme.palette.info.lightblue}`,
                borderRight: "1px solid transparent",
                borderLeft: "1px solid transparent",
              },
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            <TableHeader columns={columns} />
            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  fontSize: ["14px", "15px", "16px"],
                },
              }}
            >
              {data.map(item => renderRow(item))}
            </TableBody>
          </Table>
        </Box>
      </CustomTableContainer>
      <CustomPagination
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onNext={() =>
          handleChangePage(
            null,
            Math.min(page + 1, Math.ceil(totalCount / rowsPerPage) - 1)
          )
        }
        onPrevious={() => handleChangePage(null, Math.max(page - 1, 0))}
      />
    </Box>
  );
};

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "center", "right"]),
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired,
  createButtonLabel: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
};
