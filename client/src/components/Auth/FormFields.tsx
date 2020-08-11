import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

import { SignupAction, FIELD_CHANGE } from "./reducer";

export interface FormField {
  type: string;
  namePlace: string;
  formField: string;
  formTeaxtHelper: string;
  value: string;
}

interface FormfieldProps extends FormField {
  dispatch: React.Dispatch<SignupAction>;
}

const FormFields: React.FC<FormfieldProps> = ({
  type,
  namePlace,
  formField,
  formTeaxtHelper,
  value,
  dispatch,
}): JSX.Element => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: FIELD_CHANGE, field: name, payload: value });
  };

  const signupFormCreateor = (): JSX.Element => {
    return (
      <FormControl>
        <InputLabel htmlFor="my-input">{formField}</InputLabel>
        <Input
          type={type}
          name={namePlace}
          placeholder={namePlace}
          value={value}
          onChange={changeHandler}
        />
        <FormHelperText id="my-helper-text">{formTeaxtHelper}</FormHelperText>
      </FormControl>
    );
  };

  return signupFormCreateor();
};

export default FormFields;
