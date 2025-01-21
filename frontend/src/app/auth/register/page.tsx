"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserAPI from "@/api/userAPI";
import { Alert, Typography } from "@mui/material";

export default function Register() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      className="bg-[#E9E7DA] p-6 rounded-lg"
      autoComplete="off"
    >
      <Typography variant="h4" align="center" padding={1}>
        Register
      </Typography>
      {openAlert ? (
        <Alert severity="error" variant="filled" sx={{ mb: 2, mr: 1, ml: 1 }}>
          Unable to Register
        </Alert>
      ) : (
        <></>
      )}
      <div className="form-row">
        <TextField
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={name === ""}
          id="Name"
          label="Name"
          helperText={name === "" ? "*Name is required" : ""}
        />
      </div>
      <div className="form-row">
        <TextField
          required
          id="Username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={username === ""}
          helperText={username === "" ? "*Username is required" : ""}
        />
      </div>
      <div className="form-row">
        <TextField
          required
          id="Email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email === ""}
          helperText={email === "" ? "*Email is required" : ""}
        />
      </div>
      <div className="form-row">
        <TextField
          required
          id="Password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password === ""}
          helperText={password === "" ? "*Password is required" : ""}
        />
      </div>

      <div className="flex justify-center items-center w-full p-2">
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
    </Box>
  );
}
