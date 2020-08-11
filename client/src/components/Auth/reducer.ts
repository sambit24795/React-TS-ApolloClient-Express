import { initialState } from "./Signup";

export const FIELD_CHANGE = "field_change";
export const FIELD_RESET = "field_reset";

export interface AuthState {
  userName?: string | any;
  email: string;
  password: string;
  passwordConfirmation?: string | any;
}

export interface AuthAction {
  type: typeof FIELD_CHANGE | typeof FIELD_RESET;
  field?: string;
  payload?: string;
}

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case FIELD_CHANGE:
      return { ...state, [action.field as string]: action.payload };
    case FIELD_RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
