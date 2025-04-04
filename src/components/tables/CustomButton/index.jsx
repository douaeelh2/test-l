import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import React from "react";
import { useTheme } from "@mui/material/styles";

const commonStyles = theme => ({
  textTransform: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease-in-out",
});

const defaultWidth = { xs: "100%", sm: "auto" };

const Button_variants = {
  primary: {
    variant: "contained",
    sx: (theme, color, bgcolor, width) => ({
      ...commonStyles(theme),
      fontSize: ["13px", "14px", "15px"],
      bgcolor: bgcolor || theme.palette.primary.main,
      color: color || "white",
      width: width || defaultWidth,
      "&:hover": {
        bgcolor: bgcolor || theme.palette.primary.main,
        opacity: 0.7,
      },
    }),
  },
  text: {
    variant: "text",
    sx: (theme, color, bgcolor, width) => ({
      ...commonStyles(theme),
      fontSize: ["13px", "14px", "15px"],
      color: color || theme.palette.primary.main,
      width: width || defaultWidth,
      fontWeight: "bold",
    }),
  },
  secondary: {
    size: "small",
    sx: (theme, color, bgcolor, width) => ({
      ...commonStyles(theme),
      fontSize: "13px",
      bgcolor: bgcolor || theme.palette.info.light,
      color: color || theme.palette.primary.main,
      width: width || defaultWidth,
      fontWeight: "bold",
      "&:hover": { bgcolor: theme.palette.primary.light },
      minWidth: "75px",
    }),
  },
  outlined: {
    variant: "outlined",
    sx: (theme, color, bgcolor, width) => ({
      ...commonStyles(theme),
      fontSize: ["13px", "14px", "15px"],
      borderColor: color || theme.palette.primary.main,
      color: color || theme.palette.primary.main,
      width: width || defaultWidth,
      fontWeight: "bold",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
      },
    }),
  },
};

export const CustomButton = ({
  buttonMsg,
  onClick,
  variant = "primary",
  showIcon = false,
  icon: IconComponent = AddIcon,
  color,
  bgcolor,
  width,
  ...rest
}) => {
  const theme = useTheme();
  const variantProps = Button_variants[variant] || Button_variants.primary;

  return (
    <Button
      onClick={onClick}
      startIcon={showIcon ? <IconComponent /> : null}
      {...variantProps}
      sx={{
        ...variantProps.sx(theme, color, bgcolor, width),
        ...rest.sx,
      }}
      {...rest}
    >
      {buttonMsg}
    </Button>
  );
};

CustomButton.propTypes = {
  buttonMsg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "text",
    "secondary",
    "outlined",
    "textHover",
  ]),
  showIcon: PropTypes.bool,
  icon: PropTypes.elementType,
  color: PropTypes.string,
  bgcolor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
