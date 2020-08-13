import React from 'react';

import { RefetchProp } from '../Hoc/withSession';

type Ommitedprops = Omit<RefetchProp, "userData">;

interface Props extends Ommitedprops {}

const Search:React.FC<Props> = (): JSX.Element => {
    return <div></div>;
};

export default Search;