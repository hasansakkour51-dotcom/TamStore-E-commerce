// src/feature/auth/AuthForm.jsx
import React, { useState } from "react";
import { useAuth } from "./hook/useAuth";
import "./Auth.css";
import Swal from "sweetalert2";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;

    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await signup(username, email, password);
    }

    if (success) {
      if (isLogin) {
        Swal.fire({
          title: "✅ Login successful!",
          text: "Welcome back, Hasan!",
          icon: "success",
          confirmButtonColor: "#0d6efd",
        }).then(() => {
          window.location.href = "/profile";
        });
      } else {
        Swal.fire({
          title: "🎉 Sign Up successful!",
          text: "Please login now to continue.",
          icon: "success",
          confirmButtonColor: "#0d6efd",
        }).then(() => {
          setIsLogin(true);
          setUsername("");
          setEmail("");
          setPassword("");
        });
      }
    } else {
      Swal.fire({
        title: "❌ Failed!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div className="authPage">
      <div className="authBox">
        <h2>{isLogin ? "Login" : "Create Account"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p>
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span className="switchLink" onClick={() => setIsLogin(false)}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="switchLink" onClick={() => setIsLogin(true)}>
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
