import React, { useReducer, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  Button,
  Chip,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

import FormFields, { FormField } from "./FormFields";
import { AuthState, AuthAction, authReducer, FIELD_RESET } from "./reducer";
import { useSigninUserMutation } from "../../generated/graphql";
import { RefetchProp } from "../Hoc/withSession";

export const initialState: SigninState = {
  email: "",
  password: "",
};

interface SigninState {
  email: string;
  password: string;
}

type Ommitedprops = Omit<RefetchProp, "userData">;

interface Props extends Ommitedprops, RouteComponentProps {}

const Signin = ({ history, refetch }: Props): JSX.Element => {
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

  const validateForm = (): boolean => {
    if (!password || !email) {
      return false;
    }
    return true;
  };

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

    localStorage.clear();
    localStorage.setItem("token", data?.SigninUser?.token as string);

    if (data) {
      await refetch();
      dispatch({
        type: FIELD_RESET,
      });
      history.push("/");
    }
  };

  const clickHandler = () => {
    history.push("/signup");
  };

  return (
    <div className="App">
      <FormGroup className="AuthForm header">
        <Typography variant="h4">Signin</Typography>
        {renderSigninFormfields()}
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
        <Typography variant="h6">Don't have an account yet?</Typography>
        <FormControl margin="dense">
          <Chip
            icon={<FaceIcon />}
            label="Signup"
            clickable
            color="primary"
            onClick={clickHandler}
            variant="outlined"
            deleteIcon={<DoneIcon />}
          />
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

export default withRouter(Signin);
