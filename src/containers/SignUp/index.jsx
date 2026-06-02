import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = EMAIL_REGEX.test(email);
  const isFormValid = fullName.trim().length > 0 && isEmailValid && password.trim().length > 0;

  return (
    <form className="signUpContainer">
      <div className="signUpWrapper">
        <h1>Sign Up</h1>
        <Input
          label="Full Name"
          placeholder="Enter your full name..."
          required={true}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
        <Button width="100%" type="submit" disabled={!isFormValid}>
          Sign Up
        </Button>
        <p>
          Already have an Account? <span onClick={() => navigate("/sign-in")}>Sign In</span>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
