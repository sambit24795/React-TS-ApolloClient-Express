import React, { useReducer } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormGroup,
  Button,
} from "@material-ui/core";

import "./Auth.css";

const FIELD_CHANGE = "field_change";

interface SignupState {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupAction {
  type: string;
  field?: string;
  payload?: string;
}

const initialState: SignupState = {
  userName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const signupReducer = (
  state: SignupState,
  action: SignupAction
): SignupState => {
  switch (action.type) {
    case FIELD_CHANGE:
      return { ...state, [action.field as string]: action.payload };
    default:
      return state;
  }
};

const Signup: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer<
    React.Reducer<SignupState, SignupAction>
  >(signupReducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: FIELD_CHANGE, field: name, payload: value });
  };

  const { userName, email, password, passwordConfirmation } = state;

  return (
    <div className="App">
      <h2>Signup</h2>
      <FormGroup className="AuthForm">
        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input
            type="text"
            name="userName"
            placeholder="userName"
            value={userName}
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">
            please provide an username
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">
            Please provide an email.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">
            Please enter your password
          </FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Confirm Password</InputLabel>
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">
            Please confirm your password
          </FormHelperText>
        </FormControl>
        <FormControl margin="dense">
          <Button color="primary" variant="outlined">
            Submit
          </Button>
        </FormControl>
      </FormGroup>
    </div>
  );
};

export default Signup;
