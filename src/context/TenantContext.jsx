//path: frontend/src/context/TenantContext.jsx
import { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenantPlan, setTenantPlan] = useState('');
  const [noteLimitReached, setNoteLimitReached] = useState(false);

  return (
    <TenantContext.Provider value={{ tenantPlan, setTenantPlan, noteLimitReached, setNoteLimitReached }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);