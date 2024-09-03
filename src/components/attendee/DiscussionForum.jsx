import React, { useState } from 'react';

function DiscussionForum() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState('');

  const handleThreadSubmit = (e) => {
    e.preventDefault();
    if (newThread.trim()) {
      setThreads([...threads, { id: Date.now(), text: newThread }]);
      setNewThread('');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Discussion Forum</h2>
      <form onSubmit={handleThreadSubmit}>
        <input
          type="text"
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
          placeholder="Start a discussion..."
          className="border rounded p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Thread
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Discussion Threads</h3>
        <ul>
          {threads.map((thread) => (
            <li key={thread.id} className="p-2 border-b last:border-b-0">
              {thread.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DiscussionForum;
