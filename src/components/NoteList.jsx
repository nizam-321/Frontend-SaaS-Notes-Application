//path: frontend/src/components/NoteList.jsx
export default function NoteList({ notes, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {notes.map((note) => (
        <div key={note._id} className="border p-4 rounded shadow bg-white">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <p className="text-gray-700">{note.content}</p>
          <button
            onClick={() => onDelete(note._id)}
            className="mt-2 text-blue-500 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}