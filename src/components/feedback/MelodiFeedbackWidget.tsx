import React from 'react';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

import { useMelodiAuthContext } from '../../auth/MelodiAuthProvider';
import { MelodiFeedbackWidgetProps } from './MelodiFeedbackWidget.types';
import FeedbackPopover from './popover/FeedbackPopover';

export function MelodiFeedbackWidget(props: MelodiFeedbackWidgetProps) {
  const authContext = useMelodiAuthContext();

  if (!authContext || !authContext.apiKey) {
    return null;
  }

  return (
    <div id="melodi-feedback-buttons" className="melodi-flex melodi-flex-row">
      <FeedbackPopover
        {...{
          ...props,
          feedbackType: 'positive',
          headerText: 'What do you like about this content?',
          renderPopoverActivator: (open: boolean, submitted: boolean) => (
            <div
              className={`melodi-rounded-full melodi-p-2${
                open || submitted ? ' melodi-bg-green-100' : ''
              }`}
            >
              <FiThumbsUp className="melodi-stroke-gray-500 hover:melodi-stroke-gray-700" />
            </div>
          ),
        }}
      />
      <FeedbackPopover
        {...{
          ...props,
          feedbackType: 'negative',
          headerText: 'How could this content be improved?',
          renderPopoverActivator: (open, submitted) => (
            <div
              className={`melodi-rounded-full melodi-p-2 ${
                open || submitted ? '  melodi-bg-red-100' : ''
              }`}
            >
              <FiThumbsDown className="melodi-stroke-gray-500 hover:melodi-stroke-gray-700" />
            </div>
          ),
        }}
      />
    </div>
  );
}
