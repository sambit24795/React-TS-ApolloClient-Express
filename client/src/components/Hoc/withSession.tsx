import React from "react";
import { useCurrentUserQuery, CurrentUserQuery } from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client/core/types";
import { ApolloClient } from "@apollo/client/core/ApolloClient";

export interface RefetchProp {
  refetch: () => Promise<ApolloQueryResult<CurrentUserQuery>>;
  userData: CurrentUserQuery | null;
  client?: ApolloClient<any>
}

const withSession = <P extends RefetchProp>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const { loading, refetch, data, client } = useCurrentUserQuery();
    if (loading) return null;
    return <Component {...props} refetch={refetch} userData={data} client={client}/>;
  };
};

export default withSession;
