import React, { useReducer, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  Button,
  InputLabel,
  Input,
  FormHelperText,
  TextareaAutosize,
  Container,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import "./AddRecipe.css";
import { useAddRecipeMutation } from "../../../generated/graphql";
import Footer from "../../Footer/Footer";
import { useHistory } from "react-router-dom";
import { RefetchProp } from "../../Hoc/withSession";

const FIELD_CHANGE = "FIELD_CHNAGE";
const CLEAR_FIELD = "CLEAR_FIELD";
const UPDATE_USERNAME = "UPDATE_USERNAME";

interface RecipeState {
  name: string;
  description: string;
  category: string;
  instructions: string;
  userName: string | undefined;
}

interface RecipeActions {
  type: typeof FIELD_CHANGE | typeof CLEAR_FIELD | typeof UPDATE_USERNAME;
  field?: string;
  payload?: string;
}

const initialState: RecipeState = {
  name: "",
  description: "",
  category: "",
  instructions: "",
  userName: "",
};

const addRecipeReducer = (state: RecipeState, action: RecipeActions) => {
  switch (action.type) {
    case FIELD_CHANGE:
      return { ...state, [action.field as string]: action.payload };
    case CLEAR_FIELD:
      return { ...state, ...initialState };
    case UPDATE_USERNAME:
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};

type OmmitedRefetch = Omit<RefetchProp, "refetch">;

interface Props extends OmmitedRefetch {}

const AddRecipe: React.FC<Props> = ({ userData }): JSX.Element => {
  const [state, dispatch] = useReducer<
    React.Reducer<RecipeState, RecipeActions>
  >(addRecipeReducer, initialState);

  const history = useHistory();

  const { category, description, name, instructions, userName } = state;

  const [addRecipe, { error, loading, client }] = useAddRecipeMutation();

  useEffect(() => {
    if (!!userData?.user === false) {
      history.push({
        pathname: "/",
      });
    }
    dispatch({
      type: UPDATE_USERNAME,
      payload: userData?.user?.userName,
    });
  }, [userData, history]);

  const validateForm = (): boolean => {
    if (!category || !description || !name || !instructions) {
      return false;
    }
    return true;
  };

  const changeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    dispatch({ type: FIELD_CHANGE, field: name, payload: value });
  };

  const submitHandler = async (): Promise<void> => {
    const { data } = await addRecipe({
      variables: {
        input: {
          name,
          description,
          category,
          instructions,
          userName,
        },
      },
    }, );
    console.log("DATA", data);
    console.log(client);
    if (data) {
      dispatch({
        type: CLEAR_FIELD,
      });
      history.push({ pathname: "/" });
    }
  };

  return (
    <React.Fragment>
      <Container>
        <div className="addRecipe">
          <FormGroup style={{ marginTop: "30px" }}>
            <FormControl margin="dense">
              <Typography variant="h4">Signup</Typography>
            </FormControl>
            <FormControl margin="dense">
              <InputLabel>Recipe Name</InputLabel>
              <Input
                name="name"
                value={name}
                placeholder="Recipe Name"
                onChange={changeHandler}
              />
              <FormHelperText>Please enter the recipe name.</FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel>Username</InputLabel>
              <Input
                name="userName"
                value={userData?.user?.userName}
                placeholder="user name"
                disabled
              />
              <FormHelperText>Please don't change the userName</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel>Category</InputLabel>
              <Input
                name="category"
                value={category}
                placeholder="category"
                onChange={changeHandler}
              />
              <FormHelperText>Please enter a category.</FormHelperText>
            </FormControl>

            <FormControl>
              <TextareaAutosize
                rowsMin={4}
                rows={4}
                rowsMax={4}
                name="description"
                value={description}
                placeholder="Enter a description"
                onChange={changeHandler}
              />
              <FormHelperText>Provide a description.</FormHelperText>
            </FormControl>
            <FormControl>
              <TextareaAutosize
                rowsMin={7}
                rows={7}
                rowsMax={7}
                name="instructions"
                value={instructions}
                placeholder="instructions"
                onChange={changeHandler}
              />
              <FormHelperText>Please provide some instructions.</FormHelperText>
            </FormControl>

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
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default AddRecipe;
