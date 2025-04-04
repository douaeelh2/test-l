import React, { useId } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const CustomSelect = ({
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  helperText,
}) => {
  const theme = useTheme();
  const labelId = useId();

  return (
    <FormControl
      fullWidth
      size="small"
      error={error}
      sx={{
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
        "& .MuiSelect-icon": {
          color: theme.palette.info.indigo,
        },
      }}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        displayEmpty
        IconComponent={props => <KeyboardArrowDownIcon {...props} />}
        renderValue={selected => {
          if (!selected || selected === "") {
            return <em style={{ color: "gray" }}>{placeholder}</em>;
          }
          return (
            options.find(option => option.value === selected)?.label || selected
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
            },
          },
        }}
        variant="outlined"
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};
