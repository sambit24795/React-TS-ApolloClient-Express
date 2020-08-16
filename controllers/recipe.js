const Recipe = require("../Models/Recipe");

exports.addRecipe = ({
  name,
  description,
  category,
  instructions,
  userName,
}) => {
  const recipe = new Recipe({
    name,
    description,
    category,
    instructions,
    userName,
  });
  return recipe.save();
};

exports.getRecipes = () => {
  return Recipe.find();
};

exports.getRecipe = (_id) => {
  return Recipe.findById(_id);
};

exports.getSearchedRecipes = (searchTerm) => {
  if (searchTerm) {
    return Recipe.find(
      {
        $text: { $search: searchTerm },
      },
      {
        score: { $meta: "textScore" },
      }
    ).sort({ score: { $meta: "textScore" } });
  }
  return Recipe.find().sort({ likes: "desc", createdDate: "desc" });
};
