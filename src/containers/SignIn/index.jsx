import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { usePost } from "@/hooks/usePost";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { ENDPOINTS } from "@/services/endpoints";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = EMAIL_REGEX.test(email);
  const isFormValid = isEmailValid && password.trim().length > 0;

  const { mutate: signIn, isPending } = usePost(ENDPOINTS.AUTH.LOGIN, {
    onSuccess: (data) => {
      login(data.token);
      navigate("/");
      showToast(data.message || "Signed in successfully.", "success");
    },
    onError: (err) => {
      showToast(err?.message || "Invalid email or password.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    signIn({ email, password });
  };

  return (
    <form className="signInContainer" onSubmit={handleSubmit}>
      <div className="signInWrapper">
        <h1>Sign In</h1>
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address..."
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email && !isEmailValid ? "Please enter a valid email address." : ""}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password..."
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button width="100%" type="submit" disabled={!isFormValid || isPending}>
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
        <p>
          Don&apos;t have an Account?{" "}
          <span onClick={() => navigate("/sign-up")}>Create Account</span>
        </p>
      </div>
    </form>
  );
};

export default SignIn;
