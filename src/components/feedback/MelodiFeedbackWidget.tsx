import React, { useState } from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";

import { saveFeedback } from "../../actions/feedback";
import {
  FeedbackCreateRequest,
  FeedbackType,
} from "../../actions/feedback.types";
import { useMelodiAuthContext } from "../../auth/MelodiAuthProvider";
import { Authentication } from "../../auth/MelodiAuthProvider.types";
import FeedbackPopover from "./FeedbackPopover";
import { MelodiFeedbackWidgetProps } from "./MelodiFeedback.types";

export default function MelodiFeedbackWidget({
  companyName,
  output,
  userInfo,
  metadata,
}: MelodiFeedbackWidgetProps) {
  const authentication = useMelodiAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackType>();

  const handleSubmit = async (
    feedbackType: FeedbackType,
    feedbackText: string
  ) => {
    let didSubmitSucceed = false;
    if (
      !authentication ||
      authentication.status === "LOADING" ||
      authentication.status === "ERROR"
    ) {
      return didSubmitSucceed;
    }
    setIsSubmitting(true);
    if (authentication.status === "LOADED") {
      const feedbackCreateRequest: FeedbackCreateRequest = {
        feedback: {
          feedbackType,
          feedbackText,
        },
        sample: {
          project: "External Feedback Project",
          projectVersion: "Version 1",
          response: output,
          metadata,
        },
        user: userInfo,
      };
      didSubmitSucceed =
        (await saveFeedback(
          feedbackCreateRequest,
          authentication.value as Authentication
        )) != null;
    }

    if (didSubmitSucceed) {
      setSubmittedFeedback(feedbackType);
    }

    setIsSubmitting(false);
    return didSubmitSucceed;
  };

  if (!authentication || !authentication.value || !output) {
    return null;
  }
  return (
    <div id="melodi-feedback-buttons" className="melodi-flex melodi-flex-row">
      <FeedbackPopover
        companyName={companyName}
        feedbackType="POSITIVE"
        headerText="What do you like about this content?"
        popoverActivator={
          <div
            className={`melodi-rounded-full melodi-p-2${
              submittedFeedback === "POSITIVE" ? " melodi-bg-green-100" : ""
            }`}
          >
            <FiThumbsUp />
          </div>
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <FeedbackPopover
        companyName={companyName}
        feedbackType="NEGATIVE"
        headerText="How could this content be improved?"
        popoverActivator={
          <div
            className={`melodi-rounded-full melodi-p-2 ${
              submittedFeedback === "NEGATIVE" ? "  melodi-bg-red-100" : ""
            }`}
          >
            <FiThumbsDown />
          </div>
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
