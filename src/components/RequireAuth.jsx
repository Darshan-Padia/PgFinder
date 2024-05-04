import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(allowedRoles);
    // allowed roles ->  ['tenant', 'owner']

    /*
    {email: 'dspd352@gmail.com', role: 'tenant', accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkc3BkMzUyQGdtYWlsL…TQyfQ.CD8_T-x4fmR2vzroM3kQc2CobMOojS1hit3jSl9aCEM', refreshToken: undefined, password: '123'}
     */
    console.log("authhh");
    console.log(auth);
    return (
        // checking for allowed roles
        allowedRoles.includes(auth?.role) //changed from user to role to persist login after refresh
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;