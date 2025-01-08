import React from 'react';
import { CascaderContextType, Option } from '../interface';

const CascaderContext = React.createContext<CascaderContextType<Option> | null>(null);

export { CascaderContext };
