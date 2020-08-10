import { gql, DocumentNode } from "@apollo/client";

export const GET_ALL_RECIPES: DocumentNode | any = gql`
  query {
    recipies {
      _id
      name
      userName
      category
      description
    }
  }
`;
