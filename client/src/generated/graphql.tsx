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
  user?: Maybe<User>;
  recipe?: Maybe<Recipe>;
  searchedRecipe?: Maybe<Array<Maybe<Recipe>>>;
};


export type QueryRecipeArgs = {
  _id: Scalars['ID'];
};


export type QuerySearchedRecipeArgs = {
  searchTerm?: Maybe<Scalars['String']>;
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
  signupUser?: Maybe<Token>;
  SigninUser?: Maybe<Token>;
};


export type MutationAddRecipeArgs = {
  input?: Maybe<AddRecipeInput>;
};


export type MutationSignupUserArgs = {
  input?: Maybe<SignupUserInput>;
};


export type MutationSigninUserArgs = {
  input?: Maybe<SigninUserInput>;
};

export type AddRecipeInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  instructions: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type SignupUserInput = {
  userName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type SigninUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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

export type RecipeQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type RecipeQuery = (
  { __typename?: 'Query' }
  & { recipe?: Maybe<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id' | 'name' | 'category' | 'description'>
  )> }
);

export type SearchedRecipeQueryVariables = Exact<{
  searchTerm?: Maybe<Scalars['String']>;
}>;


export type SearchedRecipeQuery = (
  { __typename?: 'Query' }
  & { searchedRecipe?: Maybe<Array<Maybe<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, '_id' | 'name' | 'category' | 'description'>
  )>>> }
);

export type AddRecipeMutationVariables = Exact<{
  input?: Maybe<AddRecipeInput>;
}>;


export type AddRecipeMutation = (
  { __typename?: 'Mutation' }
  & { addRecipe?: Maybe<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'name' | 'category' | 'description' | 'instructions' | 'createdDate'>
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userName' | 'email' | 'joinDate'>
  )> }
);

export type SignupUserMutationVariables = Exact<{
  input?: Maybe<SignupUserInput>;
}>;


export type SignupUserMutation = (
  { __typename?: 'Mutation' }
  & { signupUser?: Maybe<(
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  )> }
);

export type SigninUserMutationVariables = Exact<{
  input?: Maybe<SigninUserInput>;
}>;


export type SigninUserMutation = (
  { __typename?: 'Mutation' }
  & { SigninUser?: Maybe<(
    { __typename?: 'Token' }
    & Pick<Token, 'token'>
  )> }
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
export const RecipeDocument = gql`
    query Recipe($_id: ID!) {
  recipe(_id: $_id) {
    _id
    name
    category
    description
  }
}
    `;

/**
 * __useRecipeQuery__
 *
 * To run a query within a React component, call `useRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipeQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useRecipeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecipeQuery, RecipeQueryVariables>) {
        return ApolloReactHooks.useQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, baseOptions);
      }
export function useRecipeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecipeQuery, RecipeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecipeQuery, RecipeQueryVariables>(RecipeDocument, baseOptions);
        }
export type RecipeQueryHookResult = ReturnType<typeof useRecipeQuery>;
export type RecipeLazyQueryHookResult = ReturnType<typeof useRecipeLazyQuery>;
export type RecipeQueryResult = ApolloReactCommon.QueryResult<RecipeQuery, RecipeQueryVariables>;
export const SearchedRecipeDocument = gql`
    query SearchedRecipe($searchTerm: String) {
  searchedRecipe(searchTerm: $searchTerm) {
    _id
    name
    category
    description
  }
}
    `;

/**
 * __useSearchedRecipeQuery__
 *
 * To run a query within a React component, call `useSearchedRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchedRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchedRecipeQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchedRecipeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchedRecipeQuery, SearchedRecipeQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchedRecipeQuery, SearchedRecipeQueryVariables>(SearchedRecipeDocument, baseOptions);
      }
export function useSearchedRecipeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchedRecipeQuery, SearchedRecipeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchedRecipeQuery, SearchedRecipeQueryVariables>(SearchedRecipeDocument, baseOptions);
        }
export type SearchedRecipeQueryHookResult = ReturnType<typeof useSearchedRecipeQuery>;
export type SearchedRecipeLazyQueryHookResult = ReturnType<typeof useSearchedRecipeLazyQuery>;
export type SearchedRecipeQueryResult = ApolloReactCommon.QueryResult<SearchedRecipeQuery, SearchedRecipeQueryVariables>;
export const AddRecipeDocument = gql`
    mutation AddRecipe($input: AddRecipeInput) {
  addRecipe(input: $input) {
    name
    category
    description
    instructions
    createdDate
  }
}
    `;
export type AddRecipeMutationFn = ApolloReactCommon.MutationFunction<AddRecipeMutation, AddRecipeMutationVariables>;

/**
 * __useAddRecipeMutation__
 *
 * To run a mutation, you first call `useAddRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRecipeMutation, { data, loading, error }] = useAddRecipeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddRecipeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddRecipeMutation, AddRecipeMutationVariables>) {
        return ApolloReactHooks.useMutation<AddRecipeMutation, AddRecipeMutationVariables>(AddRecipeDocument, baseOptions);
      }
export type AddRecipeMutationHookResult = ReturnType<typeof useAddRecipeMutation>;
export type AddRecipeMutationResult = ApolloReactCommon.MutationResult<AddRecipeMutation>;
export type AddRecipeMutationOptions = ApolloReactCommon.BaseMutationOptions<AddRecipeMutation, AddRecipeMutationVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  user {
    userName
    email
    joinDate
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const SignupUserDocument = gql`
    mutation SignupUser($input: SignupUserInput) {
  signupUser(input: $input) {
    token
  }
}
    `;
export type SignupUserMutationFn = ApolloReactCommon.MutationFunction<SignupUserMutation, SignupUserMutationVariables>;

/**
 * __useSignupUserMutation__
 *
 * To run a mutation, you first call `useSignupUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignupUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupUserMutation, SignupUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupUserMutation, SignupUserMutationVariables>(SignupUserDocument, baseOptions);
      }
export type SignupUserMutationHookResult = ReturnType<typeof useSignupUserMutation>;
export type SignupUserMutationResult = ApolloReactCommon.MutationResult<SignupUserMutation>;
export type SignupUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupUserMutation, SignupUserMutationVariables>;
export const SigninUserDocument = gql`
    mutation SigninUser($input: SigninUserInput) {
  SigninUser(input: $input) {
    token
  }
}
    `;
export type SigninUserMutationFn = ApolloReactCommon.MutationFunction<SigninUserMutation, SigninUserMutationVariables>;

/**
 * __useSigninUserMutation__
 *
 * To run a mutation, you first call `useSigninUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinUserMutation, { data, loading, error }] = useSigninUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSigninUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SigninUserMutation, SigninUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SigninUserMutation, SigninUserMutationVariables>(SigninUserDocument, baseOptions);
      }
export type SigninUserMutationHookResult = ReturnType<typeof useSigninUserMutation>;
export type SigninUserMutationResult = ApolloReactCommon.MutationResult<SigninUserMutation>;
export type SigninUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SigninUserMutation, SigninUserMutationVariables>;