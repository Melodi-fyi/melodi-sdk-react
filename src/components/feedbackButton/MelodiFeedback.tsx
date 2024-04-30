import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { FiThumbsDown, FiThumbsUp, FiAlertTriangle } from "react-icons/fi";

import { useMelodiAuthContext } from "../../auth/MelodiAuthProvider";
import {
  MelodiFeedbackProps,
  FeedbackButtonProps,
} from "./MelodiFeedback.types";
import { saveFeedback } from "../../actions/feedback";
import {
  FeedbackCreateRequest,
  FeedbackTypeValues,
} from "../../actions/feedback.types";
import { Authentication } from "../../auth/MelodiAuthProvider.types";

const portalElement = document.createElement("div");
portalElement.setAttribute("id", "melodi-feedback-portal");
document.body.appendChild(portalElement);

const FeedBackPanelErrorState = ({ dismissPopover }: any) => {
  return (
    <div>
      <div className="melodi-mx-auto melodi-flex melodi-h-12 melodi-w-12 melodi-items-center melodi-justify-center melodi-rounded-full melodi-bg-red-50">
        <FiAlertTriangle className="melodi-h-6 melodi-w-6 melodi-text-red-600" />
      </div>
      <h2 className="melodi-font-medium melodi-text-gray-900 melodi-text-xl melodi-text-center melodi-mt-3">
        Something went wrong.
      </h2>
      <p className="melodi-inline-block melodi-align-baseline melodi-text-xs melodi-text-gray-500 melodi-text-center melodi-font-light">
        The team at Melodi has been notified that an error ocurred.
      </p>
      <button
        type="button"
        className="melodi-mt-4 melodi-inline-flex melodi-w-full melodi-justify-center melodi-rounded-md melodi-bg-white melodi-ring-1 melodi-ring-inset melodi-ring-gray-300 melodi-px-3 melodi-py-2 melodi-text-sm melodi-font-semibold melodi-text-gray-900  hover:melodi-bg-gray-50"
        onClick={() => dismissPopover()}
      >
        Close
      </button>
    </div>
  );
};

const FeedbackButtonLoadingIndicator = () => {
  return (
    <svg
      className="melodi-animate-spin -melodi-ml-1 melodi-mr-3 melodi-h-5 melodi-w-5 melodi-text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="melodi-opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="melodi-opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const FeedbackButton = ({
  companyName,
  feedbackType,
  headerText,
  onSubmit,
  popoverActivator,
  isSubmitting,
}: FeedbackButtonProps) => {
  const [didFailToSubmit, setDidFailToSubmit] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
  });

  const handleClick = async (dismissPopover: any) => {
    const didSubmitSucceed = await onSubmit(feedbackType, feedbackText);
    if (didSubmitSucceed) {
      dismissPopover();
    } else {
      setDidFailToSubmit(true);
    }
    setFeedbackText("");
  };

  const handleWarningClick = (dismissPopover: any) => {
    setDidFailToSubmit(false);
    dismissPopover();
  };

  return (
    <Popover className="melodi-relative">
      <Fragment>
        <Popover.Button
          className="focus-visible:melodi-outline-none"
          // @ts-ignore
          ref={setReferenceElement}
        >
          {popoverActivator}
        </Popover.Button>
        {createPortal(
          <Popover.Panel
            className="melodi-mt-2"
            // @ts-ignore
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {({ close: dismissPopover, open: openPopover }) => (
              <div className="melodi-overflow-hidden melodi-rounded-md melodi-shadow-md melodi-ring-1 melodi-ring-black/5">
                <div className="melodi-relative melodi-px-4 melodi-py-4 melodi-bg-white melodi-w-96 melodi-min-h-56 melodi-grid melodi-place-items-center">
                  {!didFailToSubmit ? (
                    <div className="melodi-w-full">
                      <div className="melodi-mb-2">
                        <p className="melodi-font-medium melodi-text-gray-900">
                          {headerText}
                        </p>
                      </div>
                      <form>
                        <div>
                          <label
                            className="melodi-hidden"
                            htmlFor="melodi-add-comment-input"
                          >
                            Comment
                          </label>
                          <textarea
                            className="melodi-appearance-none melodi-border melodi-rounded melodi-w-full melodi-p-2 melodi-text-sm melodi-text-gray-700 melodi-font-light melodi-leading-tight focus:melodi-outline-none"
                            id="melodi-add-comment-input"
                            placeholder="Add a comment..."
                            onChange={(
                              event: React.ChangeEvent<HTMLTextAreaElement>
                            ) => {
                              setFeedbackText(event.target.value);
                            }}
                            rows={5}
                            value={feedbackText}
                          />
                        </div>
                        <div className="melodi-flex melodi-items-center melodi-justify-end melodi-mt-2">
                          {companyName ? (
                            <p className="melodi-inline-block melodi-align-baseline melodi-text-xs melodi-text-gray-500 melodi-font-light melodi-mr-4">
                              Comments and associated outputs will be shared
                              with {companyName}.
                            </p>
                          ) : (
                            <p className="melodi-inline-block melodi-align-baseline melodi-text-xs melodi-text-gray-500 melodi-font-light melodi-mr-4">
                              Comments and associated data will be shared upon
                              submission.
                            </p>
                          )}
                          <button
                            className="melodi-bg-gray-900 hover:melodi-bg-gray-800 melodi-text-white melodi-font-bold melodi-py-2 melodi-px-4 melodi-rounded-md melodi-focus:outline-none"
                            disabled={isSubmitting}
                            type="button"
                            onClick={() => handleClick(dismissPopover)}
                          >
                            {!isSubmitting ? (
                              <span>Send</span>
                            ) : (
                              <div className="melodi-flex melodi-flex-row">
                                <FeedbackButtonLoadingIndicator />
                                <span>Sending</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <FeedBackPanelErrorState
                      dismissPopover={() => handleWarningClick(dismissPopover)}
                    />
                  )}
                </div>
              </div>
            )}
          </Popover.Panel>,
          document.getElementById("melodi-feedback-portal") as Element
        )}
      </Fragment>
    </Popover>
  );
};

const MelodiFeedback = ({
  companyName,
  output = "",
  userInfo,
}: MelodiFeedbackProps) => {
  const authentication = useMelodiAuthContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    feedbackType: FeedbackTypeValues,
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
        },
        user: userInfo,
      };
      didSubmitSucceed =
        (await saveFeedback(
          feedbackCreateRequest,
          authentication.value as Authentication
        )) != null;
    }

    setIsSubmitting(false);
    return didSubmitSucceed;
  };

  if (!authentication || !authentication.value || !output) {
    return null;
  }
  return (
    <div id="melodi-feedback-buttons" className="melodi-flex melodi-flex-row">
      <FeedbackButton
        companyName={companyName}
        feedbackType="POSITIVE"
        headerText="What do you like about this content?"
        popoverActivator={
          <div className="melodi-rounded-full hover:melodi-bg-green-100 melodi-p-2">
            <FiThumbsUp />
          </div>
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <FeedbackButton
        companyName={companyName}
        feedbackType="NEGATIVE"
        headerText="How could this content be improved?"
        popoverActivator={
          <div className="melodi-rounded-full hover:melodi-bg-red-100 melodi-p-2">
            <FiThumbsDown />
          </div>
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export { MelodiFeedback };
