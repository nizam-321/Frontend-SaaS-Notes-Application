//path: frontend/src/components/UserInfo.jsx
import { useTenant } from '../context/TenantContext';

export default function UserInfo({ userEmail }) {
  const { tenantPlan, tenantName } = useTenant();

  return (
    <section className="px-6 py-4 text-sm text-gray-700">
      <p>Welcome, <strong>{userEmail}</strong></p>
      <p>Plan: <strong>{tenantPlan}</strong> | Tenant: <strong>{tenantName}</strong></p>
    </section>
  );
}