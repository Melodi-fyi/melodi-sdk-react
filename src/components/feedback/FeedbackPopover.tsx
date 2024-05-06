import { Popover } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { usePopper } from 'react-popper';

import ReactPortal from '../portal/ReactPortal';
import FeedbackError from './FeedbackError';
import FeedbackLoadingIndicator from './FeedbackLoadingIndicator';
import { FeedbackPopoverProps } from './MelodiFeedback.types';

export default function FeedbackPopover({
  companyName,
  feedbackType,
  headerText,
  onSubmit,
  popoverActivator,
  isSubmitting,
}: FeedbackPopoverProps) {
  const [didFailToSubmit, setDidFailToSubmit] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });

  const handleClick = async (dismissPopover: () => void) => {
    const didSubmitSucceed = await onSubmit(feedbackType, feedbackText);
    if (didSubmitSucceed) {
      setDidFailToSubmit(false);
      dismissPopover();
      setFeedbackText('');
    } else {
      setDidFailToSubmit(true);
    }
  };

  const handleTryAgain = () => {
    setDidFailToSubmit(false);
  };

  return (
    <Popover className="melodi-relative">
      <Fragment>
        <Popover.Button className="focus-visible:melodi-outline-none" ref={setReferenceElement}>
          {popoverActivator}
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
                  {!didFailToSubmit ? (
                    <div className="melodi-w-full">
                      <div className="melodi-mb-2">
                        <p className="melodi-font-medium melodi-text-gray-900">{headerText}</p>
                      </div>
                      <form>
                        <div>
                          <label className="melodi-hidden" htmlFor="melodi-add-comment-input">
                            Comment
                          </label>
                          <textarea
                            className="melodi-appearance-none melodi-border melodi-rounded melodi-w-full melodi-p-2 melodi-text-sm melodi-text-gray-700 melodi-font-light melodi-leading-tight focus:melodi-outline-none"
                            id="melodi-add-comment-input"
                            placeholder="Add a comment..."
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                              setFeedbackText(event.target.value);
                            }}
                            rows={5}
                            value={feedbackText}
                          />
                        </div>
                        <div className="melodi-flex melodi-items-center melodi-justify-end melodi-mt-2">
                          {companyName ? (
                            <p className="melodi-inline-block melodi-align-baseline melodi-text-xs melodi-text-gray-500 melodi-font-light melodi-mr-4">
                              Comments and associated outputs will be shared with {companyName}.
                            </p>
                          ) : (
                            <p className="melodi-inline-block melodi-align-baseline melodi-text-xs melodi-text-gray-500 melodi-font-light melodi-mr-4">
                              Comments and associated data will be shared upon submission.
                            </p>
                          )}
                          <button
                            className="melodi-bg-gray-900 hover:melodi-bg-gray-800 melodi-text-white melodi-font-bold melodi-py-2 melodi-px-4 melodi-rounded-md melodi-focus:outline-none"
                            disabled={isSubmitting}
                            type="button"
                            onClick={() => handleClick(dismissPopover)}
                          >
                            {!isSubmitting ? (
                              <span>Sumbit</span>
                            ) : (
                              <div className="melodi-flex melodi-flex-row">
                                <FeedbackLoadingIndicator />
                                <span>Sending</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <FeedbackError dismissPopover={handleTryAgain} />
                  )}
                </div>
              </div>
            )}
          </Popover.Panel>
        </ReactPortal>
      </Fragment>
    </Popover>
  );
}
