'use client';

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try{
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.text || 'No response');
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
      setResponse('Error fetching response');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-300 rounded"
        placeholder="Ask Gemini something..."
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        aria-label='Ask Gemini'
      >
        Ask Gemini
      </button>
      <p className="mt-6 whitespace-pre-wrap max-w-xl">{response}</p>
    </main>
  );
}
