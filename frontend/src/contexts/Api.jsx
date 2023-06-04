import { createContext, useContext } from 'react';

const ApiContext = createContext(null);

const useApi = () => useContext(ApiContext);

export { ApiContext, useApi };
