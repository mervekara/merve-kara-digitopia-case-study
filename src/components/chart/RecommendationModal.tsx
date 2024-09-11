import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecommendationModal: React.FC<{ selectedRecommendation: any, closeModal: () => void, setDates: (start: string, end: string) => void }> = ({ selectedRecommendation, closeModal, setDates }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    setDates(startDate, endDate);
    closeModal();
  };

  return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 sm:p-6 rounded-lg w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Set Dates for {selectedRecommendation.topicRecommendation.recommendation}
      </h2>

      <label className="block mb-2">Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded-md w-full"
      />

      <label className="block mt-4 mb-2">End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded-md w-full"
      />

      <div className="flex justify-end mt-6">
        <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded mr-2">
          Cancel
        </button>
        <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">
          Ok
        </button>
      </div>
    </div>
  </div>
  );
};

export default RecommendationModal;
