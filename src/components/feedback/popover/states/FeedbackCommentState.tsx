import React from 'react';
import FeedbackLoadingIndicator from '../../FeedbackLoadingIndicator';

export default function FeedbackCommentState({
  headerText,
  companyName,
  submittingState,
  feedbackText,
  setFeedbackText,
  handleSubmit,
}: {
  headerText: string;
  companyName?: string;
  submittingState: 'READY' | 'SUBMITTING';
  feedbackText: string;
  setFeedbackText: (value: string) => void;
  handleSubmit: () => void;
}) {
  return (
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
            disabled={submittingState === 'SUBMITTING'}
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
            disabled={submittingState === 'SUBMITTING'}
            type="button"
            onClick={handleSubmit}
          >
            {submittingState !== 'SUBMITTING' ? (
              <span>Submit</span>
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
  );
}
