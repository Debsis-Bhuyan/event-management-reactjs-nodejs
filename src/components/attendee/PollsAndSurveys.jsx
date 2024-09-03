import React, { useState } from 'react';

function PollsAndSurveys() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Polls & Surveys</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p>What do you think of the event?</p>
          <label className="block">
            <input
              type="radio"
              name="feedback"
              value="Great"
              checked={selectedOption === 'Great'}
              onChange={handleOptionChange}
            />
            Great
          </label>
          <label className="block">
            <input
              type="radio"
              name="feedback"
              value="Good"
              checked={selectedOption === 'Good'}
              onChange={handleOptionChange}
            />
            Good
          </label>
          <label className="block">
            <input
              type="radio"
              name="feedback"
              value="Average"
              checked={selectedOption === 'Average'}
              onChange={handleOptionChange}
            />
            Average
          </label>
          <label className="block">
            <input
              type="radio"
              name="feedback"
              value="Poor"
              checked={selectedOption === 'Poor'}
              onChange={handleOptionChange}
            />
            Poor
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={isSubmitted}
        >
          {isSubmitted ? 'Submitted' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default PollsAndSurveys;
