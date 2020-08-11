import { initialState } from "./Signup";

export const FIELD_CHANGE = "field_change";
export const FIELD_RESET = "field_reset";

export interface SignupState {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignupAction {
  type: typeof FIELD_CHANGE | typeof FIELD_RESET;
  field?: string;
  payload?: string;
}

export const signupReducer = (
  state: SignupState,
  action: SignupAction
): SignupState => {
  switch (action.type) {
    case FIELD_CHANGE:
      return { ...state, [action.field as string]: action.payload };
    case FIELD_RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
