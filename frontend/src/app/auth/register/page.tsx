"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function Register() {
  const [name, setName] = React.useState("");

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <h1>Register</h1>
      <div>
        <TextField
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={name === ""}
          id="Name"
          label="Name"
          defaultValue="Name"
          helperText={name === "" ? "*Name is required" : ""}
        />
        <TextField
          required
          id="Username"
          label="Username"
          defaultValue="Username"
        />
        <TextField
          required
          id="Email"
          label="Email"
          type="email"
          defaultValue="Email"
        />

        <TextField
          id="Password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>

      <div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
        </FormGroup>

        <Button variant="outlined">Submit</Button>
      </div>
    </Box>
  );
}
