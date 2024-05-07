import React from 'react';
import FeedbackCommentState from './FeedbackCommentState';

export default function FeedbackSubmittingState({
  headerText,
  companyName,
  feedbackText,
}: {
  headerText: string;
  companyName?: string;
  feedbackText: string;
}) {
  return (
    <FeedbackCommentState
      headerText={headerText}
      companyName={companyName}
      submittingState={'SUBMITTING'}
      feedbackText={feedbackText}
      setFeedbackText={() => {}}
      handleSubmit={() => {}}
    />
  );
}
