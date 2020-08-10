import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  recipies?: Maybe<Array<Maybe<Recipe>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type Recipe = {
  __typename?: 'Recipe';
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  category: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
  createdDate?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Int']>;
  userName?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  userName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  joinDate?: Maybe<Scalars['String']>;
  favorites?: Maybe<Array<Maybe<Recipe>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipe?: Maybe<Recipe>;
};


export type MutationAddRecipeArgs = {
  input?: Maybe<AddRecipeInput>;
};

export type AddRecipeInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  instructions: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type RecipiesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipiesQuery = (
  { __typename?: 'Query' }
  & { recipies?: Maybe<Array<Maybe<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id' | 'name' | 'userName' | 'category' | 'description'>
  )>>> }
);


export const RecipiesDocument = gql`
    query Recipies {
  recipies {
    _id
    name
    userName
    category
    description
  }
}
    `;

/**
 * __useRecipiesQuery__
 *
 * To run a query within a React component, call `useRecipiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipiesQuery, RecipiesQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipiesQuery, RecipiesQueryVariables>(RecipiesDocument, baseOptions);
      }
export function useRecipiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipiesQuery, RecipiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipiesQuery, RecipiesQueryVariables>(RecipiesDocument, baseOptions);
        }
export type RecipiesQueryHookResult = ReturnType<typeof useRecipiesQuery>;
export type RecipiesLazyQueryHookResult = ReturnType<typeof useRecipiesLazyQuery>;
export type RecipiesQueryResult = ApolloReactCommon.QueryResult<RecipiesQuery, RecipiesQueryVariables>;