import React, { createContext } from "react";
import { useCurrentUserQuery, CurrentUserQuery } from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client/core/types";
import { ApolloClient } from "@apollo/client/core/ApolloClient";

interface UserDataValue {
  userData: CurrentUserQuery | undefined;
}

export interface RefetchProp extends UserDataValue {
  refetch: () => Promise<ApolloQueryResult<CurrentUserQuery>>;
  client?: ApolloClient<any>;
}

export const UserDataContext = createContext<UserDataValue>({ userData: {} });

const withSession = <P extends RefetchProp>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const { loading, refetch, data, client } = useCurrentUserQuery();
    if (loading) return null;

    const userContext = { userData: data };

    return (
      <UserDataContext.Provider value={userContext}>
        <Component
          {...props}
          refetch={refetch}
          userData={data}
          client={client}
        />
      </UserDataContext.Provider>
    );
  };
};

export default withSession;
