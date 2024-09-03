import React, { useState } from "react";
import axios from "axios";

const FeedbackDialogBox = ({ token, eventId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    // try {
    //   const response = await axios.post(`/api/feedback`, {
    //     userId,
    //     eventId,
    //     message,
    //   });

    //   if (response.status === 200) {
    //     setSuccess("Feedback submitted successfully!");
    //     setMessage("");
    //     closeDialog();
    //   }
    // } catch (error) {
    //   setError("Failed to submit feedback. Please try again.");
    // }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openDialog}
      >
        Give Feedback
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Submit Feedback</h2>

            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your feedback..."
              value={message}
              onChange={handleMessageChange}
            />

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}

            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackDialogBox;
