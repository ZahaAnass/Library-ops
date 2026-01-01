import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "@/features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = () => {
    dispatch(loginStart());

    try {
      // simulate API success
      setTimeout(() => {
        dispatch(
          loginSuccess({
            user: { id: 1, name: "Anass" },
            token: "fake-jwt-token",
          })
        );
      }, 1000);
    } catch (err) {
      dispatch(loginFailure("Login failed"));
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isAuthenticated ? (
        <p>You are logged in</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
