import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormControl, FormHelperText } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export const CustomDatePicker = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  ...props
}) => {
  const theme = useTheme();

  const customSx = {
    "& .MuiInputLabel-root": {
      display: "none",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "& fieldset": {
        borderRadius: "8px",
        borderColor: theme.palette.info.indigo,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
      fontSize: "15px",
      color: theme.palette.primary.main,
    },
    "& .MuiInputBase-input": {
      "&::placeholder": {
        color: "gray",
        opacity: 1,
      },
    },
    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: theme.palette.info.indigo,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <FormControl
        fullWidth
        size="small"
        error={error}
        sx={{ position: "relative" }}
      >
        <DatePicker
          id={name}
          name={name}
          label=""
          value={value}
          onChange={onChange}
          disabled={disabled}
          minDate={dayjs()}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              placeholder: placeholder,
              error: !!error,
              sx: customSx,
            },
            popper: {
              sx: {
                "& .MuiPaper-root": {
                  borderRadius: "8px",
                },
              },
            },
            day: {
              sx: {
                "&.Mui-selected": {
                  backgroundColor: "#303167 !important",
                  "&:hover": {
                    backgroundColor: "#303167 !important",
                  },
                },
                borderRadius: "8px",
              },
            },
          }}
          {...props}
        />
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  );
};

CustomDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(dayjs),
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
};
