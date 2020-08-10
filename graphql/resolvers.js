const { addRecipe, getRecipes } = require("../controllers/recipe");
const { signupUser, createtoken } = require("../controllers/user");

const Query = {
  recipies: async () => {
    try {
      return await getRecipes();
    } catch (err) {
      console.error(err);
    }
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
};

module.exports = { Query, Mutation };
