import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

interface RequireAuthProps {
  component: React.ComponentType<any>;
}

export const RequireAuth = ({
  component: Component,
  ...props
}: RequireAuthProps) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return user.accessToken ? (
    <Component {...props} />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
