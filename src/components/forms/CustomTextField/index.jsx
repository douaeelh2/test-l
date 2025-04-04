import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";

export const CustomTextField = ({
  name,
  label,
  value,
  onChange,
  multiline = false,
  rows = 1,
  placeholder = "",
  InputProps = {},
  type = "text",
  sx = {},
  ...otherProps
}) => {
  const theme = useTheme();

  return (
    <TextField
      sx={{
        color: theme.palette.primary.main,
        "& .MuiOutlinedInput-root": {
          borderRadius: "7px",
          "& fieldset": {
            borderRadius: "7px",
            borderColor: theme.palette.info.indigo,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
          fontSize: "15px",
          color: theme.palette.primary.main,
        },
        ...sx,
      }}
      fullWidth
      name={name}
      label={label}
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      InputProps={InputProps}
      type={type}
      {...otherProps}
    />
  );
};

CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string.isRequired,
  InputProps: PropTypes.object,
  type: PropTypes.string,
  sx: PropTypes.object,
};
