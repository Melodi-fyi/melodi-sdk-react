import React, { useContext, useState } from "react";
import "../../../styles/button.css";
import { MelodiFeedbackContext } from "../../context/MelodiFeedbackContext";
import FeedbackModal from "../modal/FeedbackModal";
import { FeedbackButtonProps } from "./FeedbackButton.types";

export function FeedbackButton(props: FeedbackButtonProps) {
  const context = useContext(MelodiFeedbackContext);
  const [modalOpen, setModalOpen] = useState(false);

  const accessToken = context.accessToken;

  if (!accessToken || !props.output) {
    return null;
  }

  return (
    <>
      <button
        className="melodi-feedback-button"
        disabled={props.disabled}
        onClick={() => setModalOpen(true)}
      >
        {props.buttonText || "Feedback"}
      </button>
      <FeedbackModal
        handleClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        response={props.output}
      />
    </>
  );
}
