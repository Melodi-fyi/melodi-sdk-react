import React from 'react';

export default function FeedbackSucessState({ dismissPopover }: { dismissPopover: () => void }) {
  return (
    <div>
      <h2 className="melodi-font-medium melodi-text-gray-900 melodi-text-xl melodi-text-center melodi-mt-3">
        Thanks for your feedback.
      </h2>
      <button
        type="button"
        className="melodi-mt-4 melodi-inline-flex melodi-w-full melodi-justify-center melodi-rounded-md melodi-bg-white melodi-ring-1 melodi-ring-inset melodi-ring-gray-300 melodi-px-3 melodi-py-2 melodi-text-sm melodi-font-semibold melodi-text-gray-900  hover:melodi-bg-gray-50"
        onClick={() => dismissPopover()}
      >
        Close
      </button>
    </div>
  );
}
