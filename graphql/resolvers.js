const { addRecipe, getRecipes } = require("../controllers/recipe");

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
  addRecipe: async (parentValue, { input }) => {
    try {
      const recipe = await addRecipe(input);
      return recipe;
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = { Query, Mutation };
