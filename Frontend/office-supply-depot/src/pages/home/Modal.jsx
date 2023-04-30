import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  borderRadius: "20px",
  // padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <CloseIcon
          onClick={onClose}
          fontSize="large"
          sx={{ float: "right", margin: "5px 5px 0 0", cursor: "pointer" }}
        />
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
