const Recipe = require("../Models/Recipe");
const User = require("../Models/User");

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

exports.postLikedRecipe = async (_id, userName, flag) => {
  let recipe;

  if (flag) {
    recipe = await Recipe.findOneAndUpdate({ _id }, { $set: { likes: 1 } });
  } else {
    recipe = await Recipe.findOneAndUpdate({ _id }, { $set: { likes: 0 } });
  }

  await User.findOneAndUpdate({ userName }, { $addToSet: { favorites: _id } });
  return recipe;
};
