import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "@/hooks/usePost";
import { useToast } from "@/hooks/useToast";
import { ENDPOINTS } from "@/services/endpoints";

import "./style.scss";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

import hideIcon from "/src/assets/login/hideIcon.png";
import showIcon from "/src/assets/login/showIcon.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = EMAIL_REGEX.test(email);
  const isFormValid = fullName.trim().length > 0 && isEmailValid && password.trim().length > 0;

  const { mutate: signUp, isPending } = usePost(ENDPOINTS.AUTH.SIGNUP, {
    onSuccess: (data) => {
      navigate("/sign-in");
      showToast(data.message || "Account created successfully.", "success");
    },
    onError: (err) => {
      showToast(err?.message || "Registration failed. Please try again.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    signUp({ fullName, email, password });
  };

  return (
    <form className="signUpContainer" onSubmit={handleSubmit}>
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
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password..."
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={showPassword ? hideIcon : showIcon}
          onRightIconClick={() => setShowPassword((prev) => !prev)}
        />
        <Button
          width="100%"
          type="submit"
          disabled={!isFormValid || isPending}
          className="noPaddingChange"
        >
          {isPending ? "Creating Account..." : "Sign Up"}
        </Button>
        <p>
          Already have an Account? <span onClick={() => navigate("/sign-in")}>Sign In</span>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
