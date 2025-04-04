import React from "react";
import { Controller } from "react-hook-form";
import { CustomTextField } from "@components/forms/CustomTextField";
import { CustomSelect } from "@components/forms/CustomSelect";
import { CustomDatePicker } from "@components/forms/CustomDatePicker";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const FormFields = ({
  name,
  control,
  rules,
  label,
  type,
  options,
  disabled = false,
  multiline = false,
  rows = 1,
  placeholder,
  InputProps,
  checkboxLabel,
}) => {
  const theme = useTheme();

  const labelStyle = {
    mb: 0.5,
    color: theme.palette.info.indigo,
    fontWeight: 500,
    fontSize: "0.875rem",
    display: "block",
  };

  return (
    <div>
      {type !== "checkbox" && <Typography sx={labelStyle}>{label}</Typography>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          if (type === "select") {
            return (
              <CustomSelect
                {...field}
                options={options}
                fullWidth
                disabled={disabled}
                error={!!error}
                helperText={error?.message}
                placeholder={placeholder}
              />
            );
          }
          if (type === "date") {
            return (
              <CustomDatePicker
                {...field}
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
                error={!!error}
                helperText={error?.message}
              />
            );
          }
          if (type === "checkbox") {
            return (
              <FormControlLabel
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: ["0.9rem", "1rem", "1rem"],
                    color: theme.palette.primary.main,
                  },
                }}
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={field.onChange}
                    sx={{
                      "&.Mui-checked": {
                        color: theme.palette.info.main,
                      },
                    }}
                  />
                }
                label={checkboxLabel || label}
              />
            );
          }
          return (
            <CustomTextField
              {...field}
              type={type}
              fullWidth
              disabled={disabled}
              error={!!error}
              helperText={error?.message}
              multiline={multiline}
              rows={rows}
              placeholder={placeholder}
              InputProps={InputProps}
            />
          );
        }}
      />
    </div>
  );
};
