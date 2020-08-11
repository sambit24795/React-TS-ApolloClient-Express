import React, { useReducer, ReactNode } from "react";
import { FormGroup, FormControl, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import FormFields, { FormField } from "./FormFields";
import { AuthState, AuthAction, authReducer, FIELD_RESET } from "./reducer";
import { useSigninUserMutation } from "../../generated/graphql";

export const initialState: SigninState = {
  email: "",
  password: "",
};

interface SigninState {
  email: string;
  password: string;
}

const Signin: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(
    authReducer,
    initialState
  );

  const { email, password } = state;

  const [signinUser, { error, loading }] = useSigninUserMutation();

  const formFields: FormField[] = [
    {
      type: "email",
      namePlace: "email",
      formField: "Email",
      formTeaxtHelper: "Please provide an email.",
      value: email,
    },
    {
      type: "password",
      namePlace: "password",
      formField: "Password",
      formTeaxtHelper: " Please enter your password.",
      value: password,
    },
  ];

  const renderSigninFormfields = (): ReactNode => {
    return formFields.map(
      ({ type, namePlace, value, formField, formTeaxtHelper }, index) => {
        return (
          <FormFields
            key={index}
            type={type}
            namePlace={namePlace}
            formField={formField}
            formTeaxtHelper={formTeaxtHelper}
            dispatch={dispatch}
            value={value}
          />
        );
      }
    );
  };

  const submitHandler = async (): Promise<void> => {
    const { data } = await signinUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    localStorage.setItem("token", data?.SigninUser?.token as string);

    if (data) {
      dispatch({
        type: FIELD_RESET,
      });
    }
  };

  return (
    <div className="App">
      <h2>Signin</h2>
      <FormGroup className="AuthForm">
        {renderSigninFormfields()}
        <FormControl margin="dense">
          <Button
            variant="outlined"
            color="primary"
            onClick={submitHandler}
            disabled={loading}
          >
            Submit
          </Button>
        </FormControl>
      </FormGroup>
      {error ? (
        <Alert variant="filled" severity="error">
          {error.message}
        </Alert>
      ) : null}
    </div>
  );
};

export default Signin;
