import React, { useState } from 'react';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

import { saveFeedback } from '../../actions/feedback';
import { FeedbackCreateRequest, FeedbackType } from '../../actions/feedback.types';
import { useMelodiAuthContext } from '../../auth/MelodiAuthProvider';
import { Authentication } from '../../auth/MelodiAuthProvider.types';
import FeedbackPopover from './FeedbackPopover';
import { MelodiFeedbackWidgetProps } from './MelodiFeedback.types';

export function MelodiFeedbackWidget({
  companyName,
  output,
  userInfo,
  metadata,
}: MelodiFeedbackWidgetProps) {
  const authentication = useMelodiAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackType>();

  const handleSubmit = async (feedbackType: FeedbackType, feedbackText: string) => {
    let didSubmitSucceed = false;
    if (
      !authentication ||
      authentication.status === 'LOADING' ||
      authentication.status === 'ERROR'
    ) {
      return didSubmitSucceed;
    }
    setIsSubmitting(true);
    if (authentication.status === 'LOADED') {
      const feedbackCreateRequest: FeedbackCreateRequest = {
        feedback: {
          feedbackType,
          feedbackText,
        },
        sample: {
          project: 'External Feedback Project',
          projectVersion: 'Version 1',
          response: output,
          metadata,
        },
        user: userInfo,
      };
      didSubmitSucceed =
        (await saveFeedback(feedbackCreateRequest, authentication.value as Authentication)) != null;
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
        renderPopoverActivator={(open) => (
          <div
            className={`melodi-rounded-full melodi-p-2${
              open || submittedFeedback === 'POSITIVE' ? ' melodi-bg-green-100' : ''
            }`}
          >
            <FiThumbsUp className="melodi-stroke-gray-500 hover:melodi-stroke-gray-700" />
          </div>
        )}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <FeedbackPopover
        companyName={companyName}
        feedbackType="NEGATIVE"
        headerText="How could this content be improved?"
        renderPopoverActivator={(open) => (
          <div
            className={`melodi-rounded-full melodi-p-2 ${
              open || submittedFeedback === 'NEGATIVE' ? '  melodi-bg-red-100' : ''
            }`}
          >
            <FiThumbsDown className="melodi-stroke-gray-500 hover:melodi-stroke-gray-700" />
          </div>
        )}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
