//path: frontend/src/components/NoteForm.jsx
import { useState } from 'react';
import { useTenant } from '../context/TenantContext';

export default function NoteForm({ token, onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const { noteLimitReached } = useTenant();

  const handleCreateNote = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        onNoteCreated(data.note);
        setTitle('');
        setContent('');
        setTags('');
      } else {
        setError(data.message || 'Note creation failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  if (noteLimitReached) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
        <p>You’ve reached the note limit for the free plan.</p>
        <p className="mt-2"><strong>Upgrade to Pro</strong> for unlimited notes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleCreateNote} className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Title"
        className="w-full border px-3 py-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full border px-3 py-2 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full border px-3 py-2 rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Create Note
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}