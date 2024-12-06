import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { checkToken } from "../../api/Api";
import { UserContext, defaultUserState } from "../../context/UserContext";

export const PersistLogin = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.info("No token");
      navigate("/login", { replace: true });
      return;
    }

    const verifyAccessToken = async () => {
      try {
        const checkTokenValidate = await checkToken(token);

        if (checkTokenValidate) {
          if (
            checkTokenValidate.user.active === false ||
            checkTokenValidate.user.mfa.enebled === false
          ) {
            localStorage.removeItem("jwt");
            setUser(defaultUserState.user);
            navigate("/login", { replace: true });
          }

          const accessToken: string = checkTokenValidate.accessToken;

          const joinedData = {
            ...checkTokenValidate.user,
            accessToken,
          };

          setUser(joinedData);
        } else {
          console.error("No token");
          localStorage.removeItem("jwt");
          setUser(defaultUserState.user);
          navigate("/login", { replace: true });
        }
      } catch (err) {
        localStorage.removeItem("jwt");
        setUser(defaultUserState.user);
        navigate("/login", { replace: true });
      }
    };

    !user?.user_id ? verifyAccessToken() : setIsLoading(false);
  }, [user, navigate, setUser, token]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return <Outlet />;
};
