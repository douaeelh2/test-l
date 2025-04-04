import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

function CustomMenu({
  anchorEl,
  onClose,
  id,
  items,
  onItemClick,
  selectedKey,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  transformOrigin = { vertical: "top", horizontal: "right" },
}) {
  const theme = useTheme();

  const menuStyle = {
    "& .MuiPaper-root": {
      border: `1px solid ${theme.palette.primary.light}`,
      borderRadius: "8px",
      transition: "all 0.3s ease-in-out",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      mt: 1.5,
      color: theme.palette.primary.main,
    },
  };

  const handleItemClick = item => {
    if (onItemClick) {
      onItemClick(item);
    }
    onClose();
  };

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      open={Boolean(anchorEl)}
      onClose={onClose}
      keepMounted
      sx={menuStyle}
    >
      {items.map(item => (
        <MenuItem
          key={item.key}
          onClick={() => handleItemClick(item)}
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.info.secondary,
            },
            transition: "all 0.3s ease-in-out",
            backgroundColor:
              selectedKey === item.key
                ? theme.palette.info.secondary
                : "transparent",
          }}
        >
          {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
          <Typography
            textAlign="center"
            sx={{
              fontWeight: item.bold ? "bold" : "normal",
              fontSize: item.fontSize || "16px",
            }}
          >
            {item.label}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default CustomMenu;
