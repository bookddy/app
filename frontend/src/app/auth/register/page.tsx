"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserAPI from "@/api/userAPI";
import { Alert, Stack, SvgIcon, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Register() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [validation, setValidation] = React.useState({
    passLength: false,
    passNumber: false,
    passUpper: false,
    passSpecialCharacter: false,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const user = { name, username, password, email };

    UserAPI.create(user)
      .then((response) => {
        console.log(response.headers["location"]);
      })
      .catch((error) => {
        console.error(error);
        setOpenAlert(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const validatePassword = () => {
    const newValidation = {
      passLength: password.length >= 8,
      passNumber: /\d/.test(password),
      passUpper: /[A-Z]/.test(password),
      passSpecialCharacter: /[^\w\s]/.test(password),
    };

    setValidation(newValidation);
  };

  React.useEffect(() => {
    validatePassword();
  }, [password]);

  return (
      <Stack 
        spacing={2} 
        component="form" 
        onSubmit={handleSubmit} 
        className="bg-[#E9E7DA] p-8 rounded-lg justify-items-center content-center">
      <Typography variant="h4" align="center" padding={1}>
        Register
      </Typography>
      {openAlert ? (
        <Alert severity="error" variant="filled" className="w-full">
          Unable to Register
        </Alert>
      ) : (
        <></>
      )}
      <div className="w-full">
        <TextField
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={name === ""}
          id="Name"
          label="Name"
          helperText={name === "" ? "*Name is required" : ""}
          fullWidth
        />
      </div>
      <div className="w-full">
        <TextField
          required
          id="Username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={username === ""}
          helperText={username === "" ? "*Username is required" : ""}
          fullWidth
        />
      </div>
      <div className="w-full">
        <TextField
          required
          id="Email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email === ""}
          helperText={email === "" ? "*Email is required" : ""}
          fullWidth
        />
      </div>
      <div className="w-full">
        <TextField
          required
          id="Password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password === ""}
          helperText={password === "" ? "*Password is required" : ""}
          fullWidth
        />
      </div>
      <Stack>
      <span> { validation.passLength ? (<SvgIcon component={CheckCircleIcon} color="success" data-testid="pass-length-success"></SvgIcon>) : 
      (<SvgIcon component={CancelIcon} color="error" data-testid="pass-length-error"></SvgIcon>)} At least 8 characters</span>
      <span> { validation.passNumber ? (<SvgIcon component={CheckCircleIcon} color="success" data-testid="pass-number-success"></SvgIcon>) : 
      (<SvgIcon component={CancelIcon} color="error" data-testid="pass-number-error"></SvgIcon>)}  At least 1 number</span>
      <span> { validation.passUpper ? (<SvgIcon component={CheckCircleIcon} color="success" data-testid="pass-upper-success"></SvgIcon>) : 
      (<SvgIcon component={CancelIcon} color="error" data-testid="pass-upper-error"></SvgIcon>)}  At least 1 letter should be uppercase</span>
      <span> { validation.passSpecialCharacter ? (<SvgIcon component={CheckCircleIcon} color="success" data-testid="pass-special-success"></SvgIcon>) : 
      (<SvgIcon component={CancelIcon} color="error" data-testid="pass-special-error"></SvgIcon>)}  At least 1 special character</span>
      </Stack>

      <div className="flex justify-center items-center w-full">
        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          variant="contained"
          style={{ backgroundColor: "#09535E" }}
        >
          Register
        </Button>
      </div>
      </Stack>
  );
}
