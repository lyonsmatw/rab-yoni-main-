import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import '../styles/globals.css'; // Use existing global styles

export default function RabbiChat() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize OpenAI API
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use environment variable for security
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse('');
    setLoading(true);

    try {
      const aiResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful Rabbi who provides answers based on Jewish teachings.' },
          { role: 'user', content: question },
        ],
      });

      setResponse(aiResponse.data.choices[0].message.content);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Ask the AI Rabbi</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Ask your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Getting Response...' : 'Ask the Rabbi'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response">
          <h3>Answer:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
