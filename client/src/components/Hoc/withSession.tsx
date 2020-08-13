import React from "react";
import { useCurrentUserQuery, CurrentUserQuery } from "../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client/core/types";

export interface RefetchProp {
  refetch: () => Promise<ApolloQueryResult<CurrentUserQuery>>;
  userData: CurrentUserQuery | null;
}

const withSession = <P extends RefetchProp>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const { loading, refetch, data } = useCurrentUserQuery();
    if (loading) return null;
    return <Component {...props} refetch={refetch} userData={data} />;
  };
};

export default withSession;
