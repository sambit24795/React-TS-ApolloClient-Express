const { addRecipe, getRecipes, getRecipe } = require("../controllers/recipe");
const {
  signupUser,
  signinUser,
  getCurrentUser,
} = require("../controllers/user");

const Query = {
  recipies: async () => {
    try {
      return await getRecipes();
    } catch (err) {
      console.error(err);
    }
  },
  user: async (...[, , { currentUser }]) => {
    if (!currentUser) {
      return null;
    }
    console.log("CURRENT", currentUser);
    try {
      return await getCurrentUser(currentUser);
    } catch (err) {
      console.error(err);
    }
  },
  recipe: async (...[, { _id }]) => {
    return await getRecipe(_id);
  },
};

const Mutation = {
  addRecipe: async (_, { input }) => {
    try {
      return await addRecipe(input);
    } catch (err) {
      console.error(err);
    }
  },
  signupUser: async (_, { input }) => {
    try {
      const token = await signupUser(input);
      return { token };
    } catch (err) {
      console.error(err);
    }
  },
  SigninUser: async (_, { input }, context) => {
    console.log("CONTEXT:", context);
    try {
      const token = await signinUser(input);
      return { token };
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = { Query, Mutation };
