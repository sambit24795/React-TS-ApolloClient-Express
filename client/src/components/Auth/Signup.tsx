import React, { useReducer, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, FormGroup, FormControl } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import "./Auth.css";
import FormFields, { FormField } from "./FormFields";
import { useSignupUserMutation } from "../../generated/graphql";
import { FIELD_RESET, AuthState, AuthAction, authReducer } from "./reducer";
import { RefetchProp } from "../Hoc/withSession";

export const initialState: AuthState = {
  userName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

interface Props extends RefetchProp, RouteComponentProps {}

const Signup = ({ history, refetch }: Props): JSX.Element => {
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(
    authReducer,
    initialState
  );

  const { userName, email, password, passwordConfirmation } = state;

  const [signupUser, { error, loading }] = useSignupUserMutation();

  const formFields: FormField[] = [
    {
      type: "text",
      namePlace: "userName",
      formField: "Username",
      formTeaxtHelper: "please provide an username.",
      value: userName,
    },
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
    {
      type: "password",
      namePlace: "passwordConfirmation",
      formField: "Conform Password",
      formTeaxtHelper: "Please confirm your password",
      value: passwordConfirmation,
    },
  ];

  const validateForm = (): boolean => {
    if (!userName || !password || !email || password !== passwordConfirmation) {
      return false;
    }
    return true;
  };

  const renderSignupFormfields = (): ReactNode => {
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

  const submitHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    if (!validateForm()) {
      return;
    }
    const { data } = await signupUser({
      variables: {
        input: {
          email,
          password,
          userName,
        },
      },
    });

    localStorage.clear();
    localStorage.setItem("token", data?.signupUser?.token as string);

    if (data) {
      await refetch();
      dispatch({ type: FIELD_RESET });
      history.push("/");
    }
  };

  return (
    <div className="App">
      <FormGroup className="AuthForm">
        <h2>Signup</h2>
        {renderSignupFormfields()}
        <FormControl margin="dense">
          <Button
            variant="outlined"
            color="primary"
            onClick={submitHandler}
            disabled={loading || !validateForm()}
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

export default withRouter(Signup);
