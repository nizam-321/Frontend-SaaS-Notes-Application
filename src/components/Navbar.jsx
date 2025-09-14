//path: frontend/src/components/Navbar.jsx
export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">📝 Notes SaaS</h1>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}