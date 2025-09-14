//path: frontend/src/pages/Dashboard.jsx
// import { useEffect, useState } from 'react';
// import { useTenant } from '../context/TenantContext';
// import NoteForm from '../components/NoteForm';
// import NoteList from '../components/NoteList';

// export default function Dashboard() {
//   const [notes, setNotes] = useState([]);
//   const [error, setError] = useState('');
//   const token = localStorage.getItem('token');
//   const { setTenantPlan, setNoteLimitReached } = useTenant();

//   useEffect(() => {
//     if (!token) {
//       setError('No token found. Please login.');
//       return;
//     }

//     fetch('http://localhost:5000/api/notes', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.message) {
//           setError(data.message);
//         } else {
//           setNotes(data.notes || []);
//           const plan = data.tenant?.plan || 'free';
//           setTenantPlan(plan);
//           if (plan === 'free' && data.notes.length >= 3) {
//             setNoteLimitReached(true);
//           }
//         }
//       })
//       .catch(() => setError('Failed to fetch notes'));
//   }, []);

//   const handleNoteCreated = (newNote) => {
//     setNotes((prev) => [...prev, newNote]);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2">Your Notes</h1>
//       <NoteForm token={token} onNoteCreated={handleNoteCreated} />
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <NoteList notes={notes} />
//     </div>
//   );
// }



// //path: frontend/src/pages/Dashboard.jsx
// ✅ Correct imports
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useTenant } from '../context/TenantContext';
import Navbar from '../components/Navbar';
import UserInfo from '../components/UserInfo';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import UpgradeBanner from '../components/UpgradeBanner';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const {
    tenantPlan,
    setTenantPlan,
    noteLimitReached,
    setNoteLimitReached,
    tenantName,
    setTenantName,
  } = useTenant();

  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [tenantSlug, setTenantSlug] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No token found. Please login.');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
      setUserRole(decoded.role);
      setTenantSlug(decoded.tenantSlug);

      // ✅ Fetch notes from backend
      fetch('http://localhost:5000/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setNotes(data.notes || []);
            const plan = data.tenant?.plan || 'free';
            const name = data.tenant?.name || decoded.tenantSlug;
            setTenantPlan(plan);
            setTenantName(name);

            // ✅ Note limit logic
            if (plan === 'free' && data.notes.length >= 3) {
              setNoteLimitReached(true);
            } else {
              setNoteLimitReached(false);
            }
          }
        })
        .catch(() => setError('Failed to fetch notes'));
    } catch (err) {
      console.error('Token decode error:', err);
      setError('Invalid token. Please login again.');
    }
  }, []);

  const handleNoteCreated = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setNotes((prev) => prev.filter((note) => note._id !== noteId));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleUpgrade = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tenants/${tenantSlug}/upgrade`, // ✅ fixed URL
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTenantPlan('pro');
        setNoteLimitReached(false);
      } else {
        console.error(data.message || 'Upgrade failed');
      }
    } catch (err) {
      console.error('Upgrade error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <UserInfo userEmail={userEmail} />
      <main className="px-6 py-4 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">✍️ My Notes:</h2>

        {!noteLimitReached && (
          <NoteForm token={token} onNoteCreated={handleNoteCreated} />
        )}

        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

        <NoteList notes={notes} onDelete={handleDeleteNote} />

        {noteLimitReached && (
          <UpgradeBanner onUpgrade={handleUpgrade} userRole={userRole} />
        )}
      </main>
    </div>
  );
}
