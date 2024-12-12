import { useState } from 'react';

export default function Questions() {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !question) {
      setStatus('Please enter your name and question.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xbljewne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, question }),
      });

      if (response.ok) {
        setStatus('Question submitted successfully!');
        setName('');
        setQuestion('');
      } else {
        setStatus('Failed to submit question.');
      }
    } catch (error) {
      setStatus('An error occurred.');
    }
  };

  return (
    <div>
      <h1>Submit a Question</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit">Submit Question</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
