import { Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import useIsOpsUser from '../hooks/useIsOpsUser.js';

export default function OpsProtectedRoute({ children }) {
  const { isOpsUser, loading } = useIsOpsUser();
  if (loading) return null;
  if (!isOpsUser) return <Navigate to="/dashboard" replace />;
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
