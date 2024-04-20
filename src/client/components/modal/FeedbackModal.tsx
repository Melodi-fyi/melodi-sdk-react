import React, { useEffect } from "react";
import "../../../styles/melodi.css";
import ReactPortal from "./ReactPortal";

function Modal({
  children,
  isOpen,
  handleClose,
}: {
  children: any;
  isOpen: boolean;
  handleClose: () => void;
}) {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="melodi-portal-modal-container">
      <div className="melodi-feedback-modal">
        <button onClick={handleClose} className="close-btn">
          Close
        </button>
        <div className="melodi-feedback-modal-content">{children}</div>
      </div>
    </ReactPortal>
  );
}
export default Modal;
