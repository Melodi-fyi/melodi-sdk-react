import React, { useContext, useEffect, useState } from "react";
import { saveFeedback } from "../../../actions/feedback";
import {
  FeedbackCreateRequest,
  UserInfo,
} from "../../../actions/feedback.types";
import "../../../styles/modal.css";
import { MelodiFeedbackContext } from "../../context/MelodiFeedbackContext";
import ReactPortal from "./ReactPortal";

export default function FeedbackModal({
  isOpen,
  response,
  handleClose,
  userInfo,
}: {
  isOpen: boolean;
  response: string;
  handleClose: () => void;
  userInfo?: UserInfo;
}) {
  const context = useContext(MelodiFeedbackContext);
  const [feedbackType, setFeedbackType] = useState<"POSITIVE" | "NEGATIVE">();

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  async function handleSubmit() {
    const authentication = context.authentication;

    if (authentication && response && feedbackType) {
      const feedbackCreateRequest: FeedbackCreateRequest = {
        feedback: {
          feedbackType,
          feedbackText: "Sent from external api",
        },
        sample: {
          project: "External Feedback Project",
          projectVersion: "Version 1",
          response,
        },
        user: userInfo || context.userInfo,
      };

      await saveFeedback(feedbackCreateRequest, authentication);

      handleClose();
    }
  }

  return (
    <ReactPortal wrapperId="melodi-portal-modal-container">
      <div className="melodi-feedback-modal">
        <button onClick={handleClose} className="close-btn">
          Close
        </button>
        <div className="melodi-feedback-modal-content">
          <h2>Please provide your feedback on the selected text</h2>
          <p>{response}</p>
          <input
            type="radio"
            value="POSITIVE"
            onChange={() => setFeedbackType("POSITIVE")}
          />
          <label>Thumbs Up</label>
          <br />
          <input
            type="radio"
            value="NEGATIVE"
            onChange={() => setFeedbackType("NEGATIVE")}
          />
          <label>Thumbs Down</label>
          <br />
          <button onClick={handleSubmit}>Submit Feedback</button>
        </div>
      </div>
    </ReactPortal>
  );
}
