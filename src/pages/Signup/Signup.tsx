/* eslint-disable @typescript-eslint/no-unused-vars */
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { FacebookIcon } from "../../assets/icons/facebook";
import { GoogleIcon } from "../../assets/icons/google";
import "./Signup.css";

export const Signup = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [openTerms, setOpenTerms] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleOpenTerms = (event: React.FormEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setOpenTerms(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <section className="container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="title">Sign up your account</h1>
        <p className="signup-link">
          Already have an account?{" "}
          <a href="/login" className="link">
            Log in
          </a>
        </p>
        <FormControl>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            className="signup-form-input"
            error={emailError}
            autoComplete="email"
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>
        {emailErrorMessage && (
          <p className="error-message">{emailErrorMessage}</p>
        )}
        <FormControl>
          <TextField
            id="password"
            name="password"
            className="signup-form-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            error={passwordError}
            autoComplete="current-password"
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
        {passwordErrorMessage && (
          <p className="error-message">{passwordErrorMessage}</p>
        )}
        <FormControl>
          <TextField
            id="confirm-password"
            name="confirm-password"
            className="signup-form-input"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            error={passwordError}
            autoComplete="current-password"
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
        {passwordErrorMessage && (
          <p className="error-message">{passwordErrorMessage}</p>
        )}
        <FormControlLabel
          sx={{ width: "fit-content" }}
          control={<Checkbox sx={{ color: "white" }} />}
          label={
            <Typography>
              I have read and agree to the{" "}
              <span onClick={handleOpenTerms} className="link">
                terms and conditions.
              </span>
            </Typography>
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign up
        </Button>
        <div className="separator">
          <span className="line"></span>
          <span className="or-text">or sign up with</span>
          <span className="line"></span>
        </div>
        <div className="social-signup">
          <Button
            sx={{
              textTransform: "none",
              flex: 1,
              padding: "0.60rem",
              fontSize: "1rem",
              backgroundColor: "#fff",
              color: "#000000",
              border: "1px solid #FBBC05",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            fullWidth
            onClick={() => alert("Signup with Google")}
            startIcon={<GoogleIcon />}
          >
            Google
          </Button>
          <Button
            sx={{
              textTransform: "none",
              flex: 1,
              padding: "0.60rem",
              fontSize: "1rem",
              backgroundColor: "#fff",
              color: "#000000",
              border: "1px solid #3b5998",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            fullWidth
            onClick={() => alert("Signup with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Facebook
          </Button>
        </div>
      </form>
    </section>
  );
};
