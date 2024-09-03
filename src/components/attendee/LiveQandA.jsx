import React, { useState } from 'react';

function LiveQandA() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: Date.now(), text: newQuestion }]);
      setNewQuestion('');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Live Q&A</h2>
      <form onSubmit={handleQuestionSubmit}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="border rounded p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Question
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Submitted Questions</h3>
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="p-2 border-b last:border-b-0">
              {question.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LiveQandA;
