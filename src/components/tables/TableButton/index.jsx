import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

const TableButton = ({ onClick, icon, color, bgColor }) => {
  return (
    <IconButton
      size="small"
      sx={{
        bgcolor: bgColor,
        color: color,
        width: "30px",
        height: "30px",
        transition: "all 0.3s ease-in-out",
        "&:hover": { bgcolor: bgColor, opacity: 0.7 },
      }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  );
};

export default TableButton;

TableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};
