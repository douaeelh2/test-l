import useTheme from "@mui/material/styles/useTheme";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import PropTypes from "prop-types";
import { CustomButton } from "@components/tables/CustomButton";

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  confirmColor,
  itemName,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "500px",
          borderRadius: "12px",
          backgroundColor: "white",
        },
      }}
    >
      <DialogTitle sx={{ padding: "16px 24px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color={confirmColor} fontWeight="bold">
            {title}
          </Typography>
          <IconButton edge="end" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: "30px 30px",
          backgroundColor: "white",
          color: theme.palette.primary.main,
        }}
      >
        <Typography>
          {message} <strong>{itemName}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ mb: 2, padding: "0 30px" }}>
        <CustomButton buttonMsg={cancelText} onClick={onClose} variant="text" />

        <CustomButton
          buttonMsg={confirmText}
          onClick={onConfirm}
          variant="primary"
          bgcolor={confirmColor}
        />
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  itemName: PropTypes.string,
};
