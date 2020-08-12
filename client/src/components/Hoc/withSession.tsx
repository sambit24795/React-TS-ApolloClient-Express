import React from "react";
import { useCurrentUserQuery, CurrentUserQuery } from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client/core/types";

export interface RefetchProp {
  refetch: () => Promise<ApolloQueryResult<CurrentUserQuery>>;
}

const withSession = <P extends RefetchProp>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const { loading, refetch } = useCurrentUserQuery();
    if (loading) return null;
    return <Component {...props} refetch={refetch} />;
  };
};

export default withSession;
