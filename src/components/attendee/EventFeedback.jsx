import React, { useState } from 'react';

function EventFeedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback });
    alert('Thank you for your feedback!');
    setRating(0);
    setFeedback('');
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Event Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Rate the Event</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 && 's'}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about the event..."
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default EventFeedback;
