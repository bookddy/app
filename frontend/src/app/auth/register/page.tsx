"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserAPI from "@/api/userAPI";

export default function Register() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Form submission prevented!');
    const user = { name, username, password, email };

    // to do: check preventDefault
    // if (!name || !username || !password || !email) {
    //   return;
    // }

    UserAPI.create(user)
      .then((response) => {
        console.log(response.headers["location"]);
      })
      .catch((error) => {
        console.error(error);
      });

    // to do: reset the form after submission
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      autoComplete="off"
    >
      <h1>Register</h1>
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password === ""}
          helperText={password === "" ? "*Password is required" : ""}
        />
      </div>

      <div>
        <Button type="submit" variant="outlined">
          Register
        </Button>
      </div>
    </Box>
  );
}
