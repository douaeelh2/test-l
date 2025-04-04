import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";

import React from "react";

const CustomTableContainer = ({ children }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        border: "none",
        boxShadow: "none",
        flexDirection: "column",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          height: "8px",
          width: "8px",
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
          borderRadius: "4px",
        },
      }}
    >
      {children}
    </TableContainer>
  );
};

export default CustomTableContainer;
