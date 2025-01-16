import * as React from "react";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormControl } from "@mui/base/FormControl";

export default function Register() {
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
            id="Name"
            // data-testid="name"
            label="Name"
            defaultValue="Name"
          />
        <FormControl defaultValue="" required>
          <TextField
            required
            id="Username"
            // data-testid="username"
            label="Username"
            defaultValue="Username"
          />
        </FormControl>
        <FormControl defaultValue="" required>
          <TextField
            required
            id="Email"
            // data-testid="email"
            label="Email"
            type="email"
            defaultValue="Email"
          />
        </FormControl>

        <FormControl defaultValue="" required>
          <TextField
            id="Password"
            // data-testid="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </FormControl>
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

// export default function Register() {
//     return (
//         <div>
//             <h1>Register</h1>
//             <form>
//                 <label>
//                     Name
//                     <input type="text" name="name" />
//                 </label>
//                 <label>
//                     Username
//                     <input type="text" name="username" />
//                 </label>
//                 <label>
//                     Password
//                     <input type="password" name="password" />
//                 </label>
//                 <label>
//                     Email
//                     <input type="email" name="email" />
//                 </label>
//                 <label>
//                     <input type="checkbox" name="terms" />
//                     I agree to the terms and conditions
//                 </label>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }
