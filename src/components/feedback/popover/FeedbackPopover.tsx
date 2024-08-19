import { Popover } from '@headlessui/react';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';

import { createFeedback, CreateFeedbackRequest } from '@melodi/melodi-sdk-typescript';
import { useMelodiAuthContext } from '../../../auth/MelodiAuthProvider';
import ReactPortal from '../../portal/ReactPortal';
import { FeedbackPopoverProps } from './FeedbackPopover.types';
import FeedbackErrorState from './states/FeedbackErrorState';
import FeedbackReadyState from './states/FeedbackReadyState';
import FeedbackSubmittingState from './states/FeedbackSubmittingState';
import FeedbackSucessState from './states/FeedbackSuccessState';

type SubmittingState = 'READY' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

export default function FeedbackPopover({
  companyName,
  feedbackType,
  headerText,
  log,
  userInfo,
  renderPopoverActivator,
}: FeedbackPopoverProps) {
  const authContext = useMelodiAuthContext();
  const [submittingState, setSubmittingState] = useState<SubmittingState>('READY');
  const [feedbackText, setFeedbackText] = useState('');
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });

  const handleSubmit = async (feedbackText: string, dismissPopover: () => void) => {
    if (authContext && authContext.apiKey) {
      setSubmittingState('SUBMITTING');
      const createFeedbackRequest: CreateFeedbackRequest = {
        feedbackType,
        feedbackText,
        log,
        externalUser: userInfo,
      };
      const didSubmitSucceed =
        (await createFeedback(createFeedbackRequest, authContext.apiKey)) != null;

      if (didSubmitSucceed) {
        setFeedbackText('');
        setSubmittingState('SUCCESS');

        setTimeout(() => {
          dismissPopover();
        }, 2000);

        return;
      }
    }

    setSubmittingState('ERROR');
  };

  const handleTryAgain = () => {
    setSubmittingState('READY');
  };

  return (
    <Popover className="melodi-relative">
      {({ open }) => (
        <>
          <Popover.Button className="focus-visible:melodi-outline-none" ref={setReferenceElement}>
            {renderPopoverActivator(open, submittingState === 'SUCCESS')}
          </Popover.Button>
          <ReactPortal wrapperId="melodi-feedback-button-portal">
            <Popover.Panel
              className="melodi-mt-2"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              {({ close: dismissPopover }) => (
                <div className="melodi-overflow-hidden melodi-rounded-md melodi-shadow-md melodi-ring-1 melodi-ring-black/5">
                  <div className="melodi-relative melodi-px-4 melodi-py-4 melodi-bg-white melodi-w-96 melodi-min-h-56 melodi-grid melodi-place-items-center">
                    {submittingState === 'READY' && (
                      <FeedbackReadyState
                        headerText={headerText}
                        companyName={companyName}
                        feedbackText={feedbackText}
                        setFeedbackText={setFeedbackText}
                        handleSubmit={() => handleSubmit(feedbackText, dismissPopover)}
                      />
                    )}
                    {submittingState === 'SUBMITTING' && (
                      <FeedbackSubmittingState
                        headerText={headerText}
                        companyName={companyName}
                        feedbackText={feedbackText}
                      />
                    )}
                    {submittingState === 'SUCCESS' && (
                      <FeedbackSucessState dismissPopover={dismissPopover} />
                    )}
                    {submittingState === 'ERROR' && (
                      <FeedbackErrorState handleTryAgain={handleTryAgain} />
                    )}
                  </div>
                </div>
              )}
            </Popover.Panel>
          </ReactPortal>
        </>
      )}
    </Popover>
  );
}
