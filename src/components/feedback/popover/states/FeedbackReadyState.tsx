import React from 'react';
import FeedbackCommentState from './FeedbackCommentState';

export default function FeedbackReadyState({
  headerText,
  companyName,
  feedbackText,
  setFeedbackText,
  handleSubmit,
}: {
  headerText: string;
  companyName?: string;
  feedbackText: string;
  setFeedbackText: (value: string) => void;
  handleSubmit: () => void;
}) {
  return (
    <FeedbackCommentState
      headerText={headerText}
      companyName={companyName}
      submittingState={'READY'}
      feedbackText={feedbackText}
      setFeedbackText={setFeedbackText}
      handleSubmit={handleSubmit}
    />
  );
}
