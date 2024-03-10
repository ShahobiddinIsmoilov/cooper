import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(AuthContext) as AuthContextProps;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
