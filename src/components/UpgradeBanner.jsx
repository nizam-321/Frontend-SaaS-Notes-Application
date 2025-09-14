//path: frontend/src/components/UpgradeBanner.jsx
import { useTenant } from '../context/TenantContext';

export default function UpgradeBanner({ onUpgrade, userRole }) {
  const { tenantPlan } = useTenant();

  return (
    <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
      <p>⚠️ You’ve reached the Free Plan <strong>note limit</strong>.</p>
      <p className="mt-2">
        <strong>Upgrade to Pro</strong> for unlimited notes.
      </p>

      {userRole === 'ADMIN' && (
        <button
          onClick={onUpgrade}
          className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Upgrade to Pro
        </button>
      )}
    </div>
  );
}
