import React, { Fragment, ReactElement, useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { FiThumbsDown, FiThumbsUp, FiAlertTriangle } from "react-icons/fi";
import { useErrorBoundary } from "use-error-boundary";

import { useMelodiAuthContext } from "../../auth/MelodiAuthProvider";
import { MelodiFeedbackProps } from "./MelodiFeedback.types";
import { saveFeedback } from "../../actions/feedback";
import {
  FeedbackCreateRequest,
  FeedbackTypeValues,
} from "../../actions/feedback.types";

export interface FeedbackButtonProps {
  companyName: string;
  didCatch: boolean;
  feedbackType: FeedbackTypeValues;
  headerText: string;
  onSubmit(
    feedbackType: FeedbackTypeValues,
    feedbackText: string,
    dismissPopover: any
  ): any;
  popoverActivator: ReactElement<any, any>;
  isSubmitting: boolean;
}

const FeedBackPanelErrorState = ({ dismissPopover }: any) => {
  return (
    <div>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
        <FiAlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <h2 className="font-medium text-gray-900 text-xl text-center mt-3">
        Something went wrong.
      </h2>
      <p className="inline-block align-baseline text-xs text-gray-500 text-center font-light">
        The team at Melodi has been notified that an error ocurred.
      </p>
      <button
        type="button"
        className="mt-4 inline-flex w-full justify-center rounded-md bg-white ring-1 ring-inset ring-gray-300 px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50"
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
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const FeedbackButton = ({
  companyName,
  didCatch,
  feedbackType,
  headerText,
  onSubmit,
  popoverActivator,
  isSubmitting,
}: FeedbackButtonProps) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
  });

  const handleClick = (dismissPopover: any) => {
    onSubmit(feedbackType, feedbackText, dismissPopover);
    setFeedbackText("");
  };

  return (
    <Popover className="relative">
      <Fragment>
        <Popover.Button
          className="focus-visible:outline-none"
          // @ts-ignore
          ref={setReferenceElement}
        >
          {popoverActivator}
        </Popover.Button>

        <Popover.Panel
          className="mt-2"
          // @ts-ignore
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {({ close: dismissPopover }) => (
            <div className="overflow-hidden rounded-md shadow-md ring-1 ring-black/5">
              <div className="relative px-4 py-4 bg-white min-w-96 min-h-56 grid place-items-center">
                {!didCatch ? (
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="font-medium text-gray-900">{headerText}</p>
                    </div>
                    <form>
                      <div>
                        <label
                          className="hidden"
                          htmlFor="melodi-add-comment-input"
                        >
                          Comment
                        </label>
                        <textarea
                          className="appearance-none border rounded w-full p-2 text-sm text-gray-700 font-light leading-tight focus:outline-none"
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
                      <div className="flex items-center justify-end mt-2">
                        {companyName ? (
                          <p className="inline-block align-baseline text-xs text-gray-500 font-light mr-4">
                            Comments and associated outputs will be shared with{" "}
                            {companyName}.
                          </p>
                        ) : null}
                        <button
                          className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
                          disabled={isSubmitting}
                          type="button"
                          onClick={() => handleClick(dismissPopover)}
                        >
                          {!isSubmitting ? (
                            <span>Send</span>
                          ) : (
                            <div className="flex flex-row">
                              <FeedbackButtonLoadingIndicator />
                              <span>Sending</span>
                            </div>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <FeedBackPanelErrorState dismissPopover={dismissPopover} />
                )}
              </div>
            </div>
          )}
        </Popover.Panel>
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

  // TODO hook up error reporting by passing object with onDidCatch callback to useErrorBoundary
  // https://www.npmjs.com/package/use-error-boundary#handling-error-and-errorinfo-outside-of-markup
  const { ErrorBoundary, didCatch } = useErrorBoundary();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    feedbackType: FeedbackTypeValues,
    feedbackText: string,
    dismissPopover: any
  ) => {
    if (
      !authentication ||
      authentication.status === "LOADING" ||
      authentication.status === "ERROR"
    ) {
      return;
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
      // @ts-ignore
      await saveFeedback(feedbackCreateRequest, authentication.value);
    }
    setIsSubmitting(false);
    dismissPopover();
  };

  if (!authentication || !authentication.value || !output) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div id="melodi-feedback-buttons" className="flex flex-row">
        <FeedbackButton
          companyName={companyName}
          didCatch={didCatch}
          feedbackType="POSITIVE"
          headerText="What do you like about this content?"
          popoverActivator={
            <div className="rounded-full hover:bg-green-100 p-2">
              <FiThumbsUp />
            </div>
          }
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <FeedbackButton
          companyName={companyName}
          didCatch={didCatch}
          feedbackType="NEGATIVE"
          headerText="How could this content be improved?"
          popoverActivator={
            <div className="rounded-full hover:bg-red-100 p-2">
              <FiThumbsDown />
            </div>
          }
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </ErrorBoundary>
  );
};

export { MelodiFeedback };
