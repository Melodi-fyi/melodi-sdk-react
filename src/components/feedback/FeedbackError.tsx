import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export default function FeedbackError({ dismissPopover }: { dismissPopover: () => void }) {
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
        Try again
      </button>
    </div>
  );
}
